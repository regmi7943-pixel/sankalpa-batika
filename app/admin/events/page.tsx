'use client';

import { useState, useEffect } from 'react';
import { Loader2, Plus, Calendar, MapPin, Trash2, X, Edit, Upload, FileText, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { getEvents, createEvent, updateEvent, deleteEvent, uploadEventAttachment } from '@/app/actions/events';
import { Event } from '@/types';
import { toast } from 'sonner';
import { formatToNepaliDate } from '@/lib/nepali-date';

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
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [attachmentUrl, setAttachmentUrl] = useState('');
    const [attachmentFile, setAttachmentFile] = useState<File | null>(null);

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
        setEndDate('');
        setLocation('');
        setAttachmentUrl('');
        setAttachmentFile(null);
        setIsModalOpen(true);
    };

    // Open Modal for Edit
    const openEditModal = (event: Event) => {
        setEditingEvent(event);
        setName(event.name);
        setDescription(event.description);

        // Format dates for input type="date"
        const formatDate = (ts: number) => {
            const d = new Date(ts);
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        };

        setDate(formatDate(event.date));
        setEndDate(event.endDate ? formatDate(event.endDate) : '');
        setLocation(event.location || '');
        setAttachmentUrl(event.attachmentUrl || '');
        setAttachmentFile(null);
        setIsModalOpen(true);
    };

    // Handle Create or Update
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            let currentAttachmentUrl = attachmentUrl;

            // Handle File Upload
            if (attachmentFile) {
                const formData = new FormData();
                formData.append('file', attachmentFile);
                const uploadRes = await uploadEventAttachment(formData);
                if (uploadRes.success && uploadRes.url) {
                    currentAttachmentUrl = uploadRes.url;
                } else {
                    toast.error('Failed to upload file');
                    setSaving(false);
                    return;
                }
            }

            const dateObj = date ? new Date(date) : new Date();
            const endDateObj = endDate ? new Date(endDate) : null;

            const baseData = {
                name,
                description,
                date: dateObj.getTime(),
                endDate: endDateObj ? endDateObj.getTime() : undefined,
                location,
                attachmentUrl: currentAttachmentUrl
            };

            if (editingEvent) {
                // Update
                // Optimistic update
                const oldEvents = [...events];
                setEvents(events.map(e => e.id === editingEvent.id ? { ...e, ...baseData } : e));

                const result = await updateEvent(editingEvent.id, baseData);
                if (result.success) {
                    toast.success('Event updated successfully');
                } else {
                    toast.error('Failed to update event');
                    setEvents(oldEvents); // Revert
                }
            } else {
                // Create
                const result = await createEvent(baseData);
                if (result.success) {
                    toast.success('Event created successfully');
                    const refresh = await getEvents();
                    if (refresh.success && refresh.data) {
                        setEvents(refresh.data);
                    }
                } else {
                    toast.error('Failed to create event');
                }
            }

            setSaving(false);
            setIsModalOpen(false);
        } catch (error) {
            console.error(error);
            toast.error('An error occurred');
            setSaving(false);
        }
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
                    <div className="bg-surface dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                            <h3 className="font-bold text-xl text-foreground">
                                {editingEvent ? 'Edit Event' : 'Create New Event'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="p-8 space-y-8 overflow-y-auto">
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-base font-semibold text-foreground">Event Name</label>
                                    <Input
                                        placeholder="e.g. Annual Sports Day"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="h-12 text-lg"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-base font-semibold text-foreground">Start Date</label>
                                        <Input
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            required
                                            className="h-12"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-base font-semibold text-foreground">End Date (Optional)</label>
                                        <Input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="h-12"
                                        />
                                        {endDate && endDate < date && (
                                            <p className="text-xs text-red-500">End date cannot be before start date</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-base font-semibold text-foreground">Location</label>
                                    <Input
                                        placeholder="e.g. School Playground"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        className="h-12"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-base font-semibold text-foreground">Description</label>
                                    <textarea
                                        className="flex w-full rounded-xl border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[140px] resize-y"
                                        placeholder="Enter event details..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 space-y-4">
                                    <label className="text-base font-semibold text-foreground flex items-center gap-2">
                                        <Paperclip className="h-4 w-4" />
                                        Attachment (Photo or PDF)
                                    </label>

                                    <div className="flex flex-col gap-4">
                                        {attachmentUrl ? (
                                            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-100 dark:border-blue-900/50">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                                                        <FileText className="h-5 w-5" />
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="text-sm font-medium truncate">File Uploaded</span>
                                                        <a href={attachmentUrl} target="_blank" rel="noopener noreferrer" className="text-xs hover:underline truncate opacity-80">
                                                            View file
                                                        </a>
                                                    </div>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                    onClick={() => setAttachmentUrl('')}
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Remove
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-4">
                                                <Input
                                                    type="file"
                                                    accept=".pdf,.png,.jpg,.jpeg"
                                                    onChange={(e) => setAttachmentFile(e.target.files?.[0] || null)}
                                                    className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/40 dark:file:text-blue-300 h-14 py-2.5"
                                                />
                                            </div>
                                        )}
                                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                                            <Upload className="h-4 w-4" />
                                            Supported: PDF, PNG, JPG
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-4 justify-end border-t border-slate-100 dark:border-slate-800">
                                <Button type="button" variant="outline" size="lg" onClick={() => setIsModalOpen(false)} className="px-8">Cancel</Button>
                                <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white min-w-[150px] px-8" disabled={saving}>
                                    {saving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : (editingEvent ? 'Save Changes' : 'Create Event')}
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
                                        <div className="flex-shrink-0 w-full md:w-auto flex md:flex-col items-center justify-center bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-4 md:min-w-[120px] border border-blue-100 dark:border-blue-800">
                                            {event.endDate && event.endDate !== event.date ? (
                                                <div className="flex md:flex-col items-center gap-2">
                                                    <div className="text-center">
                                                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                            {formatToNepaliDate(event.date).day}
                                                        </span>
                                                        <span className="text-[10px] font-bold uppercase text-blue-400 dark:text-blue-300 block">
                                                            {formatToNepaliDate(event.date).monthShort}
                                                        </span>
                                                    </div>
                                                    <div className="h-px w-4 md:h-4 md:w-px bg-blue-200 dark:bg-blue-800"></div>
                                                    <div className="text-center">
                                                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                            {formatToNepaliDate(event.endDate).day}
                                                        </span>
                                                        <span className="text-[10px] font-bold uppercase text-blue-400 dark:text-blue-300 block">
                                                            {formatToNepaliDate(event.endDate).monthShort}
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                                        {formatToNepaliDate(event.date).day}
                                                    </span>
                                                    <span className="text-sm font-bold uppercase text-blue-400 dark:text-blue-300 ml-2 md:ml-0">
                                                        {formatToNepaliDate(event.date).monthShort}
                                                    </span>
                                                </>
                                            )}
                                        </div>

                                        {/* Event Details */}
                                        <div className="flex-1 space-y-2 w-full">
                                            <div className="flex items-start justify-between">
                                                <div className="flex flex-col gap-1">
                                                    <h3 className="text-xl font-bold text-foreground">
                                                        {event.name}
                                                    </h3>
                                                    {event.attachmentUrl && (
                                                        <a
                                                            href={event.attachmentUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-900/20 w-fit px-2 py-1 rounded-md transition-colors"
                                                        >
                                                            <Paperclip className="h-3 w-3" />
                                                            Attachment View
                                                        </a>
                                                    )}
                                                </div>

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

                                            <div className="flex items-center gap-4 text-sm text-muted">
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-blue-500" />
                                                    <span>{event.location}</span>
                                                </div>
                                                {event.endDate && (
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-blue-500" />
                                                        <span>{formatToNepaliDate(event.date).formatShort} - {formatToNepaliDate(event.endDate).formatShort}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="text-muted pt-2 leading-relaxed whitespace-pre-wrap">
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
