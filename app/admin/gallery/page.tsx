'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
    Loader2, Plus, Image as ImageIcon, Trash2, Upload, X, MoreVertical,
    Search, Grid3X3, List, User, Filter, AlertCircle, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    getGallery,
    uploadGalleryItem,
    deleteGalleryItem,
    getCategories,
    addCategory,
    deleteCategory,
    updateItemCategory,
    replaceGalleryItemPhoto
} from '@/app/actions/gallery';
import { GalleryItem } from '@/types';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

// System Categories
const SYSTEM_TABS = [
    { id: 'glimpses', name: 'Glimpses', icon: ImageIcon },
    { id: 'slide', name: 'Home Slides', icon: Grid3X3 },
    { id: 'staff', name: 'Staff Members', icon: User }
];

const TabButton = ({ active, onClick, children, icon: Icon, onDelete }: { active: boolean; onClick: () => void; children: React.ReactNode; icon?: any; onDelete?: () => void }) => (
    <button
        onClick={onClick}
        className={`relative flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 whitespace-nowrap group ${active
            ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 ring-4 ring-blue-600/10'
            : 'bg-white dark:bg-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
    >
        {Icon && <Icon className={`h-4 w-4 ${active ? 'text-white' : 'text-slate-400'}`} />}
        <span className="text-sm font-black tracking-tight">{children}</span>
        {onDelete && (
            <div
                onClick={(e) => { e.stopPropagation(); onDelete(); }}
                className="ml-2 p-1 hover:bg-red-500 hover:text-white rounded-lg transition-all"
            >
                <X className="h-3 w-3" />
            </div>
        )}
    </button>
);

export default function AdminGalleryPage() {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // UI State
    const [uploading, setUploading] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [showAddCatModal, setShowAddCatModal] = useState(false);
    const [newCatName, setNewCatName] = useState('');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    // Active Tab
    const [activeTab, setActiveTab] = useState<string>('glimpses');

    // Upload State
    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [caption, setCaption] = useState('');
    const [staffName, setStaffName] = useState('');
    const [staffPosition, setStaffPosition] = useState('');
    const [staffBio, setStaffBio] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // --- Helpers ---
    const handleFiles = (files: FileList) => {
        const valid = Array.from(files).filter(f => f.type.startsWith('image/'));
        setSelectedFiles(prev => [...prev, ...valid]);
    };

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
        else if (e.type === 'dragleave') setDragActive(false);
    };

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

    // Derived State
    const filteredItems = useMemo(() => {
        return items.filter(item => {
            const matchesTab = activeTab === 'glimpses'
                ? (!item.category || item.category === 'glimpses' || item.category === 'all')
                : item.category === activeTab;
            const matchesSearch = item.caption?.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [items, activeTab, searchQuery]);

    const activeCategoryName = [...SYSTEM_TABS, ...categories].find(c => c.id === activeTab)?.name || 'Gallery';

    // --- Actions ---

    const handleAddCategory = async () => {
        if (!newCatName.trim()) return;
        const result = await addCategory(newCatName.trim());
        if (result.success) {
            await loadData();
            setShowAddCatModal(false);
            setNewCatName('');
            toast.success('Category created successfully');
        } else {
            toast.error('Failed to create category');
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
        formData.append('category', activeTab);

        if (activeTab === 'staff') {
            const parts = [staffName];
            if (staffPosition) parts.push(staffPosition);
            if (staffBio) parts.push(staffBio);
            formData.append('caption', parts.join(' - '));
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
            setStaffBio('');
            setShowUploadModal(false);
            toast.success('Upload successful');
        } else {
            toast.error('Upload failed');
        }
        setUploading(false);
    };

    const handleDeleteItem = async (id: string, publicId: string) => {
        if (!confirm('Delete this item?')) return;
        setItems(prev => prev.filter(item => item.id !== id));
        const result = await deleteGalleryItem(id, publicId);
        if (!result.success) {
            toast.error('Delete failed');
            await loadData();
        } else {
            toast.success('Deleted successfully');
        }
    };

    const handleMoveItem = async (itemId: string, newCategory: string) => {
        setItems(prev => prev.map(item =>
            item.id === itemId ? { ...item, category: newCategory } : item
        ));
        const result = await updateItemCategory(itemId, newCategory);
        if (result.success) {
            toast.success('Moved successfully');
        } else {
            toast.error('Move failed');
            await loadData();
        }
    };


    // --- Components ---

    const StaffCard = ({ item }: { item: GalleryItem }) => {
        const [name, department, bio] = (item.caption || '').split(' - ');
        const [imageError, setImageError] = useState(false);
        const [isReplacing, setIsReplacing] = useState(false);
        const fileInputRef = useRef<HTMLInputElement>(null);

        const onReplaceClick = (e: React.MouseEvent) => {
            e.stopPropagation();
            fileInputRef.current?.click();
        };

        const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setIsReplacing(true);
            const formData = new FormData();
            formData.append('file', file);

            try {
                const result = await replaceGalleryItemPhoto(item.id, item.publicId || '', formData);
                if (result.success) {
                    toast.success('Photo updated successfully');
                    await loadData();
                } else {
                    toast.error('Failed to update photo');
                }
            } catch (err) {
                toast.error('An error occurred during upload');
            } finally {
                setIsReplacing(false);
            }
        };

        return (
            <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-xl transition-all group">
                <div className="aspect-[4/5] relative bg-slate-100 dark:bg-slate-900 border-b dark:border-slate-700/50 overflow-hidden">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                    {imageError ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 bg-slate-50 dark:bg-slate-900">
                            <User className="h-12 w-12 mb-2 opacity-20" />
                            <span className="text-[10px] uppercase font-black tracking-widest opacity-40">Placeholder Image</span>
                        </div>
                    ) : (
                        <img
                            src={item.url}
                            alt={name}
                            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${isReplacing ? 'opacity-50 blur-sm' : ''}`}
                            onError={() => setImageError(true)}
                        />
                    )}

                    {isReplacing && (
                        <div className="absolute inset-0 flex items-center justify-center bg-blue-600/10 backdrop-blur-sm">
                            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                        </div>
                    )}

                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 transition-transform">
                        <button
                            onClick={onReplaceClick}
                            className="p-2.5 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
                            title="Replace Photo"
                        >
                            <Upload className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => handleDeleteItem(item.id, item.publicId || '')}
                            className="p-2.5 bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 active:scale-95 transition-all"
                            title="Delete Staff"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div className="p-5 space-y-1">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 truncate">{name || 'Unknown Name'}</h3>
                    <p className="text-xs font-black text-blue-600 uppercase tracking-wider truncate">{department || 'No Department'}</p>
                    {bio && <p className="text-xs text-slate-500 line-clamp-2 mt-2">{bio}</p>}
                </div>
            </div>
        );
    };

    const GalleryCard = ({ item }: { item: GalleryItem }) => {
        const [imageError, setImageError] = useState(false);
        const isPdf = item.type === 'pdf' || item.url.endsWith('.pdf');

        return (
            <div
                onMouseLeave={() => setOpenMenuId(null)}
                className="relative bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden border-2 border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 group group w-full"
            >
                <div className="relative bg-slate-50 dark:bg-slate-900 overflow-hidden">
                    {isPdf ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-blue-50/50 dark:bg-blue-900/10 text-blue-600">
                            <FileText className="h-12 w-12 mb-2 drop-shadow-sm" />
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Document</span>
                        </div>
                    ) : imageError ? (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                            <ImageIcon className="h-10 w-10 opacity-20" />
                        </div>
                    ) : (
                        <img
                            src={item.url}
                            alt={item.caption}
                            className="w-full h-full object-cover transition-all duration-700 brightness-[0.9] group-hover:brightness-100 group-hover:scale-110"
                            onError={() => setImageError(true)}
                        />
                    )}

                    {/* Top Overlay: Type Badge */}
                    <div className="absolute top-4 left-4 z-10">
                        {isPdf && (
                            <div className="px-3 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-tighter rounded-full shadow-lg">
                                PDF
                            </div>
                        )}
                    </div>

                    {/* Hover Overlay: Actions & Caption */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0">
                        {item.caption && (
                            <p className="text-white text-sm font-bold leading-tight mb-4 drop-shadow-md line-clamp-3">
                                {item.caption}
                            </p>
                        )}

                        <div className="flex items-center gap-2">
                            {categories.length > 0 && (
                                <div className="relative">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === item.id ? null : item.id); }}
                                        className="p-3 bg-white/20 hover:bg-white text-white hover:text-blue-600 rounded-2xl backdrop-blur-xl shadow-lg border border-white/20 transition-all active:scale-90"
                                    >
                                        <Plus className="h-4 w-4" />
                                    </button>
                                    {openMenuId === item.id && (
                                        <div className="absolute bottom-full left-0 mb-3 w-48 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2">
                                            <div className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">Move to</div>
                                            {/* Option to move back to Glimpses if not already there */}
                                            {(item.category && item.category !== 'glimpses' && item.category !== 'all') && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleMoveItem(item.id, 'glimpses'); setOpenMenuId(null); }}
                                                    className="w-full text-left px-5 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-3 group/item"
                                                >
                                                    <div className="h-1.5 w-1.5 rounded-full bg-slate-400 group-hover/item:bg-white transition-colors" />
                                                    Glimpses
                                                </button>
                                            )}
                                            {categories
                                                .filter(cat => cat.id !== item.category)
                                                .map(cat => (
                                                    <button
                                                        key={cat.id}
                                                        onClick={(e) => { e.stopPropagation(); handleMoveItem(item.id, cat.id); setOpenMenuId(null); }}
                                                        className="w-full text-left px-5 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-3 group/item"
                                                    >
                                                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 group-hover/item:bg-white transition-colors" />
                                                        {cat.name}
                                                    </button>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            )}
                            <button
                                onClick={() => handleDeleteItem(item.id, item.publicId || '')}
                                className="p-3 bg-red-500/80 hover:bg-red-500 text-white rounded-2xl backdrop-blur-xl shadow-lg border border-red-400/20 transition-all active:scale-90"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] p-6 md:p-10 space-y-10 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">
                        Gallery <span className="text-blue-600 underline decoration-blue-500/30 underline-offset-8">Editor</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-lg">Manage photos, staff members, and homepage sliders.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    <Button
                        onClick={() => setShowUploadModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-7 rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20 group"
                    >
                        <Plus className="h-5 w-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
                        {activeTab === 'staff' ? 'Add Staff' : 'Upload New'}
                    </Button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-col space-y-6">
                <div className="flex overflow-x-auto pb-2 gap-3 no-scrollbar py-1">
                    {SYSTEM_TABS.map(tab => (
                        <TabButton
                            key={tab.id}
                            active={activeTab === tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            icon={tab.icon}
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
                            icon={Filter}
                        >
                            {cat.name}
                        </TabButton>
                    ))}
                    <button
                        onClick={() => setShowAddCatModal(true)}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border-2 border-dashed border-slate-300 dark:border-slate-700"
                    >
                        <Plus className="h-4 w-4" />
                        <span className="text-sm font-bold uppercase tracking-widest text-[10px]">New Category</span>
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-40 space-y-4">
                    <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Syncing with database...</p>
                </div>
            ) : filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-32">
                    <AnimatePresence mode='popLayout'>
                        {filteredItems.map((item) => {
                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    key={item.id}
                                    className="w-full"
                                >
                                    {activeTab === 'staff' ? (
                                        <StaffCard item={item} />
                                    ) : (
                                        <GalleryCard item={item} />
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="text-center py-32 bg-white dark:bg-slate-800/50 rounded-[3rem] border-4 border-dashed border-slate-100 dark:border-slate-800">
                    <div className="max-w-xs mx-auto space-y-4">
                        <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <ImageIcon className="h-10 w-10 text-slate-300" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">Gallery is Empty</h3>
                        <p className="text-slate-500 font-medium">There are no items in <span className="text-blue-600 font-bold">{activeCategoryName}</span> yet.</p>
                        <Button onClick={() => setShowUploadModal(true)} variant="outline" className="mt-4 rounded-xl px-10 border-blue-600 text-blue-600 font-bold">
                            Add First Item
                        </Button>
                    </div>
                </div>
            )}

            {/* --- Modals (Keep Existing Logic but Better UI) --- */}
            {showUploadModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-xl animate-in fade-in duration-300">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white dark:bg-slate-900 w-full max-w-lg max-h-[95vh] overflow-y-auto rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 custom-scrollbar"
                    >
                        <div className="p-5 md:p-8 space-y-4">
                            <div className="flex justify-between items-center mb-2">
                                <div className="space-y-0.5">
                                    <h2 className="text-xl font-black tracking-tight">
                                        {activeTab === 'staff' ? 'Add Staff Member' : 'Upload Content'}
                                    </h2>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">To: {activeCategoryName}</p>
                                </div>
                                <button onClick={() => setShowUploadModal(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div
                                className={`border-2 border-dashed rounded-3xl p-4 text-center cursor-pointer transition-all ${dragActive ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/10' : 'border-slate-100 dark:border-slate-200 hover:border-blue-400'}`}
                                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                                onDragLeave={() => setDragActive(false)}
                                onDrop={(e) => { e.preventDefault(); setDragActive(false); handleFiles(e.dataTransfer.files); }}
                                onClick={() => inputRef.current?.click()}
                            >
                                <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={e => e.target.files && handleFiles(e.target.files)} />
                                <div className="flex items-center justify-center gap-3">
                                    <div className="w-10 h-10 bg-blue-600/10 text-blue-600 rounded-xl flex items-center justify-center">
                                        <Upload className="h-5 w-5" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-slate-900 dark:text-slate-100 font-black text-sm">Tap to Browse</p>
                                        <p className="text-[10px] text-slate-500 font-bold">Standard image formats supported</p>
                                    </div>
                                </div>
                            </div>

                            {selectedFiles.length > 0 && (
                                <div className="flex gap-2 overflow-x-auto py-1 px-1 no-scrollbar">
                                    {selectedFiles.map((f, i) => (
                                        <div key={i} className="w-14 h-14 shrink-0 relative rounded-xl overflow-hidden border-2 border-slate-200 group">
                                            <img src={URL.createObjectURL(f)} className="w-full h-full object-cover" />
                                            <button
                                                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                                                className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="space-y-3">
                                {activeTab === 'staff' ? (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                                <input
                                                    placeholder="e.g. John Doe"
                                                    value={staffName}
                                                    onChange={e => setStaffName(e.target.value)}
                                                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-0 focus:ring-4 focus:ring-blue-600/10 transition-all font-bold text-sm"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Department</label>
                                                <input
                                                    placeholder="e.g. Maths Teacher"
                                                    value={staffPosition}
                                                    onChange={e => setStaffPosition(e.target.value)}
                                                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-0 focus:ring-4 focus:ring-blue-600/10 transition-all font-bold text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Message / Bio</label>
                                            <textarea
                                                placeholder="Short description or message..."
                                                value={staffBio}
                                                onChange={e => setStaffBio(e.target.value)}
                                                className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-0 focus:ring-4 focus:ring-blue-600/10 transition-all font-bold text-sm min-h-[80px] resize-none"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-1">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Caption (Optional)</label>
                                        <input
                                            placeholder="Details about this image..."
                                            value={caption}
                                            onChange={e => setCaption(e.target.value)}
                                            className="w-full p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-0 focus:ring-4 focus:ring-blue-600/10 transition-all font-bold text-sm"
                                        />
                                    </div>
                                )}
                            </div>

                            <Button
                                onClick={handleUploadSubmit}
                                disabled={!selectedFiles.length || uploading || (activeTab === 'staff' && !staffName.trim())}
                                className="w-full py-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-lg shadow-xl shadow-blue-500/20 disabled:scale-100"
                            >
                                {uploading ? <Loader2 className="animate-spin h-5 w-5" /> : activeTab === 'staff' ? 'Register Staff Member' : 'Begin Upload'}
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Add Category Modal */}
            {showAddCatModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-xl animate-in fade-in duration-300">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-8"
                    >
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black tracking-tight">New Category</h2>
                            <p className="text-slate-500 font-bold">Group your photos by events or themes.</p>
                        </div>

                        <input
                            autoFocus
                            placeholder="e.g. Annual Sports Day"
                            value={newCatName}
                            onChange={e => setNewCatName(e.target.value)}
                            className="w-full p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border-0 focus:ring-4 focus:ring-blue-600/10 transition-all font-bold text-lg"
                        />

                        <div className="flex gap-3">
                            <Button variant="outline" onClick={() => setShowAddCatModal(false)} className="flex-1 py-7 rounded-2xl font-black border-slate-200 dark:border-slate-700">
                                Cancel
                            </Button>
                            <Button onClick={handleAddCategory} disabled={!newCatName.trim()} className="flex-1 py-7 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-lg shadow-blue-500/20">
                                Create
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
