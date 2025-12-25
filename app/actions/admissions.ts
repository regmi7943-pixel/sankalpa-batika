'use server';

import { adminDb } from '@/lib/firebase/server';
import { revalidatePath } from 'next/cache';

export async function submitApplication(formData: FormData) {
    try {
        const studentName = formData.get('studentName') as string;
        const dob = formData.get('dob') as string;
        const gender = formData.get('gender') as string;
        const grade = formData.get('grade') as string;

        const parentName = formData.get('parentName') as string;
        const phone = formData.get('phone') as string;
        const email = formData.get('email') as string;
        const address = formData.get('address') as string;

        const previousSchool = formData.get('previousSchool') as string;

        if (!studentName || !parentName || !phone || !grade) {
            return { success: false, error: 'Please fill in all required fields.' };
        }

        const applicationData = {
            studentName,
            dob,
            gender,
            grade,
            parentName,
            phone,
            email,
            address,
            previousSchool,
            timestamp: Date.now(),
            status: 'pending', // pending, approved, rejected
            notes: ''
        };

        if (adminDb) {
            await adminDb.ref('applications').push(applicationData);
        } else {
            console.error('Firebase Admin DB not initialized');
            return { success: false, error: 'System configuration error.' };
        }

        revalidatePath('/admin/applications');
        return { success: true };
    } catch (error) {
        console.error('Error submitting application:', error);
        return { success: false, error: 'Failed to submit application. Please try again later.' };
    }
}

export async function getApplications() {
    try {
        const snapshot = await adminDb.ref('applications').orderByChild('timestamp').once('value');
        const data = snapshot.val();

        if (!data) return { success: true, data: [] };

        const applications = Object.entries(data).map(([id, value]: [string, any]) => ({
            id,
            ...value
        })).reverse(); // Newest first

        return { success: true, data: applications };
    } catch (error) {
        console.error('Error fetching applications:', error);
        return { success: false, error: 'Failed to fetch applications.' };
    }
}

export async function updateApplicationStatus(id: string, status: string, notes?: string) {
    try {
        const updateData: any = { status };
        if (notes !== undefined) updateData.notes = notes;

        await adminDb.ref(`applications/${id}`).update(updateData);
        revalidatePath('/admin/applications');
        return { success: true };
    } catch (error) {
        console.error('Error updating application:', error);
        return { success: false, error: 'Failed to update application.' };
    }
}
