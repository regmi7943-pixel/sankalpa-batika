'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, X, ExternalLink } from 'lucide-react';
import { Event } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomeEvents({ events }: { events: Event[] }) {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    // Filter for upcoming or ongoing
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    const upcomingEvents = events.filter(e => {
        const end = e.endDate || e.date;
        return end >= todayStart;
    }).sort((a, b) => a.date - b.date).slice(0, 3);

    return (
        <div className="space-y-3 md:space-y-4">
            {upcomingEvents.length > 0 ? upcomingEvents.map((event) => {
                const startDate = new Date(event.date);
                return (
                    <motion.div
                        key={event.id}
                        layoutId={`event-home-${event.id}`}
                        onClick={() => setSelectedEvent(event)}
                    >
                        <Card className="card-hover border border-surface-dark/10 bg-background/50 backdrop-blur-sm shadow-sm overflow-hidden cursor-pointer group">
                            <CardContent className="p-0">
                                <div className="flex">
                                    <div className="bg-gradient-to-b from-blue-500 to-blue-600 text-white p-3 md:p-4 text-center min-w-[60px] md:min-w-[70px] group-hover:scale-105 transition-transform duration-500">
                                        <p className="text-[10px] md:text-xs font-bold uppercase opacity-80">
                                            {startDate.toLocaleString('default', { month: 'short' })}
                                        </p>
                                        <p className="text-xl md:text-2xl font-black">{startDate.getDate()}</p>
                                    </div>
                                    <div className="p-3 md:p-4 flex-grow">
                                        <h3 className="font-bold text-foreground text-sm md:text-base line-clamp-1 group-hover:text-blue-600 transition-colors">{event.name}</h3>
                                        <p className="text-muted text-xs md:text-sm line-clamp-1">{event.description}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                );
            }) : (
                <Card className="border-0 shadow-sm bg-slate-50 dark:bg-slate-900/30">
                    <CardContent className="p-6 md:p-8 text-center text-muted text-sm font-medium">
                        No upcoming events scheduled
                    </CardContent>
                </Card>
            )}

            {/* Event Details Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedEvent(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />

                        {/* Modal Content */}
                        <motion.div
                            layoutId={`event-home-${selectedEvent.id}`}
                            className="relative w-full max-w-2xl bg-surface dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10 flex flex-col max-h-[90vh]"
                        >
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors z-10"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="p-8 md:p-10 overflow-y-auto">
                                <div className="space-y-6">
                                    {/* Modal Header */}
                                    <div className="space-y-3 pt-4">
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-3 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                                                {new Date(selectedEvent.date).getFullYear()} EVENT
                                            </span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground leading-[1.2]">
                                            {selectedEvent.name}
                                        </h2>
                                    </div>

                                    {/* Info Bar */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-slate-50 dark:bg-slate-800/40 rounded-[1.5rem] border border-slate-100 dark:border-slate-800">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-muted/60 uppercase tracking-widest">When</p>
                                            <div className="flex items-center gap-2.5 text-foreground font-bold text-base">
                                                <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                                <span>
                                                    {new Date(selectedEvent.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long' })}
                                                    {selectedEvent.endDate && selectedEvent.endDate !== selectedEvent.date && ` - ${new Date(selectedEvent.endDate).toLocaleDateString(undefined, { day: 'numeric', month: 'long' })}`}
                                                </span>
                                            </div>
                                        </div>
                                        {selectedEvent.location && (
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-muted/60 uppercase tracking-widest">Where</p>
                                                <div className="flex items-center gap-2.5 text-foreground font-bold text-base">
                                                    <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                                    <span className="truncate">{selectedEvent.location}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-3">
                                        <p className="text-[10px] font-black text-muted/60 uppercase tracking-widest">About the Event</p>
                                        <div className="text-lg leading-relaxed text-muted font-medium whitespace-pre-wrap">
                                            {selectedEvent.description}
                                        </div>
                                    </div>

                                    {/* Attachment Button */}
                                    {selectedEvent.attachmentUrl && (
                                        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                            <a
                                                href={selectedEvent.attachmentUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-blue-600 text-white rounded-xl font-black text-base shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 transition-all"
                                            >
                                                <ExternalLink className="h-5 w-5" />
                                                View Attached Document
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
