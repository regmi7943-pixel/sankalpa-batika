'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ {
    question: string;
    answer: string;
}

interface FaqSectionProps {
    faqs: FAQ[];
}

export function FaqSection({ faqs }: FaqSectionProps) {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    if (!faqs || faqs.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                    <span className="text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-wider">Questions?</span>
                    <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-2 mb-4">Frequently Asked</h2>
                    <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto rounded"></div>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="bg-surface/50 dark:bg-surface/30 backdrop-blur-sm rounded-2xl md:rounded-3xl overflow-hidden border border-surface-dark/10 hover:border-blue-500/30 transition-all duration-300"
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="w-full flex items-center justify-between p-5 md:p-8 text-left transition-colors hover:bg-surface/80"
                            >
                                <span className="font-bold text-foreground flex items-center gap-3 md:gap-4 flex-1 text-sm md:text-lg pr-4">
                                    <HelpCircle className="h-5 w-5 md:h-6 md:w-6 text-blue-500 flex-shrink-0" />
                                    {faq.question}
                                </span>
                                <div className={`p-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                                    <ChevronDown className="h-4 w-4 md:h-5 md:w-5" />
                                </div>
                            </button>

                            <AnimatePresence>
                                {openFaq === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <div className="px-5 md:px-8 pb-6 md:pb-10 pt-0 text-muted leading-relaxed text-sm md:text-base border-t border-surface-dark/5">
                                            <div className="pl-8 md:pl-10">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
