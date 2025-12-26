'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { unsubscribeNewsletter } from '@/app/actions/newsletter';
import { toast } from 'sonner';

export default function UnsubscribePage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const handleUnsubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        try {
            const result = await unsubscribeNewsletter(email);
            if (result.success) {
                toast.success(result.message);
                setDone(true);
            } else {
                toast.error(result.message);
            }
        } catch (err) {
            toast.error('Could not complete unsubscription. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4 bg-muted/30">
            <div className="w-full max-w-md">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                <Card className="border-0 shadow-xl overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />
                    <CardHeader className="text-center pt-8">
                        <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                            <Mail className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Unsubscribe</CardTitle>
                        <CardDescription>
                            We're sorry to see you go. Enter your email to stop receiving updates.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-8 pt-2">
                        {!done ? (
                            <form onSubmit={handleUnsubscribe} className="space-y-4">
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email Address
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="h-12 border-slate-200 focus:border-blue-600 focus:ring-blue-600/10"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        'Unsubscribe Me'
                                    )}
                                </Button>
                                <p className="text-[10px] text-center text-muted-foreground pt-2">
                                    By clicking unsubscribe, you will be removed from our mailing list immediately.
                                </p>
                            </form>
                        ) : (
                            <div className="text-center py-4 animate-in fade-in zoom-in duration-300">
                                <div className="mx-auto w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6">
                                    <ShieldCheck className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Unsubscribed Successfully</h3>
                                <p className="text-muted-foreground mb-8">
                                    Your email <strong>{email}</strong> has been removed from our list.
                                </p>
                                <Button asChild variant="outline" className="w-full h-11 border-slate-200">
                                    <Link href="/">Return to Homepage</Link>
                                </Button>
                            </div>
                        )}

                        <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-100 flex gap-3">
                            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
                            <p className="text-xs text-amber-700 leading-relaxed">
                                <strong>Note:</strong> You can always re-subscribe at the bottom of our homepage if you change your mind later.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <p className="text-center text-xs text-muted-foreground mt-8">
                    © {new Date().getFullYear()} Sankalpa Vatika School. All rights reserved.
                </p>
            </div>
        </div>
    );
}
