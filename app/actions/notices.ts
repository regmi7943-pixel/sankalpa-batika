'use server';

import { adminDb } from '@/lib/firebase/server';
import { Notice } from '@/types';
import { getSession } from './auth';
import { revalidatePath } from 'next/cache';

const NOTICE_PATH = 'notices';

function mapSnapshotToList<T>(snapshot: any): T[] {
    if (!snapshot) return [];
    return Object.keys(snapshot).map((key) => ({
        id: key,
        ...snapshot[key],
    }));
}

// PUBLIC: Fetch all published notices
export async function getNotices() {
    try {
        const ref = adminDb.ref(NOTICE_PATH);
        const snapshot = await ref.orderByChild('createdAt').once('value');
        const data = snapshot.val();

        // Convert object to array and filter/sort
        const notices = mapSnapshotToList<Notice>(data)
            .filter((n) => n.published)
            .sort((a, b) => b.createdAt - a.createdAt); // Newest first

        return { success: true, data: notices };
    } catch (error) {
        console.error('Error fetching notices:', error);
        return { success: false, data: [] };
    }
}

// ADMIN: Create Notice
export async function createNotice(data: Omit<Notice, 'id' | 'createdAt'>) {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized' };

    try {
        const ref = adminDb.ref(NOTICE_PATH).push();
        const newNotice = {
            ...data,
            createdAt: Date.now(),
        };
        await ref.set(newNotice);
        revalidatePath('/notices');
        revalidatePath('/'); // Revalidate home if it shows notices

        // Send email to subscribers if notice is published
        if (data.published) {
            // Import dynamically to avoid issues
            const { sendBulkEmail, noticeEmailTemplate } = await import('@/lib/email');
            const { getNewsletterSubscribers } = await import('./newsletter');

            const subscribersResult = await getNewsletterSubscribers();
            if (subscribersResult.success && subscribersResult.data && subscribersResult.data.length > 0) {
                const emails = subscribersResult.data.map((s: any) => s.email);
                const html = noticeEmailTemplate({ title: data.title, content: data.content });
                await sendBulkEmail({
                    recipients: emails,
                    subject: `📢 New Notice: ${data.title}`,
                    html,
                });
            }
        }

        return { success: true };
    } catch (error) {
        console.error('Error creating notice:', error);
        return { success: false, error: 'Failed to create notice' };
    }
}

// ADMIN: Update Notice
export async function updateNotice(id: string, data: Partial<Notice>) {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized' };

    try {
        await adminDb.ref(`${NOTICE_PATH}/${id}`).update(data);
        revalidatePath('/notices');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to update notice' };
    }
}

// ADMIN: Delete Notice
export async function deleteNotice(id: string) {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized' };

    try {
        await adminDb.ref(`${NOTICE_PATH}/${id}`).remove();
        revalidatePath('/notices');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to delete notice' };
    }
}

// ADMIN: Upload Attachment
export async function uploadNoticeAttachment(formData: FormData) {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized' };

    const file = formData.get('file') as File;
    if (!file) return { success: false, error: 'No file provided' };

    try {
        // Dynamically import cloudinary to ensure server-only execution if needed, 
        // though this file is 'use server' anyway.
        const cloudinary = (await import('@/lib/cloudinary')).default;

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult: any = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: 'sankalpa-batika/notices',
                    resource_type: 'auto'
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        return { success: true, url: uploadResult.secure_url };
    } catch (error) {
        console.error('Upload failed:', error);
        return { success: false, error: 'Upload failed' };
    }
}
