'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, Users, Award, Shield, Zap, Info, Loader2, Heart, Eye } from 'lucide-react';
import { getPageContent } from '@/app/actions/settings';

const defaultIntro = {
    title: 'Academic Introduction',
    description: 'At Sankalpa Vatika, we go beyond textbook learning. Our academic program is designed to nurture critical thinking, creativity, and a lifelong passion for knowledge.',
    heroImage: '/images/academics/intro-hero.png',
    philosophyTitle: 'Our Educational Philosophy',
    philosophyText: 'We believe that every student is unique. Our approach combines rigorous academic standards with personalized attention, ensuring that each learner reaches their full potential in a supportive and stimulating environment.',
    highlights: [
        {
            title: 'Holistic Development',
            description: 'Integrating arts, sports, and academics for a well-rounded educational foundation.',
            icon: Heart
        },
        {
            title: 'Global Perspective',
            description: 'Curriculum designed to meet international standards while staying rooted in our heritage.',
            icon: Eye
        }
    ],
    futureLeadersTitle: 'Empowering Future Leaders',
    futureLeadersText: 'Our middle and secondary programs are meticulously structured to prepare students for the challenges of higher education and beyond. We integrate STEM projects, language proficiency, and leadership training into our core curriculum.',
    stats: [
        { label: 'SEE Pass Rate', value: '100%' },
        { label: 'Student-Teacher Ratio', value: '15:1' }
    ],
    studyImage: '/images/academics/study.png',
    groupImage: '/images/academics/group-work.png'
};

export default function AcademicsIntroduction() {
    const [content, setContent] = useState(defaultIntro);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const result = await getPageContent('academics-intro');
            if (result.success && result.data) {
                setContent({ ...defaultIntro, ...result.data });
            }
            setLoading(false);
        }
        load();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="pt-4 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-blue-600/10 text-blue-600 rounded-full">
                            Our Academic Journey
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-foreground mb-8 leading-tight">
                            {content.title}
                        </h1>
                        <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
                            {content.description}
                        </p>
                    </motion.div>
                </div>

                {/* Philosophy Section with Integrated Highlights */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-12 xl:col-span-5 space-y-12"
                    >
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-foreground leading-tight">
                                {content.philosophyTitle}
                            </h2>
                            <p className="text-xl text-muted leading-relaxed relative pl-8">
                                <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></span>
                                {content.philosophyText}
                            </p>
                        </div>

                        <div className="space-y-8">
                            {content.highlights.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-6 group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-surface-dark/5 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        {i % 2 === 0 ? <Heart className="w-6 h-6 text-blue-600 group-hover:text-white" /> : <Eye className="w-6 h-6 text-blue-600 group-hover:text-white" />}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                                        <p className="text-muted leading-relaxed">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-12 xl:col-span-7"
                    >
                        <div className="relative">
                            <div className="aspect-[16/10] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                                <img
                                    src={content.heroImage}
                                    alt="Learning Environment"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[3rem]"></div>
                            </div>
                            {/* Decorative element */}
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
                            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -z-10"></div>
                        </div>
                    </motion.div>
                </div>

                {/* Stats Section with New Visual Style */}
                <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-white overflow-hidden relative border border-white/5 shadow-2xl">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -mr-64 -mt-64"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                        <div className="space-y-10">
                            <div className="inline-block px-4 py-1.5 text-[10px] font-black tracking-[0.2em] uppercase bg-white/10 text-blue-400 rounded-full">
                                Vision & Impact
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">{content.futureLeadersTitle}</h2>
                            <p className="text-xl text-slate-400 leading-relaxed">
                                {content.futureLeadersText}
                            </p>
                            <div className="grid grid-cols-2 gap-8 pt-6">
                                {content.stats.map((stat, i) => (
                                    <div key={i} className="group cursor-default">
                                        <div className="text-4xl md:text-5xl font-black text-white mb-2 group-hover:text-blue-400 transition-colors">{stat.value}</div>
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6 relative">
                            <div className="space-y-6">
                                <img src={content.studyImage} className="rounded-3xl shadow-2xl aspect-[3/4] object-cover hover:scale-[1.02] transition-transform duration-500" alt="Study" />
                            </div>
                            <div className="space-y-6 mt-12">
                                <img src={content.groupImage} className="rounded-3xl shadow-2xl aspect-[3/4] object-cover hover:scale-[1.02] transition-transform duration-500" alt="Group Work" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
