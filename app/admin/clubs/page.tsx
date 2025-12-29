'use client';

import { useState, useEffect } from 'react';
import {
    Music, Palette, Trophy, Activity, Clock, ShieldCheck,
    Star, Users, Plus, Loader2, Edit3, Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPageContent, savePageContent } from '@/app/actions/settings';
import { DeletableWrapper } from '@/components/admin/deletable-wrapper';
import { EditableText } from '@/components/admin/EditableText';
import { toast } from 'sonner';

const iconMap: Record<string, any> = {
    Music, Palette, Trophy, Activity, Clock, ShieldCheck, Star, Users
};

const defaultContent = {
    pageTitle: 'Clubs & Activities',
    pageSubtitle: 'Holistic development through a wide range of extracurricular engagement.',
    houses: [
        { id: 'red', name: 'Red House', color: '#ef4444', description: 'The house of passion and strength.' },
        { id: 'blue', name: 'Blue House', color: '#3b82f6', description: 'The house of wisdom and calm.' },
        { id: 'green', name: 'Green House', color: '#22c55e', description: 'The house of growth and harmony.' },
        { id: 'yellow', name: 'Yellow House', color: '#eab308', description: 'The house of joy and enlightenment.' },
    ],
    clubs: [
        { id: 'music', title: 'Music Club', description: 'Exploring melodies and rhythm through various instruments.', icon: 'Music' },
        { id: 'art', title: 'Art & Craft', description: 'Unleashing creativity through colors, clay, and paper.', icon: 'Palette' },
        { id: 'sports', title: 'Sports Club', description: 'Building teamwork and physical excellence.', icon: 'Trophy' },
        { id: 'dance', title: 'Dance Club', description: 'Expressing emotions through graceful movements.', icon: 'Activity' },
    ],
    activities: [
        { title: 'Morning Assembly', time: '9:00 AM', description: 'Starting the day with prayers and news.' },
        { title: 'Library Hour', time: 'Weekly', description: 'Quiet time for reading and research.' },
        { title: 'Physical Education', time: 'Twice a week', description: 'Outdoor games and fitness drills.' },
    ]
};

