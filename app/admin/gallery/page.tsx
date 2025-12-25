'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
    Loader2, Plus, Image as ImageIcon, Trash2, Upload, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getGallery, uploadGalleryItem, deleteGalleryItem } from '@/app/actions/gallery';
import { GalleryItem } from '@/types';
import Image from 'next/image';

// --- Components ---

const TabButton = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
        onClick={onClick}
        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative ${active
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200'
            }`}
    >
        {children}
    </button>
);

export default function AdminGalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [activeTab, setActiveTab] = useState<'photos' | 'slide' | 'staff'>('photos');

    // Upload State
    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [caption, setCaption] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Load Data
    const loadGallery = useCallback(async () => {
        setLoading(true);
        const result = await getGallery();
        if (result.success && result.data) {
            setItems(result.data);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        loadGallery();
    }, [loadGallery]);

    const filteredItems = items.filter(item => {
        if (activeTab === 'slide') return item.category === 'slide';
        if (activeTab === 'staff') return item.category === 'staff';
        return item.category === 'photos' || !item.category;
    });

    // --- Upload Handlers ---

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    const handleFiles = (files: FileList) => {
        const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
        if (activeTab === 'slide' || activeTab === 'staff') {
            // For specific categories, maybe we prefer single upload or careful curation, 
            // but bulk is fine if user wants. Let's append.
            setSelectedFiles(prev => [...prev, ...validFiles]);
        } else {
            setSelectedFiles(prev => [...prev, ...validFiles]);
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleUploadSubmit = async () => {
        if (selectedFiles.length === 0) return;

        setUploading(true);
        const formData = new FormData();
        selectedFiles.forEach(file => formData.append('files', file));
        formData.append('category', activeTab);
        formData.append('caption', caption);

        const result = await uploadGalleryItem(formData);

        if (result.success) {
            await loadGallery();
            setSelectedFiles([]);
            setCaption('');
            setShowUploadModal(false);
        } else {
            alert('Upload failed: ' + result.error);
        }
        setUploading(false);
    };

    const handleDelete = async (id: string, publicId: string) => {
        if (!confirm('Delete this image permanently?')) return;

        // Optimistic UI update
        setItems(prev => prev.filter(item => item.id !== id));

        const result = await deleteGalleryItem(id, publicId);
        if (!result.success) {
            // Revert on failure
            loadGallery();
            alert('Failed to delete');
        }
    };

    return (
        <div className="min-h-full p-4 md:p-8 space-y-8 animate-fade-in relative">

            {/* --- Header Section --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 z-10 relative">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            Gallery
                        </span>
                        <span className="text-slate-300 font-light hidden md:inline">|</span>
                        <span className="text-lg font-medium text-slate-500 dark:text-slate-400 mt-2 md:mt-0">
                            Manage your visual assets
                        </span>
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-white dark:bg-slate-800 p-1.5 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 hidden sm:flex">
                        <TabButton active={activeTab === 'photos'} onClick={() => setActiveTab('photos')}>Photos</TabButton>
                        <TabButton active={activeTab === 'slide'} onClick={() => setActiveTab('slide')}>Slides</TabButton>
                        <TabButton active={activeTab === 'staff'} onClick={() => setActiveTab('staff')}>Staff</TabButton>
                    </div>

                    <Button
                        onClick={() => setShowUploadModal(true)}
                        disabled={activeTab === 'slide' && filteredItems.length >= 5}
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 active:scale-95 transition-all text-base px-6 py-6 rounded-xl"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Add {activeTab === 'slide' ? 'Slide' : activeTab === 'staff' ? 'Member' : 'Photo'}
                    </Button>
                </div>
            </div>

            {/* Mobile Tabs (if screen is small) */}
            <div className="sm:hidden bg-white dark:bg-slate-800 p-1.5 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 flex justify-between overflow-x-auto">
                <TabButton active={activeTab === 'photos'} onClick={() => setActiveTab('photos')}>Photos</TabButton>
                <TabButton active={activeTab === 'slide'} onClick={() => setActiveTab('slide')}>Slides</TabButton>
                <TabButton active={activeTab === 'staff'} onClick={() => setActiveTab('staff')}>Staff</TabButton>
            </div>

            {/* --- Loading State --- */}
            {loading && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                    <Loader2 className="h-10 w-10 animate-spin mb-4" />
                    <p>Loading your gallery...</p>
                </div>
            )}

            {/* --- Empty State --- */}
            {!loading && filteredItems.length === 0 && (
                <div className="text-center py-32 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 group cursor-pointer" onClick={() => setShowUploadModal(true)}>
                    <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <ImageIcon className="h-10 w-10 text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No images yet</h3>
                    <p className="text-slate-500 max-w-sm mx-auto mb-8">
                        This collection is empty. Click here to upload your first image.
                    </p>
                    <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">Upload Now</Button>
                </div>
            )}

            {/* --- Grid Layout --- */}
            {!loading && filteredItems.length > 0 && (
                <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-6 space-y-6 pb-20">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="break-inside-avoid relative group">
                            <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 cursor-pointer">

                                <img
                                    src={item.url}
                                    alt={item.caption || 'Gallery Image'}
                                    className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    loading="lazy"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Top Actions */}
                                <div className="absolute top-4 right-4 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDelete(item.id, item.publicId || ''); }}
                                        className="bg-white/10 hover:bg-red-500 text-white backdrop-blur-md p-2.5 rounded-full transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Bottom Info */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                                    {item.caption ? (
                                        <p className="text-white font-medium text-lg leading-snug line-clamp-2">"{item.caption}"</p>
                                    ) : (
                                        <p className="text-white/50 italic text-sm">No caption</p>
                                    )}
                                    <div className="flex items-center gap-2 mt-2 text-xs text-white/70 font-medium uppercase tracking-wider">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                        {activeTab === 'slide' ? 'Slide' : activeTab === 'staff' ? 'Staff' : 'Photo'}
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* --- Upload Modal Overlay --- */}
            {showUploadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-scale-up flex flex-col max-h-[90vh]">

                        {/* Modal Header */}
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Upload to {activeTab === 'slide' ? 'Slides' : activeTab === 'staff' ? 'Staff' : 'Gallery'}</h2>
                                <p className="text-sm text-slate-500">Drag and drop images below</p>
                            </div>
                            <button
                                onClick={() => { setShowUploadModal(false); setSelectedFiles([]); }}
                                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                            >
                                <X className="h-5 w-5 text-slate-500" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto custom-scrollbar">

                            {/* Drag Drop Zone */}
                            <div
                                className={`
                                    relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300
                                    flex flex-col items-center justify-center min-h-[200px]
                                    ${dragActive
                                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-[0.99]'
                                        : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                    }
                                `}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                onClick={() => inputRef.current?.click()}
                            >
                                <input
                                    ref={inputRef}
                                    type="file"
                                    className="hidden"
                                    multiple
                                    accept="image/*"
                                    onChange={handleChange}
                                />

                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                                    <Upload className="h-8 w-8" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                                    Click or drag images here
                                </h3>
                                <p className="text-slate-500 text-sm max-w-xs">
                                    Supports JPG, PNG, WEBP. High quality images preferred.
                                </p>
                            </div>

                            {/* Caption Input */}
                            <div className="mt-6">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">
                                    {activeTab === 'staff' ? 'Staff Name & Role' : 'Caption (Optional)'}
                                </label>
                                <input
                                    type="text"
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    placeholder={activeTab === 'staff' ? "e.g. John Doe - Principal" : "Enter a description for these photos..."}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>

                            {/* File Preview List */}
                            {selectedFiles.length > 0 && (
                                <div className="mt-6 space-y-3">
                                    <h4 className="text-sm font-medium text-slate-500 uppercase tracking-widest">Selected Files ({selectedFiles.length})</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {selectedFiles.map((file, idx) => (
                                            <div key={idx} className="relative group rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 aspect-square">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    className="w-full h-full object-cover"
                                                    alt="preview"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                                                        className="bg-red-500 p-1.5 rounded-full text-white hover:bg-red-600"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-end gap-3">
                            <Button
                                variant="outline"
                                onClick={() => setShowUploadModal(false)}
                                disabled={uploading}
                                className="border-slate-200 text-slate-600"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleUploadSubmit}
                                disabled={selectedFiles.length === 0 || uploading}
                                className="bg-blue-600 hover:bg-blue-700 text-white min-w-[120px]"
                            >
                                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Upload Files'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
