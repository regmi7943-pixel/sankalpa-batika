'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Home, Save, Star, TrendingUp, Quote, Image,
    Plus, Trash2, GripVertical
} from 'lucide-react';

export default function AdminHomepagePage() {
    // State for live preview
    const [heroContent, setHeroContent] = useState({
        heroTitle: 'Welcome to Sankalpa Vatika',
        heroSubtitle: 'Nurturing minds, building character, and shaping the future leaders of tomorrow.',
        heroDescription: 'We provide an environment where students can explore their potential and achieve academic excellence.',
        heroBadge: 'Admissions Open for 2025',
        ctaText: 'Apply for Admission',
        secondaryCtaText: 'Learn More'
    });

    const [stats, setStats] = useState([
        { value: '500+', label: 'Students' },
        { value: '50+', label: 'Teachers' },
        { value: '15+', label: 'Years' },
        { value: '98%', label: 'Success Rate' },
    ]);

    const [features, setFeatures] = useState([
        { title: 'Academic Excellence', description: 'Comprehensive curriculum designed to nurture critical thinking.' },
        { title: 'Expert Faculty', description: 'Dedicated teachers with years of experience.' },
        { title: 'Holistic Development', description: 'Focus on sports, arts, and extracurricular activities.' },
        { title: 'Safe Environment', description: 'Secure campus with modern facilities.' },
    ]);

    const handleHeroChange = (key: string, value: string) => {
        setHeroContent(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="space-y-6 md:space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-100">
                        <Home className="h-6 w-6 text-blue-600" />
                    </div>
                    Homepage Settings
                </h1>
                <p className="text-slate-500 mt-1">Customize your homepage content and see live changes.</p>
            </div>

            {/* LIVE PREVIEW SECTION */}
            <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 relative group">
                <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md z-20">
                    Live Preview
                </div>

                {/* Mock Hero Slider for Preview */}
                <div className="relative min-h-[500px] flex items-center justify-center bg-blue-950 text-white overflow-hidden">
                    {/* Background Fallback (since we can't easily mock the slider images here without fetching) */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900"></div>
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-amber-400 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-20 right-10 w-64 md:w-96 h-64 md:h-96 bg-blue-400 rounded-full blur-3xl"></div>
                        </div>
                        {/* Professional Dark Overlay */}
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/40 to-black/60" />
                    </div>

                    {/* Content Layer - MATCHING PUBLIC DESIGN */}
                    <div className="relative z-10 w-full max-w-5xl mx-auto px-8 h-full flex flex-col justify-center py-20">
                        <div className="max-w-3xl space-y-6">
                            {/* Badge with Accent */}
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-12 bg-red-600 rounded-sm"></div>
                                <div className="space-y-1">
                                    <div className="inline-flex items-center gap-2 text-red-400 font-bold uppercase tracking-widest text-xs">
                                        <Star className="h-3 w-3" />
                                        <span>{heroContent.heroBadge}</span>
                                    </div>
                                    <p className="text-lg text-blue-100 font-medium">
                                        {heroContent.heroSubtitle}
                                    </p>
                                </div>
                            </div>

                            <h1 className="text-5xl font-black text-white leading-tight drop-shadow-xl">
                                {heroContent.heroTitle}
                            </h1>

                            <p className="text-base text-gray-200 max-w-xl leading-relaxed border-l-4 border-white/20 pl-6">
                                {heroContent.heroDescription}
                            </p>

                            <div className="flex gap-4 pt-4">
                                <Button className="bg-red-700 text-white px-6 py-6 text-base uppercase font-bold rounded-none border-l-4 border-red-500">
                                    {heroContent.ctaText}
                                </Button>
                                <Button variant="outline" className="text-white border-white px-6 py-6 text-base uppercase font-bold rounded-none hover:bg-white hover:text-blue-950">
                                    {heroContent.secondaryCtaText}
                                </Button>
                            </div>
                        </div>

                        {/* Mock Stats Strip */}
                        <div className="absolute bottom-0 right-0 left-0 bg-blue-950/80 backdrop-blur-md border-t border-white/10 p-6">
                            <div className="grid grid-cols-4 gap-8">
                                {stats.map((stat, i) => (
                                    <div key={i} className="text-left">
                                        <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                                        <div className="text-blue-200 text-[10px] uppercase tracking-wider font-semibold">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Section Editor */}
            <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Hero Content
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Main Title</label>
                            <Input
                                value={heroContent.heroTitle}
                                onChange={(e) => handleHeroChange('heroTitle', e.target.value)}
                                className="bg-slate-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Badge Text</label>
                            <Input
                                value={heroContent.heroBadge}
                                onChange={(e) => handleHeroChange('heroBadge', e.target.value)}
                                className="bg-slate-50"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Subtitle (Next to Badge)</label>
                        <Input
                            value={heroContent.heroSubtitle}
                            onChange={(e) => handleHeroChange('heroSubtitle', e.target.value)}
                            className="bg-slate-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Description</label>
                        <textarea
                            value={heroContent.heroDescription}
                            onChange={(e) => handleHeroChange('heroDescription', e.target.value)}
                            rows={3}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:bg-white focus:border-blue-500 outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Primary Button</label>
                            <Input
                                value={heroContent.ctaText}
                                onChange={(e) => handleHeroChange('ctaText', e.target.value)}
                                className="bg-slate-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Secondary Button</label>
                            <Input
                                value={heroContent.secondaryCtaText}
                                onChange={(e) => handleHeroChange('secondaryCtaText', e.target.value)}
                                className="bg-slate-50"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Statistics Bar
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="flex-grow grid grid-cols-2 gap-4">
                                    <Input
                                        value={stat.value}
                                        onChange={(e) => {
                                            const newStats = [...stats];
                                            newStats[i].value = e.target.value;
                                            setStats(newStats);
                                        }}
                                        placeholder="Value"
                                        className="bg-white"
                                    />
                                    <Input
                                        value={stat.label}
                                        onChange={(e) => {
                                            const newStats = [...stats];
                                            newStats[i].label = e.target.value;
                                            setStats(newStats);
                                        }}
                                        placeholder="Label"
                                        className="bg-white"
                                    />
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => setStats(stats.filter((_, idx) => idx !== i))}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        className="w-full border-dashed gap-2"
                        onClick={() => setStats([...stats, { value: '', label: '' }])}
                    >
                        <Plus className="h-4 w-4" />
                        Add New Statistic
                    </Button>
                </CardContent>
            </Card>

            {/* Features Section - Kept as is for now, assuming user only cared about Hero syncing */}
            <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                    <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Features Section
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <div className="space-y-2 mb-4">
                        <label className="text-sm font-medium text-slate-700">Section Title</label>
                        <Input defaultValue="Excellence in Every Aspect" className="bg-slate-50" />
                    </div>

                    {features.map((feature, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-xl space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-slate-700">Feature {i + 1}</span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={() => setFeatures(features.filter((_, idx) => idx !== i))}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            <Input
                                value={feature.title}
                                onChange={(e) => {
                                    const newFeatures = [...features];
                                    newFeatures[i].title = e.target.value;
                                    setFeatures(newFeatures);
                                }}
                                placeholder="Feature Title"
                                className="bg-white"
                            />
                            <textarea
                                value={feature.description}
                                onChange={(e) => {
                                    const newFeatures = [...features];
                                    newFeatures[i].description = e.target.value;
                                    setFeatures(newFeatures);
                                }}
                                placeholder="Feature Description"
                                rows={2}
                                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 outline-none"
                            />
                        </div>
                    ))}

                    <Button
                        variant="outline"
                        className="w-full border-dashed gap-2"
                        onClick={() => setFeatures([...features, { title: '', description: '' }])}
                    >
                        <Plus className="h-4 w-4" />
                        Add Feature
                    </Button>
                </CardContent>
            </Card>

            {/* Testimonial Section - Kept as is */}
            <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <CardTitle className="flex items-center gap-2">
                        <Quote className="h-5 w-5" />
                        Featured Testimonial
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Testimonial Quote</label>
                        <textarea
                            defaultValue="Sankalpa Vatika has been instrumental in shaping my child's future. The dedicated faculty and nurturing environment have helped them grow both academically and personally."
                            rows={4}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:bg-white focus:border-blue-500 outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Author Name / Title</label>
                            <Input defaultValue="Parent of Grade 5 Student" className="bg-slate-50" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Location</label>
                            <Input defaultValue="Kathmandu, Nepal" className="bg-slate-50" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg px-8">
                    <Save className="h-4 w-4 mr-2" />
                    Save Homepage Settings
                </Button>
            </div>
        </div>
    );
}
