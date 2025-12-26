'use client';

import { useState } from 'react';
import { Calendar, MapPin, Clock, Paperclip, X, ExternalLink, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Event } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function EventsClient({ events }: { events: Event[] }) {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    // Get current date at start of day for comparison
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const todayEnd = todayStart + 24 * 60 * 60 * 1000 - 1;

    // Categorize events
    const ongoingEvents = events.filter(e => {
        const start = e.date;
        const end = e.endDate || e.date;
        return (start <= todayEnd && end >= todayStart);
    });

    const upcomingEvents = events.filter(e => {
        const start = e.date;
        return (start > todayEnd);
    }).sort((a, b) => a.date - b.date);

    const pastEvents = events.filter(e => {
        const end = e.endDate || e.date;
        return (end < todayStart);
    }).sort((a, b) => b.date - a.date);

    const EventCard = ({ event, isPast = false, isOngoing = false }: { event: Event, isPast?: boolean, isOngoing?: boolean }) => {
        const startDate = new Date(event.date);
        const endDate = event.endDate ? new Date(event.endDate) : null;
        const hasRange = endDate && endDate.getTime() !== startDate.getTime();

        return (
            <motion.div
                layoutId={`event-${event.id}`}
                onClick={() => setSelectedEvent(event)}
                className={`group cursor-pointer relative bg-surface dark:bg-slate-900/50 rounded-3xl overflow-hidden border border-slate-200/60 dark:border-slate-800/50 shadow-sm hover:shadow-2xl transition-all duration-500 ${isPast ? 'opacity-70 grayscale-[0.5]' : ''}`}
            >
                {/* Visual Accent */}
                <div className={`absolute top-0 left-0 w-1.5 h-full transition-all duration-300 ${isOngoing ? 'bg-blue-600' : isPast ? 'bg-slate-400' : 'bg-blue-400 opacity-50 group-hover:opacity-100'}`}></div>

                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                    {/* Date Sidebar */}
                    <div className="flex-shrink-0 flex md:flex-col items-center justify-center gap-1 min-w-[100px]">
                        <div className={`p-4 rounded-2xl flex flex-col items-center justify-center min-w-[90px] ${isOngoing ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-foreground'}`}>
                            <span className="text-sm font-bold uppercase tracking-wider opacity-80">
                                {startDate.toLocaleString('default', { month: 'short' })}
                            </span>
                            <span className="text-3xl font-black">
                                {startDate.getDate()}
                            </span>
                        </div>

                        {hasRange && (
                            <>
                                <div className="w-1 h-3 md:h-1 md:w-3 bg-slate-200 dark:bg-slate-700 rounded-full my-0.5 opacity-50"></div>
                                <div className={`p-4 rounded-2xl flex flex-col items-center justify-center min-w-[90px] ${isOngoing ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'bg-slate-50 dark:bg-slate-800/50 text-foreground/70'}`}>
                                    <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                                        {endDate.toLocaleString('default', { month: 'short' })}
                                    </span>
                                    <span className="text-2xl font-black">
                                        {endDate.getDate()}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                            {isOngoing && (
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex h-2.5 w-2.5 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
                                    </div>
                                    <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Happening Now</span>
                                </div>
                            )}
                            <h3 className="text-2xl font-black text-foreground group-hover:text-blue-600 transition-colors leading-tight">
                                {event.name}
                            </h3>
                        </div>

                        <div className="flex flex-wrap gap-6 text-sm font-semibold text-muted/80">
                            {event.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-blue-500" />
                                    <span>{event.location}</span>
                                </div>
                            )}
                            {event.attachmentUrl && (
                                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                                    <Paperclip className="h-4 w-4" />
                                    <span>Document Attached</span>
                                </div>
                            )}
                        </div>

                        <p className="text-muted leading-relaxed text-base line-clamp-2">
                            {event.description}
                        </p>

                        <div className="pt-2">
                            <span className="text-sm font-bold text-blue-600 underline underline-offset-4 group-hover:translate-x-1 inline-block transition-transform">
                                View Details →
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    const SectionHeader = ({ title, icon: Icon, badge }: { title: string, icon: any, badge?: string }) => (
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600 rounded-2xl shadow-xl shadow-blue-600/20 text-white">
                    <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-black text-foreground tracking-tight">{title}</h2>
            </div>
            {badge && (
                <span className="px-5 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg shadow-blue-600/25">
                    {badge}
                </span>
            )}
        </div>
    );

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4">
                {/* Hero Section */}
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black mb-8 tracking-tighter"
                    >
                        School <span className="text-blue-600">Events</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl text-muted leading-relaxed max-w-2xl mx-auto font-medium"
                    >
                        Stay connected with our vibrant community. Discover workshops, festivals, and activities.
                    </motion.p>
                </div>

                <div className="max-w-5xl mx-auto space-y-32">
                    {/* Ongoing Events */}
                    {ongoingEvents.length > 0 && (
                        <section>
                            <SectionHeader title="Events Happening Now" icon={Clock} badge="Live" />
                            <div className="grid gap-10">
                                {ongoingEvents.map(event => (
                                    <EventCard key={event.id} event={event} isOngoing={true} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Upcoming Events */}
                    <section>
                        <SectionHeader title="Upcoming Activities" icon={Calendar} />
                        {upcomingEvents.length === 0 ? (
                            <div className="p-20 text-center bg-slate-50 dark:bg-slate-900/30 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                                <p className="text-muted text-xl font-semibold">No upcoming events scheduled yet. Stay tuned!</p>
                            </div>
                        ) : (
                            <div className="grid gap-10">
                                {upcomingEvents.map(event => (
                                    <EventCard key={event.id} event={event} />
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Past Events */}
                    {pastEvents.length > 0 && (
                        <section>
                            <SectionHeader title="Previous Events" icon={CalendarDays} />
                            <div className="grid gap-8">
                                {pastEvents.map(event => (
                                    <EventCard key={event.id} event={event} isPast={true} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

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
                            layoutId={`event-${selectedEvent.id}`}
                            className="relative w-full max-w-3xl bg-surface dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10 flex flex-col max-h-[90vh]"
                        >
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors z-10"
                            >
                                <X className="h-6 w-6" />
                            </button>

                            <div className="p-8 md:p-12 overflow-y-auto">
                                <div className="space-y-8">
                                    {/* Modal Header */}
                                    <div className="space-y-4 pt-4">
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                                                {new Date(selectedEvent.date).getFullYear()} EVENT
                                            </span>
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground leading-[1.1]">
                                            {selectedEvent.name}
                                        </h2>
                                    </div>

                                    {/* Info Bar */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                                        <div className="space-y-1">
                                            <p className="text-xs font-black text-muted/60 uppercase tracking-widest">When</p>
                                            <div className="flex items-center gap-3 text-foreground font-bold text-lg">
                                                <Calendar className="h-6 w-6 text-blue-600" />
                                                <span>
                                                    {new Date(selectedEvent.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long' })}
                                                    {selectedEvent.endDate && selectedEvent.endDate !== selectedEvent.date && ` - ${new Date(selectedEvent.endDate).toLocaleDateString(undefined, { day: 'numeric', month: 'long' })}`}
                                                </span>
                                            </div>
                                        </div>
                                        {selectedEvent.location && (
                                            <div className="space-y-1">
                                                <p className="text-xs font-black text-muted/60 uppercase tracking-widest">Where</p>
                                                <div className="flex items-center gap-3 text-foreground font-bold text-lg">
                                                    <MapPin className="h-6 w-6 text-blue-600" />
                                                    <span className="truncate">{selectedEvent.location}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-4">
                                        <p className="text-xs font-black text-muted/60 uppercase tracking-widest">About the Event</p>
                                        <div className="text-xl leading-relaxed text-muted font-medium whitespace-pre-wrap">
                                            {selectedEvent.description}
                                        </div>
                                    </div>

                                    {/* Attachment Button */}
                                    {selectedEvent.attachmentUrl && (
                                        <div className="pt-8 pt-4 border-t border-slate-100 dark:border-slate-800">
                                            <a
                                                href={selectedEvent.attachmentUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-600/25 hover:bg-blue-700 hover:-translate-y-1 transition-all"
                                            >
                                                <ExternalLink className="h-6 w-6" />
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
