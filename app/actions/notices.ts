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
        return { success: true };
    } catch (error) {
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
