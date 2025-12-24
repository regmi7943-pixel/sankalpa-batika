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
                <p className="text-slate-500 mt-1">Customize your homepage content</p>
            </div>

            {/* Hero Section */}
            <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                    <CardTitle className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Hero Section
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Main Headline</label>
                        <Input defaultValue="Welcome to Sankalpa Batika" className="bg-slate-50" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Subheadline</label>
                        <textarea
                            defaultValue="Nurturing minds, building character, and shaping the future leaders of tomorrow."
                            rows={2}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:bg-white focus:border-blue-500 outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Primary Button Text</label>
                            <Input defaultValue="Apply for Admission" className="bg-slate-50" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Secondary Button Text</label>
                            <Input defaultValue="Learn More" className="bg-slate-50" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Badge Text (Optional)</label>
                        <Input defaultValue="Admissions Open for 2025" className="bg-slate-50" placeholder="e.g., Now Enrolling!" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Hero Background Image</label>
                        <div className="flex items-center gap-4">
                            <div className="w-32 h-20 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs">
                                Current BG
                            </div>
                            <Button variant="outline" className="gap-2">
                                <Image className="h-4 w-4" />
                                Upload Image
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="border-0 shadow-sm overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Statistics Section
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <p className="text-sm text-slate-500">These stats are displayed in the hero section.</p>

                    {stats.map((stat, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                            <GripVertical className="h-5 w-5 text-slate-300 cursor-grab" />
                            <div className="flex-grow grid grid-cols-2 gap-4">
                                <Input
                                    value={stat.value}
                                    onChange={(e) => {
                                        const newStats = [...stats];
                                        newStats[i].value = e.target.value;
                                        setStats(newStats);
                                    }}
                                    placeholder="Value (e.g., 500+)"
                                    className="bg-white"
                                />
                                <Input
                                    value={stat.label}
                                    onChange={(e) => {
                                        const newStats = [...stats];
                                        newStats[i].label = e.target.value;
                                        setStats(newStats);
                                    }}
                                    placeholder="Label (e.g., Students)"
                                    className="bg-white"
                                />
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={() => setStats(stats.filter((_, idx) => idx !== i))}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}

                    <Button
                        variant="outline"
                        className="w-full border-dashed gap-2"
                        onClick={() => setStats([...stats, { value: '', label: '' }])}
                    >
                        <Plus className="h-4 w-4" />
                        Add Statistic
                    </Button>
                </CardContent>
            </Card>

            {/* Features Section */}
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

            {/* Testimonial Section */}
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
                            defaultValue="Sankalpa Batika has been instrumental in shaping my child's future. The dedicated faculty and nurturing environment have helped them grow both academically and personally."
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
