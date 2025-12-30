'use client';

import { motion } from 'framer-motion';
import { Coins, CreditCard, Award, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getPageContent } from '@/app/actions/settings';

const defaultContent = {
    title: 'Fee Structure',
    description: 'Transparent and affordable quality education. We believe in providing value for every rupee spent on your child\'s future.',
    admission: {
        title: 'Admission Fees',
        items: [
            { name: 'Admission Fee', amount: 'Rs. X,XXX' },
            { name: 'Security Deposit', amount: 'Rs. X,XXX (Refundable)' },
            { name: 'Prospectus & Form', amount: 'Rs. XXX' },
        ]
    },
    monthly: {
        title: 'Annual & Monthly Charges',
        items: [
            { name: 'Annual Charge', amount: 'Rs. X,XXX / Year' },
            { name: 'Tuition Fee (Nursery - UKG)', amount: 'Rs. X,XXX / Month' },
            { name: 'Tuition Fee (Grade 1 - 5)', amount: 'Rs. X,XXX / Month' },
            { name: 'Tuition Fee (Grade 6 - 8)', amount: 'Rs. X,XXX / Month' },
            { name: 'Tuition Fee (Grade 9 - 10)', amount: 'Rs. X,XXX / Month' },
        ]
    },
    bankDetails: {
        accountName: 'Sankalpa Vatika School',
        bankName: 'NIC Asia Bank, Lahan Branch',
        accountNumber: '1234567890XXX'
    },
    scholarships: [
        'Merit-based scholarships for class toppers.',
        'Sibling discount (15% for the younger child).',
        'Need-based financial aid for deserving students.'
    ],
    notes: [
        'Fees must be paid by the 10th of every Nepali month.',
        'Late fee will be charged after the due date.',
        'Annual charges cover stationery, medical, and exam fees.',
        'Transportation & Food fees are separate.'
    ]
};

export default function FeePolicyPage() {
    const [content, setContent] = useState(defaultContent);

    useEffect(() => {
        const load = async () => {
            const result = await getPageContent('admissions_fee');
            if (result.success && result.data) setContent(prev => ({ ...prev, ...result.data }));
        };
        load();
    }, []);

    return (
        <div className="pt-20 pb-16 min-h-screen bg-background">
            <section className="relative py-20 bg-gradient-to-br from-indigo-900 to-purple-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-black mb-6">{content.title}</h1>
                        <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto">
                            {content.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Fee Cards */}
                    <div className="bg-surface border border-border rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6 text-blue-600">
                            <Coins className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold mb-6">{content.admission.title} <br /><span className="text-sm font-normal text-muted">(One Time Only)</span></h3>
                        <div className="space-y-4">
                            {content.admission.items.map((item, i) => (
                                <div key={i} className="flex justify-between items-center py-3 border-b border-border">
                                    <span className="font-medium text-foreground">{item.name}</span>
                                    <span className="font-bold text-lg">{item.amount}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-muted mt-6 italic">
                            * Admission fee implies for new students only.
                        </p>
                    </div>

                    <div className="bg-surface border border-border rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-2xl mb-6 text-purple-600">
                            <CreditCard className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold mb-6">{content.monthly.title}</h3>
                        <div className="space-y-4">
                            {content.monthly.items.map((item, i) => (
                                <div key={i} className="flex justify-between items-center py-3 border-b border-border">
                                    <span className="font-medium text-foreground">{item.name}</span>
                                    <span className="font-bold text-lg">{item.amount}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Award className="w-6 h-6 text-amber-600" />
                            <h4 className="text-lg font-bold text-amber-800 dark:text-amber-200">Scholarships</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {(content.scholarships || []).map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-amber-500 font-bold">•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <CreditCard className="w-6 h-6 text-slate-600" />
                            <h4 className="text-lg font-bold">Bank Details</h4>
                        </div>
                        <div className="space-y-1 text-sm font-medium">
                            <div className="text-muted">Account Name</div>
                            <div className="text-lg font-bold text-foreground">{content.bankDetails.accountName}</div>
                            <div className="h-2"></div>
                            <div className="text-muted">Bank Name</div>
                            <div className="font-bold text-foreground">{content.bankDetails.bankName}</div>
                            <div className="h-2"></div>
                            <div className="text-muted">Account Number</div>
                            <div className="font-bold text-foreground font-mono bg-white dark:bg-slate-800 px-2 py-1 rounded inline-block">{content.bankDetails.accountNumber}</div>
                        </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-6 h-6 text-blue-600" />
                            <h4 className="text-lg font-bold text-blue-800 dark:text-blue-200">Note</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {(content.notes || []).map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="text-blue-500 font-bold">•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
