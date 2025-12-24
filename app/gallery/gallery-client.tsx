'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getGallery } from '@/app/actions/gallery';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, X, ZoomIn, Download, ImageIcon, Filter } from 'lucide-react';

interface GalleryClientProps {
    items: any[];
}

export function GalleryClient({ items }: GalleryClientProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'image' | 'pdf'>('all');

    const filteredItems = items.filter(item =>
        filter === 'all' ? true : item.type === filter
    );

    return (
        <>
            {/* Filter Buttons */}
            <div className="flex items-center justify-center gap-3 mb-12">
                <Button
                    variant={filter === 'all' ? 'default' : 'outline'}
                    onClick={() => setFilter('all')}
                    className={filter === 'all' ? 'bg-blue-600' : ''}
                >
                    All
                </Button>
                <Button
                    variant={filter === 'image' ? 'default' : 'outline'}
                    onClick={() => setFilter('image')}
                    className={filter === 'image' ? 'bg-blue-600' : ''}
                >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Images
                </Button>
                <Button
                    variant={filter === 'pdf' ? 'default' : 'outline'}
                    onClick={() => setFilter('pdf')}
                    className={filter === 'pdf' ? 'bg-blue-600' : ''}
                >
                    <FileText className="h-4 w-4 mr-2" />
                    Documents
                </Button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <Card
                            key={item.id}
                            className="overflow-hidden group cursor-pointer card-hover"
                            onClick={() => item.type === 'image' && setSelectedImage(item.url)}
                        >
                            <CardContent className="p-0 relative aspect-square">
                                {item.type === 'image' ? (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={item.url}
                                            alt={item.caption || 'Gallery Image'}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <p className="text-white font-medium truncate">{item.caption || 'Untitled'}</p>
                                            </div>
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                                    <ZoomIn className="h-6 w-6 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-blue-50 group-hover:to-blue-100 transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="w-20 h-20 rounded-2xl bg-red-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <FileText className="h-10 w-10 text-red-500" />
                                        </div>
                                        <p className="text-gray-700 font-medium text-center px-4 truncate max-w-full">
                                            {item.caption || 'Document'}
                                        </p>
                                        <p className="text-gray-400 text-sm mt-1">Click to view PDF</p>
                                    </a>
                                )}
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 bg-gray-50 rounded-2xl">
                        <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">No items found</p>
                        <p className="text-gray-400 text-sm mt-1">Check back later for updates</p>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X className="h-8 w-8" />
                    </button>

                    <div className="relative max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={selectedImage}
                            alt="Gallery Image"
                            width={1200}
                            height={800}
                            className="object-contain w-full h-full rounded-lg"
                        />
                    </div>

                    <a
                        href={selectedImage}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Download className="h-5 w-5" />
                        Open Original
                    </a>
                </div>
            )}
        </>
    );
}
