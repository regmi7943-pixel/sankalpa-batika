'use client';

import { motion } from 'framer-motion';
import { ImageIcon } from 'lucide-react';

export function GalleryHero() {
    return (
        <section className="relative pt-20 pb-12 overflow-hidden">
            {/* Mesh Gradient Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="max-w-6xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative inline-block"
                >
                    {/* Floating Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 text-xs font-black uppercase tracking-widest mb-8">
                        <ImageIcon className="w-3.5 h-3.5" />
                        Visual Journey
                    </div>

                    {/* Refined Title */}
                    <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-none mb-6">
                        Captured <span className="text-blue-600">Moments</span>
                    </h1>

                    {/* Balanced Description */}
                    <p className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl mx-auto font-medium opacity-80">
                        Explore the vibrant life and academic excellence at Sankalpa Vatika through our curated collection of photos and documents.
                    </p>
                </motion.div>
            </div>

            {/* Subtle Bottom Divider */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
        </section>
    );
}
