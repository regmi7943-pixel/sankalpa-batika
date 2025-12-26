'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Bell, Calendar, Search, X, Paperclip, Download } from 'lucide-react';
import { Notice } from '@/types';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import NoticeModal from '@/components/notice-modal';

interface NoticesListProps {
    notices: Notice[];
}

export default function NoticesList({ notices }: NoticesListProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredNotices, setFilteredNotices] = useState(notices);
    const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredNotices(notices);
            return;
        }
        const term = searchTerm.toLowerCase();
        const filtered = notices.filter(n =>
            n.title.toLowerCase().includes(term) ||
            n.content.toLowerCase().includes(term)
        );
        setFilteredNotices(filtered);
    }, [searchTerm, notices]);

    // Handle initial hash navigation if needed (optional enhancement)

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Search Bar */}
            <div className="mb-8 md:mb-10 relative">
                <Search className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                <Input
                    placeholder="Search notices..."
                    className="pl-10 md:pl-12 py-5 md:py-6 text-sm md:text-lg bg-background shadow-sm border-surface-dark/20 text-foreground"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="space-y-4 md:space-y-6">
                {filteredNotices && filteredNotices.length > 0 ? (
                    filteredNotices.map((notice, index) => (
                        <Card
                            key={notice.id}
                            className="card-hover overflow-hidden animate-fade-in cursor-pointer group"
                            style={{ animationDelay: `${index * 0.05}s` }}
                            onClick={() => setSelectedNotice(notice)}
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
                                        <h2 className="text-lg md:text-xl font-bold text-foreground mb-1 md:mb-2 group-hover:text-blue-600 transition-colors">
                                            {notice.title}
                                        </h2>
                                        <p className="text-muted line-clamp-2 text-xs md:text-sm">
                                            {notice.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                                        </p>
                                    </div>

                                    {/* Arrow */}
                                    <div
                                        className="hidden sm:flex items-center justify-center px-4 md:px-6 text-muted-light group-hover:text-blue-600 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors"
                                    >
                                        <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-16 md:py-20 bg-background rounded-xl md:rounded-2xl shadow-sm border border-surface-dark/10">
                        <Bell className="h-12 w-12 md:h-16 md:w-16 text-muted-light mx-auto mb-3 md:mb-4" />
                        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">No Notices Found</h3>
                        <p className="text-muted text-sm md:text-base">
                            {searchTerm ? 'Try adjusting your search terms.' : 'Check back later for announcements.'}
                        </p>
                    </div>
                )}
            </div>

            <NoticeModal
                isOpen={!!selectedNotice}
                onClose={() => setSelectedNotice(null)}
                notice={selectedNotice}
            />
        </div>
    );
}
