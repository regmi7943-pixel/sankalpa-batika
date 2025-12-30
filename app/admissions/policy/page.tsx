'use client';

import { motion } from 'framer-motion';
import { Shield, CheckCircle2, FileText, AlertCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getPageContent } from '@/app/actions/settings';
import { useEffect, useState } from 'react';

const defaultContent = {
    title: 'Admission Policy',
    description: 'Our admission process is designed to be fair, transparent, and inclusive, ensuring every child fits perfectly into the Sankalpa Vatika family.',
    eligibility: {
        age: [
            'Nursery: 3+ Years by Baisakh 1st',
            'LKG: 4+ Years',
            'UKG: 5+ Years',
            'Grade 1: 6+ Years'
        ],
        priorities: [
            'Siblings of current students',
            'Children of school staff',
            'Local residents within 2km radius',
            'Transfer cases (Government/Bank employees)'
        ]
    },
    documents: [
        'Birth Certificate (Original + Copy)',
        'Recent Passport Size Photos (4 pcs)',
        'Previous School Transfer Certificate (TC)',
        'Last Grade Marksheet/Report Card',
        'Citizenship Copy of Parents/Guardians',
        'Medical Record (if specific needs)'
    ]
};

export default function AdmissionPolicyPage() {
    const [content, setContent] = useState(defaultContent);

    useEffect(() => {
        const load = async () => {
            const result = await getPageContent('admissions_policy');
            if (result.success && result.data) setContent(prev => ({ ...prev, ...result.data }));
        };
        load();
    }, []);

    return (
        <div className="pt-20 pb-16 min-h-screen bg-background">
            <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-blue-100 text-sm font-medium mb-6 border border-white/10">
                            <Shield className="w-4 h-4" />
                            <span>Transparent & Merit-Based</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                            {content.title}
                        </h1>
                        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                            {content.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-20">
                <div className="bg-surface border border-border rounded-3xl p-8 md:p-12 shadow-xl space-y-12">

                    <div className="space-y-4 text-center">
                        <h2 className="text-2xl font-bold text-foreground">Guiding Principles</h2>
                        <p className="text-muted leading-relaxed">
                            Students are admitted to Sankalpa Vatika School based on their academic potential, character, and willingness to participate in our holistic education program. We strictly adhere to the guidelines set by the local education authority and the Ministry of Education, Nepal.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center mb-4">
                                <Calendar className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold mb-3 text-blue-800 dark:text-blue-200">Age Eligibility</h3>
                            <ul className="space-y-3">
                                {content.eligibility.age.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center mb-4">
                                <CheckCircle2 className="w-5 h-5 text-amber-600" />
                            </div>
                            <h3 className="text-lg font-bold mb-3 text-amber-800 dark:text-amber-200">Admission Priority</h3>
                            <ul className="space-y-3">
                                {content.eligibility.priorities.map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-border pb-4">
                            <FileText className="w-6 h-6 text-blue-600" />
                            <h3 className="text-xl font-bold">Mandatory Documents</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {content.documents.map((req, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                    <span className="text-sm font-medium">{req}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-slate-900 text-white p-8 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="flex-1 space-y-2">
                                <h4 className="text-lg font-bold flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-blue-400" />
                                    Inclusive Education
                                </h4>
                                <p className="text-slate-300 text-sm leading-relaxed">
                                    Sankalpa Vatika is committed to inclusive education. We welcome students with diverse learning needs and provide necessary support systems. Please declare any special requirements during the application process.
                                </p>
                            </div>
                            <Link href="/admissions/inquiry">
                                <Button className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white">Apply Now</Button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
