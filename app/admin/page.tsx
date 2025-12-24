'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    GraduationCap, ArrowRight, Award, Users, BookOpen, Shield,
    Star, Quote, ChevronDown, Bell, Calendar, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getPageContent, savePageContent } from '@/app/actions/settings';

// Editable Text Component
function EditableText({
    value,
    onChange,
    className = '',
    multiline = false,
    placeholder = 'Click to edit...'
}: {
    value: string;
    onChange: (val: string) => void;
    className?: string;
    multiline?: boolean;
    placeholder?: string;
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    useEffect(() => {
        setTempValue(value);
    }, [value]);

    if (isEditing) {
        if (multiline) {
            return (
                <textarea
                    autoFocus
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    onBlur={() => {
                        onChange(tempValue);
                        setIsEditing(false);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            setTempValue(value);
                            setIsEditing(false);
                        }
                    }}
                    className={`${className} bg-blue-50 border-2 border-blue-400 rounded px-2 py-1 outline-none resize-none w-full`}
                    rows={3}
                />
            );
        }
        return (
            <input
                autoFocus
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onBlur={() => {
                    onChange(tempValue);
                    setIsEditing(false);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onChange(tempValue);
                        setIsEditing(false);
                    }
                    if (e.key === 'Escape') {
                        setTempValue(value);
                        setIsEditing(false);
                    }
                }}
                className={`${className} bg-blue-50 border-2 border-blue-400 rounded px-2 py-1 outline-none w-full`}
            />
        );
    }

    return (
        <span
            onClick={() => setIsEditing(true)}
            className={`${className} cursor-pointer hover:bg-blue-100 hover:outline hover:outline-2 hover:outline-blue-400 hover:outline-dashed rounded px-1 -mx-1 transition-all inline-block`}
            title="Click to edit"
        >
            {value || placeholder}
        </span>
    );
}

// Default content
const defaultContent = {
    heroTitle: 'Sankalpa Batika',
    heroSubtitle: 'Excellence in Education',
    heroDescription: 'Nurturing minds, building character, and shaping the future leaders of tomorrow. Join our community of learners and explorers.',
    heroBadge: 'Admissions Open for 2025',
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
        { icon: 'BookOpen', title: 'Academic Excellence', description: 'Comprehensive curriculum designed to nurture critical thinking and creativity.' },
        { icon: 'Users', title: 'Expert Faculty', description: 'Dedicated teachers with years of experience in education.' },
        { icon: 'Award', title: 'Holistic Development', description: 'Focus on sports, arts, and extracurricular activities.' },
        { icon: 'Shield', title: 'Safe Environment', description: 'Secure campus with modern infrastructure and facilities.' },
    ],
    testimonialQuote: 'Sankalpa Batika has been instrumental in shaping my child\'s future. The dedicated faculty and nurturing environment have helped them grow both academically and personally.',
    testimonialAuthor: 'Parent of Grade 5 Student',
};

