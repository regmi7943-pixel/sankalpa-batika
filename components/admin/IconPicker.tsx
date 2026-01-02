'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import * as LucideIcons from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, Heart } from 'lucide-react';

// Common icons list to prioritize or filter
const COMMON_ICONS = [
    'Award', 'Shield', 'Users', 'Zap', 'Heart', 'Star', 'Flag', 'Book',
    'GraduationCap', 'School', 'Target', 'Eye', 'Phone', 'Mail', 'MapPin',
    'Clock', 'Facebook', 'Instagram', 'Twitter', 'Youtube', 'Globe',
    'Lightbulb', 'Smile', 'Pen', 'Calendar', 'Bell', 'Camera', 'Music'
];

interface IconPickerProps {
    value: string;
    onChange: (iconName: string) => void;
    className?: string;
    children?: React.ReactNode;
}

export function IconPicker({ value, onChange, className = '', children }: IconPickerProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Get the icon component or fallback to Heart
    const CurrentIcon = (LucideIcons as any)[value] || Heart;

    // Filter icons based on search - memoized for performance
    const filteredIconNames = useMemo(() => {
        return Object.keys(LucideIcons).filter(name => {
            // Exclude internal Lucide stuff and focus on actual icons (PascalCase)
            if (name.startsWith('create') || name === 'default' || name === 'Lucide') return false;

            const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        }).slice(0, 50); // Limit results for performance
    }, [searchTerm]);

    // Handle escape key to close modal
    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen]);

    return (
        <>
            <div
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(true);
                }}
                className={`${className} cursor-pointer group relative transition-all duration-200 hover:ring-2 hover:ring-blue-500 overflow-hidden`}
                title="Click to change icon"
            >
                {/* Overlay with Pencil Icon - Centered */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200 pointer-events-none z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm transform scale-50 group-hover:scale-100 transition-transform duration-200"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
                </div>
                {children ? children : <CurrentIcon className="h-full w-full" />}
            </div>

            {/* Custom Modal via Portal to avoid CSS containing block issues */}
            {isOpen && mounted && createPortal(
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-fade-in"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setIsOpen(false);
                        }}
                    />
                    <div
                        className="relative w-full max-w-xl bg-surface dark:bg-slate-900 rounded-3xl shadow-2xl border border-surface-dark/10 dark:border-white/5 overflow-hidden flex flex-col animate-scale-up max-h-[80vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b border-surface-dark/10 dark:border-white/5 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-foreground">Select an Icon</h2>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsOpen(false);
                                }}
                                className="p-2 rounded-full hover:bg-surface-dark/10 dark:hover:bg-white/10 text-muted transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-6 pb-0">
                            <div className="relative" onClick={(e) => e.stopPropagation()}>
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search icons..."
                                    className="pl-9 h-12 bg-background/50"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    autoFocus
                                />
                                {searchTerm && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSearchTerm('');
                                        }}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 pt-4">
                            {/* Common Icons Section */}
                            {!searchTerm && (
                                <div className="mb-8">
                                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 px-1">Commonly Used</h3>
                                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                                        {COMMON_ICONS.map(name => {
                                            const IconNode = (LucideIcons as any)[name];
                                            if (!IconNode) return null;
                                            return (
                                                <button
                                                    key={name}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onChange(name);
                                                        setIsOpen(false);
                                                    }}
                                                    className={`aspect-square rounded-2xl flex items-center justify-center transition-all ${value === name
                                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-110 z-10'
                                                        : 'bg-background hover:bg-blue-50 text-foreground hover:text-blue-600 border border-surface-dark/10 dark:border-white/5'
                                                        }`}
                                                    title={name}
                                                >
                                                    <IconNode className="h-6 w-6" />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* All Icons / Search Results */}
                            <div>
                                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 px-1">
                                    {searchTerm ? 'Search Results' : 'All Icons'}
                                </h3>
                                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                                    {filteredIconNames.map(name => {
                                        const IconNode = (LucideIcons as any)[name];
                                        return (
                                            <button
                                                key={name}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onChange(name);
                                                    setIsOpen(false);
                                                }}
                                                className={`aspect-square rounded-2xl flex items-center justify-center transition-all ${value === name
                                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-110 z-10'
                                                    : 'bg-background hover:bg-blue-50 text-foreground hover:text-blue-600 border border-surface-dark/10 dark:border-white/5'
                                                    }`}
                                                title={name}
                                            >
                                                <IconNode className="h-6 w-6" />
                                            </button>
                                        );
                                    })}
                                </div>
                                {filteredIconNames.length === 0 && (
                                    <div className="text-center py-12 text-muted-foreground">
                                        No icons found matching "{searchTerm}"
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
