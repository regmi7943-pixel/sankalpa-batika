'use server';

import { adminDb } from '@/lib/firebase/server';
import { revalidatePath } from 'next/cache';
import { sendEmail, replyEmailTemplate } from '@/lib/email';

export async function submitMessage(formData: FormData) {
    try {
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const email = formData.get('email') as string;
        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;

        if (!firstName || !email || !message) {
            return { success: false, error: 'Please fill in all required fields.' };
        }

        const messageData = {
            name: `${firstName} ${lastName}`.trim(),
            email,
            subject,
            message,
            timestamp: Date.now(),
            status: 'unread'
        };

        await adminDb.ref('messages').push(messageData);

        revalidatePath('/admin/messages');
        return { success: true };
    } catch (error) {
        console.error('Error submitting message:', error);
        return { success: false, error: 'Failed to send message. Please try again later.' };
    }
}

export async function getMessages() {
    try {
        const snapshot = await adminDb.ref('messages').orderByChild('timestamp').once('value');
        const data = snapshot.val();

        if (!data) return { success: true, data: [] };

        const messages = Object.entries(data).map(([id, value]: [string, any]) => ({
            id,
            ...value
        })).reverse(); // Newest first

        return { success: true, data: messages };
    } catch (error) {
        console.error('Error fetching messages:', error);
        return { success: false, error: 'Failed to fetch messages.' };
    }
}

export async function deleteMessage(id: string) {
    try {
        await adminDb.ref(`messages/${id}`).remove();
        revalidatePath('/admin/messages');
        return { success: true };
    } catch (error) {
        console.error('Error deleting message:', error);
        return { success: false, error: 'Failed to delete message.' };
    }
}

export async function markAsRead(id: string) {
    try {
        await adminDb.ref(`messages/${id}`).update({ status: 'read' });
        revalidatePath('/admin/messages');
        return { success: true };
    } catch (error) {
        console.error('Error marking message as read:', error);
        return { success: false, error: 'Failed to update message status.' };
    }
}

export async function sendReply({
    messageId,
    recipientEmail,
    recipientName,
    originalMessage,
    replyContent
}: {
    messageId: string;
    recipientEmail: string;
    recipientName: string;
    originalMessage: string;
    replyContent: string;
}) {
    try {
        // 1. Send Email via Resend
        const emailResult = await sendEmail({
            to: recipientEmail,
            subject: `Official Response - Sankalpa Vatika School`,
            html: replyEmailTemplate({
                name: recipientName,
                originalMessage,
                replyContent
            })
        });

        if (!emailResult.success) {
            throw new Error('Failed to dispatch email via Resend');
        }

        // 2. Update status in Database
        if (!adminDb) return { success: false, error: 'Database not configured' };
        await adminDb.ref(`messages/${messageId}`).update({
            status: 'replied',
            replyContent,
            repliedAt: Date.now()
        });

        revalidatePath('/admin/messages');
        return { success: true };
    } catch (error) {
        console.error('Error sending reply:', error);
        return { success: false, error: 'Failed to send reply. Please try again later.' };
    }
}
