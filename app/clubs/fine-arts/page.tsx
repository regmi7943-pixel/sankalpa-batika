'use client';

import { motion } from 'framer-motion';
import { getPageContent } from '@/app/actions/settings';
import { useEffect, useState } from 'react';
import { Palette, Music, Calendar } from 'lucide-react';

const defaultContent = {
    hero: { title: 'Fine Arts & Music', subtitle: 'Expressing creativity without bounds' },
    events: [
        { title: 'Annual Art Exhibition', date: 'Baisakh 15', description: 'Showcasing student artwork from all grades.' }
    ]
};

export default function FineArtsPage() {
    const [content, setContent] = useState(defaultContent);

    useEffect(() => {
        const load = async () => {
            const result = await getPageContent('clubs_arts');
            if (result.success && result.data) setContent({ ...defaultContent, ...result.data });
        };
        load();
    }, []);

    return (
        <div className="pt-20 pb-16 min-h-screen bg-neutral-50">
            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>

                {/* Abstract Shapes */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 right-0 w-64 h-64 border-4 border-white/20 rounded-full -mr-20 -mt-20"
                ></motion.div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center text-white">
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring" }}
                        className="inline-flex gap-4 mb-6"
                    >
                        <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                            <Palette className="w-6 h-6 text-white" />
                        </div>
                        <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                            <Music className="w-6 h-6 text-white" />
                        </div>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-sm"
                    >
                        {content.hero.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl text-white/90 font-medium max-w-2xl mx-auto"
                    >
                        {content.hero.subtitle}
                    </motion.p>
                </div>
            </section>

            {/* Events Grid */}
            <div className="max-w-6xl mx-auto px-4 mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {content.events.map((event: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all group"
                        >
                            <div className="h-48 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                                {/* Placeholder Pattern */}
                                <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center text-neutral-300">
                                    <Palette className="w-16 h-16" />
                                </div>
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-neutral-600 flex items-center gap-1 shadow-sm">
                                    <Calendar className="w-3 h-3" />
                                    {event.date}
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold mb-3 text-neutral-800">{event.title}</h3>
                                <p className="text-neutral-600 leading-relaxed">
                                    {event.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
