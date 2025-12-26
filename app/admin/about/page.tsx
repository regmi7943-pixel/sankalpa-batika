'use client';

import { useState, useEffect } from 'react';
import { Target, Eye, Heart, Loader2, Plus } from 'lucide-react';
import { getPageContent, savePageContent } from '@/app/actions/settings';
import { DeletableWrapper } from '@/components/admin/deletable-wrapper';
import { Button } from '@/components/ui/button';
import { EditableText } from '@/components/admin/EditableText';
import { IconPicker } from '@/components/admin/IconPicker';
import * as LucideIcons from 'lucide-react';
import { toast } from 'sonner';




const defaultContent = {
    pageTitle: 'About Sankalpa Vatika',
    pageSubtitle: 'A premier educational institution committed to nurturing young minds and building future leaders.',
    missionTitle: 'Our Mission',
    missionText: 'To provide a safe, nurturing, and stimulating learning environment where every child can discover their potential.',
    missionIcon: 'Target',
    missionPoints: [
        'Foster critical thinking and creativity',
        'Promote moral values and ethics',
        'Encourage physical and emotional well-being',
    ],
    visionTitle: 'Our Vision',
    visionText: 'To be a center of excellence in education that inspires students to become global citizens.',
    visionIcon: 'Eye',
    visionPoints: [
        'Leading institution in holistic education',
        'Preparing students for global challenges',
        'Building responsible citizens',
    ],
    values: [
        { title: 'Excellence', description: 'Striving for the highest standards in education.', icon: 'Award' },
        { title: 'Integrity', description: 'Building character through honesty and ethics.', icon: 'Shield' },
        { title: 'Community', description: 'Fostering a sense of belonging and teamwork.', icon: 'Users' },
        { title: 'Innovation', description: 'Embracing new ideas and modern teaching methods.', icon: 'Zap' },
    ],
    timeline: [
        { year: '2010', title: 'School Founded', description: 'Established with a vision to provide quality education.' },
        { year: '2015', title: 'New Campus', description: 'Moved to our current modern facility.' },
        { year: '2018', title: 'Recognition', description: 'Awarded Best School in District.' },
        { year: '2023', title: 'Digital Initiative', description: 'Launched smart classrooms.' },
    ],
};

