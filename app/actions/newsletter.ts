'use server';

import { adminDb } from '@/lib/firebase/server';

// Subscribe to newsletter
export async function subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    if (!email || !email.includes('@')) {
        return { success: false, message: 'Please enter a valid email address.' };
    }

    try {
        const subscribersRef = adminDb.ref('newsletter/subscribers');

        // Check if already subscribed
        const snapshot = await subscribersRef.orderByChild('email').equalTo(email.toLowerCase()).once('value');

        if (snapshot.exists()) {
            return { success: false, message: 'This email is already subscribed.' };
        }

        // Add new subscriber
        const newSubscriberRef = subscribersRef.push();
        await newSubscriberRef.set({
            email: email.toLowerCase(),
            subscribedAt: new Date().toISOString(),
        });

        return { success: true, message: 'Thank you for subscribing!' };
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return { success: false, message: 'Something went wrong. Please try again.' };
    }
}

// Get all subscribers (for admin use)
export async function getNewsletterSubscribers(): Promise<{ success: boolean; data?: any[]; error?: string }> {
    try {
        const subscribersRef = adminDb.ref('newsletter/subscribers');
        const snapshot = await subscribersRef.once('value');

        if (!snapshot.exists()) {
            return { success: true, data: [] };
        }

        const subscribers: any[] = [];
        snapshot.forEach((child) => {
            subscribers.push({
                id: child.key,
                ...child.val()
            });
        });

        return { success: true, data: subscribers };
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        return { success: false, error: 'Failed to fetch subscribers' };
    }
}

// Delete subscriber (for admin use)
export async function deleteNewsletterSubscriber(id: string): Promise<{ success: boolean; error?: string }> {
    try {
        await adminDb.ref(`newsletter/subscribers/${id}`).remove();
        return { success: true };
    } catch (error) {
        console.error('Error deleting subscriber:', error);
        return { success: false, error: 'Failed to delete subscriber' };
    }
}
