// Force dynamic rendering to ensure fresh data on Vercel
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { getNotices } from '@/app/actions/notices';
import { ArrowRight, Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const metadata = {
    title: 'Notices - Sankalpa Vatika',
    description: 'Latest news, announcements, and circulars from Sankalpa Vatika School.',
};

export default async function NoticesPage() {
    const { data: notices } = await getNotices();

    return (
        <div className="pt-16 md:pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-48 md:w-72 h-48 md:h-72 bg-amber-400 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6">Notice Board</h1>
                    <p className="text-base md:text-xl text-blue-100 max-w-2xl mx-auto">
                        Stay updated with the latest announcements and important information.
                    </p>
                </div>
            </section>

            {/* Notices List */}
            <section className="py-12 md:py-20 bg-surface">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Search Bar */}
                    <div className="mb-8 md:mb-10 relative">
                        <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                        <Input
                            placeholder="Search notices..."
                            className="pl-10 md:pl-12 py-5 md:py-6 text-sm md:text-lg bg-background shadow-sm border-surface-dark/20 text-foreground"
                        />
                    </div>

                    <div className="space-y-4 md:space-y-6">
                        {notices && notices.length > 0 ? (
                            notices.map((notice, index) => (
                                <Card
                                    key={notice.id}
                                    className="card-hover overflow-hidden animate-fade-in"
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    <CardContent className="p-0">
                                        <div className="flex flex-col sm:flex-row">
                                            {/* Date Badge */}
                                            <div className="bg-gradient-to-b from-amber-500 to-orange-500 text-white p-4 md:p-6 flex sm:flex-col items-center justify-center gap-2 sm:gap-0 sm:min-w-[100px] md:min-w-[120px]">
                                                <span className="text-xs md:text-sm font-bold uppercase">
                                                    {new Date(notice.createdAt).toLocaleString('default', { month: 'short' })}
                                                </span>
                                                <span className="text-2xl md:text-3xl font-bold">{new Date(notice.createdAt).getDate()}</span>
                                                <span className="text-xs md:text-sm opacity-80">{new Date(notice.createdAt).getFullYear()}</span>
                                            </div>

                                            {/* Content */}
                                            <div className="p-4 md:p-6 flex-grow flex flex-col justify-center">
                                                <h2 className="text-lg md:text-xl font-bold text-foreground mb-1 md:mb-2 hover:text-blue-600 transition-colors">
                                                    <Link href={`/notices/${notice.id}`}>{notice.title}</Link>
                                                </h2>
                                                <p className="text-muted line-clamp-2 text-xs md:text-sm">
                                                    {notice.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                                                </p>
                                            </div>

                                            {/* Arrow */}
                                            <Link
                                                href={`/notices/${notice.id}`}
                                                className="hidden sm:flex items-center justify-center px-4 md:px-6 text-muted-light hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                                            >
                                                <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="text-center py-16 md:py-20 bg-background rounded-xl md:rounded-2xl shadow-sm border border-surface-dark/10">
                                <Bell className="h-12 w-12 md:h-16 md:w-16 text-muted-light mx-auto mb-3 md:mb-4" />
                                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">No Notices Yet</h3>
                                <p className="text-muted text-sm md:text-base">Check back later for announcements.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
