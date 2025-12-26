'use client';

import { useState, useEffect } from 'react';
import { Loader2, Plus, Calendar, MapPin, Trash2, X, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { getEvents, createEvent, updateEvent, deleteEvent } from '@/app/actions/events';
import { Event } from '@/types';
import { toast } from 'sonner';

export default function AdminEventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

    // Load events
    useEffect(() => {
        async function load() {
            const result = await getEvents();
            if (result.success && result.data) {
                setEvents(result.data);
            }
            setLoading(false);
        }
        load();
    }, []);

    // Open Modal for Create
    const openCreateModal = () => {
        setEditingEvent(null);
        setName('');
        setDescription('');
        setDate('');
        setLocation('');
        setIsModalOpen(true);
    };

    // Open Modal for Edit
    const openEditModal = (event: Event) => {
        setEditingEvent(event);
        setName(event.name);
        setDescription(event.description);
        // Format date efficiently for input type="date"
        const eventDate = new Date(event.date);
        const yyyy = eventDate.getFullYear();
        const mm = String(eventDate.getMonth() + 1).padStart(2, '0');
        const dd = String(eventDate.getDate()).padStart(2, '0');
        setDate(`${yyyy}-${mm}-${dd}`);
        setLocation(event.location || '');
        setIsModalOpen(true);
    };

    // Handle Create or Update
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const dateObj = date ? new Date(date) : new Date(Date.now() + 86400000); // Default to tomorrow if empty

        if (editingEvent) {
            // Update
            const updatedData = {
                name,
                description,
                date: dateObj.getTime(),
                location
            };

            // Optimistic update
            const oldEvents = [...events];
            setEvents(events.map(e => e.id === editingEvent.id ? { ...e, ...updatedData } : e));

            const result = await updateEvent(editingEvent.id, updatedData);
            if (result.success) {
                toast.success('Event updated successfully');
            } else {
                toast.error('Failed to update event');
                // Revert optimistic update if failed
                setEvents(oldEvents);
            }
        } else {
            // Create
            const newEvent = {
                name: name || 'New Event',
                description: description || 'Event details...',
                date: dateObj.getTime(),
                location: location || 'School Hall',
            };

            const result = await createEvent(newEvent);
            if (result.success) {
                const refresh = await getEvents();
                if (refresh.success && refresh.data) {
                    setEvents(refresh.data);
                }
                toast.success('Event created successfully');
            } else {
                toast.error('Failed to create event');
            }
        }
        setSaving(false);
        setIsModalOpen(false);
    };

    // Delete event
    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return;
        setEvents(events.filter(e => e.id !== id));
        const result = await deleteEvent(id);
        if (result.success) {
            toast.success('Event deleted');
        } else {
            toast.error('Failed to delete event');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-full bg-surface/50 dark:bg-background/50 backdrop-blur-sm p-4 md:p-8 relative">
            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-surface dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                            <h3 className="font-semibold text-lg text-foreground">
                                {editingEvent ? 'Edit Event' : 'Create New Event'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Event Name</label>
                                <Input
                                    placeholder="e.g. Annual Sports Day"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Date</label>
                                    <Input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground">Location</label>
                                    <Input
                                        placeholder="e.g. School Playground"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Description</label>
                                <textarea
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                                    placeholder="Enter event details..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="pt-4 flex gap-3">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" disabled={saving}>
                                    {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : (editingEvent ? 'Save Changes' : 'Create Event')}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-3">
                            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
                                <Calendar className="h-6 w-6 text-white" />
                            </div>
                            Events
                        </h1>
                        <p className="text-muted text-lg mt-2">Manage upcoming school events and activities.</p>
                    </div>
                    <Button
                        onClick={openCreateModal}
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        New Event
                    </Button>
                </div>

                {/* Events List */}
                <div className="space-y-4">
                    {events.length === 0 ? (
                        <div className="text-center py-20 bg-surface rounded-3xl border border-surface-dark/10">
                            <p className="text-muted">No upcoming events. Add one to keep everyone informed!</p>
                        </div>
                    ) : (
                        events.map((event) => (
                            <Card key={event.id} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-surface group">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row gap-6 items-start">
                                        {/* Date Box */}
                                        <div className="flex-shrink-0 w-full md:w-auto flex md:flex-col items-center justify-center bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 md:min-w-[100px] border border-blue-100 dark:border-blue-800">
                                            <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                                {new Date(event.date).getDate()}
                                            </span>
                                            <span className="text-sm font-bold uppercase text-blue-400 dark:text-blue-300 ml-2 md:ml-0">
                                                {new Date(event.date).toLocaleString('default', { month: 'short' })}
                                            </span>
                                        </div>

                                        {/* Event Details */}
                                        <div className="flex-1 space-y-2 w-full">
                                            <div className="flex items-start justify-between">
                                                <h3 className="text-xl font-bold text-foreground">
                                                    {event.name}
                                                </h3>

                                                {/* Action Buttons */}
                                                <div className="flex items-center gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => openEditModal(event)}
                                                        className="h-8 w-8 p-0 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                                        title="Edit"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(event.id)}
                                                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-muted">
                                                <MapPin className="h-4 w-4 text-blue-500" />
                                                <span>{event.location}</span>
                                            </div>

                                            <div className="text-muted pt-2 leading-relaxed">
                                                {event.description}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