export default function AdminHomePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [content, setContent] = useState(defaultContent);

    // Load content on mount
    useEffect(() => {
        async function loadContent() {
            const result = await getPageContent('homepage');
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
        const result = await savePageContent('homepage', content);
        if (result.success) {
            alert('Changes saved successfully!');
        } else {
            alert('Failed to save changes: ' + result.error);
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

    return (
        <div className="relative">
            {/* Loading Overlay when saving */}
            {saving && (
                <div className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="bg-white p-4 rounded-xl shadow-2xl flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                        <span className="font-medium">Saving changes...</span>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center py-20">
                    <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 rounded-full px-4 py-2 mb-6">
                        <Star className="h-4 w-4 text-amber-400" />
                        <EditableText
                            value={content.heroBadge}
                            onChange={(val) => setContent({ ...content, heroBadge: val })}
                            className="text-amber-200 text-sm font-medium"
                        />
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-2">
                        <EditableText
                            value={content.heroTitle}
                            onChange={(val) => setContent({ ...content, heroTitle: val })}
                            className="bg-gradient-to-r from-white via-blue-100 to-amber-200 text-transparent bg-clip-text"
                        />
                    </h1>

                    <p className="text-xl md:text-2xl text-blue-200 mb-6">
                        <EditableText
                            value={content.heroSubtitle}
                            onChange={(val) => setContent({ ...content, heroSubtitle: val })}
                        />
                    </p>

                    <p className="text-lg text-blue-100/80 max-w-2xl mx-auto mb-8">
                        <EditableText
                            value={content.heroDescription}
                            onChange={(val) => setContent({ ...content, heroDescription: val })}
                            multiline
                        />
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-6 text-lg shadow-xl">
                            <EditableText value={content.ctaText} onChange={(val) => setContent({ ...content, ctaText: val })} />
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg">
                            <EditableText value={content.secondaryCtaText} onChange={(val) => setContent({ ...content, secondaryCtaText: val })} />
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
                        {content.stats.map((stat, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                                <div className="text-3xl font-bold text-white mb-1">
                                    <EditableText
                                        value={stat.value}
                                        onChange={(val) => {
                                            const newStats = [...content.stats];
                                            newStats[i] = { ...newStats[i], value: val };
                                            setContent({ ...content, stats: newStats });
                                        }}
                                    />
                                </div>
                                <div className="text-blue-200 text-sm">
                                    <EditableText
                                        value={stat.label}
                                        onChange={(val) => {
                                            const newStats = [...content.stats];
                                            newStats[i] = { ...newStats[i], label: val };
                                            setContent({ ...content, stats: newStats });
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <ChevronDown className="h-8 w-8 text-white/50 animate-bounce" />
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
                            <EditableText value={content.featuresTitle} onChange={(val) => setContent({ ...content, featuresTitle: val })} />
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto mt-4 rounded"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {content.features.map((feature, i) => {
                            const IconComponent = iconMap[feature.icon] || BookOpen;
                            return (
                                <Card key={i} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
                                    <CardContent className="p-6">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <IconComponent className="h-7 w-7 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                                            <EditableText
                                                value={feature.title}
                                                onChange={(val) => {
                                                    const newFeatures = [...content.features];
                                                    newFeatures[i] = { ...newFeatures[i], title: val };
                                                    setContent({ ...content, features: newFeatures });
                                                }}
                                            />
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            <EditableText
                                                value={feature.description}
                                                onChange={(val) => {
                                                    const newFeatures = [...content.features];
                                                    newFeatures[i] = { ...newFeatures[i], description: val };
                                                    setContent({ ...content, features: newFeatures });
                                                }}
                                                multiline
                                            />
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Quote className="h-16 w-16 text-amber-500/30 mx-auto mb-6" />
                    <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-6">
                        "<EditableText
                            value={content.testimonialQuote}
                            onChange={(val) => setContent({ ...content, testimonialQuote: val })}
                            multiline
                        />"
                    </blockquote>
                    <p className="text-amber-400 font-semibold">
                        <EditableText value={content.testimonialAuthor} onChange={(val) => setContent({ ...content, testimonialAuthor: val })} />
                    </p>
                </div>
            </section>

            {/* Quick Links */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="border-0 shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4">
                                <div className="flex items-center gap-2">
                                    <Bell className="h-5 w-5" />
                                    <h3 className="font-bold">Latest Notices</h3>
                                </div>
                            </div>
                            <CardContent className="p-4 space-y-3">
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="font-medium text-gray-900">Sample Notice</p>
                                    <p className="text-sm text-gray-500">Dec 20, 2024</p>
                                </div>
                                <Link href="/notices" className="text-blue-600 text-sm font-medium flex items-center gap-1">
                                    View All <ArrowRight className="h-4 w-4" />
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    <h3 className="font-bold">Upcoming Events</h3>
                                </div>
                            </div>
                            <CardContent className="p-4 space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="bg-blue-500 text-white rounded-lg p-2 text-center min-w-[50px]">
                                        <p className="text-xs font-bold">JAN</p>
                                        <p className="text-lg font-bold">15</p>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Annual Sports Day</p>
                                        <p className="text-sm text-gray-500">Main Ground</p>
                                    </div>
                                </div>
                                <Link href="/events" className="text-blue-600 text-sm font-medium flex items-center gap-1">
                                    View All <ArrowRight className="h-4 w-4" />
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}
