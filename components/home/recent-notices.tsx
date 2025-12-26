'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Bell } from 'lucide-react';
import { Notice } from '@/types';
import Link from 'next/link';
import NoticeModal from '@/components/notice-modal';

interface RecentNoticesProps {
    notices: Notice[];
}

export default function RecentNotices({ notices }: RecentNoticesProps) {
    const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

    return (
        <div className="space-y-3 md:space-y-4">
            {notices && notices.length > 0 ? notices.slice(0, 3).map((notice) => (
                <Card
                    key={notice.id}
                    className="card-hover border border-surface-dark/10 bg-background/50 backdrop-blur-sm shadow-sm cursor-pointer group"
                    onClick={() => setSelectedNotice(notice)}
                >
                    <CardContent className="p-4 md:p-5">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base line-clamp-1 group-hover:text-blue-600 transition-colors">
                                    {notice.title}
                                </h3>
                                <p className="text-muted text-xs md:text-sm">
                                    {new Date(notice.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="text-blue-600 hover:text-blue-700 flex-shrink-0">
                                <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )) : (
                <Card className="border-0 shadow-sm bg-surface">
                    <CardContent className="p-6 md:p-8 text-center text-muted text-sm">
                        No notices available
                    </CardContent>
                </Card>
            )}

            <NoticeModal
                isOpen={!!selectedNotice}
                onClose={() => setSelectedNotice(null)}
                notice={selectedNotice}
            />
        </div>
    );
}
