'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Home, Save, Star, TrendingUp, Quote, Image as ImageIcon,
    Plus, Trash2, GripVertical, Loader2, ArrowRight, BookOpen, Users, Award, Shield, Bell, Calendar
} from 'lucide-react';
import { getPageContent, savePageContent } from '@/app/actions/settings';
import link from 'next/link';
import { DeletableWrapper } from '@/components/admin/deletable-wrapper';
import { EditableText } from '@/components/admin/EditableText';
import { IconPicker } from '@/components/admin/IconPicker';
import { toast } from 'sonner';

// Default content
// Default content
const defaultContent = {
    heroTitle: 'Welcome to Sankalpa Vatika',
    heroSubtitle: 'Excellence in Education',
    heroDescription: 'Nurturing minds, building character, and shaping the future leaders of tomorrow. Join our community of learners and explorers.',
    heroBadge: 'Admissions Open for 2026',
    ctaText: 'Apply for Admission',
    secondaryCtaText: 'Learn More',
    stats: [
        { value: '500+', label: 'Students' },
        { value: '50+', label: 'Teachers' },
        { value: '15+', label: 'Years' },
        { value: '98%', label: 'Success Rate' },
    ],
    featuresTitle: 'Excellence in Every Aspect',
    features: [
        { icon: 'BookOpen', title: 'Academic Excellence', description: 'Comprehensive curriculum designed to nurture critical thinking.' },
        { icon: 'Users', title: 'Expert Faculty', description: 'Dedicated teachers with years of experience.' },
        { icon: 'Award', title: 'Holistic Development', description: 'Focus on sports, arts, and extracurricular activities.' },
        { icon: 'Shield', title: 'Safe Environment', description: 'Secure campus with modern facilities.' },
    ],
    // New structure
    testimonials: [
        {
            quote: 'Sankalpa Vatika has been instrumental in shaping my child\'s future. The dedicated faculty and nurturing environment have helped them grow both academically and personally.',
            author: 'Parent of Grade 5 Student'
        }
    ]
};

