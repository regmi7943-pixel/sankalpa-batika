'use server';

import { adminDb } from '@/lib/firebase/server';
import { GalleryItem } from '@/types';
import cloudinary from '@/lib/cloudinary';
import { getSession } from './auth';
import { revalidatePath } from 'next/cache';

const GALLERY_PATH = 'gallery';

// PUBLIC: Fetch gallery items
export async function getGallery() {
    try {
        const ref = adminDb.ref(GALLERY_PATH);
        const snapshot = await ref.orderByChild('uploadedAt').once('value');
        const data = snapshot.val();

        // Convert to array and reverse (newest first)
        const items = Object.keys(data || {}).map((key) => ({
            id: key,
            ...data[key],
        })).sort((a: any, b: any) => b.uploadedAt - a.uploadedAt);

        return { success: true, data: items };
    } catch (error) {
        console.error('Error fetching gallery:', error);
        return { success: false, data: [] };
    }
}

// PUBLIC: Fetch Slides
export async function getSlides() {
    try {
        const ref = adminDb.ref(GALLERY_PATH);
        const snapshot = await ref.orderByChild('category').equalTo('slide').once('value');
        const data = snapshot.val();

        // Convert to array and reverse (newest first)
        const items = Object.keys(data || {}).map((key) => ({
            id: key,
            ...data[key],
        })).sort((a: any, b: any) => b.uploadedAt - a.uploadedAt);

        return { success: true, data: items };
    } catch (error) {
        console.error('Error fetching slides:', error);
        return { success: false, data: [] };
    }
}

// ADMIN: Upload File
export async function uploadGalleryItem(formData: FormData) {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized' };

    const files = formData.getAll('files') as File[];
    const category = formData.get('category') as string || 'photos'; // default to photos
    const caption = formData.get('caption') as string;

    if (!files || files.length === 0) return { success: false, error: 'No files provided' };

    // Validate Slide Limit
    if (category === 'slide') {
        const currentGallery = await getGallery();
        const slides = (currentGallery.data || []).filter((item: any) => item.category === 'slide');
        if (slides.length + files.length > 5) {
            return { success: false, error: 'Maximum 5 slides allowed. Please delete some first.' };
        }
    }

    try {
        const folderMap: Record<string, string> = {
            'slide': 'sankalpa-batika/slides',
            'staff': 'sankalpa-batika/staff',
            'photos': 'sankalpa-batika/gallery'
        };

        const folder = folderMap[category] || 'sankalpa-batika/gallery';

        const uploadPromises = files.map(async (file) => {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResult: any = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: folder,
                        resource_type: 'auto'
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                ).end(buffer);
            });

            const newItem: Omit<GalleryItem, 'id'> = {
                url: uploadResult.secure_url,
                type: uploadResult.resource_type === 'image' ? 'image' : 'pdf',
                publicId: uploadResult.public_id,
                caption: caption || '', // Shared caption for multi-upload, or empty
                category: category,
                uploadedAt: Date.now(),
            };

            await adminDb.ref(GALLERY_PATH).push(newItem);
        });

        await Promise.all(uploadPromises);

        revalidatePath('/gallery');
        revalidatePath('/admin/gallery');
        return { success: true };
    } catch (error) {
        console.error('Upload failed:', error);
        return { success: false, error: 'Upload failed' };
    }
}

// ADMIN: Delete Gallery Item
export async function deleteGalleryItem(id: string, publicId: string) {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized' };

    try {
        // 1. Remove from Cloudinary
        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }

        // 2. Remove from DB
        await adminDb.ref(`${GALLERY_PATH}/${id}`).remove();

        revalidatePath('/gallery');
        return { success: true };
    } catch (error) {
        console.error('Delete failed:', error);
        return { success: false, error: 'Delete failed' };
    }
}
