'use client';

import { motion } from 'framer-motion';
import { getPageContent } from '@/app/actions/settings';
import { useEffect, useState } from 'react';
import { GraduationCap, Quote, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const defaultContent = {
    hero: { title: 'Alumni Association', subtitle: 'Connecting past and present' },
    stories: [
        { name: 'Dr. Ram Kumar', batch: '2070', achievement: 'MBBS Gold Medalist', quote: 'Sankalpa Vatika gave me the foundation I needed.' }
    ]
};

export default function AlumniPage() {
    const [content, setContent] = useState(defaultContent);

    useEffect(() => {
        const load = async () => {
            const result = await getPageContent('clubs_alumni');
            if (result.success && result.data) setContent({ ...defaultContent, ...result.data });
        };
        load();
    }, []);

    return (
        <div className="pt-20 pb-16 min-h-screen bg-slate-50">
            {/* Hero Section */}
            <section className="relative py-24 bg-[#1a2e35] text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-block mb-6 p-4 bg-white/5 rounded-full border border-white/10 backdrop-blur-md"
                    >
                        <GraduationCap className="w-12 h-12 text-amber-400" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-serif font-black mb-4 tracking-tight"
                    >
                        {content.hero.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-300 max-w-2xl mx-auto font-light"
                    >
                        {content.hero.subtitle}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8"
                    >
                        <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full px-8 py-6 text-lg shadow-lg shadow-amber-500/20">
                            Join the Network
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Stories Grid */}
            <div className="max-w-7xl mx-auto px-4 mt-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-black text-slate-800 mb-4">Success Stories</h2>
                    <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {content.stories.map((story: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all border border-slate-100 flex flex-col relative"
                        >
                            <Quote className="w-10 h-10 text-slate-200 absolute top-6 right-6" />

                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border-2 border-white shadow-lg">
                                    <span className="font-serif font-bold text-2xl text-slate-400">{story.name.charAt(0)}</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 leading-tight">{story.name}</h3>
                                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Batch {story.batch}</span>
                                </div>
                            </div>

                            <p className="text-slate-600 italic leading-relaxed mb-6 font-serif">
                                "{story.quote}"
                            </p>

                            <div className="mt-auto pt-6 border-t border-slate-50 flex items-center gap-2 text-slate-800 font-bold text-sm">
                                <Award className="w-4 h-4 text-amber-500" />
                                {story.achievement}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