export default function AdminHomePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [content, setContent] = useState<any>(defaultContent);

    // Load content on mount
    useEffect(() => {
        async function loadContent() {
            const result = await getPageContent('homepage');
            if (result.success && result.data) {
                // Merge loaded data with defaults
                const loadedData = result.data;

                // Migration for old fields if they exist and testimonials doesn't
                if (!loadedData.testimonials && loadedData.testimonialQuote) {
                    loadedData.testimonials = [{
                        quote: loadedData.testimonialQuote,
                        author: loadedData.testimonialAuthor || 'Anonymous'
                    }];
                }

                setContent((prev: any) => ({ ...prev, ...loadedData }));
            }
            setLoading(false);
        }
        loadContent();
    }, []);

    // Save content
    const handleSave = async () => {
        setSaving(true);
        const result = await savePageContent('homepage', content);
        if (result.success) {
            toast.success('Homepage changes saved successfully!');
        } else {
            toast.error('Failed to save changes: ' + result.error);
        }
        setSaving(false);
    };

    // Update parent layout's save button
    useEffect(() => {
        const handleSaveEvent = () => handleSave();
        window.addEventListener('admin-save', handleSaveEvent);
        return () => window.removeEventListener('admin-save', handleSaveEvent);
    }, [content]);

    const iconMap: Record<string, any> = { BookOpen, Users, Award, Shield };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    const handleChange = (key: string, value: any) => {
        setContent((prev: any) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="relative">
            {/* Loading Overlay when saving */}
            {saving && (
                <div className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="bg-surface p-4 rounded-xl shadow-2xl flex items-center gap-3 border border-border">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                        <span className="font-medium text-foreground">Saving changes...</span>
                    </div>
                </div>
            )}

            {/* VISUAL EDITOR - HERO SECTION */}
            <div className="relative min-h-[85vh] flex items-center justify-center bg-blue-950 text-white overflow-hidden">
                {/* Background Fallback - Only visible if no slides (which is default here in admin unless we simulate slides) */}
                <div className="absolute inset-0 z-0 select-none pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900"></div>
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-amber-400 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-20 right-10 w-64 md:w-96 h-64 md:h-96 bg-blue-400 rounded-full blur-3xl"></div>
                    </div>
                    {/* Professional Dark Overlay */}
                    <div className="absolute inset-0 bg-black/70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/40 to-black/60" />
                </div>

                {/* Content Layer */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center pt-20 pb-20">
                    <div className="max-w-3xl space-y-6 md:space-y-8 animate-fade-in-up">

                        {/* Badge with Accent */}
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-12 bg-red-600 rounded-sm"></div>
                            <div className="space-y-1">
                                <div className="inline-flex items-center gap-2 text-red-400 font-bold uppercase tracking-widest text-sm">
                                    <Star className="h-3 w-3" />
                                    <EditableText
                                        value={content.heroBadge}
                                        onChange={(val) => handleChange('heroBadge', val)}
                                        className="min-w-[100px]"
                                    />
                                </div>
                                <div className="text-xl md:text-2xl text-blue-100 font-medium">
                                    <EditableText
                                        value={content.heroSubtitle}
                                        onChange={(val) => handleChange('heroSubtitle', val)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Main Title */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight drop-shadow-xl flex flex-wrap">
                            <EditableText
                                value={content.heroTitle}
                                onChange={(val) => handleChange('heroTitle', val)}
                                className="w-full min-w-[300px]"
                                multiline
                            />
                        </h1>

                        {/* Description */}
                        <div className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed drop-shadow-md border-l-4 border-white/20 pl-6">
                            <EditableText
                                value={content.heroDescription}
                                onChange={(val) => handleChange('heroDescription', val)}
                                multiline
                                className="w-full"
                            />
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button size="lg" className="w-full sm:w-auto bg-red-700 hover:bg-red-800 text-white text-lg uppercase tracking-wider font-bold rounded-none shadow-2xl border-l-4 border-red-500 p-0 h-auto min-h-[60px]">
                                <div className="px-8 py-4 flex items-center justify-center w-full h-full">
                                    <EditableText
                                        value={content.ctaText}
                                        onChange={(val) => handleChange('ctaText', val)}
                                        className="text-center min-w-[100px]"
                                    />
                                    <ArrowRight className="ml-3 h-5 w-5 flex-shrink-0" />
                                </div>
                            </Button>
                            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent hover:bg-white text-white hover:text-blue-950 border-2 border-white text-lg uppercase tracking-wider font-bold rounded-none transition-all p-0 h-auto min-h-[60px]">
                                <div className="px-8 py-4 flex items-center justify-center w-full h-full">
                                    <EditableText
                                        value={content.secondaryCtaText}
                                        onChange={(val) => handleChange('secondaryCtaText', val)}
                                        className="text-center min-w-[100px]"
                                    />
                                </div>
                            </Button>
                        </div>
                    </div>

                    {/* Stats Strip */}
                    <div className="mt-12 lg:self-end w-full lg:w-auto bg-blue-950/80 backdrop-blur-md border border-white/10 p-6 lg:p-10 lg:rounded-3xl shadow-xl">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                            {(content.stats || []).map((stat: any, i: number) => (
                                <DeletableWrapper
                                    key={i}
                                    onDelete={() => {
                                        const newStats = content.stats.filter((_: any, idx: number) => idx !== i);
                                        handleChange('stats', newStats);
                                    }}
                                    className="relative group"
                                >
                                    <div className="text-left group-hover:bg-white/5 p-2 rounded-lg transition-colors cursor-text">
                                        <div className="text-3xl md:text-4xl font-black text-white mb-1">
                                            <EditableText
                                                value={stat.value}
                                                onChange={(val) => {
                                                    const newStats = [...content.stats];
                                                    newStats[i].value = val;
                                                    handleChange('stats', newStats);
                                                }}
                                            />
                                        </div>
                                        <div className="text-blue-200 text-xs md:text-sm uppercase tracking-wider font-semibold">
                                            <EditableText
                                                value={stat.label}
                                                onChange={(val) => {
                                                    const newStats = [...content.stats];
                                                    newStats[i].label = val;
                                                    handleChange('stats', newStats);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </DeletableWrapper>
                            ))}
                            <button
                                onClick={() => handleChange('stats', [...(content.stats || []), { value: '0+', label: 'New Stat' }])}
                                className="flex flex-col items-center justify-center p-2 rounded-lg border-2 border-dashed border-white/20 text-white/50 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all"
                            >
                                <Plus className="h-6 w-6 mb-1" />
                                <span className="text-xs uppercase font-bold">Add Stat</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* VISUAL EDITOR - FEATURES SECTION */}
            <section className="py-20 bg-surface">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 flex justify-center">
                            <EditableText
                                value={content.featuresTitle}
                                onChange={(val) => setContent({ ...content, featuresTitle: val })}
                                className="min-w-[200px] text-center"
                            />
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto mt-4 rounded"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {content.features.map((feature: any, i: number) => {
                            const IconComponent = iconMap[feature.icon] || BookOpen;
                            return (
                                <DeletableWrapper
                                    key={i}
                                    onDelete={() => {
                                        const newFeatures = content.features.filter((_: any, index: number) => index !== i);
                                        setContent({ ...content, features: newFeatures });
                                    }}
                                >
                                    <div className="group hover:shadow-xl transition-all duration-300 bg-surface border rounded-xl overflow-hidden h-full flex flex-col p-6 relative">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform flex-shrink-0">
                                            <IconPicker
                                                value={feature.icon || 'BookOpen'}
                                                onChange={(newIcon) => {
                                                    const newFeatures = [...content.features];
                                                    newFeatures[i] = { ...newFeatures[i], icon: newIcon };
                                                    setContent({ ...content, features: newFeatures });
                                                }}
                                                className="w-7 h-7 text-white"
                                            />
                                        </div>
                                        <h3 className="text-lg font-bold text-foreground mb-2">
                                            <EditableText
                                                value={feature.title}
                                                onChange={(val) => {
                                                    const newFeatures = [...content.features];
                                                    newFeatures[i] = { ...newFeatures[i], title: val };
                                                    setContent({ ...content, features: newFeatures });
                                                }}
                                                className="w-full"
                                            />
                                        </h3>
                                        <div className="text-muted text-sm flex-1">
                                            <EditableText
                                                value={feature.description}
                                                onChange={(val) => {
                                                    const newFeatures = [...content.features];
                                                    newFeatures[i] = { ...newFeatures[i], description: val };
                                                    setContent({ ...content, features: newFeatures });
                                                }}
                                                multiline
                                                className="w-full h-full"
                                            />
                                        </div>
                                    </div>
                                </DeletableWrapper>
                            );
                        })}
                        {/* Add Feature Button */}
                        <Button
                            variant="outline"
                            className="border-dashed border-blue-200 text-blue-600 hover:bg-blue-50 h-auto py-12 rounded-xl flex flex-col gap-2"
                            onClick={() => {
                                setContent({
                                    ...content,
                                    features: [...content.features, { icon: 'BookOpen', title: 'New Feature', description: 'Description here' }]
                                });
                            }}
                        >
                            <Plus className="h-6 w-6" />
                            <span className="font-semibold">Add New Feature</span>
                        </Button>
                    </div>
                </div>
            </section>

            {/* VISUAL EDITOR - TESTIMONIAL SECTION */}
            <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">What Parents Say</h2>
                        <div className="w-20 h-1 bg-amber-500 mx-auto rounded"></div>
                    </div>

                    <div className={`${(content.testimonials?.length || 0) > 2
                        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                        : 'flex flex-col gap-8 max-w-4xl mx-auto'
                        }`}>
                        {(content.testimonials || []).map((testimonial: any, i: number) => (
                            <DeletableWrapper
                                key={i}
                                onDelete={() => {
                                    const newTestimonials = content.testimonials.filter((_: any, idx: number) => idx !== i);
                                    handleChange('testimonials', newTestimonials);
                                }}
                                className={`group relative ${(content.testimonials?.length || 0) > 2
                                    ? 'bg-white/5 p-6 rounded-xl hover:bg-white/10 transition-colors border border-white/10'
                                    : 'text-center'
                                    }`}
                            >
                                {(content.testimonials?.length || 0) > 2 ? (
                                    // Card Layout
                                    <div className="flex flex-col h-full">
                                        <Quote className="h-8 w-8 text-amber-500/50 mb-4" />
                                        <blockquote className="text-lg text-gray-300 leading-relaxed mb-6 flex-1 text-left">
                                            "<EditableText
                                                value={testimonial.quote}
                                                onChange={(val) => {
                                                    const newTestimonials = [...content.testimonials];
                                                    newTestimonials[i].quote = val;
                                                    handleChange('testimonials', newTestimonials);
                                                }}
                                                multiline
                                                className="w-full"
                                            />"
                                        </blockquote>
                                        <div className="text-amber-400 font-semibold text-left border-t border-white/10 pt-4 mt-auto">
                                            <EditableText
                                                value={testimonial.author}
                                                onChange={(val) => {
                                                    const newTestimonials = [...content.testimonials];
                                                    newTestimonials[i].author = val;
                                                    handleChange('testimonials', newTestimonials);
                                                }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    // Focused Layout (1-2 items)
                                    <div>
                                        <Quote className="h-16 w-16 text-amber-500/30 mx-auto mb-6" />
                                        <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-6">
                                            "<EditableText
                                                value={testimonial.quote}
                                                onChange={(val) => {
                                                    const newTestimonials = [...content.testimonials];
                                                    newTestimonials[i].quote = val;
                                                    handleChange('testimonials', newTestimonials);
                                                }}
                                                multiline
                                                className="w-full text-center"
                                            />"
                                        </blockquote>
                                        <p className="text-amber-400 font-semibold">
                                            <EditableText
                                                value={testimonial.author}
                                                onChange={(val) => {
                                                    const newTestimonials = [...content.testimonials];
                                                    newTestimonials[i].author = val;
                                                    handleChange('testimonials', newTestimonials);
                                                }}
                                                className="text-center"
                                            />
                                        </p>
                                    </div>
                                )}
                            </DeletableWrapper>
                        ))}
                    </div>

                    <button
                        onClick={() => handleChange('testimonials', [...(content.testimonials || []), { quote: 'Add your testimonial here...', author: 'Parent Name' }])}
                        className="mt-12 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm font-medium text-blue-200 hover:text-white"
                    >
                        <Plus className="h-4 w-4" />
                        Add Testimonial
                    </button>
                </div>
            </section>
        </div>
    );
}
