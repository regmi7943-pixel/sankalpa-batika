'use client';

import { motion } from 'framer-motion';
import { Shirt, Scissors, AlertCircle, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getPageContent } from '@/app/actions/settings';

const defaultContent = {
    title: 'School Uniform',
    description: 'A symbol of unity, discipline, and pride. Wearing the school uniform fosters a sense of belonging and equality among our students.',
    regular: {
        days: 'Sunday - Tuesday - Thursday',
        items: [
            'White shirt with school logo',
            'Navy blue trousers',
            'Black leather shoes',
            'Navy blue socks',
            'School tie & belt'
        ]
    },
    sports: {
        days: 'Monday - Wednesday - Friday',
        items: [
            'House T-Shirt (Red/Green/Yellow/Blue)',
            'White trousers or track pants with house stripes',
            'White canvas shoes with white socks',
            'School Tracksuit set (Winter)'
        ]
    },
    grooming: {
        hair: 'Boys must keep hair short and neat. Girls with long hair must braid it with red ribbons. No fancy haircuts or coloring allowed.',
        accessories: 'Minimal jewelry (small studs for girls). Watches allowed for Grade 6+. Smartwatches are prohibited.',
        nails: 'Nails must be trimmed short and kept clean. Nail polish is strictky prohibited.',
        hygiene: 'Uniforms must be washed and ironed. Shoes must be polished daily.'
    },
    vendor: {
        name: 'Sankalpa Stationaries',
        address: 'Main Road, Lahan',
        phone: '033-XXXXXX'
    },
    policyNote: 'Students without proper uniform may be sent home. Please ensure compliance from Day 1.'
};

export default function UniformPage() {
    const [content, setContent] = useState(defaultContent);

    useEffect(() => {
        const load = async () => {
            const result = await getPageContent('admissions_uniform');
            if (result.success && result.data) setContent(prev => ({ ...prev, ...result.data }));
        };
        load();
    }, []);

    return (
        <div className="pt-20 pb-16 min-h-screen bg-background">
            <section className="relative py-20 bg-gradient-to-r from-teal-900 to-emerald-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-black mb-6">{content.title}</h1>
                        <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto">
                            {content.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
                {/* Uniform Types */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-xl group">
                        <div className="h-64 bg-slate-100 dark:bg-slate-900 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors"></div>
                            {/* Placeholder for Uniform Image - In a real app, use next/image */}
                            <div className="text-center">
                                <Shirt className="w-20 h-20 text-blue-800 mx-auto mb-4 opacity-50" />
                                <span className="text-sm font-bold text-muted uppercase tracking-widest">Regular Uniform</span>
                            </div>
                        </div>
                        <div className="p-8">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <span className="w-3 h-8 bg-blue-600 rounded-full inline-block"></span>
                                Regular Days
                            </h3>
                            <div className="text-sm font-bold text-muted mb-4">{content.regular.days}</div>
                            <ul className="space-y-3 text-muted-foreground">
                                {content.regular.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="bg-surface border border-border rounded-3xl overflow-hidden shadow-xl group">
                        <div className="h-64 bg-slate-100 dark:bg-slate-900 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-orange-600/5 group-hover:bg-orange-600/10 transition-colors"></div>
                            <div className="text-center">
                                <Shirt className="w-20 h-20 text-orange-600 mx-auto mb-4 opacity-50" />
                                <span className="text-sm font-bold text-muted uppercase tracking-widest">Sports / House Uniform</span>
                            </div>
                        </div>
                        <div className="p-8">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <span className="w-3 h-8 bg-orange-500 rounded-full inline-block"></span>
                                Sports Days
                            </h3>
                            <div className="text-sm font-bold text-muted mb-4">{content.sports.days}</div>
                            <ul className="space-y-3 text-muted-foreground">
                                {content.sports.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Additional Guidelines */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-background border border-border rounded-2xl p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Scissors className="w-6 h-6 text-foreground" />
                            <h3 className="text-xl font-bold">Grooming Standards</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {(content.grooming && Object.entries(content.grooming).length > 0) ? Object.entries(content.grooming).map(([key, value]) => (
                                <div key={key}>
                                    <h4 className="font-bold mb-2 text-sm uppercase text-muted">{key}</h4>
                                    <p className="text-sm leading-relaxed mb-4">
                                        {value}
                                    </p>
                                </div>
                            )) : (
                                <>
                                    <div>
                                        <h4 className="font-bold mb-2 text-sm uppercase text-muted">Hair</h4>
                                        <p className="text-sm leading-relaxed mb-4">
                                            Boys must keep hair short and neat. Girls with long hair must braid it with red ribbons. No fancy haircuts or coloring allowed.
                                        </p>
                                    </div>
                                    {/* Fallback items if grooming is undefined initially or structure mismatch */}
                                </>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <ShoppingBag className="w-6 h-6 text-blue-600" />
                                <h4 className="text-lg font-bold text-blue-800 dark:text-blue-200">Where to Buy?</h4>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                                Uniforms and books are available at authorized vendors only to ensure quality and consistency.
                            </p>
                            <div className="p-4 bg-white dark:bg-black/20 rounded-xl border border-border">
                                <div className="font-bold">{content.vendor?.name}</div>
                                <div className="text-sm text-muted">{content.vendor?.address}</div>
                                <div className="text-sm text-muted">Ph: {content.vendor?.phone}</div>
                            </div>
                        </div>

                        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl p-6 flex gap-4">
                            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-1">Strict Policy</h4>
                                <p className="text-xs text-muted-foreground">
                                    {content.policyNote}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
