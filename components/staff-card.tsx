'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, User } from 'lucide-react';

interface StaffCardProps {
    staff: {
        id: string;
        url: string;
        caption?: string;
    };
}

export default function StaffCard({ staff }: StaffCardProps) {
    const [showModal, setShowModal] = useState(false);
    // Parse caption: "Name - Department - Bio"
    const [name, department, bio] = (staff.caption || '').split(' - ');

    return (
        <>
            <div
                className={`group space-y-4 p-4 bg-background dark:bg-surface/50 rounded-3xl border border-surface-dark/10 shadow-sm hover:shadow-xl transition-all animate-fade-in relative ${bio ? 'cursor-pointer' : 'cursor-default'}`}
                onClick={() => bio && setShowModal(true)}
            >
                <div className="aspect-square bg-surface dark:bg-background rounded-2xl overflow-hidden border border-surface-dark/10 relative">
                    <img
                        src={staff.url}
                        alt={name || 'Staff Member'}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-transparent transition-colors"></div>

                    {/* Hover Show Message Indicator */}
                    {bio && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-[2px]">
                            <div className="bg-white text-blue-600 px-4 py-2 rounded-full text-xs font-black flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                <MessageSquare className="w-3.5 h-3.5" />
                                Show Message
                            </div>
                        </div>
                    )}
                </div>
                <div className="space-y-1">
                    <h3 className="font-bold text-foreground text-sm md:text-base line-clamp-1">{name || 'Staff Member'}</h3>
                    <p className="text-blue-600 dark:text-blue-400 text-[10px] md:text-xs font-semibold uppercase tracking-wider line-clamp-1">{department || 'Academic Department'}</p>
                </div>
            </div>

            {/* Bio Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowModal(false)}
                            className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row border border-slate-200 dark:border-slate-800"
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 z-10 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {/* Image Part */}
                            <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
                                <img
                                    src={staff.url}
                                    alt={name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content Part */}
                            <div className="flex-1 p-8 md:p-10 flex flex-col justify-center space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                                <div>
                                    <div className="w-12 h-12 bg-blue-600/10 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                                        {name}
                                    </h2>
                                    <p className="text-blue-600 font-bold uppercase tracking-widest text-xs mt-2">
                                        {department}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <MessageSquare className="w-4 h-4" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Message from Teacher</span>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed italic">
                                        "{bio}"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
