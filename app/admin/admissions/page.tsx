'use client';

import { useState, useEffect } from 'react';
import { GraduationCap, CheckCircle, ChevronDown, HelpCircle, Loader2, Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPageContent, savePageContent } from '@/app/actions/settings';
import { DeletableWrapper } from '@/components/admin/deletable-wrapper';
import { Card, CardContent } from '@/components/ui/card';


import { EditableText } from '@/components/admin/EditableText';


const defaultContent = {
    pageTitle: 'Admissions',
    pageSubtitle: 'Begin your journey with Sankalpa Vatika. We welcome students who are eager to learn and grow.',
    sessionText: 'Admissions Open for 2025-26',
    steps: [
        { number: '01', title: 'Application', description: 'Fill out the online application form with required details.' },
        { number: '02', title: 'Document Submission', description: 'Submit all required documents for verification.' },
        { number: '03', title: 'Assessment', description: 'Students undergo a simple assessment or interaction.' },
        { number: '04', title: 'Admission Confirmation', description: 'Complete fee payment and receive confirmation.' },
    ],
    requirements: [
        'Birth Certificate (Original + Copy)',
        'Previous School Report Card / Marksheet',
        'Transfer Certificate (TC)',
        'Character Certificate',
        '4 Passport Size Photos',
        'Parents\' Citizenship Copy',
    ],
    faqs: [
        { question: 'What is the admission age for Nursery?', answer: 'Children must be at least 3 years old by the start of the academic session.' },
        { question: 'Is there an entrance test?', answer: 'For Nursery to Grade 1, we conduct a simple interaction. For Grade 2 and above, there is a basic written assessment.' },
        { question: 'What are the school timings?', answer: 'Our school operates from 9:00 AM to 4:00 PM, Sunday through Friday.' },
    ],
};

