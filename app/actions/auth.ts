'use server';

import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase/server';
import { redirect } from 'next/navigation';

export async function loginAction(idToken: string) {
    try {
        // 1. Verify the ID token
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const email = decodedToken.email;

        // 2. Check if the user is the super admin
        if (email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
            return { success: false, error: 'Unauthorized access.' };
        }

        // 3. Create a session cookie
        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
        const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

        // 4. Set the cookie
        (await cookies()).set('session', sessionCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            sameSite: 'lax',
        });

        return { success: true };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Internal server error.' };
    }
}

export async function logoutAction() {
    (await cookies()).delete('session');
    redirect('/khul-ja-sim-sim');
}

export async function getSession() {
    const session = (await cookies()).get('session')?.value;
    if (!session) return null;

    try {
        const verifiedSession = await adminAuth.verifySessionCookie(session, true);
        return verifiedSession;
    } catch (error) {
        return null;
    }
}
