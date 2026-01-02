'use client';

import { useState } from 'react';
import { Send, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { submitMessage } from '@/app/actions/contact';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);

        try {
            const result = await submitMessage(formData);
            if (result.success) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
                setErrorMessage(result.error || 'Something went wrong.');
            }
        } catch (err) {
            setStatus('error');
            setErrorMessage('An unexpected error occurred.');
        }
    }

    if (status === 'success') {
        return (
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-3xl p-8 md:p-12 text-center animate-fade-in">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/20">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Message Sent Successfully!</h3>
                <p className="text-muted mb-8 max-w-sm mx-auto">
                    Thank you for reaching out. Our team will review your inquiry and get back to you shortly.
                </p>
                <Button
                    onClick={() => setStatus('idle')}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Send Another Message
                </Button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Send a Message</h2>
            </div>

            {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm font-medium">{errorMessage}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-muted">First Name</label>
                        <Input name="firstName" placeholder="John" required className="bg-surface border-surface-dark/20 h-12 px-4 focus:ring-blue-500 text-foreground" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-muted">Last Name</label>
                        <Input name="lastName" placeholder="Doe" className="bg-surface border-surface-dark/20 h-12 px-4 focus:ring-blue-500 text-foreground" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted">Email Address</label>
                    <Input name="email" type="email" placeholder="john@example.com" required className="bg-surface border-surface-dark/20 h-12 px-4 focus:ring-blue-500 text-foreground" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted">Subject of Inquiry</label>
                    <select name="subject" className="w-full h-12 rounded-lg border border-surface-dark/20 bg-surface px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-foreground shadow-sm">
                        <option value="Admission Inquiry" className="bg-background">Admission Inquiry</option>
                        <option value="General Support" className="bg-background">General Support</option>
                        <option value="Alumni" className="bg-background">Alumni</option>
                        <option value="Careers" className="bg-background">Careers</option>
                        <option value="Others" className="bg-background">Others</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold text-muted">Message</label>
                    <textarea
                        name="message"
                        rows={5}
                        required
                        placeholder="How can we help you today?"
                        className="w-full rounded-lg border border-surface-dark/20 bg-surface px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-foreground"
                    ></textarea>
                </div>

                <Button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 h-14 text-base font-bold shadow-lg shadow-blue-500/30"
                >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                    <Send className="ml-2 h-5 w-5" />
                </Button>
            </form>
        </div>
    );
}
