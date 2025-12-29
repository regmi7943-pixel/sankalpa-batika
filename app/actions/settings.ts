'use server';

import { adminDb } from '@/lib/firebase/server';

// Get site settings
export async function getSiteSettings() {
    try {
        if (!adminDb) {
            return { success: false, error: 'Database not configured' };
        }

        const snapshot = await adminDb.ref('siteSettings').once('value');
        const data = snapshot.val();

        return { success: true, data: data || {} };
    } catch (error) {
        console.error('Error fetching site settings:', error);
        return { success: false, error: 'Failed to fetch site settings' };
    }
}

// Save site settings
export async function saveSiteSettings(settings: Record<string, any>) {
    try {
        if (!adminDb) {
            return { success: false, error: 'Database not configured' };
        }

        await adminDb.ref('siteSettings').update(settings);

        return { success: true };
    } catch (error) {
        console.error('Error saving site settings:', error);
        return { success: false, error: 'Failed to save site settings' };
    }
}

// Get page content
export async function getPageContent(pageName: string) {
    try {
        if (!adminDb) {
            return { success: false, error: 'Database not configured' };
        }

        const snapshot = await adminDb.ref(`pages/${pageName}`).once('value');
        const data = snapshot.val();

        return { success: true, data: data || null };
    } catch (error) {
        console.error(`Error fetching ${pageName} content:`, error);
        return { success: false, error: `Failed to fetch ${pageName} content` };
    }
}

// Save page content
export async function savePageContent(pageName: string, content: Record<string, any>) {
    try {
        if (!adminDb) {
            return { success: false, error: 'Database not configured' };
        }

        await adminDb.ref(`pages/${pageName}`).set(content);

        return { success: true };
    } catch (error) {
        console.error(`Error saving ${pageName} content:`, error);
        return { success: false, error: `Failed to save ${pageName} content` };
    }
}

// Upload logo to Cloudinary and save URL
export async function uploadLogo(formData: FormData) {
    const { getSession } = await import('./auth');
    const cloudinary = (await import('@/lib/cloudinary')).default;
    const { revalidatePath } = await import('next/cache');

    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized' };

    try {
        const file = formData.get('file') as File;
        if (!file) return { success: false, error: 'No file provided' };

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const result = await new Promise<any>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: 'sankalpa-vatika/logo',
                    public_id: 'school-logo',
                    overwrite: true,
                    resource_type: 'image'
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        // Save URL to Firebase
        await adminDb.ref('siteSettings').update({ logoUrl: result.secure_url });

        revalidatePath('/');
        revalidatePath('/admin/settings');

        return { success: true, url: result.secure_url };
    } catch (error) {
        console.error('Logo upload failed:', error);
        return { success: false, error: 'Failed to upload logo' };
    }
}
// Generic image upload to Cloudinary
export async function uploadImage(formData: FormData) {
    const { getSession } = await import('./auth');
    const cloudinary = (await import('@/lib/cloudinary')).default;

    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized' };

    try {
        const file = formData.get('file') as File;
        const folder = formData.get('folder') as string || 'sankalpa-vatika/general';

        if (!file) return { success: false, error: 'No file provided' };

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const result = await new Promise<any>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: folder,
                    resource_type: 'image'
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        });

        return { success: true, url: result.secure_url };
    } catch (error) {
        console.error('Image upload failed:', error);
        return { success: false, error: 'Failed to upload image' };
    }
}
