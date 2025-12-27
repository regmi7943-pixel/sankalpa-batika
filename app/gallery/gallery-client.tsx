'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { FileText, X, ChevronLeft, ChevronRight, Download, ImageIcon, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryClientProps {
    items: any[];
    categories: any[];
}

export function GalleryClient({ items, categories }: GalleryClientProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('all'); // 'all' is Glimpses

    const allImages = useMemo(() => items.filter(item => item.type === 'image'), [items]);
    const documents = useMemo(() => items.filter(item => item.type !== 'image'), [items]);

    const filteredImages = useMemo(() => {
        return allImages.filter(img => {
            if (activeCategory === 'all') {
                return !img.category || img.category === 'glimpses' || img.category === 'all';
            }
            return img.category === activeCategory;
        });
    }, [allImages, activeCategory]);

    const handleNext = useCallback(() => {
        if (selectedImageIndex === null) return;
        setSelectedImageIndex((prev) => (prev! + 1) % filteredImages.length);
    }, [selectedImageIndex, filteredImages.length]);

    const handlePrev = useCallback(() => {
        if (selectedImageIndex === null) return;
        setSelectedImageIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length);
    }, [selectedImageIndex, filteredImages.length]);

    const handleClose = useCallback(() => setSelectedImageIndex(null), []);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImageIndex === null) return;
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex, handleNext, handlePrev, handleClose]);

    return (
        <div className="space-y-16">
            {/* --- Premium Filters --- */}
            <div className="flex justify-center mb-12">
                <div className="flex flex-wrap items-center justify-center p-1.5 bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-[2rem] border border-slate-200/50 dark:border-slate-700/50 shadow-inner">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`relative px-6 py-2.5 rounded-full text-sm font-black tracking-tight transition-all duration-300 ${activeCategory === 'all' ? 'text-white' : 'text-muted hover:text-foreground'}`}
                    >
                        {activeCategory === 'all' && (
                            <motion.div layoutId="active-cat" className="absolute inset-0 bg-blue-600 rounded-full shadow-lg shadow-blue-600/25 -z-10" />
                        )}
                        Glimpses
                    </button>
                    {categories.filter(cat => cat.id !== 'slide' && cat.id !== 'staff').map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`relative px-6 py-2.5 rounded-full text-sm font-black tracking-tight transition-all duration-300 ${activeCategory === cat.id ? 'text-white' : 'text-muted hover:text-foreground'}`}
                        >
                            {activeCategory === cat.id && (
                                <motion.div layoutId="active-cat" className="absolute inset-0 bg-blue-600 rounded-full shadow-lg shadow-blue-600/25 -z-10" />
                            )}
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- Masonry Gallery Grid --- */}
            {filteredImages.length > 0 ? (
                <motion.div
                    layout
                    className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredImages.map((item, idx) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={item.id}
                                onClick={() => setSelectedImageIndex(idx)}
                                className="break-inside-avoid relative group rounded-[1.5rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-800/50"
                            >
                                <div className="relative">
                                    <Image
                                        src={item.url}
                                        alt={item.caption || 'Gallery Image'}
                                        width={600}
                                        height={800}
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 space-y-2">
                                            <p className="text-white font-black text-lg leading-tight">{item.caption}</p>
                                            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
                                                <ZoomIn className="h-4 w-4" />
                                                View Larger
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className="text-center py-32 bg-slate-50 dark:bg-slate-900/40 rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                    <ImageIcon className="h-20 w-20 text-muted/30 mx-auto mb-6" />
                    <p className="text-muted text-xl font-bold">No images match your selection.</p>
                </div>
            )}

            {/* --- Premium Documents Section --- */}
            {documents.length > 0 && (
                <div className="pt-24 space-y-12 text-left">
                    <div className="flex items-center gap-6">
                        <h2 className="text-3xl font-black text-foreground tracking-tight whitespace-nowrap">Documents</h2>
                        <div className="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-slate-800 to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {documents.map((doc) => (
                            <a
                                key={doc.id}
                                href={doc.url}
                                target="_blank"
                                rel="noreferrer"
                                className="group relative bg-surface dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-[2rem] p-10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-red-600/10 transition-colors"></div>
                                <div className="w-20 h-20 bg-red-600/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                    <FileText className="h-10 w-10 text-red-600" />
                                </div>
                                <h3 className="font-black text-xl text-foreground leading-tight mb-2 truncate">{doc.caption || 'Untitled Document'}</h3>
                                <p className="text-sm font-bold text-muted uppercase tracking-widest">PDF Resource</p>
                                <div className="mt-8 flex items-center gap-2 text-blue-600 font-black text-sm group-hover:translate-x-1 transition-transform">
                                    Download <Download className="h-4 w-4" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* --- Enhanced Lightbox --- */}
            <AnimatePresence>
                {selectedImageIndex !== null && filteredImages[selectedImageIndex] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-center p-4 md:p-8"
                        onClick={handleClose}
                    >
                        <button
                            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/40 hover:text-white transition-all z-[110] p-3 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md active:scale-90"
                            onClick={handleClose}
                        >
                            <X className="h-6 w-6 md:h-8 md:w-8" />
                        </button>

                        <div className="absolute inset-0 flex items-center justify-between px-4 md:px-10 pointer-events-none z-[105]">
                            <button
                                className="pointer-events-auto text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-4 md:p-6 rounded-full transition-all backdrop-blur-md active:scale-90"
                                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                            >
                                <ChevronLeft className="h-8 w-8 md:h-12 md:w-12" />
                            </button>
                            <button
                                className="pointer-events-auto text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-4 md:p-6 rounded-full transition-all backdrop-blur-md active:scale-90"
                                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                            >
                                <ChevronRight className="h-8 w-8 md:h-12 md:w-12" />
                            </button>
                        </div>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full h-full flex flex-col items-center justify-center gap-6 z-[102]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full flex-1 max-w-7xl max-h-[75vh] group shadow-2xl">
                                <Image
                                    src={filteredImages[selectedImageIndex].url}
                                    alt="Gallery Image"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            <div className="w-full max-w-5xl flex flex-col md:flex-row items-end justify-between gap-6 px-4 md:px-8">
                                <div className="space-y-2 text-left w-full">
                                    <h3 className="text-white text-2xl md:text-3xl font-black tracking-tight leading-tight">
                                        {filteredImages[selectedImageIndex].caption}
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        <span className="px-3 py-1 bg-white/10 rounded-lg text-white/50 font-black uppercase tracking-[0.2em] text-[10px]">
                                            Image {selectedImageIndex + 1} / {filteredImages.length}
                                        </span>
                                        <div className="h-px flex-1 bg-white/5" />
                                    </div>
                                </div>

                                <a
                                    href={filteredImages[selectedImageIndex].url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-shrink-0 flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-4 rounded-2xl font-black transition-all backdrop-blur-md active:scale-95 text-sm"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Download className="h-5 w-5 opacity-70" />
                                    Download Original
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
