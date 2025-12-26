'use client';

import { useState, useEffect } from 'react';
import { Loader2, Plus, Calendar, Megaphone, Trash2, X, Edit, FileText, Upload, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { getNotices, createNotice, updateNotice, deleteNotice, uploadNoticeAttachment } from '@/app/actions/notices';
import { Notice } from '@/types';
import { toast } from 'sonner';

export default function AdminNoticesPage() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredNotices, setFilteredNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [attachmentUrl, setAttachmentUrl] = useState('');
    const [attachmentFile, setAttachmentFile] = useState<File | null>(null);

    // Load notices
    useEffect(() => {
        async function load() {
            const result = await getNotices();
            if (result.success && result.data) {
                setNotices(result.data);
                setFilteredNotices(result.data);
            }
            setLoading(false);
        }
        load();
    }, []);

    // Filter logic
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

    // Open Modal for Create
    const openCreateModal = () => {
        setEditingNotice(null);
        setTitle('');
        setContent('');
        setShowPopup(false);
        setAttachmentUrl('');
        setAttachmentFile(null);
        setIsModalOpen(true);
    };

    // Open Modal for Edit
    const openEditModal = (notice: Notice) => {
        setEditingNotice(notice);
        setTitle(notice.title);
        setContent(notice.content);
        setShowPopup(notice.showPopup || false);
        setAttachmentUrl(notice.attachmentUrl || '');
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
                const uploadRes = await uploadNoticeAttachment(formData);
                if (uploadRes.success && uploadRes.url) {
                    currentAttachmentUrl = uploadRes.url;
                } else {
                    toast.error('Failed to upload attachment');
                    setSaving(false);
                    return;
                }
            }

            // Notices are always published by default now
            const published = true;

            if (editingNotice) {
                // Update
                const updatedData = { title, content, published, attachmentUrl: currentAttachmentUrl, showPopup };
                // Optimistic update
                const oldNotices = [...notices];
                setNotices(notices.map(n => n.id === editingNotice.id ? { ...n, ...updatedData } : n));

                const result = await updateNotice(editingNotice.id, updatedData);
                if (result.success) {
                    toast.success('Notice updated successfully');
                } else {
                    toast.error('Failed to update notice');
                    setNotices(oldNotices); // Revert
                }
            } else {
                // Create
                const newNotice = {
                    title: title || 'New Notice',
                    content: content || 'Description...',
                    date: new Date().toISOString(),
                    published,
                    attachmentUrl: currentAttachmentUrl,
                    showPopup
                };
                const result = await createNotice(newNotice); // Note: server action adds createdAt
                if (result.success) {
                    toast.success('Notice created successfully');
                    const refresh = await getNotices();
                    if (refresh.success && refresh.data) {
                        setNotices(refresh.data);
                    }
                } else {
                    toast.error('Failed to create notice');
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

    // Delete notice
    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this notice?')) return;

        setNotices(notices.filter(n => n.id !== id));
        await deleteNotice(id);
        toast.success('Notice deleted');
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
                    <div className="bg-surface dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                            <h3 className="font-bold text-xl text-foreground">
                                {editingNotice ? 'Edit Notice' : 'Create New Notice'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="p-8 space-y-8 overflow-y-auto">
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-base font-semibold text-foreground">Title</label>
                                    <Input
                                        placeholder="e.g. Winter Vacation Announcement"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                        className="h-12 text-lg"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-base font-semibold text-foreground">Content</label>
                                    <textarea
                                        className="flex w-full rounded-xl border border-input bg-background px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[180px] resize-y"
                                        placeholder="Enter the details of the notice..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 space-y-4">
                                    <label className="text-base font-semibold text-foreground flex items-center gap-2">
                                        <Paperclip className="h-4 w-4" />
                                        Attachment (Optional)
                                    </label>

                                    <div className="flex flex-col gap-4">
                                        {attachmentUrl ? (
                                            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-100 dark:border-blue-900/50">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg">
                                                        <FileText className="h-5 w-5" />
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="text-sm font-medium truncate">Attachment Uploaded</span>
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
                                            Supported files: PDF, PNG, JPG
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                                <input
                                    type="checkbox"
                                    id="showPopup"
                                    checked={showPopup}
                                    onChange={(e) => setShowPopup(e.target.checked)}
                                    className="h-5 w-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                />
                                <div className="flex flex-col">
                                    <label htmlFor="showPopup" className="text-sm font-semibold text-foreground cursor-pointer select-none">Show popup on Home Screen</label>
                                    <p className="text-xs text-muted-foreground">Notice will appear as a daily popup for users</p>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-4 justify-end border-t border-slate-100 dark:border-slate-800">
                                <Button type="button" variant="outline" size="lg" onClick={() => setIsModalOpen(false)} className="px-8">Cancel</Button>
                                <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white min-w-[150px] px-8" disabled={saving}>
                                    {saving ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : (editingNotice ? 'Save Changes' : 'Create Notice')}
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

                {/* Search Bar */}
                <div className="relative">
                    <Input
                        placeholder="Search by title or content..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-11 h-12 bg-surface border-surface-dark/20 rounded-xl"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                        <Loader2 className={`h-4 w-4 animate-spin ${saving || loading ? 'block' : 'hidden'}`} />
                        {!saving && !loading && (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        )}
                    </div>
                </div>

                {/* Notices List */}
                <div className="space-y-4">
                    {filteredNotices.length === 0 ? (
                        <div className="text-center py-20 bg-surface rounded-3xl border border-surface-dark/10">
                            <p className="text-muted">
                                {searchTerm ? 'No notices match your search.' : 'No notices found. Create one to get started!'}
                            </p>
                        </div>
                    ) : (
                        filteredNotices.map((notice) => (
                            <Card key={notice.id} className="border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-surface group">
                                <CardContent className="p-6">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm text-blue-500 font-medium bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full w-fit">
                                                <Calendar className="h-3.5 w-3.5" />
                                                <span>{new Date(notice.createdAt || Date.now()).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {notice.attachmentUrl && (
                                                    <a
                                                        href={notice.attachmentUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 flex items-center gap-1 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
                                                    >
                                                        <Paperclip className="h-3 w-3" />
                                                        Attachment
                                                    </a>
                                                )}
                                                <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${notice.published ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-600'}`}>
                                                    {notice.published ? 'Published' : 'Draft'}
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex items-center gap-1">
                                                    {notice.showPopup && (
                                                        <div className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 mr-2">
                                                            Popup
                                                        </div>
                                                    )}
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

                                        <div className="text-muted leading-relaxed line-clamp-3 whitespace-pre-wrap">
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
