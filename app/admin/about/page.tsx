'use client';

import { useState, useEffect } from 'react';
import { Target, Eye, Heart, Loader2 } from 'lucide-react';
import { getPageContent, savePageContent } from '@/app/actions/settings';

// Editable Text Component
function EditableText({
    value,
    onChange,
    className = '',
    multiline = false,
}: {
    value: string;
    onChange: (val: string) => void;
    className?: string;
    multiline?: boolean;
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
                    onBlur={() => { onChange(tempValue); setIsEditing(false); }}
                    onKeyDown={(e) => { if (e.key === 'Escape') { setTempValue(value); setIsEditing(false); } }}
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
                onBlur={() => { onChange(tempValue); setIsEditing(false); }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') { onChange(tempValue); setIsEditing(false); }
                    if (e.key === 'Escape') { setTempValue(value); setIsEditing(false); }
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
            {value}
        </span>
    );
}

const defaultContent = {
    pageTitle: 'About Sankalpa Batika',
    pageSubtitle: 'A premier educational institution committed to nurturing young minds and building future leaders.',
    missionTitle: 'Our Mission',
    missionText: 'To provide a safe, nurturing, and stimulating learning environment where every child can discover their potential.',
    missionPoints: [
        'Foster critical thinking and creativity',
        'Promote moral values and ethics',
        'Encourage physical and emotional well-being',
    ],
    visionTitle: 'Our Vision',
    visionText: 'To be a center of excellence in education that inspires students to become global citizens.',
    visionPoints: [
        'Leading institution in holistic education',
        'Preparing students for global challenges',
        'Building responsible citizens',
    ],
    values: [
        { title: 'Excellence', description: 'Striving for the highest standards in education.' },
        { title: 'Integrity', description: 'Building character through honesty and ethics.' },
        { title: 'Community', description: 'Fostering a sense of belonging and teamwork.' },
        { title: 'Innovation', description: 'Embracing new ideas and modern teaching methods.' },
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
                    <div className="bg-white p-4 rounded-xl shadow-2xl flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                        <span className="font-medium">Saving changes...</span>
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
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Mission */}
                        <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl border border-blue-100">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-6">
                                <Target className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                <EditableText value={content.missionTitle} onChange={(val) => setContent({ ...content, missionTitle: val })} />
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                <EditableText value={content.missionText} onChange={(val) => setContent({ ...content, missionText: val })} multiline />
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                {content.missionPoints.map((point, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <EditableText
                                            value={point}
                                            onChange={(val) => {
                                                const newPoints = [...content.missionPoints];
                                                newPoints[i] = val;
                                                setContent({ ...content, missionPoints: newPoints });
                                            }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Vision */}
                        <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-3xl border border-amber-100">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mb-6">
                                <Eye className="h-8 w-8 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                <EditableText value={content.visionTitle} onChange={(val) => setContent({ ...content, visionTitle: val })} />
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                <EditableText value={content.visionText} onChange={(val) => setContent({ ...content, visionText: val })} multiline />
                            </p>
                            <ul className="space-y-2 text-gray-600">
                                {content.visionPoints.map((point, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <EditableText
                                            value={point}
                                            onChange={(val) => {
                                                const newPoints = [...content.visionPoints];
                                                newPoints[i] = val;
                                                setContent({ ...content, visionPoints: newPoints });
                                            }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">What We Believe</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Our Core Values</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto mt-4 rounded"></div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {content.values.map((value, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl transition-shadow">
                                    <Heart className="h-10 w-10 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    <EditableText
                                        value={value.title}
                                        onChange={(val) => {
                                            const newValues = [...content.values];
                                            newValues[i].title = val;
                                            setContent({ ...content, values: newValues });
                                        }}
                                    />
                                </h3>
                                <p className="text-gray-600">
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
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Our Journey</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">School History</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto mt-4 rounded"></div>
                    </div>

                    <div className="relative">
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>

                        {content.timeline.map((item, i) => (
                            <div key={i} className="relative flex items-start gap-8 mb-12">
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

                                <div className="flex-1 p-4 bg-gray-50 rounded-xl">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        <EditableText
                                            value={item.title}
                                            onChange={(val) => {
                                                const newTimeline = [...content.timeline];
                                                newTimeline[i].title = val;
                                                setContent({ ...content, timeline: newTimeline });
                                            }}
                                        />
                                    </h3>
                                    <p className="text-gray-600 mt-1">
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
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
