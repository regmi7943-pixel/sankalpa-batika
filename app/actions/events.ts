'use server';

import { adminDb } from '@/lib/firebase/server';
import { Event } from '@/types';
import { getSession } from './auth';
import { revalidatePath } from 'next/cache';

const EVENT_PATH = 'events';

// PUBLIC: Fetch all events
export async function getEvents() {
    try {
        const ref = adminDb.ref(EVENT_PATH);
        const snapshot = await ref.orderByChild('date').once('value');
        const data = snapshot.val();

        // Sort by date (nearest future first, then past)
        // Or just all events sorted by date
        const events = Object.keys(data || {}).map((key) => ({
            id: key,
            ...data[key],
        })).sort((a, b) => a.date - b.date);

        return { success: true, data: events };
    } catch (error) {
        console.error('Error fetching events:', error);
        return { success: false, data: [] };
    }
}

// ADMIN: Create Event
export async function createEvent(data: Omit<Event, 'id'>) {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized' };

    try {
        const ref = adminDb.ref(EVENT_PATH).push();
        await ref.set(data);
        revalidatePath('/events'); // Revalidate events page
        revalidatePath('/'); // Revalidate home
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to create event' };
    }
}

// ADMIN: Update Event
export async function updateEvent(id: string, data: Partial<Event>) {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized' };

    try {
        await adminDb.ref(`${EVENT_PATH}/${id}`).update(data);
        revalidatePath('/events');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to update event' };
    }
}

// ADMIN: Delete Event
export async function deleteEvent(id: string) {
    const session = await getSession();
    if (!session) return { success: false, error: 'Unauthorized' };

    try {
        await adminDb.ref(`${EVENT_PATH}/${id}`).remove();
        revalidatePath('/events');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to delete event' };
    }
}
