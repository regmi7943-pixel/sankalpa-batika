'use client';

import { useState, useEffect, useRef } from 'react';
import {
    GraduationCap, BookOpen, BarChart3, Users,
    Plus, Loader2, Save, Image as ImageIcon,
    Target, Eye, Heart, Award, Shield, Zap, Info, Upload
} from 'lucide-react';
import { getPageContent, savePageContent, uploadImage } from '@/app/actions/settings';
import { EditableText } from '@/components/admin/EditableText';
import { IconPicker } from '@/components/admin/IconPicker';
import { DeletableWrapper } from '@/components/admin/deletable-wrapper';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

// --- Default Data Structures ---

const defaultIntro = {
    title: 'Academic Introduction',
    description: 'At Sankalpa Vatika, we go beyond textbook learning. Our academic program is designed to nurture critical thinking, creativity, and a lifelong passion for knowledge.',
    heroImage: '/images/academics/intro-hero.png',
    philosophyTitle: 'Our Educational Philosophy',
    philosophyText: 'We believe that every student is unique. Our approach combines rigorous academic standards with personalized attention, ensuring that each learner reaches their full potential in a supportive and stimulating environment.',
    highlights: [
        { title: 'Holistic Development', description: 'Integrating arts, sports, and academics.' },
        { title: 'Global Perspective', description: 'Curriculum designed for the modern world.' }
    ],
    futureLeadersTitle: 'Empowering Future Leaders',
    futureLeadersText: 'Our middle and secondary programs are meticulously structured to prepare students for the challenges of higher education and beyond. We integrate STEM projects, language proficiency, and leadership training into our core curriculum.',
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
        {
            title: 'Foundation Level',
            age: 'Ages 3-5',
            description: 'Focus on play-based learning and social development.',
            points: ['Sensory Activities', 'Basic Literacy', 'Motor Skills']
        },
        {
            title: 'Primary Level',
            age: 'Ages 6-10',
            description: 'Building strong foundations in core subjects.',
            points: ['Core Literacy', 'Numeracy', 'Environmental Science']
        }
    ]
};

const defaultEvaluation = {
    title: 'Evaluation & Assessment',
    description: 'Our assessment approach focuses on continuous growth rather than just final exam marks.',
    methods: [
        { title: 'Continuous Assessment (CAS)', description: 'Regular class performance tracking.' },
        { title: 'Skill-Based Evaluation', description: 'Practical assessment of learned concepts.' }
    ],
    progressTitle: 'Progress Monitoring',
    progressText: 'Our progress monitoring system allows parents to track their child\'s development in real-time through our digital portal.',
    feedbackPoints: [
        { title: 'Regular Feedback', text: 'Monthly progress reports shared with parents.' },
        { title: 'Parent-Teacher Meetings', text: 'Scheduled conferences for individual student development.' }
    ],
    quote: 'Focusing on the journey of learning, not just the destination.'
};

const defaultDepartments = {
    title: 'HODs & Academic Departments',
    description: 'Meet the subject experts leading our academic excellence.',
    heroImage: '/images/academics/departments-img.png',
    heads: [
        { name: 'John Doe', role: 'Head of English', email: 'english@sankalpa.edu', image: '/images/staff/hod-english.png' },
        { name: 'Jane Smith', role: 'Head of Mathematics', email: 'math@sankalpa.edu', image: '/images/staff/hod-math.png' }
    ]
};

