'use client';

import { useState } from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { subscribeNewsletter } from '@/app/actions/newsletter';

export function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        const result = await subscribeNewsletter(email);

        if (result.success) {
            setStatus('success');
            setMessage(result.message);
            setEmail('');
            // Reset after 3 seconds
            setTimeout(() => {
                setStatus('idle');
                setMessage('');
            }, 3000);
        } else {
            setStatus('error');
            setMessage(result.message);
            setTimeout(() => {
                setStatus('idle');
                setMessage('');
            }, 3000);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2 md:space-y-3">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={status === 'loading'}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-surface border border-surface-dark/20 text-foreground placeholder:text-muted focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-sm disabled:opacity-50"
            />
            <button
                type="submit"
                disabled={status === 'loading' || !email}
                className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-sm disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
                {status === 'success' && <CheckCircle className="h-4 w-4" />}
                {status === 'error' && <AlertCircle className="h-4 w-4" />}
                {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
            </button>
            {message && (
                <p className={`text-xs ${status === 'success' ? 'text-green-500' : 'text-red-400'}`}>
                    {message}
                </p>
            )}
        </form>
    );
}