export default function AdminClubsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [content, setContent] = useState(defaultContent);

    // Load content
    useEffect(() => {
        async function loadContent() {
            const result = await getPageContent('clubs');
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
        const result = await savePageContent('clubs', content);
        if (result.success) {
            toast.success('Clubs & Activities updated successfully!');
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
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="relative pb-24">
            {/* Saving Overlay */}
            {saving && (
                <div className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="bg-surface p-4 rounded-xl shadow-2xl flex items-center gap-3 border border-border">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                        <span className="font-medium">Saving changes...</span>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className="relative py-24 flex items-center justify-center overflow-hidden bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                        <EditableText
                            value={content.pageTitle}
                            onChange={(val) => setContent({ ...content, pageTitle: val })}
                        />
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100/80 font-medium max-w-2xl mx-auto">
                        <EditableText
                            value={content.pageSubtitle}
                            onChange={(val) => setContent({ ...content, pageSubtitle: val })}
                            multiline
                        />
                    </p>
                </div>
            </section>

            {/* House System */}
            <section className="max-w-7xl mx-auto px-4 mt-24">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 italic tracking-tight">The House System</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {content.houses.map((house: any, idx: number) => (
                        <DeletableWrapper
                            key={idx}
                            onDelete={() => {
                                const newHouses = content.houses.filter((_, i) => i !== idx);
                                setContent({ ...content, houses: newHouses });
                            }}
                        >
                            <div className="group relative p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-all duration-500 h-full">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-inner"
                                            style={{ backgroundColor: `${house.color}15` }}
                                        >
                                            <ShieldCheck className="h-6 w-6" style={{ color: house.color }} />
                                        </div>
                                        <input
                                            type="color"
                                            value={house.color}
                                            onChange={(e) => {
                                                const newHouses = [...content.houses];
                                                newHouses[idx].color = e.target.value;
                                                setContent({ ...content, houses: newHouses });
                                            }}
                                            className="w-10 h-10 rounded-lg cursor-pointer border-none bg-transparent"
                                        />
                                    </div>
                                    <h3 className="text-xl font-black text-foreground tracking-tight">
                                        <EditableText
                                            value={house.name}
                                            onChange={(val) => {
                                                const newHouses = [...content.houses];
                                                newHouses[idx].name = val;
                                                setContent({ ...content, houses: newHouses });
                                            }}
                                        />
                                    </h3>
                                    <p className="text-muted text-sm leading-relaxed font-medium">
                                        <EditableText
                                            value={house.description}
                                            onChange={(val) => {
                                                const newHouses = [...content.houses];
                                                newHouses[idx].description = val;
                                                setContent({ ...content, houses: newHouses });
                                            }}
                                            multiline
                                        />
                                    </p>
                                </div>
                            </div>
                        </DeletableWrapper>
                    ))}
                    {/* Add House */}
                    <Button
                        variant="outline"
                        className="border-dashed border-slate-200 dark:border-slate-800 h-full min-h-[250px] rounded-[2.5rem] flex flex-col gap-2 p-8 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
                        onClick={() => {
                            setContent({
                                ...content,
                                houses: [...content.houses, { id: Date.now().toString(), name: 'New House', color: '#6366f1', description: 'New house description' }]
                            });
                        }}
                    >
                        <Plus className="h-8 w-8 text-slate-400" />
                        <span className="font-bold text-slate-500">Add House</span>
                    </Button>
                </div>
            </section>

            {/* Clubs Grid */}
            <section className="bg-slate-50 dark:bg-slate-900/50 py-24 mt-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center md:text-left mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-foreground italic tracking-tight">Active Clubs</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {content.clubs.map((club: any, idx: number) => {
                            const Icon = iconMap[club.icon] || Star;
                            return (
                                <DeletableWrapper
                                    key={idx}
                                    onDelete={() => {
                                        const newClubs = content.clubs.filter((_, i) => i !== idx);
                                        setContent({ ...content, clubs: newClubs });
                                    }}
                                >
                                    <div className="group flex flex-col sm:flex-row gap-8 p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm h-full">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-20 h-20 shrink-0 bg-blue-600/5 dark:bg-blue-600/10 rounded-full flex items-center justify-center">
                                                <Icon className="h-10 w-10 text-blue-600" />
                                            </div>
                                            <select
                                                value={club.icon}
                                                onChange={(e) => {
                                                    const newClubs = [...content.clubs];
                                                    newClubs[idx].icon = e.target.value;
                                                    setContent({ ...content, clubs: newClubs });
                                                }}
                                                className="text-[10px] bg-slate-100 dark:bg-slate-800 rounded px-2 py-1 border-none font-bold"
                                            >
                                                {Object.keys(iconMap).map(iconName => (
                                                    <option key={iconName} value={iconName}>{iconName}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-4 flex-1">
                                            <h3 className="text-2xl font-black text-foreground tracking-tight">
                                                <EditableText
                                                    value={club.title}
                                                    onChange={(val) => {
                                                        const newClubs = [...content.clubs];
                                                        newClubs[idx].title = val;
                                                        setContent({ ...content, clubs: newClubs });
                                                    }}
                                                />
                                            </h3>
                                            <p className="text-muted leading-relaxed font-medium">
                                                <EditableText
                                                    value={club.description}
                                                    onChange={(val) => {
                                                        const newClubs = [...content.clubs];
                                                        newClubs[idx].description = val;
                                                        setContent({ ...content, clubs: newClubs });
                                                    }}
                                                    multiline
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </DeletableWrapper>
                            );
                        })}
                        {/* Add Club */}
                        <Button
                            variant="outline"
                            className="border-dashed border-slate-200 dark:border-slate-800 h-full min-h-[200px] rounded-[3rem] flex flex-col gap-2 p-10 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all"
                            onClick={() => {
                                setContent({
                                    ...content,
                                    clubs: [...content.clubs, { id: Date.now().toString(), title: 'New Club', description: 'Club description here', icon: 'Star' }]
                                });
                            }}
                        >
                            <Plus className="h-10 w-10 text-slate-400" />
                            <span className="font-bold text-slate-500">Add New Club</span>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Activities Schedule */}
            <section className="max-w-4xl mx-auto px-4 mt-24">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-foreground italic tracking-tight">General Activities</h2>
                </div>

                <div className="space-y-4">
                    {content.activities.map((activity: any, idx: number) => (
                        <DeletableWrapper
                            key={idx}
                            onDelete={() => {
                                const newActivities = content.activities.filter((_, i) => i !== idx);
                                setContent({ ...content, activities: newActivities });
                            }}
                        >
                            <div className="group flex flex-col md:flex-row md:items-center justify-between p-8 bg-surface dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl gap-4">
                                <div className="flex items-center gap-6 flex-1">
                                    <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                                        <Clock className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-black text-lg text-foreground mb-1">
                                            <EditableText
                                                value={activity.title}
                                                onChange={(val) => {
                                                    const newActivities = [...content.activities];
                                                    newActivities[idx].title = val;
                                                    setContent({ ...content, activities: newActivities });
                                                }}
                                            />
                                        </h4>
                                        <p className="text-sm text-muted font-medium">
                                            <EditableText
                                                value={activity.description}
                                                onChange={(val) => {
                                                    const newActivities = [...content.activities];
                                                    newActivities[idx].description = val;
                                                    setContent({ ...content, activities: newActivities });
                                                }}
                                                multiline
                                            />
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-blue-100/50 dark:bg-blue-900/20 px-4 py-2 rounded-full">
                                    <Clock className="h-3 w-3 text-blue-600" />
                                    <EditableText
                                        value={activity.time}
                                        onChange={(val) => {
                                            const newActivities = [...content.activities];
                                            newActivities[idx].time = val;
                                            setContent({ ...content, activities: newActivities });
                                        }}
                                        className="text-blue-600 dark:text-blue-400 font-black text-xs"
                                    />
                                </div>
                            </div>
                        </DeletableWrapper>
                    ))}
                    {/* Add Activity */}
                    <Button
                        variant="outline"
                        className="border-dashed border-slate-200 dark:border-slate-800 w-full py-8 rounded-3xl flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all font-bold text-slate-500"
                        onClick={() => {
                            setContent({
                                ...content,
                                activities: [...content.activities, { title: 'New Activity', time: '12:00 PM', description: 'Activity description here' }]
                            });
                        }}
                    >
                        <Plus className="h-5 w-5" />
                        <span>Add General Activity</span>
                    </Button>
                </div>
            </section>
        </div>
    );
}
