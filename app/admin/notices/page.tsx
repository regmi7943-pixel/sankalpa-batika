'use client';

import { useState, useEffect } from 'react';
import { Loader2, Plus, Calendar, Megaphone, Trash2, X, Edit, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { getNotices, createNotice, updateNotice, deleteNotice } from '@/app/actions/notices';
import { Notice } from '@/types';

export default function AdminNoticesPage() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [published, setPublished] = useState(true);

    // Load notices
    useEffect(() => {
        async function load() {
            const result = await getNotices();
            if (result.success && result.data) {
                setNotices(result.data);
            }
            setLoading(false);
        }
        load();
    }, []);

    // Open Modal for Create
    const openCreateModal = () => {
        setEditingNotice(null);
        setTitle('');
        setContent('');
        setPublished(true);
        setIsModalOpen(true);
    };

    // Open Modal for Edit
    const openEditModal = (notice: Notice) => {
        setEditingNotice(notice);
        setTitle(notice.title);
        setContent(notice.content);
        setPublished(notice.published);
        setIsModalOpen(true);
    };

    // Handle Create or Update
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        if (editingNotice) {
            // Update
            const updatedData = { title, content, published };
            // Optimistic update
            const oldNotices = [...notices];
            setNotices(notices.map(n => n.id === editingNotice.id ? { ...n, ...updatedData } : n));

            const result = await updateNotice(editingNotice.id, updatedData);
            if (!result.success) {
                alert('Failed to update notice');
                // Revert or reload could be done here
            }
        } else {
            // Create
            const newNotice = {
                title: title || 'New Notice',
                content: content || 'Description...',
                date: new Date().toISOString(),
                published: published,
            };
            const result = await createNotice(newNotice);
            if (result.success) {
                const refresh = await getNotices();
                if (refresh.success && refresh.data) {
                    setNotices(refresh.data);
                }
            } else {
                alert('Failed to create notice');
            }
        }

        setSaving(false);
        setIsModalOpen(false);
    };

    // Delete notice
    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this notice?')) return;

        setNotices(notices.filter(n => n.id !== id));
        await deleteNotice(id);
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
                                {editingNotice ? 'Edit Notice' : 'Create New Notice'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Title</label>
                                <Input
                                    placeholder="e.g. Winter Vacation Announcement"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Content</label>
                                <textarea
                                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                                    placeholder="Enter the details of the notice..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="published"
                                    checked={published}
                                    onChange={(e) => setPublished(e.target.checked)}
                                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="published" className="text-sm text-foreground cursor-pointer select-none">Publish immediately</label>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" disabled={saving}>
                                    {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : (editingNotice ? 'Save Changes' : 'Create Notice')}
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
                                <Megaphone className="h-6 w-6 text-white" />
                            </div>
                            Notices
                        </h1>
                        <p className="text-muted text-lg mt-2">Manage school announcements and news.</p>
                    </div>
                    <Button
                        onClick={openCreateModal}
                        disabled={saving}
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        New Notice
                    </Button>
                </div>

                {/* Notices List */}
                <div className="space-y-4">
                    {notices.length === 0 ? (
                        <div className="text-center py-20 bg-surface rounded-3xl border border-surface-dark/10">
                            <p className="text-muted">No notices found. Create one to get started!</p>
                        </div>
                    ) : (
                        notices.map((notice) => (
                            <Card key={notice.id} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-surface group">
                                <CardContent className="p-6">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm text-blue-500 font-medium bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full w-fit">
                                                <Calendar className="h-3.5 w-3.5" />
                                                <span>{new Date(notice.createdAt || Date.now()).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${notice.published ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600'}`}>
                                                    {notice.published ? 'Published' : 'Draft'}
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex items-center gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => openEditModal(notice)}
                                                        className="h-8 w-8 p-0 text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                                        title="Edit"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDelete(notice.id)}
                                                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                            <Megaphone className="h-5 w-5 text-blue-500/50" />
                                            {notice.title}
                                        </h3>

                                        <div className="text-muted leading-relaxed line-clamp-3">
                                            {notice.content}
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
