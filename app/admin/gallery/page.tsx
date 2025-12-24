'use client';

import { useState, useEffect, useRef } from 'react';
import { Loader2, Plus, Image as ImageIcon, Trash2, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getGallery, uploadGalleryItem, deleteGalleryItem } from '@/app/actions/gallery';
import { DeletableWrapper } from '@/components/admin/deletable-wrapper';
import { GalleryItem } from '@/types';

export default function AdminGalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [caption, setCaption] = useState('');

    // Load gallery
    useEffect(() => {
        async function load() {
            const result = await getGallery();
            if (result.success && result.data) {
                setItems(result.data);
            }
            setLoading(false);
        }
        load();
    }, []);

    // Handle Upload
    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('caption', caption);

        const result = await uploadGalleryItem(formData);
        if (result.success) {
            // Reload gallery
            const refresh = await getGallery();
            if (refresh.success && refresh.data) {
                setItems(refresh.data);
            }
            // Reset form
            setSelectedFile(null);
            setCaption('');
            setShowUpload(false);
        } else {
            alert('Upload failed: ' + result.error);
        }
        setUploading(false);
    };

    // Handle Delete
    const handleDelete = async (id: string, publicId: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        // Optimistic update
        setItems(items.filter(item => item.id !== id));

        const result = await deleteGalleryItem(id, publicId);
        if (!result.success) {
            alert('Failed to delete image');
            // Revert on failure (reload)
            const refresh = await getGallery();
            if (refresh.success && refresh.data) setItems(refresh.data);
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
        <div className="min-h-full bg-surface/50 dark:bg-background/50 backdrop-blur-sm p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-3">
                            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
                                <ImageIcon className="h-6 w-6 text-white" />
                            </div>
                            Gallery
                        </h1>
                        <p className="text-muted text-lg mt-2">Manage school photos and memories.</p>
                    </div>
                    <Button
                        onClick={() => setShowUpload(!showUpload)}
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25"
                    >
                        {showUpload ? <X className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                        {showUpload ? 'Cancel Upload' : 'Upload Image'}
                    </Button>
                </div>

                {/* Upload Area */}
                {showUpload && (
                    <div className="bg-surface border border-dashed border-blue-300 dark:border-blue-700 rounded-3xl p-8 mb-8 animate-scale-up">
                        <form onSubmit={handleUpload} className="max-w-xl mx-auto space-y-6">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 mb-4">
                                    <Upload className="h-8 w-8 text-blue-500" />
                                </div>
                                <h2 className="text-xl font-bold text-foreground">Upload New Photo</h2>
                                <p className="text-muted">Select an image to add to the gallery</p>
                            </div>

                            <div className="space-y-4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                    className="w-full text-sm text-muted
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100 dark:file:bg-blue-900/50 dark:file:text-blue-300"
                                />

                                <input
                                    type="text"
                                    placeholder="Enter caption (optional)"
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-surface-dark/20 bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <Button
                                    type="submit"
                                    disabled={!selectedFile || uploading}
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                >
                                    {uploading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                            Uploading...
                                        </>
                                    ) : (
                                        'Upload Photo'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Gallery Grid */}
                {items.length === 0 ? (
                    <div className="text-center py-20 bg-surface rounded-3xl border border-surface-dark/10">
                        <p className="text-muted">Gallery is empty. Upload some photos!</p>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {items.map((item) => (
                            <div key={item.id} className="break-inside-avoid">
                                <DeletableWrapper
                                    onDelete={() => handleDelete(item.id, item.publicId || '')}
                                    className="group"
                                >
                                    <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                                        <img
                                            src={item.url}
                                            alt={item.caption || 'Gallery Image'}
                                            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                            {item.caption && (
                                                <p className="text-white text-sm font-medium">{item.caption}</p>
                                            )}
                                        </div>
                                    </div>
                                </DeletableWrapper>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
