'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Calendar, Plus, Loader2 } from 'lucide-react';
import AdminNoticesPage from '../notices/page'; // I'll move the content shortly
import AdminEventsPage from '../events/page';

export default function CombinedAdminPage() {
    const [activeTab, setActiveTab] = useState<'notices' | 'events'>('notices');

    return (
        <div className="p-4 md:p-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">Notices & Events Manager</h1>
                    <p className="text-muted text-sm mt-1">Unified management for all school announcements and campus activities.</p>
                </div>

                <div className="flex p-1 bg-surface border border-border rounded-xl">
                    <button
                        onClick={() => setActiveTab('notices')}
                        className={`flex items-center gap-2 py-2 px-6 rounded-lg font-bold text-sm transition-all duration-300 ${activeTab === 'notices'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                : 'text-muted hover:text-foreground'
                            }`}
                    >
                        <Bell className="h-4 w-4" />
                        Notices
                    </button>
                    <button
                        onClick={() => setActiveTab('events')}
                        className={`flex items-center gap-2 py-2 px-6 rounded-lg font-bold text-sm transition-all duration-300 ${activeTab === 'events'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                : 'text-muted hover:text-foreground'
                            }`}
                    >
                        <Calendar className="h-4 w-4" />
                        Events
                    </button>
                </div>
            </div>

            <div className="bg-surface rounded-2xl border border-border min-h-[60vh] overflow-hidden">
                <AnimatePresence mode="wait">
                    {activeTab === 'notices' ? (
                        <motion.div
                            key="admin-notices"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-1"
                        >
                            <AdminNoticesPage />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="admin-events"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-1"
                        >
                            <AdminEventsPage />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
