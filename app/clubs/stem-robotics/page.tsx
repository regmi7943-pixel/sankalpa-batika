'use client';

import { motion } from 'framer-motion';
import { getPageContent } from '@/app/actions/settings';
import { useEffect, useState } from 'react';
import { Bot, Cpu, Zap } from 'lucide-react';

const defaultContent = {
    hero: { title: 'STEM & Robotics', subtitle: 'Innovating for the future' },
    projects: [
        { title: 'Solar Car', description: 'Students built a working prototype of a solar-powered car.' },
        { title: 'Lego Robotics', description: 'Basic programming and mechanics using Lego Mindstorms.' }
    ]
};

export default function StemPage() {
    const [content, setContent] = useState(defaultContent);

    useEffect(() => {
        const load = async () => {
            const result = await getPageContent('clubs_stem');
            if (result.success && result.data) setContent({ ...defaultContent, ...result.data });
        };
        load();
    }, []);

    return (
        <div className="pt-20 pb-16 min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-24 bg-indigo-950 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>

                {/* Decorative Elements */}
                <div className="absolute top-20 right-20 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-20 h-20 mx-auto mb-6 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/30 backdrop-blur-sm"
                    >
                        <Bot className="w-10 h-10 text-cyan-400" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400"
                    >
                        {content.hero.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-indigo-200 max-w-2xl mx-auto font-medium"
                    >
                        {content.hero.subtitle}
                    </motion.p>
                </div>
            </section>

            {/* Projects Grid */}
            <div className="max-w-7xl mx-auto px-4 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {content.projects.map((project: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-surface border border-border rounded-[2rem] p-8 shadow-lg hover:shadow-xl transition-all group overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-bl-[100px] transition-transform group-hover:scale-110"></div>

                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                                    <Cpu className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <Zap className="w-5 h-5 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {project.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
