'use client';

import { Button } from '@/components/ui/button';
import { Calendar, Download, Paperclip, X } from 'lucide-react';
import { Notice } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { formatToNepaliDate } from '@/lib/nepali-date';

interface NoticeModalProps {
    isOpen: boolean;
    onClose: () => void;
    notice: Notice | null;
}

export default function NoticeModal({ isOpen, onClose, notice }: NoticeModalProps) {
    if (!notice) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="bg-surface dark:bg-slate-900 w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden relative flex flex-col z-10 border border-slate-200 dark:border-slate-800"
                    >
                        {/* Modal Header */}
                        <div className="p-6 md:p-8 border-b border-border bg-slate-50 dark:bg-slate-800/50 flex justify-between items-start gap-4">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                                    {notice.title}
                                </h2>
                                <div className="flex items-center gap-2 mt-3 text-sm text-muted">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                        {formatToNepaliDate(notice.createdAt).formatFull}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-muted hover:text-foreground hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-full transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                            <div className="prose dark:prose-invert max-w-none text-foreground/90 whitespace-pre-wrap text-base md:text-lg leading-relaxed">
                                {notice.content}
                            </div>

                            {notice.attachmentUrl && (
                                <div className="mt-8 pt-6 border-t border-border">
                                    <h4 className="text-sm font-semibold uppercase text-muted tracking-wider mb-3">Attachment</h4>
                                    <a
                                        href={notice.attachmentUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors group"
                                    >
                                        <div className="p-3 bg-white dark:bg-blue-950 rounded-lg shadow-sm text-blue-600 dark:text-blue-400">
                                            <Paperclip className="h-6 w-6" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-blue-900 dark:text-blue-100">View Attached Document</p>
                                            <p className="text-sm text-blue-700 dark:text-blue-300 opacity-80">Click to open or download</p>
                                        </div>
                                        <Download className="h-5 w-5 text-blue-500 group-hover:translate-y-1 transition-transform" />
                                    </a>
                                </div>
                            )}
                        </div>


                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