export default function AdminAcademicsPage() {
    const [activeTab, setActiveTab] = useState<'intro' | 'curriculum' | 'evaluation' | 'departments'>('intro');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingField, setUploadingField] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Data states
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
                toast.success('Image uploaded successfully!');
            } else {
                toast.error(res.error || 'Upload failed');
            }
        } catch (error) {
            toast.error('An error occurred during upload');
        } finally {
            setUploadingField(null);
            e.target.value = ''; // Reset input
        }
    };

    const handleSave = async () => {
        setSaving(true);
        let success = true;

        const r1 = await savePageContent('academics-intro', intro);
        const r2 = await savePageContent('academics-curriculum', curriculum);
        const r3 = await savePageContent('academics-evaluation', evaluation);
        const r4 = await savePageContent('academics-departments', departments);

        if (!r1.success || !r2.success || !r3.success || !r4.success) success = false;

        if (success) {
            toast.success('All academics sections saved!');
        } else {
            toast.error('Some sections failed to save.');
        }
        setSaving(false);
    };

    // Listen to toolbar save
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

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => {
                    // This is a generic handler, but we use specific calls in buttons
                }}
            />

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">Academics Content Manager</h1>
                    <p className="text-muted text-sm mt-1">Modify text and visuals across all academic sub-pages.</p>
                </div>

                <div className="flex flex-wrap p-1 bg-surface border border-border rounded-xl">
                    {[
                        { id: 'intro', label: 'Introduction', icon: Info },
                        { id: 'curriculum', label: 'Curriculum', icon: BookOpen },
                        { id: 'evaluation', label: 'Evaluation', icon: BarChart3 },
                        { id: 'departments', label: 'Departments', icon: Users },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 py-2 px-4 rounded-lg font-bold text-xs transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                                : 'text-muted hover:text-foreground'
                                }`}
                        >
                            <tab.icon className="h-3.5 w-3.5" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-surface rounded-2xl border border-border overflow-hidden min-h-[60vh]">
                <AnimatePresence mode="wait">
                    {/* Introduction Tab */}
                    {activeTab === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-8 space-y-12"
                        >
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold flex items-center gap-2 text-blue-600">
                                    <ImageIcon className="h-5 w-5" />
                                    Introduction Hero
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div className="aspect-video rounded-2xl border border-border bg-muted overflow-hidden relative group">
                                            <img src={intro.heroImage} alt="Hero" className="w-full h-full object-cover" />
                                            {uploadingField === 'intro-hero' && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full gap-2"
                                            disabled={uploadingField === 'intro-hero'}
                                            onClick={() => {
                                                const input = document.createElement('input');
                                                input.type = 'file';
                                                input.accept = 'image/*';
                                                input.onchange = (e) => handleImageUpload(e as any, 'intro-hero', 'sankalpa-vatika/academics', (url) => setIntro({ ...intro, heroImage: url }));
                                                input.click();
                                            }}
                                        >
                                            <Upload className="h-4 w-4" />
                                            Change Hero Image
                                        </Button>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-muted opacity-60 uppercase">Page Title</label>
                                            <div className="text-2xl font-bold">
                                                <EditableText value={intro.title} onChange={(val) => setIntro({ ...intro, title: val })} />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-muted opacity-60 uppercase">Description</label>
                                            <div className="text-sm text-muted">
                                                <EditableText value={intro.description} onChange={(val) => setIntro({ ...intro, description: val })} multiline />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-lg font-bold flex items-center gap-2 text-blue-600">
                                    <Target className="h-5 w-5" />
                                    Educational Philosophy & Highlights
                                </h3>
                                <div className="space-y-4 max-w-3xl">
                                    <div className="text-xl font-bold">
                                        <EditableText value={intro.philosophyTitle} onChange={(val) => setIntro({ ...intro, philosophyTitle: val })} />
                                    </div>
                                    <div className="text-muted leading-relaxed">
                                        <EditableText value={intro.philosophyText} onChange={(val) => setIntro({ ...intro, philosophyText: val })} multiline />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                    {intro.highlights.map((h, i) => (
                                        <DeletableWrapper key={i} onDelete={() => {
                                            const newH = intro.highlights.filter((_, idx) => idx !== i);
                                            setIntro({ ...intro, highlights: newH });
                                        }} className="p-4 rounded-xl border border-border bg-background">
                                            <div className="font-bold">
                                                <EditableText value={h.title} onChange={(val) => {
                                                    const newH = [...intro.highlights];
                                                    newH[i].title = val;
                                                    setIntro({ ...intro, highlights: newH });
                                                }} />
                                            </div>
                                            <div className="text-sm text-muted">
                                                <EditableText value={h.description} onChange={(val) => {
                                                    const newH = [...intro.highlights];
                                                    newH[i].description = val;
                                                    setIntro({ ...intro, highlights: newH });
                                                }} />
                                            </div>
                                        </DeletableWrapper>
                                    ))}
                                    <Button variant="outline" className="border-dashed" onClick={() => {
                                        setIntro({ ...intro, highlights: [...intro.highlights, { title: 'New Highlight', description: 'Desc' }] });
                                    }}>Add Highlight</Button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-lg font-bold flex items-center gap-2 text-blue-600">
                                    <Plus className="h-5 w-5" />
                                    Future Leaders & Stats
                                </h3>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    <div className="space-y-6">
                                        <div className="space-y-4 max-w-3xl">
                                            <div className="text-xl font-bold">
                                                <EditableText value={intro.futureLeadersTitle} onChange={(val) => setIntro({ ...intro, futureLeadersTitle: val })} />
                                            </div>
                                            <div className="text-muted leading-relaxed">
                                                <EditableText value={intro.futureLeadersText} onChange={(val) => setIntro({ ...intro, futureLeadersText: val })} multiline />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mt-6">
                                            {intro.stats.map((s, i) => (
                                                <DeletableWrapper key={i} onDelete={() => {
                                                    const newS = intro.stats.filter((_, idx) => idx !== i);
                                                    setIntro({ ...intro, stats: newS });
                                                }} className="p-4 rounded-xl border border-border bg-background text-center">
                                                    <div className="text-xl font-black">
                                                        <EditableText value={s.value} onChange={(val) => {
                                                            const newS = [...intro.stats];
                                                            newS[i].value = val;
                                                            setIntro({ ...intro, stats: newS });
                                                        }} />
                                                    </div>
                                                    <div className="text-xs text-muted uppercase font-bold">
                                                        <EditableText value={s.label} onChange={(val) => {
                                                            const newS = [...intro.stats];
                                                            newS[i].label = val;
                                                            setIntro({ ...intro, stats: newS });
                                                        }} />
                                                    </div>
                                                </DeletableWrapper>
                                            ))}
                                            <Button variant="outline" className="border-dashed h-full" onClick={() => {
                                                setIntro({ ...intro, stats: [...intro.stats, { label: 'Label', value: '0%' }] });
                                            }}>Add Stat</Button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-4">
                                            <div className="aspect-[3/4] rounded-2xl border border-border bg-muted overflow-hidden relative">
                                                <img src={intro.studyImage} className="w-full h-full object-cover" alt="Study" />
                                                {uploadingField === 'intro-study' && (
                                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                        <Loader2 className="h-8 w-8 animate-spin text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <Button
                                                variant="outline" size="sm" className="w-full gap-2 text-[10px]"
                                                disabled={uploadingField === 'intro-study'}
                                                onClick={() => {
                                                    const input = document.createElement('input');
                                                    input.type = 'file';
                                                    input.accept = 'image/*';
                                                    input.onchange = (e) => handleImageUpload(e as any, 'intro-study', 'sankalpa-vatika/academics', (url) => setIntro({ ...intro, studyImage: url }));
                                                    input.click();
                                                }}
                                            >
                                                <Upload className="h-3 w-3" /> Upload
                                            </Button>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="aspect-[3/4] rounded-2xl border border-border bg-muted overflow-hidden relative">
                                                <img src={intro.groupImage} className="w-full h-full object-cover" alt="Group" />
                                                {uploadingField === 'intro-group' && (
                                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                        <Loader2 className="h-8 w-8 animate-spin text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <Button
                                                variant="outline" size="sm" className="w-full gap-2 text-[10px]"
                                                disabled={uploadingField === 'intro-group'}
                                                onClick={() => {
                                                    const input = document.createElement('input');
                                                    input.type = 'file';
                                                    input.accept = 'image/*';
                                                    input.onchange = (e) => handleImageUpload(e as any, 'intro-group', 'sankalpa-vatika/academics', (url) => setIntro({ ...intro, groupImage: url }));
                                                    input.click();
                                                }}
                                            >
                                                <Upload className="h-3 w-3" /> Upload
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Curriculum Tab */}
                    {activeTab === 'curriculum' && (
                        <motion.div
                            key="curriculum"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-8 space-y-12"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                                <div className="space-y-4">
                                    <div className="text-2xl font-bold">
                                        <EditableText value={curriculum.title} onChange={(val) => setCurriculum({ ...curriculum, title: val })} />
                                    </div>
                                    <div className="text-muted">
                                        <EditableText value={curriculum.description} onChange={(val) => setCurriculum({ ...curriculum, description: val })} multiline />
                                    </div>
                                </div>
                                <div className="space-y-4 max-w-sm">
                                    <div className="aspect-square rounded-[2rem] border border-border bg-muted overflow-hidden relative">
                                        <img src={curriculum.heroImage} className="w-full h-full object-cover" alt="Curriculum Hero" />
                                        {uploadingField === 'curriculum-hero' && (
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                <Loader2 className="h-8 w-8 animate-spin text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <Button
                                        variant="outline" className="w-full gap-2"
                                        disabled={uploadingField === 'curriculum-hero'}
                                        onClick={() => {
                                            const input = document.createElement('input');
                                            input.type = 'file';
                                            input.accept = 'image/*';
                                            input.onchange = (e) => handleImageUpload(e as any, 'curriculum-hero', 'sankalpa-vatika/academics', (url) => setCurriculum({ ...curriculum, heroImage: url }));
                                            input.click();
                                        }}
                                    >
                                        <Upload className="h-4 w-4" /> Upload Hero Image
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-blue-600">Education Levels</h3>
                                <div className="grid grid-cols-1 gap-8">
                                    {curriculum.levels.map((level, i) => (
                                        <DeletableWrapper
                                            key={i}
                                            onDelete={() => {
                                                const newLevels = curriculum.levels.filter((_, idx) => idx !== i);
                                                setCurriculum({ ...curriculum, levels: newLevels });
                                            }}
                                            className="p-8 rounded-2xl border border-border bg-background"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <div className="font-bold text-xl">
                                                        <EditableText value={level.title} onChange={(val) => {
                                                            const newLevels = [...curriculum.levels];
                                                            newLevels[i].title = val;
                                                            setCurriculum({ ...curriculum, levels: newLevels });
                                                        }} />
                                                    </div>
                                                    <div className="text-xs text-blue-600 uppercase font-bold tracking-wider">
                                                        <EditableText value={level.age} onChange={(val) => {
                                                            const newLevels = [...curriculum.levels];
                                                            newLevels[i].age = val;
                                                            setCurriculum({ ...curriculum, levels: newLevels });
                                                        }} />
                                                    </div>
                                                    <div className="text-sm text-muted">
                                                        <EditableText value={level.description} onChange={(val) => {
                                                            const newLevels = [...curriculum.levels];
                                                            newLevels[i].description = val;
                                                            setCurriculum({ ...curriculum, levels: newLevels });
                                                        }} multiline />
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <label className="text-xs font-bold text-muted uppercase">Bullet Points</label>
                                                    {(level.points || []).map((point, j) => (
                                                        <DeletableWrapper key={j} onDelete={() => {
                                                            const newLevels = [...curriculum.levels];
                                                            newLevels[i].points = level.points.filter((_, idx) => idx !== j);
                                                            setCurriculum({ ...curriculum, levels: newLevels });
                                                        }} className="flex items-center gap-2">
                                                            <div className="flex-grow text-sm">
                                                                <EditableText value={point} onChange={(val) => {
                                                                    const newLevels = [...curriculum.levels];
                                                                    newLevels[i].points[j] = val;
                                                                    setCurriculum({ ...curriculum, levels: newLevels });
                                                                }} />
                                                            </div>
                                                        </DeletableWrapper>
                                                    ))}
                                                    <Button variant="ghost" className="w-full justify-start text-xs border border-dashed text-blue-600 mt-2" onClick={() => {
                                                        const newLevels = [...curriculum.levels];
                                                        newLevels[i].points = [...(level.points || []), 'New point'];
                                                        setCurriculum({ ...curriculum, levels: newLevels });
                                                    }}>Add Point</Button>
                                                </div>
                                            </div>
                                        </DeletableWrapper>
                                    ))}
                                    <Button
                                        variant="outline"
                                        className="h-24 border-dashed rounded-2xl border-blue-200 text-blue-600 flex flex-col gap-2"
                                        onClick={() => {
                                            setCurriculum({
                                                ...curriculum,
                                                levels: [...curriculum.levels, { title: 'New Level', age: 'Ages X-Y', description: 'Brief description', points: [] }]
                                            });
                                        }}
                                    >
                                        <Plus className="h-6 w-6" />
                                        <span>Add Level</span>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Evaluation Tab */}
                    {activeTab === 'evaluation' && (
                        <motion.div
                            key="evaluation"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-8 space-y-12"
                        >
                            <div className="space-y-4">
                                <div className="text-2xl font-bold text-foreground">
                                    <EditableText value={evaluation.title} onChange={(val) => setEvaluation({ ...evaluation, title: val })} />
                                </div>
                                <div className="text-muted max-w-3xl">
                                    <EditableText value={evaluation.description} onChange={(val) => setEvaluation({ ...evaluation, description: val })} multiline />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {evaluation.methods.map((method, i) => (
                                    <DeletableWrapper
                                        key={i}
                                        onDelete={() => {
                                            const newMethods = evaluation.methods.filter((_, idx) => idx !== i);
                                            setEvaluation({ ...evaluation, methods: newMethods });
                                        }}
                                        className="p-8 rounded-3xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50"
                                    >
                                        <h4 className="text-xl font-bold text-blue-600 mb-2">
                                            <EditableText value={method.title} onChange={(val) => {
                                                const newMethods = [...evaluation.methods];
                                                newMethods[i].title = val;
                                                setEvaluation({ ...evaluation, methods: newMethods });
                                            }} />
                                        </h4>
                                        <p className="text-muted leading-relaxed">
                                            <EditableText value={method.description} onChange={(val) => {
                                                const newMethods = [...evaluation.methods];
                                                newMethods[i].description = val;
                                                setEvaluation({ ...evaluation, methods: newMethods });
                                            }} multiline />
                                        </p>
                                    </DeletableWrapper>
                                ))}
                                <Button variant="outline" className="h-full min-h-[160px] border-dashed rounded-3xl" onClick={() => {
                                    setEvaluation({ ...evaluation, methods: [...evaluation.methods, { title: 'Method Title', description: 'Method description' }] });
                                }}>Add Method</Button>
                            </div>

                            <div className="space-y-6 pt-12 border-t border-border">
                                <h3 className="text-lg font-bold text-blue-600">Progress Monitoring Section</h3>
                                <div className="space-y-6 max-w-4xl">
                                    <div className="text-2xl font-bold">
                                        <EditableText value={evaluation.progressTitle} onChange={(val) => setEvaluation({ ...evaluation, progressTitle: val })} />
                                    </div>
                                    <div className="text-muted">
                                        <EditableText value={evaluation.progressText} onChange={(val) => setEvaluation({ ...evaluation, progressText: val })} multiline />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                        {evaluation.feedbackPoints.map((p, i) => (
                                            <DeletableWrapper key={i} onDelete={() => {
                                                const newP = evaluation.feedbackPoints.filter((_, idx) => idx !== i);
                                                setEvaluation({ ...evaluation, feedbackPoints: newP });
                                            }} className="p-6 rounded-2xl border border-border bg-background">
                                                <div className="font-bold text-lg">
                                                    <EditableText value={p.title} onChange={(val) => {
                                                        const newP = [...evaluation.feedbackPoints];
                                                        newP[i].title = val;
                                                        setEvaluation({ ...evaluation, feedbackPoints: newP });
                                                    }} />
                                                </div>
                                                <div className="text-sm text-muted">
                                                    <EditableText value={p.text} onChange={(val) => {
                                                        const newP = [...evaluation.feedbackPoints];
                                                        newP[i].text = val;
                                                        setEvaluation({ ...evaluation, feedbackPoints: newP });
                                                    }} />
                                                </div>
                                            </DeletableWrapper>
                                        ))}
                                        <Button variant="outline" className="border-dashed" onClick={() => {
                                            setEvaluation({ ...evaluation, feedbackPoints: [...evaluation.feedbackPoints, { title: 'New Point', text: 'Desc' }] });
                                        }}>Add Feedback Point</Button>
                                    </div>

                                    <div className="pt-8 italic text-blue-600 border-t border-border mt-8">
                                        <label className="text-xs font-bold text-muted uppercase block mb-2">Inspirational Quote</label>
                                        <EditableText value={evaluation.quote} onChange={(val) => setEvaluation({ ...evaluation, quote: val })} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Departments Tab */}
                    {activeTab === 'departments' && (
                        <motion.div
                            key="departments"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="p-8 space-y-12"
                        >
                            <div className="space-y-4">
                                <div className="text-2xl font-bold">
                                    <EditableText value={departments.title} onChange={(val) => setDepartments({ ...departments, title: val })} />
                                </div>
                                <div className="text-muted">
                                    <EditableText value={departments.description} onChange={(val) => setDepartments({ ...departments, description: val })} multiline />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-blue-600">Subject Leads</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {departments.heads.map((head, i) => (
                                        <DeletableWrapper
                                            key={i}
                                            onDelete={() => {
                                                const newHeads = departments.heads.filter((_, idx) => idx !== i);
                                                setDepartments({ ...departments, heads: newHeads });
                                            }}
                                            className="p-6 rounded-2xl border border-border bg-background shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <div className="space-y-4">
                                                <div className="aspect-[4/5] rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden relative group flex items-center justify-center">
                                                    {head.image && head.image !== '' ? (
                                                        <img
                                                            src={head.image}
                                                            className="w-full h-full object-cover"
                                                            alt={head.name}
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).style.display = 'none';
                                                                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                                            }}
                                                        />
                                                    ) : null}
                                                    <div className={`flex flex-col items-center justify-center text-center p-4 ${head.image && head.image !== '' ? 'hidden' : ''}`}>
                                                        {uploadingField === `head-img-${i}` ? (
                                                            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                                                        ) : (
                                                            <Users className="w-8 h-8 text-blue-600" />
                                                        )}
                                                        <div className="text-[10px] font-bold text-muted uppercase tracking-wider mt-2">
                                                            {uploadingField === `head-img-${i}` ? 'Uploading...' : 'No Image'}
                                                        </div>
                                                    </div>
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                                        <div className="text-white text-[10px] font-bold uppercase tracking-widest">Update Photo</div>
                                                    </div>
                                                </div>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-full gap-2"
                                                    disabled={uploadingField === `head-img-${i}`}
                                                    onClick={() => {
                                                        const input = document.createElement('input');
                                                        input.type = 'file';
                                                        input.accept = 'image/*';
                                                        input.onchange = (e) => handleImageUpload(e as any, `head-img-${i}`, 'sankalpa-vatika/staff', (url) => {
                                                            const newHeads = [...departments.heads];
                                                            newHeads[i].image = url;
                                                            setDepartments({ ...departments, heads: newHeads });
                                                        });
                                                        input.click();
                                                    }}
                                                >
                                                    <Upload className="h-4 w-4" />
                                                    {head.image ? 'Change Photo' : 'Upload Photo'}
                                                </Button>

                                                <div className="space-y-1">
                                                    <div className="font-bold">
                                                        <EditableText value={head.name} onChange={(val) => {
                                                            const newHeads = [...departments.heads];
                                                            newHeads[i].name = val;
                                                            setDepartments({ ...departments, heads: newHeads });
                                                        }} />
                                                    </div>
                                                    <div className="text-sm text-blue-600 font-medium">
                                                        <EditableText value={head.role} onChange={(val) => {
                                                            const newHeads = [...departments.heads];
                                                            newHeads[i].role = val;
                                                            setDepartments({ ...departments, heads: newHeads });
                                                        }} />
                                                    </div>
                                                    <div className="text-xs text-muted pt-2">
                                                        <EditableText value={head.email} onChange={(val) => {
                                                            const newHeads = [...departments.heads];
                                                            newHeads[i].email = val;
                                                            setDepartments({ ...departments, heads: newHeads });
                                                        }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </DeletableWrapper>
                                    ))}
                                    <Button
                                        variant="outline"
                                        className="h-full min-h-[300px] border-dashed rounded-2xl border-blue-200 text-blue-600 flex flex-col gap-2"
                                        onClick={() => {
                                            setDepartments({
                                                ...departments,
                                                heads: [...departments.heads, { name: 'New Head', role: 'Role Name', email: 'email@sankalpa.edu', image: '' }]
                                            });
                                        }}
                                    >
                                        <Plus className="h-6 w-6" />
                                        <span>Add Department Lead</span>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

