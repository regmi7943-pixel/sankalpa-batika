'use client';

import { useState, useEffect } from 'react';
import {
    GraduationCap, BookOpen, BarChart3, Users,
    Plus, Loader2, Image as ImageIcon,
    Target, Eye, Heart, Award, Shield, Zap, Info, Upload, X,
    Star, Lightbulb, Compass, Globe, Rocket, Trophy, Clock, CheckCircle, CheckCircle2, Activity, Quote
} from 'lucide-react';
import { getPageContent, savePageContent, uploadImage } from '@/app/actions/settings';
import { EditableText } from '@/components/admin/EditableText';
import { DeletableWrapper } from '@/components/admin/deletable-wrapper';
import { IconPicker } from '@/components/admin/IconPicker';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

// Icon map for picker
const iconMap: Record<string, any> = {
    Heart, Eye, Award, Shield, Zap, Target, Star, Lightbulb, Compass, Globe, Rocket, Trophy, Clock, CheckCircle, CheckCircle2, Activity, Quote, BookOpen, Users
};

// --- Default Data Structures ---
const defaultIntro = {
    title: 'Academic Introduction',
    description: 'At Sankalpa Vatika, we go beyond textbook learning. Our academic program is designed to nurture critical thinking, creativity, and a lifelong passion for knowledge.',
    heroImage: '/images/academics/intro-hero.png',
    philosophyTitle: 'Our Educational Philosophy',
    philosophyText: 'We believe that every student is unique. Our approach combines rigorous academic standards with personalized attention, ensuring that each learner reaches their full potential in a supportive and stimulating environment.',
    highlights: [
        { title: 'Holistic Development', description: 'Integrating arts, sports, and academics.', icon: 'Heart' },
        { title: 'Global Perspective', description: 'Curriculum designed for the modern world.', icon: 'Eye' }
    ],
    futureLeadersTitle: 'Empowering Future Leaders',
    futureLeadersText: 'Our middle and secondary programs are meticulously structured to prepare students for the challenges of higher education and beyond.',
    stats: [
        { label: 'SEE Pass Rate', value: '100%' },
        { label: 'Student-Teacher Ratio', value: '15:1' }
    ],
    studyImage: '/images/academics/study.png',
    groupImage: '/images/academics/group-work.png'
};

const defaultCurriculum = {
    title: 'Education System & Curriculum',
    description: 'A comprehensive academic framework designed to foster intellectual growth and character building.',
    heroImage: '/images/academics/curriculum-img.png',
    levels: [
        { title: 'Foundation Level', age: 'Ages 3-5', description: 'Focus on play-based learning.', points: ['Sensory Activities', 'Basic Literacy'], icon: 'Star' },
        { title: 'Primary Level', age: 'Ages 6-10', description: 'Building strong foundations.', points: ['Core Literacy', 'Numeracy'], icon: 'BookOpen' }
    ]
};

const defaultEvaluation = {
    title: 'Evaluation & Assessment',
    description: 'Our assessment approach focuses on continuous growth rather than just final exam marks.',
    methods: [
        { title: 'Continuous Assessment', description: 'Regular class performance tracking.', icon: 'Target' },
        { title: 'Skill-Based Evaluation', description: 'Practical assessment of concepts.', icon: 'CheckCircle' }
    ],
    progressTitle: 'Progress Monitoring',
    progressText: 'Our progress monitoring system allows parents to track their child\'s development.',
    feedbackPoints: [
        { title: 'Regular Feedback', text: 'Monthly progress reports.', icon: 'CheckCircle2' },
        { title: 'Parent-Teacher Meetings', text: 'Scheduled conferences.', icon: 'Users' }
    ],
    progressImage: '/images/academics/progress-monitoring.png',
    quote: 'Focusing on the journey of learning, not just the destination.'
};