export default function AdminAdmissionsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [content, setContent] = useState(defaultContent);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    // Load content
    useEffect(() => {
        async function loadContent() {
            const result = await getPageContent('admissions');
            if (result.success && result.data) {
                setContent({ ...defaultContent, ...result.data });
            }
            setLoading(false);
        }
        loadContent();
    }, []);

    // Save content
    const handleSave = async () => {
        setSaving(true);
        const result = await savePageContent('admissions', content);
        if (result.success) {
            alert('Changes saved successfully!');
        } else {
            alert('Failed to save changes: ' + result.error);
        }
        setSaving(false);
    };

    // Listen to toolbar save button
    useEffect(() => {
        const handleSaveEvent = () => handleSave();
        window.addEventListener('admin-save', handleSaveEvent);
        return () => window.removeEventListener('admin-save', handleSaveEvent);
    }, [content]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Loading Overlay */}
            {saving && (
                <div className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="bg-surface p-4 rounded-xl shadow-2xl flex items-center gap-3 border border-border">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                        <span className="font-medium text-foreground">Saving changes...</span>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 rounded-full px-4 py-2 mb-6">
                        <GraduationCap className="h-4 w-4 text-amber-400" />
                        <EditableText value={content.sessionText} onChange={(val) => setContent({ ...content, sessionText: val })} className="text-amber-200 text-sm font-medium" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                        <EditableText value={content.pageTitle} onChange={(val) => setContent({ ...content, pageTitle: val })} />
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        <EditableText value={content.pageSubtitle} onChange={(val) => setContent({ ...content, pageSubtitle: val })} multiline />
                    </p>
                </div>
            </section>

            {/* Admission Steps */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">How It Works</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Admission Process</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto mt-4 rounded"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {content.steps.map((step, i) => (
                            <DeletableWrapper
                                key={i}
                                onDelete={() => {
                                    const newSteps = content.steps.filter((_, index) => index !== i);
                                    setContent({ ...content, steps: newSteps });
                                }}
                            >
                                <div className="relative p-6 bg-surface rounded-2xl h-full border border-transparent hover:border-blue-100 dark:hover:border-blue-900/50 transition-all text-center flex flex-col items-center">
                                    <div className="text-5xl font-bold text-blue-100 dark:text-blue-500/20 mb-4">
                                        <EditableText
                                            value={step.number}
                                            onChange={(val) => {
                                                const newSteps = [...content.steps];
                                                newSteps[i].number = val;
                                                setContent({ ...content, steps: newSteps });
                                            }}
                                        />
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-2">
                                        <EditableText
                                            value={step.title}
                                            onChange={(val) => {
                                                const newSteps = [...content.steps];
                                                newSteps[i].title = val;
                                                setContent({ ...content, steps: newSteps });
                                            }}
                                        />
                                    </h3>
                                    <p className="text-muted text-sm">
                                        <EditableText
                                            value={step.description}
                                            onChange={(val) => {
                                                const newSteps = [...content.steps];
                                                newSteps[i].description = val;
                                                setContent({ ...content, steps: newSteps });
                                            }}
                                            multiline
                                        />
                                    </p>
                                </div>
                            </DeletableWrapper>
                        ))}
                        {/* Add Step Button */}
                        <Button
                            variant="outline"
                            className="border-dashed border-blue-200 text-blue-600 hover:bg-blue-50 h-full min-h-[160px] rounded-2xl flex flex-col gap-2 p-6"
                            onClick={() => {
                                setContent({
                                    ...content,
                                    steps: [...content.steps, { number: '05', title: 'New Step', description: 'Step description here' }]
                                });
                            }}
                        >
                            <Plus className="h-6 w-6" />
                            <span className="font-semibold">Add Step</span>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Required Documents */}
            <section className="py-20 bg-surface">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Prepare These</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Required Documents</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto mt-4 rounded"></div>
                    </div>

                    <div className="bg-background rounded-2xl shadow-lg p-8 border border-border">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {content.requirements.map((req, i) => (
                                <DeletableWrapper
                                    key={i}
                                    onDelete={() => {
                                        const newReqs = content.requirements.filter((_, index) => index !== i);
                                        setContent({ ...content, requirements: newReqs });
                                    }}
                                >
                                    <div className="flex items-center gap-3 p-3 bg-surface rounded-xl">
                                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <EditableText
                                            value={req}
                                            onChange={(val) => {
                                                const newReqs = [...content.requirements];
                                                newReqs[i] = val;
                                                setContent({ ...content, requirements: newReqs });
                                            }}
                                            className="text-foreground"
                                        />
                                    </div>
                                </DeletableWrapper>
                            ))}
                            <div className="flex items-center justify-center p-3 border border-dashed border-green-200 bg-green-50/50 rounded-xl">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-600 hover:text-green-700 hover:bg-green-100 w-full h-8 gap-2"
                                    onClick={() => {
                                        setContent({
                                            ...content,
                                            requirements: [...content.requirements, 'New required document']
                                        });
                                    }}
                                >
                                    <Plus className="h-4 w-4" />
                                    <span>Add Requirement</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-20 bg-background">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Questions?</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Frequently Asked</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto mt-4 rounded"></div>
                    </div>

                    <div className="space-y-4">
                        {content.faqs.map((faq, i) => (
                            <DeletableWrapper
                                key={i}
                                onDelete={() => {
                                    const newFaqs = content.faqs.filter((_, index) => index !== i);
                                    setContent({ ...content, faqs: newFaqs });
                                }}
                            >
                                <div className="bg-surface rounded-xl overflow-hidden border border-transparent hover:border-blue-100 dark:hover:border-blue-900/50 transition-all">
                                    <div className="w-full flex items-center justify-between p-5 text-left bg-background">
                                        <span className="font-semibold text-foreground flex items-center gap-2 flex-1">
                                            <HelpCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
                                            <EditableText
                                                value={faq.question}
                                                onChange={(val) => {
                                                    const newFaqs = [...content.faqs];
                                                    newFaqs[i].question = val;
                                                    setContent({ ...content, faqs: newFaqs });
                                                }}
                                            />
                                        </span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-gray-400 hover:text-blue-600 ml-2"
                                            onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        >
                                            <ChevronDown className={`h-5 w-5 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                                        </Button>
                                    </div>
                                    <div className={`px-5 py-5 text-muted border-t border-border bg-background ${openFaq === i ? 'block' : 'hidden'}`}>
                                        <EditableText
                                            value={faq.answer}
                                            onChange={(val) => {
                                                const newFaqs = [...content.faqs];
                                                newFaqs[i].answer = val;
                                                setContent({ ...content, faqs: newFaqs });
                                            }}
                                            multiline
                                        />
                                    </div>
                                </div>
                            </DeletableWrapper>
                        ))}
                        {/* Add FAQ Button */}
                        <Button
                            variant="outline"
                            className="border-dashed border-blue-200 text-blue-600 hover:bg-blue-50 w-full py-8 rounded-xl flex items-center gap-2"
                            onClick={() => {
                                setContent({
                                    ...content,
                                    faqs: [...content.faqs, { question: 'New Question?', answer: 'New Answer here.' }]
                                });
                                setOpenFaq(content.faqs.length);
                            }}
                        >
                            <Plus className="h-5 w-5" />
                            <span className="font-semibold">Add New FAQ</span>
                        </Button>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Apply?</h2>
                    <p className="text-blue-100 mb-6">Start your child's journey with Sankalpa Vatika today.</p>
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8">
                        Start Application
                    </Button>
                </div>
            </section>
        </div>
    );
}
