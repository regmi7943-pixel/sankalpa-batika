'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Photo {
    id: string;
    url: string;
    caption?: string;
}

interface HomepageGalleryPreviewProps {
    photos: Photo[];
}

export default function HomepageGalleryPreview({ photos }: HomepageGalleryPreviewProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedIndex === null) return;
        setSelectedIndex((prev) => (prev! + 1) % photos.length);
    }, [selectedIndex, photos.length]);

    const handlePrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedIndex === null) return;
        setSelectedIndex((prev) => (prev! - 1 + photos.length) % photos.length);
    }, [selectedIndex, photos.length]);

    const handleClose = () => setSelectedIndex(null);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') handleClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedIndex, handleNext, handlePrev]);

    if (photos.length === 0) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-square bg-surface rounded-xl md:rounded-2xl overflow-hidden relative border border-surface-dark/10">
                        <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                {photos.map((photo, i) => (
                    <div
                        key={photo.id || i}
                        onClick={() => setSelectedIndex(i)}
                        className="w-[calc(50%-12px)] sm:w-[calc(33%-12px)] md:w-[calc(25%-16px)] aspect-square bg-surface rounded-xl md:rounded-2xl overflow-hidden group cursor-pointer relative border border-surface-dark/10 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        <img
                            src={photo.url}
                            alt={photo.caption || 'School Moment'}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors flex items-center justify-center">
                            <div className="p-2 bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                <ZoomIn className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedIndex !== null && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
                    onClick={handleClose}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110] p-2 hover:bg-white/10 rounded-full"
                        onClick={handleClose}
                    >
                        <X className="h-8 w-8" />
                    </button>

                    {/* Navigation Buttons */}
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:bg-white/10 p-3 rounded-full transition-all hidden md:block z-[110]"
                        onClick={handlePrev}
                    >
                        <ChevronLeft className="h-10 w-10" />
                    </button>

                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:bg-white/10 p-3 rounded-full transition-all hidden md:block z-[110]"
                        onClick={handleNext}
                    >
                        <ChevronRight className="h-10 w-10" />
                    </button>

                    {/* Main Image */}
                    <div className="relative max-w-5xl max-h-[80vh] w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        <div className="relative w-full h-full">
                            <img
                                src={photos[selectedIndex].url}
                                alt="School Moment"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Caption & Counter */}
                        <div className="mt-6 text-center">
                            <p className="text-white text-lg font-medium">{photos[selectedIndex].caption}</p>
                            <p className="text-white/50 text-sm mt-1">
                                {selectedIndex + 1} / {photos.length}
                            </p>
                        </div>

                        {/* Mobile Navigation */}
                        <div className="flex md:hidden items-center gap-8 mt-6">
                            <button onClick={handlePrev} className="text-white/70 hover:text-white"><ChevronLeft className="h-8 w-8" /></button>
                            <button onClick={handleNext} className="text-white/70 hover:text-white"><ChevronRight className="h-8 w-8" /></button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
