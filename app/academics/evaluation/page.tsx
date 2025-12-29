'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Target, Users, Award, Shield, Zap, Info, CheckCircle2, Loader2, Quote, Activity, ArrowRight } from 'lucide-react';
import { getPageContent } from '@/app/actions/settings';

const defaultEvaluation = {
    title: 'Evaluation & Assessment',
    description: 'We believe that assessment is an integral part of learning. Our system is designed to provide constructive feedback and track student progress holistically.',
    methods: [
        {
            title: 'Continuous Assessment (CAS)',
            description: 'Students are evaluated throughout the year based on class participation, projects, and assignments, reducing the pressure of one-time examinations.'
        },
        {
            title: 'Skill-Based Evaluation',
            description: 'We prioritize the application of knowledge. Assessments are designed to test practical skills, critical thinking, and creativity.'
        }
    ],
    progressTitle: 'Real-Time Progress Monitoring',
    progressText: 'Our advanced progress monitoring system allows parents to track their child\'s development in real-time through our dedicated digital portal.',
    feedbackPoints: [
        { title: 'Regular Feedback', text: 'Detailed monthly progress reports shared with parents.' },
        { title: 'Parent-Teacher Meetings', text: 'Scheduled one-on-one conferences for individual development plans.' }
    ],
    quote: 'Education is not the filling of a pail, but the lighting of a fire.'
};

export default function EvaluationPage() {
    const [content, setContent] = useState(defaultEvaluation);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const result = await getPageContent('academics-evaluation');
            if (result.success && result.data) {
                setContent({ ...defaultEvaluation, ...result.data });
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
                        Excellence through Growth
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

                {/* Assessment Methods Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-32">
                    {content.methods.map((method, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 rounded-[3rem] bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50 relative group overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/5 rounded-bl-[5rem] group-hover:bg-blue-600/10 transition-colors"></div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 shadow-xl flex items-center justify-center mb-8">
                                    <Activity className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-blue-600 mb-4">{method.title}</h3>
                                <p className="text-muted leading-relaxed text-lg">
                                    {method.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Progress Monitoring Dashboard Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
                    <div className="lg:col-span-12 xl:col-span-5 space-y-10">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-foreground leading-tight">{content.progressTitle}</h2>
                            <p className="text-xl text-muted leading-relaxed">
                                {content.progressText}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {content.feedbackPoints.map((point, i) => (
                                <div key={i} className="flex gap-6 group">
                                    <div className="w-12 h-12 rounded-2xl bg-surface-dark/5 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all overflow-hidden">
                                        <CheckCircle2 className="w-6 h-6 text-blue-600 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-foreground mb-1">{point.title}</h4>
                                        <p className="text-muted">{point.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-12 xl:col-span-7">
                        <div className="relative p-1 rounded-[4rem] bg-gradient-to-br from-blue-600/20 to-indigo-600/20 shadow-2xl overflow-hidden">
                            <div className="bg-surface dark:bg-slate-900 rounded-[3.9rem] p-8 md:p-12 relative overflow-hidden">
                                {/* Mock Dashboard UI Elements */}
                                <div className="space-y-8">
                                    <div className="flex justify-between items-center pb-6 border-b border-border">
                                        <div className="font-bold">Student Performance Portal</div>
                                        <div className="text-xs font-black text-blue-600 uppercase bg-blue-600/10 px-3 py-1 rounded-full">Active</div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-6">
                                        {[1, 2, 3].map((v) => (
                                            <div key={v} className="space-y-2">
                                                <div className="h-2 w-full bg-surface-dark/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-600 rounded-full w-4/5"></div>
                                                </div>
                                                <div className="text-[10px] font-bold text-muted uppercase">Subject {v}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="aspect-video rounded-3xl bg-blue-500/5 relative flex items-center justify-center border border-blue-500/10">
                                        <BarChart3 className="w-20 h-20 text-blue-600/20" />
                                        <div className="absolute inset-x-8 bottom-8 h-1/2 flex items-end justify-between gap-2">
                                            {[40, 70, 50, 90, 60, 80].map((h, i) => (
                                                <div key={i} className="w-full bg-blue-600/20 rounded-t-lg transition-all hover:bg-blue-600" style={{ height: `${h}%` }}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Inspirational Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center py-24 px-8 rounded-[4rem] bg-slate-900 text-white relative overflow-hidden border border-white/5"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                    <div className="relative z-10 space-y-8">
                        <Quote className="w-16 h-16 text-blue-600 mx-auto opacity-40 capitalize" />
                        <h2 className="text-3xl md:text-5xl font-black italic leading-tight px-4">
                            "{content.quote}"
                        </h2>
                        <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
