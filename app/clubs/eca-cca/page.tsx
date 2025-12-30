'use client';

import { motion } from 'framer-motion';
import { getPageContent } from '@/app/actions/settings';
import { useEffect, useState } from 'react';
import { Activity, Award, Calendar } from 'lucide-react';

const defaultContent = {
    hero: { title: 'ECA & CCA', subtitle: 'Extra-Curricular and Co-Curricular Activities' },
    sections: [
        { title: 'Debate Club', content: 'Fostering critical thinking and public speaking skills.' },
        { title: 'Quiz Contest', content: 'Testing general knowledge and awareness.' }
    ]
};

export default function EcaPage() {
    const [content, setContent] = useState(defaultContent);

    useEffect(() => {
        const load = async () => {
            const result = await getPageContent('clubs_eca');
            if (result.success && result.data) setContent({ ...defaultContent, ...result.data });
        };
        load();
    }, []);

    return (
        <div className="pt-20 pb-16 min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 bg-blue-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black mb-4"
                    >
                        {content.hero.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-blue-100 max-w-2xl mx-auto"
                    >
                        {content.hero.subtitle}
                    </motion.p>
                </div>
            </section>

            {/* Content Sections */}
            <div className="max-w-5xl mx-auto px-4 mt-16 space-y-16">
                {content.sections.map((section: any, idx: number) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex flex-col md:flex-row gap-8 items-start bg-surface border border-border rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                            <Activity className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">{section.title}</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                {section.content}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