const defaultDepartments = {
    title: 'HODs & Academic Departments',
    description: 'Meet the subject experts leading our academic excellence.',
    heroImage: '/images/academics/departments-img.png',
    heads: [
        { name: 'John Doe', role: 'Head of English', email: 'english@sankalpa.edu', image: '' }
    ]
};

export default function AdminAcademicsPage() {
    const [activeTab, setActiveTab] = useState<'intro' | 'curriculum' | 'evaluation' | 'departments'>('intro');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingField, setUploadingField] = useState<string | null>(null);

    const [intro, setIntro] = useState(defaultIntro);
    const [curriculum, setCurriculum] = useState(defaultCurriculum);
    const [evaluation, setEvaluation] = useState(defaultEvaluation);
    const [departments, setDepartments] = useState(defaultDepartments);

    useEffect(() => {
        async function loadAll() {
            setLoading(true);
            const r1 = await getPageContent('academics-intro');
            const r2 = await getPageContent('academics-curriculum');
            const r3 = await getPageContent('academics-evaluation');
            const r4 = await getPageContent('academics-departments');

            if (r1.success && r1.data) setIntro({ ...defaultIntro, ...r1.data });
            if (r2.success && r2.data) setCurriculum({ ...defaultCurriculum, ...r2.data });
            if (r3.success && r3.data) setEvaluation({ ...defaultEvaluation, ...r3.data });
            if (r4.success && r4.data) setDepartments({ ...defaultDepartments, ...r4.data });

            setLoading(false);
        }
        loadAll();
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, fieldId: string, folder: string, callback: (url: string) => void) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingField(fieldId);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        try {
            const res = await uploadImage(formData);
            if (res.success && res.url) {
                callback(res.url);
                toast.success('Image uploaded!');
            } else {
                toast.error(res.error || 'Upload failed');
            }
        } catch {
            toast.error('Upload error');
        } finally {
            setUploadingField(null);
            e.target.value = '';
        }
    };

    const triggerUpload = (fieldId: string, folder: string, callback: (url: string) => void) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => handleImageUpload(e as any, fieldId, folder, callback);
        input.click();
    };

    const handleSave = async () => {
        setSaving(true);
        const r1 = await savePageContent('academics-intro', intro);
        const r2 = await savePageContent('academics-curriculum', curriculum);
        const r3 = await savePageContent('academics-evaluation', evaluation);
        const r4 = await savePageContent('academics-departments', departments);

        if (r1.success && r2.success && r3.success && r4.success) {
            toast.success('All sections saved!');
        } else {
            toast.error('Some sections failed to save.');
        }
        setSaving(false);
    };

    useEffect(() => {
        const handleSaveEvent = () => handleSave();
        window.addEventListener('admin-save', handleSaveEvent);
        return () => window.removeEventListener('admin-save', handleSaveEvent);
    }, [intro, curriculum, evaluation, departments]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    const renderIcon = (iconName: string, className: string = "w-6 h-6") => {
        const Icon = iconMap[iconName] || Heart;
        return <Icon className={className} />;
    };

    return (
        <div className="space-y-6 pb-20">
            {/* Header with Tabs */}
            <div className="sticky top-12 z-40 bg-background/80 backdrop-blur-md border-b border-border p-4 -mx-6 px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Academics Content Manager</h1>
                        <p className="text-muted text-sm">Edit content as it appears on the live site</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { id: 'intro', label: 'Introduction', icon: Info },
                            { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
                            { id: 'evaluation', label: 'Evaluation', icon: BarChart3 },
                            { id: 'departments', label: 'Departments', icon: Users },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 py-2 px-4 rounded-full font-bold text-xs transition-all ${activeTab === tab.id
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-muted hover:bg-surface'
                                    }`}
                            >
                                <tab.icon className="h-3.5 w-3.5" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {/* INTRODUCTION TAB - WYSIWYG Style */}
                {activeTab === 'intro' && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-16"
                    >
                        {/* Hero Section */}
                        <div className="text-center py-12 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-950/20 rounded-3xl">
                            <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-blue-600/10 text-blue-600 rounded-full">
                                Our Academic Journey
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight max-w-4xl mx-auto px-4">
                                <EditableText value={intro.title} onChange={(val) => setIntro({ ...intro, title: val })} />
                            </h1>
                            <p className="text-lg text-muted max-w-3xl mx-auto leading-relaxed px-4">
                                <EditableText value={intro.description} onChange={(val) => setIntro({ ...intro, description: val })} multiline />
                            </p>
                        </div>

                        {/* Philosophy Section with Image */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            {/* Left - Philosophy & Highlights */}
                            <div className="space-y-10">
                                <div className="space-y-4">
                                    <h2 className="text-3xl font-bold text-foreground">
                                        <EditableText value={intro.philosophyTitle} onChange={(val) => setIntro({ ...intro, philosophyTitle: val })} />
                                    </h2>
                                    <div className="relative pl-6 border-l-4 border-blue-600">
                                        <p className="text-lg text-muted leading-relaxed">
                                            <EditableText value={intro.philosophyText} onChange={(val) => setIntro({ ...intro, philosophyText: val })} multiline />
                                        </p>
                                    </div>
                                </div>

                                {/* Highlights */}
                                <div className="space-y-6 flex flex-col items-start">
                                    <h3 className="text-sm font-bold text-muted uppercase tracking-wider">Key Highlights</h3>
                                    {intro.highlights.map((h, i) => (
                                        <DeletableWrapper
                                            key={i}
                                            onDelete={() => {
                                                const newH = intro.highlights.filter((_, idx) => idx !== i);
                                                setIntro({ ...intro, highlights: newH });
                                            }}
                                            className="w-fit flex gap-5 group p-4 rounded-2xl bg-surface border border-border hover:border-blue-300 transition-all"
                                        >
                                            <IconPicker
                                                value={h.icon || 'Heart'}
                                                onChange={(val) => {
                                                    const newH = [...intro.highlights];
                                                    newH[i].icon = val;
                                                    setIntro({ ...intro, highlights: newH });
                                                }}
                                                className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center flex-shrink-0 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                            >
                                                {renderIcon(h.icon || 'Heart', 'w-6 h-6')}
                                            </IconPicker>
                                            <div className="flex-1 space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="font-bold text-lg text-foreground flex-1">
                                                        <EditableText value={h.title} onChange={(val) => {
                                                            const newH = [...intro.highlights];
                                                            newH[i].title = val;
                                                            setIntro({ ...intro, highlights: newH });
                                                        }} />
                                                    </div>
                                                </div>
                                                <p className="text-muted">
                                                    <EditableText value={h.description} onChange={(val) => {
                                                        const newH = [...intro.highlights];
                                                        newH[i].description = val;
                                                        setIntro({ ...intro, highlights: newH });
                                                    }} />
                                                </p>
                                            </div>
                                        </DeletableWrapper>
                                    ))}
                                    <Button
                                        variant="outline"
                                        className="w-fit px-8 border-dashed"
                                        onClick={() => setIntro({ ...intro, highlights: [...intro.highlights, { title: 'New Highlight', description: 'Description...', icon: 'Star' }] })}
                                    >
                                        <Plus className="w-4 h-4 mr-2" /> Add Highlight
                                    </Button>
                                </div>
                            </div>

                            {/* Right - Hero Image */}
                            <div className="space-y-4">
                                <div className="aspect-[16/12] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative group shadow-2xl">
                                    <img src={intro.heroImage} alt="Hero" className="w-full h-full object-cover" />
                                    {uploadingField === 'intro-hero' && (
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                            <Loader2 className="h-8 w-8 animate-spin text-white" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Button
                                            onClick={() => triggerUpload('intro-hero', 'sankalpa-vatika/academics', (url) => setIntro({ ...intro, heroImage: url }))}
                                            className="bg-white text-slate-900 hover:bg-slate-100"
                                        >
                                            <Upload className="w-4 h-4 mr-2" /> Change Image
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dark Stats Section */}
                        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                                {/* Left Content */}
                                <div className="space-y-8">
                                    <div className="inline-block px-4 py-1.5 text-[10px] font-black tracking-[0.2em] uppercase bg-white/10 text-blue-400 rounded-full">
                                        Vision & Impact
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
                                        <EditableText value={intro.futureLeadersTitle} onChange={(val) => setIntro({ ...intro, futureLeadersTitle: val })} />
                                    </h2>
                                    <p className="text-lg text-slate-400 leading-relaxed">
                                        <EditableText value={intro.futureLeadersText} onChange={(val) => setIntro({ ...intro, futureLeadersText: val })} multiline />
                                    </p>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-6 pt-4">
                                        {intro.stats.map((s, i) => (
                                            <DeletableWrapper
                                                key={i}
                                                onDelete={() => {
                                                    const newS = intro.stats.filter((_, idx) => idx !== i);
                                                    setIntro({ ...intro, stats: newS });
                                                }}
                                                className="text-center p-4 rounded-2xl bg-white/5 border border-white/10"
                                                buttonClassName="bg-red-500"
                                            >
                                                <div className="text-3xl md:text-4xl font-black text-white mb-1">
                                                    <EditableText value={s.value} onChange={(val) => {
                                                        const newS = [...intro.stats];
                                                        newS[i].value = val;
                                                        setIntro({ ...intro, stats: newS });
                                                    }} />
                                                </div>
                                                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                    <EditableText value={s.label} onChange={(val) => {
                                                        const newS = [...intro.stats];
                                                        newS[i].label = val;
                                                        setIntro({ ...intro, stats: newS });
                                                    }} />
                                                </div>
                                            </DeletableWrapper>
                                        ))}
                                        <Button
                                            variant="outline"
                                            className="border-dashed border-white/20 text-white/60 hover:text-white hover:bg-white/10"
                                            onClick={() => setIntro({ ...intro, stats: [...intro.stats, { label: 'Label', value: '0%' }] })}
                                        >
                                            <Plus className="w-4 h-4 mr-2" /> Add Stat
                                        </Button>
                                    </div>
                                </div>

                                {/* Right - Two Images */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-800 relative group">
                                            <img src={intro.studyImage} className="w-full h-full object-cover" alt="Study" />
                                            {uploadingField === 'intro-study' && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                    <Loader2 className="h-6 w-6 animate-spin text-white" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button
                                                    size="sm"
                                                    onClick={() => triggerUpload('intro-study', 'sankalpa-vatika/academics', (url) => setIntro({ ...intro, studyImage: url }))}
                                                    className="bg-white text-slate-900 hover:bg-slate-100 text-xs"
                                                >
                                                    <Upload className="w-3 h-3 mr-1" /> Change
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4 mt-8">
                                        <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-800 relative group">
                                            <img src={intro.groupImage} className="w-full h-full object-cover" alt="Group" />
                                            {uploadingField === 'intro-group' && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                    <Loader2 className="h-6 w-6 animate-spin text-white" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button
                                                    size="sm"
                                                    onClick={() => triggerUpload('intro-group', 'sankalpa-vatika/academics', (url) => setIntro({ ...intro, groupImage: url }))}
                                                    className="bg-white text-slate-900 hover:bg-slate-100 text-xs"
                                                >
                                                    <Upload className="w-3 h-3 mr-1" /> Change
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* CURRICULUM TAB */}
                {activeTab === 'curriculum' && (
                    <motion.div
                        key="curriculum"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-12"
                    >
                        {/* Hero */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <div className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase bg-blue-600/10 text-blue-600 rounded-full">
                                    Curriculum
                                </div>
                                <h1 className="text-4xl font-black text-foreground leading-tight">
                                    <EditableText value={curriculum.title} onChange={(val) => setCurriculum({ ...curriculum, title: val })} />
                                </h1>
                                <p className="text-lg text-muted leading-relaxed">
                                    <EditableText value={curriculum.description} onChange={(val) => setCurriculum({ ...curriculum, description: val })} multiline />
                                </p>
                            </div>
                            <div className="aspect-video rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative group shadow-xl">
                                <img src={curriculum.heroImage} className="w-full h-full object-cover" alt="Curriculum" />
                                {uploadingField === 'curriculum-hero' && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                        <Loader2 className="h-8 w-8 animate-spin text-white" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Button
                                        onClick={() => triggerUpload('curriculum-hero', 'sankalpa-vatika/academics', (url) => setCurriculum({ ...curriculum, heroImage: url }))}
                                        className="bg-white text-slate-900 hover:bg-slate-100"
                                    >
                                        <Upload className="w-4 h-4 mr-2" /> Change Image
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Education Levels */}
                        <div className="space-y-8 flex flex-col items-start">
                            <h2 className="text-2xl font-bold text-foreground">Education Levels</h2>
                            <div className="space-y-6 flex flex-col items-start">
                                {curriculum.levels.map((level, i) => (
                                    <DeletableWrapper
                                        key={i}
                                        onDelete={() => {
                                            const newLevels = curriculum.levels.filter((_, idx) => idx !== i);
                                            setCurriculum({ ...curriculum, levels: newLevels });
                                        }}
                                        className="w-fit p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-950/20 border border-blue-100 dark:border-blue-900/50"
                                    >
                                        <div className="flex items-start gap-6">
                                            <IconPicker
                                                value={level.icon || 'BookOpen'}
                                                onChange={(val) => {
                                                    const newLevels = [...curriculum.levels];
                                                    newLevels[i].icon = val;
                                                    setCurriculum({ ...curriculum, levels: newLevels });
                                                }}
                                                className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0 hover:bg-blue-700 transition-all shadow-xl"
                                            >
                                                {renderIcon(level.icon || 'BookOpen', 'w-8 h-8')}
                                            </IconPicker>
                                            <div className="flex-1 space-y-4">
                                                <div className="flex items-center gap-4 flex-wrap">
                                                    <h3 className="text-2xl font-bold text-foreground">
                                                        <EditableText value={level.title} onChange={(val) => {
                                                            const newLevels = [...curriculum.levels];
                                                            newLevels[i].title = val;
                                                            setCurriculum({ ...curriculum, levels: newLevels });
                                                        }} />
                                                    </h3>
                                                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100 dark:bg-blue-900/50 px-3 py-1 rounded-full">
                                                        <EditableText value={level.age} onChange={(val) => {
                                                            const newLevels = [...curriculum.levels];
                                                            newLevels[i].age = val;
                                                            setCurriculum({ ...curriculum, levels: newLevels });
                                                        }} />
                                                    </span>
                                                </div>
                                                <p className="text-muted">
                                                    <EditableText value={level.description} onChange={(val) => {
                                                        const newLevels = [...curriculum.levels];
                                                        newLevels[i].description = val;
                                                        setCurriculum({ ...curriculum, levels: newLevels });
                                                    }} multiline />
                                                </p>
                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {(level.points || []).map((point, j) => (
                                                        <DeletableWrapper
                                                            key={j}
                                                            onDelete={() => {
                                                                const newLevels = [...curriculum.levels];
                                                                newLevels[i].points = level.points.filter((_, idx) => idx !== j);
                                                                setCurriculum({ ...curriculum, levels: newLevels });
                                                            }}
                                                            showRing={false}
                                                            className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-border text-sm font-medium"
                                                        >
                                                            <EditableText value={point} onChange={(val) => {
                                                                const newLevels = [...curriculum.levels];
                                                                newLevels[i].points[j] = val;
                                                                setCurriculum({ ...curriculum, levels: newLevels });
                                                            }} />
                                                        </DeletableWrapper>
                                                    ))}
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-blue-600"
                                                        onClick={() => {
                                                            const newLevels = [...curriculum.levels];
                                                            newLevels[i].points = [...(level.points || []), 'New Point'];
                                                            setCurriculum({ ...curriculum, levels: newLevels });
                                                        }}
                                                    >
                                                        <Plus className="w-4 h-4 mr-1" /> Add Point
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </DeletableWrapper>
                                ))}
                                <Button
                                    variant="outline"
                                    className="w-fit px-12 py-8 border-dashed rounded-3xl"
                                    onClick={() => setCurriculum({
                                        ...curriculum,
                                        levels: [...curriculum.levels, { title: 'New Level', age: 'Ages X-Y', description: 'Description', points: [], icon: 'Star' }]
                                    })}
                                >
                                    <Plus className="w-5 h-5 mr-2" /> Add Education Level
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* EVALUATION TAB */}
                {activeTab === 'evaluation' && (
                    <motion.div
                        key="evaluation"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-12"
                    >
                        {/* Hero */}
                        <div className="text-center py-12 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-950/20 rounded-3xl">
                            <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-blue-600/10 text-blue-600 rounded-full">
                                Assessment
                            </div>
                            <h1 className="text-4xl font-black text-foreground mb-6 max-w-3xl mx-auto px-4">
                                <EditableText value={evaluation.title} onChange={(val) => setEvaluation({ ...evaluation, title: val })} />
                            </h1>
                            <p className="text-lg text-muted max-w-2xl mx-auto px-4">
                                <EditableText value={evaluation.description} onChange={(val) => setEvaluation({ ...evaluation, description: val })} multiline />
                            </p>
                        </div>

                        {/* Methods */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {evaluation.methods.map((method, i) => (
                                <DeletableWrapper
                                    key={i}
                                    onDelete={() => {
                                        const newMethods = evaluation.methods.filter((_, idx) => idx !== i);
                                        setEvaluation({ ...evaluation, methods: newMethods });
                                    }}
                                    className="p-8 rounded-3xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50"
                                >
                                    <div className="flex items-start gap-4">
                                        <IconPicker
                                            value={method.icon || 'Target'}
                                            onChange={(val) => {
                                                const newMethods = [...evaluation.methods];
                                                newMethods[i].icon = val;
                                                setEvaluation({ ...evaluation, methods: newMethods });
                                            }}
                                            className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0 hover:bg-blue-700 transition-all shadow-md"
                                        >
                                            {renderIcon(method.icon || 'Target', 'w-6 h-6')}
                                        </IconPicker>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-xl font-bold text-blue-600 flex-1">
                                                    <EditableText value={method.title} onChange={(val) => {
                                                        const newMethods = [...evaluation.methods];
                                                        newMethods[i].title = val;
                                                        setEvaluation({ ...evaluation, methods: newMethods });
                                                    }} />
                                                </h3>
                                            </div>
                                            <p className="text-muted">
                                                <EditableText value={method.description} onChange={(val) => {
                                                    const newMethods = [...evaluation.methods];
                                                    newMethods[i].description = val;
                                                    setEvaluation({ ...evaluation, methods: newMethods });
                                                }} multiline />
                                            </p>
                                        </div>
                                    </div>
                                </DeletableWrapper>
                            ))}
                            <Button
                                variant="outline"
                                className="h-full min-h-[200px] border-dashed rounded-3xl"
                                onClick={() => setEvaluation({ ...evaluation, methods: [...evaluation.methods, { title: 'New Method', description: 'Description', icon: 'CheckCircle' }] })}
                            >
                                <Plus className="w-5 h-5 mr-2" /> Add Method
                            </Button>
                        </div>

                        {/* Progress Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center p-12 bg-surface rounded-[4rem] border border-border shadow-sm">
                            <div className="lg:col-span-12 xl:col-span-12 2xl:col-span-6 space-y-10">
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-bold text-foreground leading-tight">
                                        <EditableText value={evaluation.progressTitle} onChange={(val) => setEvaluation({ ...evaluation, progressTitle: val })} />
                                    </h2>
                                    <p className="text-xl text-muted leading-relaxed">
                                        <EditableText value={evaluation.progressText} onChange={(val) => setEvaluation({ ...evaluation, progressText: val })} multiline />
                                    </p>
                                </div>

                                <div className="flex flex-row flex-wrap gap-6 items-start">
                                    {evaluation.feedbackPoints.map((p, i) => (
                                        <DeletableWrapper
                                            key={i}
                                            onDelete={() => {
                                                const newP = evaluation.feedbackPoints.filter((_, idx) => idx !== i);
                                                setEvaluation({ ...evaluation, feedbackPoints: newP });
                                            }}
                                            className="w-fit flex gap-6 group p-4 rounded-3xl hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all border border-transparent hover:border-blue-100"
                                            buttonClassName="bg-red-500"
                                        >
                                            <IconPicker
                                                value={p.icon || 'CheckCircle2'}
                                                onChange={(val) => {
                                                    const newP = [...evaluation.feedbackPoints];
                                                    newP[i].icon = val;
                                                    setEvaluation({ ...evaluation, feedbackPoints: newP });
                                                }}
                                                className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all overflow-hidden"
                                            >
                                                {renderIcon(p.icon || 'CheckCircle2', 'w-6 h-6 text-blue-600 group-hover:text-white')}
                                            </IconPicker>
                                            <div className="flex-1">
                                                <h4 className="text-xl font-bold text-foreground mb-1">
                                                    <EditableText value={p.title} onChange={(val) => {
                                                        const newP = [...evaluation.feedbackPoints];
                                                        newP[i].title = val;
                                                        setEvaluation({ ...evaluation, feedbackPoints: newP });
                                                    }} />
                                                </h4>
                                                <p className="text-muted leading-relaxed">
                                                    <EditableText value={p.text} onChange={(val) => {
                                                        const newP = [...evaluation.feedbackPoints];
                                                        newP[i].text = val;
                                                        setEvaluation({ ...evaluation, feedbackPoints: newP });
                                                    }} />
                                                </p>
                                            </div>
                                        </DeletableWrapper>
                                    ))}
                                    <Button
                                        variant="outline"
                                        className="w-fit px-12 py-6 border-dashed border-blue-200 text-blue-600 hover:bg-blue-50 rounded-2xl"
                                        onClick={() => setEvaluation({ ...evaluation, feedbackPoints: [...evaluation.feedbackPoints, { title: 'New Feedback Point', text: 'Point description...', icon: 'CheckCircle2' }] })}
                                    >
                                        <Plus className="w-4 h-4 mr-2" /> Add Feedback Point
                                    </Button>
                                </div>
                            </div>

                            {/* Image Visual (Replaced Dashboard) */}
                            <div className="lg:col-span-12 xl:col-span-12 2xl:col-span-6 flex justify-center">
                                <div className="relative group/img rounded-[3rem] overflow-hidden shadow-2xl bg-surface border border-border w-1/2">
                                    <img
                                        src={evaluation.progressImage}
                                        alt="Progress Monitoring"
                                        className="w-full aspect-video object-cover transition-transform duration-700 group-hover/img:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-all flex items-center justify-center">
                                        <label className="cursor-pointer bg-white text-black px-6 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
                                            <Upload className="w-5 h-5" />
                                            {uploadingField === 'progress-img' ? 'Uploading...' : 'Change Progress Image'}
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, 'progress-img', 'academics', (url) => setEvaluation({ ...evaluation, progressImage: url }))}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="max-w-4xl mx-auto text-center py-20 px-8 rounded-[4rem] bg-slate-900 text-white relative overflow-hidden border border-white/5">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                            <div className="relative z-10 space-y-8">
                                <Quote className="w-16 h-16 text-blue-600 mx-auto opacity-40 capitalize" />
                                <h2 className="text-2xl md:text-4xl font-black italic leading-tight px-4">
                                    "<EditableText value={evaluation.quote} onChange={(val) => setEvaluation({ ...evaluation, quote: val })} />"
                                </h2>
                                <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* DEPARTMENTS TAB */}
                {activeTab === 'departments' && (
                    <motion.div
                        key="departments"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-12"
                    >
                        {/* Hero */}
                        <div className="text-center py-12">
                            <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-blue-600/10 text-blue-600 rounded-full">
                                Our Team
                            </div>
                            <h1 className="text-4xl font-black text-foreground mb-6">
                                <EditableText value={departments.title} onChange={(val) => setDepartments({ ...departments, title: val })} />
                            </h1>
                            <p className="text-lg text-muted max-w-2xl mx-auto">
                                <EditableText value={departments.description} onChange={(val) => setDepartments({ ...departments, description: val })} multiline />
                            </p>
                        </div>

                        {/* Team Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {departments.heads.map((head, i) => (
                                <DeletableWrapper
                                    key={i}
                                    onDelete={() => {
                                        const newHeads = departments.heads.filter((_, idx) => idx !== i);
                                        setDepartments({ ...departments, heads: newHeads });
                                    }}
                                    className="bg-surface border border-border rounded-3xl overflow-hidden hover:shadow-xl transition-all"
                                >
                                    <div className="aspect-[4/5] bg-slate-100 dark:bg-slate-800 relative group">
                                        {head.image ? (
                                            <img src={head.image} className="w-full h-full object-cover" alt={head.name} />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                                <Users className="w-16 h-16 mb-2" />
                                                <span className="text-sm font-medium">No Photo</span>
                                            </div>
                                        )}
                                        {uploadingField === `head-${i}` && (
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                <Loader2 className="h-8 w-8 animate-spin text-white" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button
                                                onClick={() => triggerUpload(`head-${i}`, 'sankalpa-vatika/staff', (url) => {
                                                    const newHeads = [...departments.heads];
                                                    newHeads[i].image = url;
                                                    setDepartments({ ...departments, heads: newHeads });
                                                })}
                                                className="bg-white text-slate-900 hover:bg-slate-100"
                                            >
                                                <Upload className="w-4 h-4 mr-2" /> {head.image ? 'Change' : 'Upload'} Photo
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-2">
                                        <h3 className="text-xl font-bold text-foreground">
                                            <EditableText value={head.name} onChange={(val) => {
                                                const newHeads = [...departments.heads];
                                                newHeads[i].name = val;
                                                setDepartments({ ...departments, heads: newHeads });
                                            }} />
                                        </h3>
                                        <p className="text-blue-600 font-medium">
                                            <EditableText value={head.role} onChange={(val) => {
                                                const newHeads = [...departments.heads];
                                                newHeads[i].role = val;
                                                setDepartments({ ...departments, heads: newHeads });
                                            }} />
                                        </p>
                                        <p className="text-muted text-sm">
                                            <EditableText value={head.email} onChange={(val) => {
                                                const newHeads = [...departments.heads];
                                                newHeads[i].email = val;
                                                setDepartments({ ...departments, heads: newHeads });
                                            }} />
                                        </p>
                                    </div>
                                </DeletableWrapper>
                            ))}
                            <Button
                                variant="outline"
                                className="h-full min-h-[400px] border-dashed rounded-3xl flex flex-col gap-2"
                                onClick={() => setDepartments({
                                    ...departments,
                                    heads: [...departments.heads, { name: 'New Team Member', role: 'Role', email: 'email@school.edu', image: '' }]
                                })}
                            >
                                <Plus className="w-8 h-8" />
                                <span>Add Team Member</span>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
