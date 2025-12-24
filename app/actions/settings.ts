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
