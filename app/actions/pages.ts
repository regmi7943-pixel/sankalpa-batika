'use server';

import { adminDb } from '@/lib/firebase/server';
import { PageContent } from '@/types';
import { getSession } from './auth';
import { revalidatePath } from 'next/cache';

const PAGES_PATH = 'pages';

// PUBLIC: Get Page Content
export async function getPage(slug: string) {
    try {
        const ref = adminDb.ref(`${PAGES_PATH}/${slug}`);
        const snapshot = await ref.once('value');
        return { success: true, data: snapshot.val() };
    } catch (error) {
        return { success: false, data: null };
    }
}

// ADMIN: Update Page Content
export async function updatePage(slug: string, data: Partial<PageContent>) {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized' };

    try {
        await adminDb.ref(`${PAGES_PATH}/${slug}`).update({
            ...data,
            lastUpdated: Date.now(),
        });
        revalidatePath(`/${slug}`); // Revalidate specific page
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to update page' };
    }
}
