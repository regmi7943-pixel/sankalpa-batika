'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, X, ChevronLeft, ChevronRight, Download, ImageIcon, ZoomIn } from 'lucide-react';

interface GalleryClientProps {
    items: any[];
    categories: any[];
}

export function GalleryClient({ items, categories }: GalleryClientProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('all');

    // Separate documents (always show at bottom)
    const documents = items.filter(item => item.type !== 'image');

    // Get all images
    const allImages = items.filter(item => item.type === 'image');

    // Filter images for Marquee
    const displayImages = activeCategory === 'all'
        ? allImages
        : allImages.filter(img => img.category === activeCategory);

    // Prepare images for infinite scroll (Duplicate to create seamless loop)
    // If few images, repeat more times to fill width
    const marqueeImages = displayImages.length > 0 && displayImages.length < 5
        ? [...displayImages, ...displayImages, ...displayImages, ...displayImages]
        : [...displayImages, ...displayImages];

    // Handlers for Lightbox Navigation
    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImageIndex === null) return;
        setSelectedImageIndex((prev) => (prev! + 1) % displayImages.length);
    }, [selectedImageIndex, displayImages.length]);

    const handlePrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImageIndex === null) return;
        setSelectedImageIndex((prev) => (prev! - 1 + displayImages.length) % displayImages.length);
    }, [selectedImageIndex, displayImages.length]);

    const handleClose = () => setSelectedImageIndex(null);

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
    }, [selectedImageIndex, handleNext, handlePrev]);

    return (
        <div className="space-y-12">

            {/* --- Category Tabs --- */}
            {categories.length > 0 && (
                <div className="flex justify-center flex-wrap gap-2 px-4 animate-fade-in">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === 'all'
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                            : 'bg-surface text-muted-foreground hover:bg-surface-dark'
                            }`}
                    >
                        All Photos
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.id
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                : 'bg-surface text-muted-foreground hover:bg-surface-dark'
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            )}

            {/* --- Gallery Display --- */}
            {displayImages.length > 0 ? (
                // Use marquee only when more than 4 images (can't fit in one row)
                displayImages.length > 4 ? (
                    // Running Train Marquee
                    <div className="overflow-hidden relative py-8">
                        <div className="relative group">
                            <div className="flex gap-8 animate-scroll-left w-max group-hover:paused">
                                {marqueeImages.map((item, idx) => (
                                    <div
                                        key={`${item.id}-${idx}`}
                                        className="w-[320px] h-[240px] md:w-[500px] md:h-[350px] flex-shrink-0 relative rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                                        onClick={() => {
                                            const index = displayImages.findIndex(img => img.id === item.id);
                                            setSelectedImageIndex(index);
                                        }}
                                    >
                                        <Image
                                            src={item.url}
                                            alt={item.caption || 'Gallery Image'}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 350px, 500px"
                                            priority={idx < 4}
                                        />
                                        <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
                                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                                            <p className="text-white font-medium truncate">{item.caption}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    // Static Centered Grid for few images
                    <div className="flex justify-center gap-6 flex-wrap px-4 py-8">
                        {displayImages.map((item, idx) => (
                            <div
                                key={item.id}
                                className="w-[320px] h-[240px] md:w-[400px] md:h-[280px] relative rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 group"
                                onClick={() => setSelectedImageIndex(idx)}
                            >
                                <Image
                                    src={item.url}
                                    alt={item.caption || 'Gallery Image'}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 350px, 400px"
                                    priority
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-white font-medium truncate">{item.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            ) : (
                <div className="text-center py-20 bg-surface rounded-2xl border border-surface-dark/10 mx-4">
                    <ImageIcon className="h-16 w-16 text-muted-light mx-auto mb-4" />
                    <p className="text-foreground font-medium">No images found in this category.</p>
                </div>
            )}


            {/* --- Documents Section (Static Grid) --- */}
            {documents.length > 0 && (
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                        <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                            <FileText className="text-red-500" />
                            Documents
                        </h2>
                        <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {documents.map((doc) => (
                            <a
                                key={doc.id}
                                href={doc.url}
                                target="_blank"
                                rel="noreferrer"
                                className="group block bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-all text-center hover:border-blue-400"
                            >
                                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <FileText className="h-8 w-8 text-red-500" />
                                </div>
                                <p className="font-semibold text-slate-800 truncate">{doc.caption || 'Untitled Document'}</p>
                                <p className="text-xs text-slate-500 mt-1">PDF Document</p>
                            </a>
                        ))}
                    </div>
                </div>
            )}


            {/* --- Lightbox Modal --- */}
            {selectedImageIndex !== null && displayImages[selectedImageIndex] && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
                    onClick={handleClose}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50 p-2 hover:bg-white/10 rounded-full"
                        onClick={handleClose}
                    >
                        <X className="h-8 w-8" />
                    </button>

                    {/* Navigation Buttons (Desktop) */}
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:bg-white/10 p-3 rounded-full transition-all hidden md:block"
                        onClick={handlePrev}
                    >
                        <ChevronLeft className="h-10 w-10" />
                    </button>

                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:bg-white/10 p-3 rounded-full transition-all hidden md:block"
                        onClick={handleNext}
                    >
                        <ChevronRight className="h-10 w-10" />
                    </button>

                    {/* Main Image */}
                    <div className="relative max-w-6xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        <div className="relative w-full h-full">
                            <Image
                                src={displayImages[selectedImageIndex].url}
                                alt="Gallery Image"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Caption & Counter */}
                        <div className="mt-4 text-center">
                            <p className="text-white text-lg font-medium">{displayImages[selectedImageIndex].caption}</p>
                            <p className="text-white/50 text-sm mt-1">
                                {selectedImageIndex + 1} / {displayImages.length}
                            </p>
                        </div>
                    </div>

                    {/* Download Button */}
                    <a
                        href={displayImages[selectedImageIndex].url}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute bottom-6 right-6 flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-all text-sm font-medium"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Download className="h-4 w-4" />
                        Original
                    </a>
                </div>
            )}
        </div>
    );
}
