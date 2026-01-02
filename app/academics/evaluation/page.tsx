'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Target, Users, Award, Shield, Zap, Info, CheckCircle2, Loader2, Quote, Activity, ArrowRight, BookOpen, Heart, Star, Lightbulb, Compass, Globe, Rocket, Trophy, Clock } from 'lucide-react';
import { getPageContent } from '@/app/actions/settings';

const iconMap: { [key: string]: any } = {
    Activity, Target, Users, Award, Shield, Zap, Info, CheckCircle2,
    BookOpen, Heart, Star, Lightbulb, Compass, Globe, Rocket, Trophy, Clock, BarChart3
};

const defaultEvaluation = {
    title: 'Evaluation & Assessment',
    description: 'We believe that assessment is an integral part of learning. Our system is designed to provide constructive feedback and track student progress holistically.',
    methods: [
        {
            title: 'Continuous Assessment (CAS)',
            description: 'Students are evaluated throughout the year based on class participation, projects, and assignments, reducing the pressure of one-time examinations.',
            icon: 'Activity'
        },
        {
            title: 'Skill-Based Evaluation',
            description: 'We prioritize the application of knowledge. Assessments are designed to test practical skills, critical thinking, and creativity.',
            icon: 'Target'
        }
    ],
    progressTitle: 'Real-Time Progress Monitoring',
    progressText: 'Our advanced progress monitoring system allows parents to track their child\'s development in real-time through our dedicated digital portal.',
    feedbackPoints: [
        { title: 'Regular Feedback', text: 'Detailed monthly progress reports shared with parents.', icon: 'CheckCircle2' },
        { title: 'Parent-Teacher Meetings', text: 'Scheduled one-on-one conferences for individual student development.', icon: 'Users' }
    ],
    progressImage: '/images/academics/progress-monitoring.png',
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

    const renderIcon = (iconName: string, className: string = "w-8 h-8") => {
        const Icon = iconMap[iconName] || Activity;
        return <Icon className={className} />;
    };

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
                                    {renderIcon(method.icon || 'Activity', 'w-8 h-8 text-blue-600')}
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
                    <div className="lg:col-span-12 xl:col-span-6 space-y-10">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-bold text-foreground leading-tight">{content.progressTitle}</h2>
                            <p className="text-xl text-muted leading-relaxed">
                                {content.progressText}
                            </p>
                        </div>

                        <div className="flex flex-row flex-wrap gap-6 items-start">
                            {content.feedbackPoints.map((point, i) => (
                                <div key={i} className="flex gap-6 group w-fit">
                                    <div className="w-12 h-12 rounded-2xl bg-surface-dark/5 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all overflow-hidden border border-border/50">
                                        {renderIcon(point.icon || 'CheckCircle2', 'w-6 h-6 text-blue-600 group-hover:text-white')}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-foreground mb-1">{point.title}</h4>
                                        <p className="text-muted leading-relaxed">{point.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-12 xl:col-span-6 flex justify-center">
                        <div className="relative group rounded-[3rem] overflow-hidden shadow-2xl bg-surface border border-border w-1/2">
                            <img
                                src={content.progressImage || '/images/academics/progress-monitoring.png'}
                                alt="Progress Monitoring"
                                className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-x-8 bottom-8 p-8 rounded-[2.5rem] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/20 dark:border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                                        <Activity className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-black text-blue-600 uppercase tracking-widest">Digital Learning</div>
                                        <div className="font-bold text-foreground">Real-time Growth Tracking</div>
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
