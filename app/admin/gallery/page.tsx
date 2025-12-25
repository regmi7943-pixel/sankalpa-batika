'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
    Loader2, Plus, Image as ImageIcon, Trash2, Upload, X, MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getGallery, uploadGalleryItem, deleteGalleryItem, getCategories, addCategory, deleteCategory, updateItemCategory } from '@/app/actions/gallery';
import { GalleryItem } from '@/types';

// System Categories
const SYSTEM_TABS = [
    { id: 'photos', name: 'All Photos' },
    { id: 'slide', name: 'Home Slides' },
    { id: 'staff', name: 'Staff' }
];

const TabButton = ({ active, onClick, children, onDelete }: { active: boolean; onClick: () => void; children: React.ReactNode; onDelete?: () => void }) => (
    <div className={`relative group px-6 py-2.5 rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer ${active
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
        : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'
        }`}
        onClick={onClick}
    >
        <span className="text-sm font-medium whitespace-nowrap">{children}</span>
        {onDelete && (
            <button
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-red-500 hover:text-white rounded-full transition-all"
            >
                <X className="h-3 w-3" />
            </button>
        )}
    </div>
);

export default function AdminGalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // UI State
    const [uploading, setUploading] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showAddCatModal, setShowAddCatModal] = useState(false);
    const [newCatName, setNewCatName] = useState('');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    // Active Tab can be a system ID ('slide') or a custom Category ID
    const [activeTab, setActiveTab] = useState<string>('photos');

    // Upload State
    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [caption, setCaption] = useState('');
    const [staffName, setStaffName] = useState('');
    const [staffPosition, setStaffPosition] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const loadData = useCallback(async () => {
        setLoading(true);
        const [galleryRes, catRes] = await Promise.all([
            getGallery(),
            getCategories()
        ]);

        if (galleryRes.success && galleryRes.data) setItems(galleryRes.data);
        if (catRes.success && catRes.data) setCategories(catRes.data);

        setLoading(false);
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    // Close dropdown when tab changes
    useEffect(() => {
        setOpenMenuId(null);
    }, [activeTab]);

    // Derived State
    const filteredItems = items.filter(item => {
        if (activeTab === 'slide') return item.category === 'slide';
        if (activeTab === 'staff') return item.category === 'staff';
        if (activeTab === 'photos') return true; // Show ALL items

        // Filter by dynamic category ID
        return item.category === activeTab;
    });

    const activeCategoryName = [...SYSTEM_TABS, ...categories].find(c => c.id === activeTab)?.name || 'Gallery';

    // --- Actions ---

    const handleAddCategory = async () => {
        if (!newCatName.trim()) return;
        const result = await addCategory(newCatName.trim());
        if (result.success) {
            await loadData();
            setShowAddCatModal(false);
            setNewCatName('');
        }
    };

    const handleDeleteCategory = async (id: string) => {
        if (!confirm('Delete this category? Items will remain but lose this category tag.')) return;
        const result = await deleteCategory(id);
        if (result.success) {
            if (activeTab === id) setActiveTab('photos');
            await loadData();
        }
    };

    const handleUploadSubmit = async () => {
        if (selectedFiles.length === 0) return;
        setUploading(true);

        const formData = new FormData();
        selectedFiles.forEach(file => formData.append('files', file));

        // Use activeTab as category.
        formData.append('category', activeTab);

        // For Staff, combine name and position as caption
        if (activeTab === 'staff') {
            const staffCaption = staffPosition ? `${staffName} - ${staffPosition}` : staffName;
            formData.append('caption', staffCaption);
        } else {
            formData.append('caption', caption);
        }

        const result = await uploadGalleryItem(formData);
        if (result.success) {
            await loadData();
            setSelectedFiles([]);
            setCaption('');
            setStaffName('');
            setStaffPosition('');
            setShowUploadModal(false);
        } else {
            alert('Upload failed: ' + result.error);
        }
        setUploading(false);
    };

    const handleDeleteItem = async (id: string, publicId: string) => {
        if (!confirm('Delete this image?')) return;
        setItems(prev => prev.filter(item => item.id !== id));
        await deleteGalleryItem(id, publicId);
    };

    const handleMoveItem = async (itemId: string, newCategory: string) => {
        // Optimistic UI update
        setItems(prev => prev.map(item =>
            item.id === itemId ? { ...item, category: newCategory } : item
        ));
        await updateItemCategory(itemId, newCategory);
    };

    // --- Drag & Drop Helpers ---
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault(); e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
        else if (e.type === 'dragleave') setDragActive(false);
    };
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault(); e.stopPropagation(); setDragActive(false);
        if (e.dataTransfer.files?.[0]) handleFiles(e.dataTransfer.files);
    };
    const handleFiles = (files: FileList) => {
        const valid = Array.from(files).filter(f => f.type.startsWith('image/'));
        setSelectedFiles(prev => [...prev, ...valid]);
    };
    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };


    return (
        <div className="min-h-full p-4 md:p-8 space-y-8 animate-fade-in relative">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Gallery Manager</h1>
                    <p className="text-slate-500 mt-1">Manage photos, slides, and categories.</p>
                </div>
                <div className="flex gap-2">
                    {activeTab === 'photos' && (
                        <Button onClick={() => setShowAddCatModal(true)} variant="outline">
                            <Plus className="h-4 w-4 mr-2" /> New Category
                        </Button>
                    )}
                    <Button onClick={() => setShowUploadModal(true)} className="bg-blue-600 text-white">
                        <Upload className="h-4 w-4 mr-2" />
                        {activeTab === 'staff' ? 'Add New Staff' : `Upload to ${activeCategoryName}`}
                    </Button>
                </div>
            </div>

            {/* Scrollable Tabs */}
            <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar">
                {SYSTEM_TABS.map(tab => (
                    <TabButton
                        key={tab.id}
                        active={activeTab === tab.id}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.name}
                    </TabButton>
                ))}

                <div className="w-px h-8 bg-slate-200 dark:bg-slate-700 mx-2 self-center shrink-0"></div>

                {categories.map(cat => (
                    <TabButton
                        key={cat.id}
                        active={activeTab === cat.id}
                        onClick={() => setActiveTab(cat.id)}
                        onDelete={() => handleDeleteCategory(cat.id)}
                    >
                        {cat.name}
                    </TabButton>
                ))}
            </div>

            {/* Grid */}
            <div
                className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-6 space-y-6 pb-20"
                onClick={() => setOpenMenuId(null)}
            >
                {filteredItems.map(item => (
                    <div
                        key={item.id}
                        className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-slate-900 cursor-pointer"
                        onMouseLeave={() => setOpenMenuId(null)}
                    >
                        <img
                            src={item.url}
                            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">

                            {/* Top Actions Row */}
                            <div className="flex justify-between items-start">
                                {/* Move To Dropdown (Only show if there are custom categories) */}
                                {categories.length > 0 && (
                                    <div className="relative">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === item.id ? null : item.id); }}
                                            className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-full backdrop-blur-sm"
                                        >
                                            <MoreVertical className="h-4 w-4" />
                                        </button>

                                        {openMenuId === item.id && (
                                            <div className="absolute left-0 top-full mt-1 w-44 bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden z-30 animate-fade-in">
                                                <div className="p-2 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b dark:border-slate-700">Move to Category</div>
                                                {categories
                                                    .filter(cat => cat.id !== item.category)
                                                    .map(cat => (
                                                        <button
                                                            key={cat.id}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleMoveItem(item.id, cat.id);
                                                                setOpenMenuId(null);
                                                            }}
                                                            className="w-full text-left px-3 py-2.5 text-sm hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center gap-2"
                                                        >
                                                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                            {cat.name}
                                                        </button>
                                                    ))
                                                }
                                                {categories.filter(cat => cat.id !== item.category).length === 0 && (
                                                    <p className="px-3 py-2 text-xs text-slate-400">No other categories</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Delete Button */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id, item.publicId || ''); }}
                                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Bottom Caption */}
                            <p className="text-white text-sm font-medium truncate">{item.caption}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl p-6 shadow-2xl space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold">
                                {activeTab === 'staff' ? 'Add New Staff Member' : `Upload to ${activeCategoryName}`}
                            </h2>
                            <button onClick={() => setShowUploadModal(false)}><X className="h-5 w-5" /></button>
                        </div>

                        <div
                            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-400'}`}
                            onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}
                            onClick={() => inputRef.current?.click()}
                        >
                            <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={e => e.target.files && handleFiles(e.target.files)} />
                            <Upload className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                            <p className="text-sm text-slate-500">Click or Drag images here</p>
                        </div>

                        {selectedFiles.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto py-2">
                                {selectedFiles.map((f, i) => (
                                    <div key={i} className="w-16 h-16 shrink-0 relative rounded-md overflow-hidden">
                                        <img src={URL.createObjectURL(f)} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Staff Form: Name + Position */}
                        {activeTab === 'staff' ? (
                            <div className="space-y-3">
                                <input
                                    placeholder="Staff Name (e.g. John Doe)"
                                    value={staffName}
                                    onChange={e => setStaffName(e.target.value)}
                                    className="w-full p-3 border rounded-lg bg-transparent"
                                />
                                <input
                                    placeholder="Position (e.g. Principal, Teacher)"
                                    value={staffPosition}
                                    onChange={e => setStaffPosition(e.target.value)}
                                    className="w-full p-3 border rounded-lg bg-transparent"
                                />
                            </div>
                        ) : (
                            <input
                                placeholder="Caption (Optional)"
                                value={caption}
                                onChange={e => setCaption(e.target.value)}
                                className="w-full p-3 border rounded-lg bg-transparent"
                            />
                        )}

                        <div className="flex justify-end gap-2 pt-2">
                            <Button
                                onClick={handleUploadSubmit}
                                disabled={!selectedFiles.length || uploading || (activeTab === 'staff' && !staffName.trim())}
                            >
                                {uploading ? <Loader2 className="animate-spin" /> : activeTab === 'staff' ? 'Add Staff' : 'Upload'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Category Modal */}
            {showAddCatModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl p-6 shadow-2xl space-y-4">
                        <h2 className="text-xl font-bold">New Category</h2>
                        <input
                            autoFocus
                            placeholder="Category Name (e.g. Sports)"
                            value={newCatName}
                            onChange={e => setNewCatName(e.target.value)}
                            className="w-full p-2 border rounded-lg bg-transparent"
                        />
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setShowAddCatModal(false)}>Cancel</Button>
                            <Button onClick={handleAddCategory} disabled={!newCatName.trim()}>Create</Button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
