'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, Users, Award, Shield, Zap, Info, CheckCircle2, Loader2, Trophy, ArrowRight } from 'lucide-react';
import { getPageContent } from '@/app/actions/settings';

const defaultCurriculum = {
    title: 'Education System & Curriculum',
    description: 'At Sankalpa Vatika, we offer a comprehensive academic framework that integrates the National Curriculum of Nepal with international best practices.',
    heroImage: '/images/academics/curriculum-img.png',
    levels: [
        {
            title: 'Foundation Level',
            age: 'Ages 3-5 (Nursery to KG)',
            description: 'A play-based, nurturing environment where young learners develop social skills and early literacy through sensory activities.',
            points: ['Sensory-based learning', 'Creative expression', 'Basic literacy & numeracy']
        },
        {
            title: 'Primary Level',
            age: 'Ages 6-10 (Grade 1-5)',
            description: 'Focus on building strong foundations in core subjects through inquiry-based learning and activity-oriented pedagogy.',
            points: ['Core subject mastery', 'Language development', 'Critical thinking skills']
        },
        {
            title: 'Secondary Level',
            age: 'Ages 11-16 (Grade 6-10)',
            description: 'A rigorous academic program preparing students for SEE examinations while fostering leadership and technical skills.',
            points: ['Advanced STEM focus', 'Leadership training', 'SEE preparation']
        }
    ]
};

export default function CurriculumPage() {
    const [content, setContent] = useState(defaultCurriculum);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const result = await getPageContent('academics-curriculum');
            if (result.success && result.data) {
                setContent({ ...defaultCurriculum, ...result.data });
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
                {/* Header Section */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.2em] uppercase bg-blue-600/10 text-blue-600 rounded-full"
                    >
                        Building Strong Foundations
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-foreground mb-8 leading-tight"
                    >
                        {content.title}
                    </motion.h1>
                    <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
                        {content.description}
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative order-2 lg:order-1"
                    >
                        <div className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl">
                            <img
                                src={content.heroImage}
                                alt="Students in Classroom"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply"></div>
                        </div>
                        {/* Abstract shapes */}
                        <div className="absolute -top-12 -left-12 w-48 h-48 border-[20px] border-blue-600/5 rounded-full -z-10"></div>
                        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-amber-500/5 rounded-[4rem] -z-10 rotate-12"></div>
                    </motion.div>

                    <div className="space-y-10 order-1 lg:order-2">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-foreground leading-tight">Our Academic Pedagogy</h2>
                            <p className="text-lg text-muted leading-relaxed">
                                Our curriculum is a blend of international standards and local values. We focus on holistic development, ensuring that our students are well-prepared for the future through inquiry-based learning.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4 p-6 rounded-3xl bg-surface border border-border hover:shadow-xl transition-all group">
                                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <BookOpen className="w-6 h-6 text-blue-600 group-hover:text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground mb-1">Inquiry Based Learning</h4>
                                    <p className="text-sm text-muted">Encouraging curiosity and critical thinking across all grades.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-6 rounded-3xl bg-surface border border-border hover:shadow-xl transition-all group">
                                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Trophy className="w-6 h-6 text-blue-600 group-hover:text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground mb-1">Excellence in Outcomes</h4>
                                    <p className="text-sm text-muted">Striving for the best academic and personal results.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Education Levels Section */}
                <div className="space-y-16">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase tracking-tight">Structured Learning Stages</h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {content.levels.map((level, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-10 rounded-[3rem] bg-surface border border-border hover:border-blue-600/40 hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden relative"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-[4rem] group-hover:bg-blue-600/10 transition-colors"></div>
                                <div className="mb-8 relative z-10">
                                    <div className="text-xs font-black text-blue-600 uppercase tracking-widest mb-2 px-3 py-1 bg-blue-600/5 inline-block rounded-full">
                                        {level.age}
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mt-2">{level.title}</h3>
                                </div>
                                <p className="text-muted leading-relaxed mb-8 grow">
                                    {level.description}
                                </p>
                                <div className="space-y-4 pt-8 border-t border-border relative z-10">
                                    {(level.points || []).map((point, j) => (
                                        <div key={j} className="flex items-center gap-3 text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                                            {point}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 p-1 rounded-[4rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient-x"
                >
                    <div className="bg-slate-900 rounded-[3.9rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>
                        <div className="relative z-10 space-y-10 max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-black leading-tight">Invest in Your Child's Future Today</h2>
                            <p className="text-lg text-slate-400">Join our academic program and discover a world of possibilities through high-quality education.</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className="px-10 py-5 rounded-2xl bg-blue-600 text-white font-bold shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 transition-all group">
                                    Apply for Admission
                                    <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="px-10 py-5 rounded-2xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all backdrop-blur-md">Download Academic Prospectus</button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