export default function AdminAboutPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [content, setContent] = useState(defaultContent);

    // Load content
    useEffect(() => {
        async function loadContent() {
            const result = await getPageContent('about');
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
        const result = await savePageContent('about', content);
        if (result.success) {
            toast.success('Changes saved successfully!');
        } else {
            toast.error('Failed to save changes: ' + result.error);
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
                    <div className="absolute top-0 left-0 w-72 h-72 bg-amber-400 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                        <EditableText value={content.pageTitle} onChange={(val) => setContent({ ...content, pageTitle: val })} />
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        <EditableText value={content.pageSubtitle} onChange={(val) => setContent({ ...content, pageSubtitle: val })} multiline />
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Mission */}
                        <div className="bg-gradient-to-br from-blue-50 to-background dark:from-blue-950/30 dark:to-background p-8 rounded-3xl border border-blue-100 dark:border-blue-900/50">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-6 overflow-hidden">
                                <IconPicker
                                    value={content.missionIcon || 'Target'}
                                    onChange={(newIcon) => setContent({ ...content, missionIcon: newIcon })}
                                    className="w-8 h-8 text-white"
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-4">
                                <EditableText value={content.missionTitle} onChange={(val) => setContent({ ...content, missionTitle: val })} />
                            </h2>
                            <p className="text-muted leading-relaxed mb-4">
                                <EditableText value={content.missionText} onChange={(val) => setContent({ ...content, missionText: val })} multiline />
                            </p>
                            <ul className="space-y-2 text-muted">
                                {content.missionPoints.map((point, i) => (
                                    <li key={i}>
                                        <DeletableWrapper
                                            onDelete={() => {
                                                const newPoints = content.missionPoints.filter((_, index) => index !== i);
                                                setContent({ ...content, missionPoints: newPoints });
                                            }}
                                            className="flex items-start gap-2"
                                        >
                                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                            <EditableText
                                                value={point}
                                                onChange={(val) => {
                                                    const newPoints = [...content.missionPoints];
                                                    newPoints[i] = val;
                                                    setContent({ ...content, missionPoints: newPoints });
                                                }}
                                            />
                                        </DeletableWrapper>
                                    </li>
                                ))}
                                <div className="pt-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 h-8 px-2 gap-1"
                                        onClick={() => {
                                            setContent({ ...content, missionPoints: [...content.missionPoints, 'New mission point'] });
                                        }}
                                    >
                                        <Plus className="h-4 w-4" />
                                        <span>Add Point</span>
                                    </Button>
                                </div>
                            </ul>
                        </div>

                        {/* Vision */}
                        <div className="bg-gradient-to-br from-amber-50 to-background dark:from-amber-950/30 dark:to-background p-8 rounded-3xl border border-amber-100 dark:border-amber-900/50">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mb-6 overflow-hidden">
                                <IconPicker
                                    value={content.visionIcon || 'Eye'}
                                    onChange={(newIcon) => setContent({ ...content, visionIcon: newIcon })}
                                    className="w-8 h-8 text-white"
                                />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-4">
                                <EditableText value={content.visionTitle} onChange={(val) => setContent({ ...content, visionTitle: val })} />
                            </h2>
                            <p className="text-muted leading-relaxed mb-4">
                                <EditableText value={content.visionText} onChange={(val) => setContent({ ...content, visionText: val })} multiline />
                            </p>
                            <ul className="space-y-2 text-muted">
                                {content.visionPoints.map((point, i) => (
                                    <li key={i}>
                                        <DeletableWrapper
                                            onDelete={() => {
                                                const newPoints = content.visionPoints.filter((_, index) => index !== i);
                                                setContent({ ...content, visionPoints: newPoints });
                                            }}
                                            className="flex items-start gap-2"
                                        >
                                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                                            <EditableText
                                                value={point}
                                                onChange={(val) => {
                                                    const newPoints = [...content.visionPoints];
                                                    newPoints[i] = val;
                                                    setContent({ ...content, visionPoints: newPoints });
                                                }}
                                            />
                                        </DeletableWrapper>
                                    </li>
                                ))}
                                <div className="pt-4">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 h-8 px-2 gap-1"
                                        onClick={() => {
                                            setContent({ ...content, visionPoints: [...content.visionPoints, 'New vision point'] });
                                        }}
                                    >
                                        <Plus className="h-4 w-4" />
                                        <span>Add Point</span>
                                    </Button>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-surface">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">What We Believe</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Our Core Values</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto mt-4 rounded"></div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {content.values.map((value, i) => (
                            <DeletableWrapper
                                key={i}
                                onDelete={() => {
                                    const newValues = content.values.filter((_, index) => index !== i);
                                    setContent({ ...content, values: newValues });
                                }}
                            >
                                <div className="text-center group h-full p-4 bg-background rounded-2xl shadow-sm border border-transparent hover:border-blue-100 dark:hover:border-blue-900/50 transition-all">
                                    <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                                        <IconPicker
                                            value={value.icon || 'Heart'}
                                            onChange={(newIcon) => {
                                                const newValues = [...content.values];
                                                newValues[i].icon = newIcon;
                                                setContent({ ...content, values: newValues });
                                            }}
                                            className="w-8 h-8 text-blue-600"
                                        />
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground mb-2">
                                        <EditableText
                                            value={value.title}
                                            onChange={(val) => {
                                                const newValues = [...content.values];
                                                newValues[i].title = val;
                                                setContent({ ...content, values: newValues });
                                            }}
                                        />
                                    </h3>
                                    <p className="text-muted text-sm">
                                        <EditableText
                                            value={value.description}
                                            onChange={(val) => {
                                                const newValues = [...content.values];
                                                newValues[i].description = val;
                                                setContent({ ...content, values: newValues });
                                            }}
                                        />
                                    </p>
                                </div>
                            </DeletableWrapper>
                        ))}
                        {/* Add Value Button */}
                        <Button
                            variant="outline"
                            className="border-dashed border-blue-200 text-blue-600 hover:bg-blue-50 h-full min-h-[160px] rounded-2xl flex flex-col gap-2 p-6"
                            onClick={() => {
                                setContent({
                                    ...content,
                                    values: [...content.values, { title: 'New Value', description: 'Description', icon: 'Heart' }]
                                });
                            }}
                        >
                            <Plus className="h-6 w-6" />
                            <span className="font-semibold">Add Value</span>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20 bg-background">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Journey</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">School History</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto mt-4 rounded"></div>
                    </div>

                    <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800"></div>

                        {content.timeline.map((item, i) => (
                            <DeletableWrapper
                                key={i}
                                onDelete={() => {
                                    const newTimeline = content.timeline.filter((_, index) => index !== i);
                                    setContent({ ...content, timeline: newTimeline });
                                }}
                                className="mb-8"
                            >
                                <div className="relative flex items-start gap-8">
                                    <div className="z-10 flex-shrink-0">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg text-sm">
                                            <EditableText
                                                value={item.year}
                                                onChange={(val) => {
                                                    const newTimeline = [...content.timeline];
                                                    newTimeline[i].year = val;
                                                    setContent({ ...content, timeline: newTimeline });
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex-1 p-4 bg-surface rounded-xl">
                                        <h3 className="text-lg font-bold text-foreground">
                                            <EditableText
                                                value={item.title}
                                                onChange={(val) => {
                                                    const newTimeline = [...content.timeline];
                                                    newTimeline[i].title = val;
                                                    setContent({ ...content, timeline: newTimeline });
                                                }}
                                            />
                                        </h3>
                                        <p className="text-muted mt-1">
                                            <EditableText
                                                value={item.description}
                                                onChange={(val) => {
                                                    const newTimeline = [...content.timeline];
                                                    newTimeline[i].description = val;
                                                    setContent({ ...content, timeline: newTimeline });
                                                }}
                                            />
                                        </p>
                                    </div>
                                </div>
                            </DeletableWrapper>
                        ))}

                        {/* Add Timeline Item Button */}
                        <div className="pl-24">
                            <Button
                                variant="outline"
                                className="border-dashed border-blue-200 text-blue-600 hover:bg-blue-50 w-full rounded-xl py-6 gap-2"
                                onClick={() => {
                                    setContent({
                                        ...content,
                                        timeline: [...content.timeline, { year: '20XX', title: 'New Achievement', description: 'Description here' }]
                                    });
                                }}
                            >
                                <Plus className="h-5 w-5" />
                                <span className="font-semibold">Add Journey Item</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
