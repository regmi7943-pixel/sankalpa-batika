'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Calendar, ChevronRight, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import NoticeModal from '@/components/notice-modal';
import { Badge } from '@/components/ui/badge';

interface Notice {
    id: string;
    title: string;
    content: string;
    date: any;
    priority?: string;
    category?: string;
    pdfUrl?: string;
}

interface Event {
    id: string;
    title: string;
    description: string;
    date: { seconds: number; nanoseconds: number } | any;
    startTime: string;
    endTime: string;
    location: string;
    category: string;
    status: string;
}

interface NoticesEventsClientProps {
    notices: Notice[];
    events: Event[];
}

export default function NoticesEventsClient({ notices, events }: NoticesEventsClientProps) {
    const [activeTab, setActiveTab] = useState<'notices' | 'events'>('notices');
    const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-48 md:w-72 h-48 md:h-72 bg-amber-400 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-blue-400 rounded-full blur-3xl translate-x-1/2"></div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
                    >
                        School Highlights
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-blue-100/80 max-w-2xl mx-auto"
                    >
                        Stay informed about our latest announcements and upcoming campus activities.
                    </motion.p>
                </div>
            </section>

            {/* Tab Switcher */}
            <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
                <div className="flex p-1.5 bg-background shadow-2xl rounded-2xl border border-surface-dark/5 max-w-md mx-auto">
                    <button
                        onClick={() => setActiveTab('notices')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${activeTab === 'notices'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                : 'text-muted hover:text-foreground'
                            }`}
                    >
                        <Bell className="h-4 w-4" />
                        Notices
                    </button>
                    <button
                        onClick={() => setActiveTab('events')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all duration-300 ${activeTab === 'events'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                : 'text-muted hover:text-foreground'
                            }`}
                    >
                        <Calendar className="h-4 w-4" />
                        Events
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-5xl mx-auto px-4 mt-16">
                <AnimatePresence mode="wait">
                    {activeTab === 'notices' ? (
                        <motion.div
                            key="notices-tab"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl md:text-3xl font-black text-foreground italic">Latest Notices</h2>
                                <Badge variant="outline" className="text-blue-600 border-blue-600/20">{notices.length} Items</Badge>
                            </div>

                            {notices.length > 0 ? (
                                notices.map((notice, idx) => (
                                    <motion.div
                                        key={notice.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        onClick={() => setSelectedNotice(notice)}
                                        className="group p-6 md:p-8 bg-surface rounded-[2rem] border border-surface-dark/5 hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
                                    >
                                        <div className="space-y-3 flex-1">
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                                                    {notice.category || 'General'}
                                                </span>
                                                <span className="text-xs text-muted font-medium flex items-center gap-1.5">
                                                    <Clock className="h-3 w-3" />
                                                    {notice.date?.seconds ? format(new Date(notice.date.seconds * 1000), 'MMM dd, yyyy') : 'Recently'}
                                                </span>
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-blue-600 transition-colors">
                                                {notice.title}
                                            </h3>
                                            <p className="text-muted line-clamp-2 text-sm leading-relaxed max-w-2xl">
                                                {notice.content}
                                            </p>
                                        </div>
                                        <div className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shrink-0">
                                            <ArrowRight className="h-6 w-6" />
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-surface rounded-[2rem] border border-dashed border-surface-dark/10">
                                    <Bell className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                                    <p className="text-muted font-medium">No notices published at the moment.</p>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="events-tab"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-black text-foreground italic">Upcoming Events</h2>
                                <Badge variant="outline" className="text-amber-600 border-amber-600/20">{events.length} Upcoming</Badge>
                            </div>

                            {events.length > 0 ? (
                                events.map((event, idx) => (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="group relative flex flex-col md:flex-row gap-8 p-1 bg-surface rounded-[2.5rem] border border-surface-dark/5 hover:border-amber-500/30 transition-all duration-500"
                                    >
                                        <div className="w-full md:w-64 h-48 md:h-auto rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 flex flex-col items-center justify-center text-white p-6 shrink-0 shadow-xl overflow-hidden relative">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl" />
                                            <div className="text-sm uppercase tracking-[0.3em] font-black opacity-80 mb-2">
                                                {event.date?.seconds ? format(new Date(event.date.seconds * 1000), 'MMMM') : 'Upcoming'}
                                            </div>
                                            <div className="text-7xl font-black tracking-tighter">
                                                {event.date?.seconds ? format(new Date(event.date.seconds * 1000), 'dd') : '??'}
                                            </div>
                                        </div>

                                        <div className="flex-1 p-4 md:p-8 flex flex-col justify-center gap-6">
                                            <div className="space-y-4">
                                                <h3 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
                                                    {event.title}
                                                </h3>
                                                <p className="text-muted leading-relaxed font-medium">
                                                    {event.description}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-6 items-center pt-4 border-t border-surface-dark/5">
                                                <div className="flex items-center gap-2.5 text-slate-500 font-bold text-xs uppercase tracking-wider">
                                                    <Clock className="h-4 w-4 text-amber-500" />
                                                    {event.startTime} - {event.endTime}
                                                </div>
                                                <div className="flex items-center gap-2.5 text-slate-500 font-bold text-xs uppercase tracking-wider">
                                                    <MapPin className="h-4 w-4 text-blue-500" />
                                                    {event.location}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-surface rounded-[2rem] border border-dashed border-surface-dark/10">
                                    <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                                    <p className="text-muted font-medium">No upcoming events scheduled.</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <NoticeModal
                notice={selectedNotice}
                isOpen={!!selectedNotice}
                onClose={() => setSelectedNotice(null)}
            />
        </div>
    );
}
