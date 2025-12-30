'use client';

import { motion } from 'framer-motion';
import { getPageContent } from '@/app/actions/settings';
import { useEffect, useState } from 'react';
import { BookOpen, Quote, Star, User } from 'lucide-react';

const defaultContent = {
    hero: { title: 'Book Review Program', subtitle: 'Cultivating the habit of reading' },
    reviews: [
        { bookTitle: 'Muna Madan', author: 'Laxmi Prasad Devkota', studentName: 'Aarav Sharma', review: 'A heart-touching story about love and sacrifice.' }
    ]
};

export default function BookReviewPage() {
    const [content, setContent] = useState(defaultContent);

    useEffect(() => {
        const load = async () => {
            const result = await getPageContent('clubs_book');
            if (result.success && result.data) setContent({ ...defaultContent, ...result.data });
        };
        load();
    }, []);

    return (
        <div className="pt-20 pb-16 min-h-screen bg-[#fdfbf7]">
            {/* Hero Section */}
            <section className="relative py-24 bg-amber-900 text-amber-50 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-30"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ rotate: -10, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        className="inline-block mb-6"
                    >
                        <BookOpen className="w-16 h-16 text-amber-200" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-serif font-bold mb-4"
                    >
                        {content.hero.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-amber-100/90 max-w-2xl mx-auto italic font-serif"
                    >
                        "{content.hero.subtitle}"
                    </motion.p>
                </div>
            </section>

            {/* Reviews Grid */}
            <div className="max-w-6xl mx-auto px-4 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {content.reviews.map((review: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white border border-stone-200 rounded-t-lg rounded-br-3xl shadow-sm hover:shadow-xl transition-all p-8 flex flex-col relative group"
                        >
                            {/* Decorative Tape */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-amber-100/50 rotate-[-2deg] backdrop-blur-sm shadow-sm"></div>

                            <div className="mb-6">
                                <h3 className="text-2xl font-serif font-bold text-stone-800 leading-tight mb-1 group-hover:text-amber-700 transition-colors">
                                    {review.bookTitle}
                                </h3>
                                <p className="text-sm text-stone-500 font-medium uppercase tracking-wide">
                                    by {review.author}
                                </p>
                            </div>

                            <div className="flex-1">
                                <Quote className="w-8 h-8 text-amber-200 mb-2" />
                                <p className="text-stone-600 leading-relaxed italic font-serif">
                                    {review.review}
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center">
                                        <User className="w-5 h-5 text-stone-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-stone-700">{review.studentName}</div>
                                        <div className="text-xs text-stone-500">Student Reviewer</div>
                                    </div>
                                </div>
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
