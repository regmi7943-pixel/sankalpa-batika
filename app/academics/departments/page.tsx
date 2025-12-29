'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Loader2, Award, Zap, Info, Shield } from 'lucide-react';
import { getPageContent } from '@/app/actions/settings';

const defaultDepartments = {
    title: 'HODs & Academic Departments',
    description: 'Expert guidance from academic leaders dedicated to excellence in their respective fields.',
    heroImage: '/images/academics/departments-img.png',
    heads: [
        {
            name: 'John Doe',
            role: 'Head of Mathematics',
            email: 'math.hod@sankalpa.edu',
            image: '/images/staff/hod-math.png'
        },
        {
            name: 'Jane Smith',
            role: 'Head of English',
            email: 'english.hod@sankalpa.edu',
            image: '/images/staff/hod-english.png'
        },
        {
            name: 'Robert Brown',
            role: 'Head of Science',
            email: 'science.hod@sankalpa.edu',
            image: '/images/staff/hod-science.png'
        }
    ]
};

export default function DepartmentsPage() {
    const [content, setContent] = useState(defaultDepartments);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const result = await getPageContent('academics-departments');
            if (result.success && result.data) {
                // Ensure default structure if fields missing
                const merged = { ...defaultDepartments, ...result.data };
                merged.heads = merged.heads.map((h: any, i: number) => ({
                    ...defaultDepartments.heads[i % defaultDepartments.heads.length],
                    ...h
                }));
                setContent(merged);
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
        <div className="pt-4 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-blue-600/10 text-blue-600 rounded-full"
                    >
                        Academic Leadership
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-extrabold text-foreground mb-6"
                    >
                        {content.title}
                    </motion.h1>
                    <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
                        {content.description}
                    </p>
                </div>

                {/* HOD Profile Section */}
                <div className="mb-24">
                    <div className="relative group rounded-[3rem] overflow-hidden mb-20 shadow-2xl h-[300px] md:h-[450px]">
                        <img
                            src={content.heroImage}
                            alt="Academic Team"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-10 left-10 text-white">
                            <h2 className="text-3xl font-bold">Excellence in Pedagogy</h2>
                            <p className="text-white/80 mt-2">Leading the next generation of thinkers.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
                        {content.heads.map((dep, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="group relative"
                            >
                                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl mb-6 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-colors duration-500 z-10"></div>
                                    {dep.image ? (
                                        <img
                                            src={dep.image}
                                            alt={dep.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                            }}
                                        />
                                    ) : null}
                                    <div className={`flex flex-col items-center justify-center text-center p-6 ${dep.image ? 'hidden' : ''}`}>
                                        <div className="w-24 h-24 rounded-full bg-blue-600/10 flex items-center justify-center mb-4 border-4 border-white dark:border-slate-900 shadow-xl">
                                            <span className="text-3xl font-black text-blue-600">
                                                {dep.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <div className="text-[10px] font-black text-blue-600/40 uppercase tracking-[0.2em]">Profile Pending</div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-20 text-center">
                                        <h3 className="text-2xl font-bold text-white mb-1">{dep.name}</h3>
                                        <p className="text-blue-400 font-medium">{dep.role}</p>
                                    </div>
                                </div>
                                <div className="space-y-4 px-2">
                                    <div className="flex items-center justify-center gap-3 text-muted group-hover:text-blue-600 transition-colors">
                                        <div className="p-2 rounded-full bg-surface-dark/10 group-hover:bg-blue-600/10 transition-colors">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-medium">{dep.email}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Join our team banner */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative p-1 overflow-hidden rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-600 group hover:shadow-2xl hover:shadow-blue-600/20 transition-all duration-500"
                >
                    <div className="relative bg-surface dark:bg-slate-900 rounded-[2.9rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-xl text-center md:text-left">
                            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-6 mx-auto md:mx-0">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-foreground mb-4">Dedicated to Academic Support</h2>
                            <p className="text-muted leading-relaxed text-lg">
                                Our departments work collaboratively to ensure a synchronized curriculum across all grades. Each HOD brings years of pedagogical expertise to lead their respective teams towards student success.
                            </p>
                        </div>
                        <button className="whitespace-nowrap px-10 py-5 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:-translate-y-1 active:scale-95 transition-all duration-300">
                            Meet Our Full Faculty
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
