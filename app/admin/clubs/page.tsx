'use client';

import { useState, useEffect } from 'react';
import {
    Music, Palette, Trophy, Activity, Clock, ShieldCheck,
    Star, Users, Plus, Loader2, Edit3, Trash2,
    BookOpen, Bot, GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPageContent, savePageContent } from '@/app/actions/settings';
import { DeletableWrapper } from '@/components/admin/deletable-wrapper';
import { EditableText } from '@/components/admin/EditableText';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const iconMap: Record<string, any> = {
    Music, Palette, Trophy, Activity, Clock, ShieldCheck, Star, Users, BookOpen, Bot, GraduationCap
};

// --- Interfaces ---

interface OverviewState {
    pageTitle: string;
    pageSubtitle: string;
    houses: { id: string; name: string; color: string; description: string }[];
    clubs: { id: string; title: string; description: string; icon: string }[];
    activities: { title: string; time: string; description: string }[];
}

interface EcaState {
    hero: { title: string; subtitle: string };
    sections: { title: string; content: string }[];
}

interface StemState {
    hero: { title: string; subtitle: string };
    projects: { title: string; description: string }[];
}

interface BookState {
    hero: { title: string; subtitle: string };
    reviews: { bookTitle: string; author: string; studentName: string; review: string; }[];
}

interface ArtsState {
    hero: { title: string; subtitle: string };
    events: { title: string; date: string; description: string }[];
}

interface AlumniState {
    hero: { title: string; subtitle: string };
    stories: { name: string; batch: string; achievement: string; quote: string }[];
}


// --- Default States ---

const defaultOverview: OverviewState = {
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

const defaultEca: EcaState = {
    hero: { title: 'ECA & CCA', subtitle: 'Extra-Curricular and Co-Curricular Activities' },
    sections: [
        { title: 'Debate Club', content: 'Fostering critical thinking and public speaking skills.' },
        { title: 'Quiz Contest', content: 'Testing general knowledge and awareness.' }
    ]
};

const defaultStem: StemState = {
    hero: { title: 'STEM & Robotics', subtitle: 'Innovating for the future' },
    projects: [
        { title: 'Solar Car', description: 'Students built a working prototype of a solar-powered car.' },
        { title: 'Lego Robotics', description: 'Basic programming and mechanics using Lego Mindstorms.' }
    ]
};

const defaultBook: BookState = {
    hero: { title: 'Book Review Program', subtitle: 'Cultivating the habit of reading' },
    reviews: [
        { bookTitle: 'Muna Madan', author: 'Laxmi Prasad Devkota', studentName: 'Aarav Sharma', review: 'A heart-touching story about love and sacrifice.' }
    ]
};

const defaultArts: ArtsState = {
    hero: { title: 'Fine Arts & Music', subtitle: 'Expressing creativity without bounds' },
    events: [
        { title: 'Annual Art Exhibition', date: 'Baisakh 15', description: 'Showcasing student artwork from all grades.' }
    ]
};

const defaultAlumni: AlumniState = {
    hero: { title: 'Alumni Association', subtitle: 'Connecting past and present' },
    stories: [
        { name: 'Dr. Ram Kumar', batch: '2070', achievement: 'MBBS Gold Medalist', quote: 'Sankalpa Vatika gave me the foundation I needed.' }
    ]
};


export default function AdminClubsPage() {
    const [activeTab, setActiveTab] = useState<'overview' | 'eca' | 'stem' | 'book' | 'arts' | 'alumni'>('overview');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [overview, setOverview] = useState<OverviewState>(defaultOverview);
    const [eca, setEca] = useState<EcaState>(defaultEca);
    const [stem, setStem] = useState<StemState>(defaultStem);
    const [book, setBook] = useState<BookState>(defaultBook);
    const [arts, setArts] = useState<ArtsState>(defaultArts);
    const [alumni, setAlumni] = useState<AlumniState>(defaultAlumni);

    useEffect(() => {
        async function loadContent() {
            setLoading(true);
            const load = async (key: string, setter: any, def: any) => {
                const res = await getPageContent(key);
                if (res.success && res.data) setter({ ...def, ...res.data });
            };

            await Promise.all([
                load('clubs_overview', setOverview, defaultOverview),
                load('clubs_eca', setEca, defaultEca),
                load('clubs_stem', setStem, defaultStem),
                load('clubs_book', setBook, defaultBook),
                load('clubs_arts', setArts, defaultArts),
                load('clubs_alumni', setAlumni, defaultAlumni),
            ]);
            setLoading(false);
        }
        loadContent();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        let key = `clubs_${activeTab}`;
        let data: any = {};

        switch (activeTab) {
            case 'overview': data = overview; break;
            case 'eca': data = eca; break;
            case 'stem': data = stem; break;
            case 'book': data = book; break;
            case 'arts': data = arts; break;
            case 'alumni': data = alumni; break;
        }

        const result = await savePageContent(key, data);
        if (result.success) toast.success('Saved successfully!');
        else toast.error('Failed to save: ' + result.error);
        setSaving(false);
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

    const tabs = [
        { id: 'overview', label: 'Club', icon: Star },
        { id: 'eca', label: 'ECA', icon: Activity },
        { id: 'stem', label: 'STEM', icon: Bot },
        { id: 'book', label: 'Book Review', icon: BookOpen },
        { id: 'arts', label: 'Fine Arts', icon: Palette },
        { id: 'alumni', label: 'Alumni', icon: GraduationCap },
    ];

    return (
        <div className="space-y-6 pb-20">
            {/* Toolbar */}
            <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border p-4 flex justify-between items-center -mx-6 px-6 mb-6">
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                                    : 'hover:bg-surface text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
                <Button onClick={handleSave} disabled={saving} className="ml-4 shrink-0 bg-green-600 hover:bg-green-700 text-white">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
                </Button>
            </div>

            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="max-w-4xl mx-auto"
            >
                {/* --- OVERVIEW TAB --- */}
                {activeTab === 'overview' && (
                    <div className="space-y-12">
                        <div className="bg-surface p-8 rounded-3xl border border-border shadow-sm text-center">
                            <label className="text-xs font-bold text-muted uppercase tracking-wider mb-2 block">Page Title</label>
                            <h1 className="text-4xl font-black mb-4">
                                <EditableText value={overview.pageTitle} onChange={v => setOverview({ ...overview, pageTitle: v })} />
                            </h1>
                            <label className="text-xs font-bold text-muted uppercase tracking-wider mb-2 block">Subtitle</label>
                            <p className="text-xl text-muted-foreground">
                                <EditableText multiline value={overview.pageSubtitle} onChange={v => setOverview({ ...overview, pageSubtitle: v })} />
                            </p>
                        </div>

                        {/* House System */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold">House System</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {overview.houses.map((house, i) => (
                                    <div key={i} className="p-6 bg-surface border border-border rounded-xl">
                                        <div className="flex items-center gap-3 mb-3">
                                            <input type="color" value={house.color} onChange={e => {
                                                const newHouses = [...overview.houses]; newHouses[i].color = e.target.value; setOverview({ ...overview, houses: newHouses });
                                            }} className="w-8 h-8 rounded cursor-pointer" />
                                            <div className="font-bold flex-1"><EditableText value={house.name} onChange={v => {
                                                const newHouses = [...overview.houses]; newHouses[i].name = v; setOverview({ ...overview, houses: newHouses });
                                            }} /></div>
                                        </div>
                                        <p className="text-sm text-muted"><EditableText multiline value={house.description} onChange={v => {
                                            const newHouses = [...overview.houses]; newHouses[i].description = v; setOverview({ ...overview, houses: newHouses });
                                        }} /></p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Active Clubs */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-bold">Active Clubs</h3>
                                <Button size="sm" variant="outline" onClick={() => setOverview({ ...overview, clubs: [...overview.clubs, { id: Date.now().toString(), title: 'New Club', description: 'Desc', icon: 'Star' }] })}><Plus className="w-4 h-4 mr-2" />Add Club</Button>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {overview.clubs.map((club, i) => (
                                    <DeletableWrapper key={i} onDelete={() => {
                                        const newClubs = overview.clubs.filter((_, idx) => idx !== i); setOverview({ ...overview, clubs: newClubs });
                                    }}>
                                        <div className="p-6 bg-surface border border-border rounded-xl flex gap-4">
                                            <div className="flex-1">
                                                <div className="font-bold text-lg mb-1"><EditableText value={club.title} onChange={v => {
                                                    const newClubs = [...overview.clubs]; newClubs[i].title = v; setOverview({ ...overview, clubs: newClubs });
                                                }} /></div>
                                                <div className="text-muted"><EditableText multiline value={club.description} onChange={v => {
                                                    const newClubs = [...overview.clubs]; newClubs[i].description = v; setOverview({ ...overview, clubs: newClubs });
                                                }} /></div>
                                            </div>
                                            <select value={club.icon} onChange={e => {
                                                const newClubs = [...overview.clubs]; newClubs[i].icon = e.target.value; setOverview({ ...overview, clubs: newClubs });
                                            }} className="bg-transparent border rounded p-1 text-xs h-fit self-start">
                                                {Object.keys(iconMap).map(k => <option key={k} value={k}>{k}</option>)}
                                            </select>
                                        </div>
                                    </DeletableWrapper>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- ECA TAB --- */}
                {activeTab === 'eca' && (
                    <div className="space-y-8">
                        <div className="bg-surface p-8 rounded-3xl border border-border shadow-sm text-center">
                            <h2 className="text-3xl font-black mb-2"><EditableText value={eca.hero.title} onChange={v => setEca({ ...eca, hero: { ...eca.hero, title: v } })} /></h2>
                            <p className="text-muted-foreground"><EditableText value={eca.hero.subtitle} onChange={v => setEca({ ...eca, hero: { ...eca.hero, subtitle: v } })} /></p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold">Sections</h3>
                                <Button size="sm" onClick={() => setEca({ ...eca, sections: [...eca.sections, { title: 'New Section', content: 'Content' }] })}><Plus className="w-4 h-4 mr-2" />Add Section</Button>
                            </div>
                            {eca.sections.map((sec, i) => (
                                <DeletableWrapper key={i} onDelete={() => {
                                    const newSec = eca.sections.filter((_, idx) => idx !== i); setEca({ ...eca, sections: newSec });
                                }}>
                                    <div className="p-6 bg-surface border border-border rounded-xl space-y-2">
                                        <h4 className="font-bold text-lg"><EditableText value={sec.title} onChange={v => {
                                            const newSec = [...eca.sections]; newSec[i].title = v; setEca({ ...eca, sections: newSec });
                                        }} /></h4>
                                        <div className="text-muted-foreground"><EditableText multiline value={sec.content} onChange={v => {
                                            const newSec = [...eca.sections]; newSec[i].content = v; setEca({ ...eca, sections: newSec });
                                        }} /></div>
                                    </div>
                                </DeletableWrapper>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- STEM TAB --- */}
                {activeTab === 'stem' && (
                    <div className="space-y-8">
                        <div className="bg-surface p-8 rounded-3xl border border-border shadow-sm text-center">
                            <h2 className="text-3xl font-black mb-2"><EditableText value={stem.hero.title} onChange={v => setStem({ ...stem, hero: { ...stem.hero, title: v } })} /></h2>
                            <p className="text-muted-foreground"><EditableText value={stem.hero.subtitle} onChange={v => setStem({ ...stem, hero: { ...stem.hero, subtitle: v } })} /></p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold">Projects</h3>
                                <Button size="sm" onClick={() => setStem({ ...stem, projects: [...stem.projects, { title: 'New Project', description: 'Desc' }] })}><Plus className="w-4 h-4 mr-2" />Add Project</Button>
                            </div>
                            {stem.projects.map((proj, i) => (
                                <DeletableWrapper key={i} onDelete={() => {
                                    const newProj = stem.projects.filter((_, idx) => idx !== i); setStem({ ...stem, projects: newProj });
                                }}>
                                    <div className="p-6 bg-surface border border-border rounded-xl space-y-2">
                                        <h4 className="font-bold text-lg"><EditableText value={proj.title} onChange={v => {
                                            const newProj = [...stem.projects]; newProj[i].title = v; setStem({ ...stem, projects: newProj });
                                        }} /></h4>
                                        <div className="text-muted-foreground"><EditableText multiline value={proj.description} onChange={v => {
                                            const newProj = [...stem.projects]; newProj[i].description = v; setStem({ ...stem, projects: newProj });
                                        }} /></div>
                                    </div>
                                </DeletableWrapper>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- BOOK TAB --- */}
                {activeTab === 'book' && (
                    <div className="space-y-8">
                        <div className="bg-surface p-8 rounded-3xl border border-border shadow-sm text-center">
                            <h2 className="text-3xl font-black mb-2"><EditableText value={book.hero.title} onChange={v => setBook({ ...book, hero: { ...book.hero, title: v } })} /></h2>
                            <p className="text-muted-foreground"><EditableText value={book.hero.subtitle} onChange={v => setBook({ ...book, hero: { ...book.hero, subtitle: v } })} /></p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold">Reviews</h3>
                                <Button size="sm" onClick={() => setBook({ ...book, reviews: [...book.reviews, { bookTitle: 'Book', author: 'Author', studentName: 'Student', review: 'Review' }] })}><Plus className="w-4 h-4 mr-2" />Add Review</Button>
                            </div>
                            {book.reviews.map((rev, i) => (
                                <DeletableWrapper key={i} onDelete={() => {
                                    const newRev = book.reviews.filter((_, idx) => idx !== i); setBook({ ...book, reviews: newRev });
                                }}>
                                    <div className="p-6 bg-surface border border-border rounded-xl space-y-2">
                                        <div className="flex gap-4">
                                            <div className="flex-1 font-bold"><EditableText value={rev.bookTitle} onChange={v => {
                                                const newRev = [...book.reviews]; newRev[i].bookTitle = v; setBook({ ...book, reviews: newRev });
                                            }} /></div>
                                            <div className="flex-1 text-muted"><EditableText value={rev.author} onChange={v => {
                                                const newRev = [...book.reviews]; newRev[i].author = v; setBook({ ...book, reviews: newRev });
                                            }} /></div>
                                        </div>
                                        <div className="text-sm text-blue-500 font-bold"><EditableText value={rev.studentName} onChange={v => {
                                            const newRev = [...book.reviews]; newRev[i].studentName = v; setBook({ ...book, reviews: newRev });
                                        }} /></div>
                                        <div className="text-muted-foreground"><EditableText multiline value={rev.review} onChange={v => {
                                            const newRev = [...book.reviews]; newRev[i].review = v; setBook({ ...book, reviews: newRev });
                                        }} /></div>
                                    </div>
                                </DeletableWrapper>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- ARTS TAB --- */}
                {activeTab === 'arts' && (
                    <div className="space-y-8">
                        <div className="bg-surface p-8 rounded-3xl border border-border shadow-sm text-center">
                            <h2 className="text-3xl font-black mb-2"><EditableText value={arts.hero.title} onChange={v => setArts({ ...arts, hero: { ...arts.hero, title: v } })} /></h2>
                            <p className="text-muted-foreground"><EditableText value={arts.hero.subtitle} onChange={v => setArts({ ...arts, hero: { ...arts.hero, subtitle: v } })} /></p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold">Events</h3>
                                <Button size="sm" onClick={() => setArts({ ...arts, events: [...arts.events, { title: 'Event', date: 'Date', description: 'Desc' }] })}><Plus className="w-4 h-4 mr-2" />Add Event</Button>
                            </div>
                            {arts.events.map((ev, i) => (
                                <DeletableWrapper key={i} onDelete={() => {
                                    const newEv = arts.events.filter((_, idx) => idx !== i); setArts({ ...arts, events: newEv });
                                }}>
                                    <div className="p-6 bg-surface border border-border rounded-xl space-y-2">
                                        <div className="flex gap-4">
                                            <div className="flex-1 font-bold"><EditableText value={ev.title} onChange={v => {
                                                const newEv = [...arts.events]; newEv[i].title = v; setArts({ ...arts, events: newEv });
                                            }} /></div>
                                            <div className="text-sm font-bold bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded"><EditableText value={ev.date} onChange={v => {
                                                const newEv = [...arts.events]; newEv[i].date = v; setArts({ ...arts, events: newEv });
                                            }} /></div>
                                        </div>
                                        <div className="text-muted-foreground"><EditableText multiline value={ev.description} onChange={v => {
                                            const newEv = [...arts.events]; newEv[i].description = v; setArts({ ...arts, events: newEv });
                                        }} /></div>
                                    </div>
                                </DeletableWrapper>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- ALUMNI TAB --- */}
                {activeTab === 'alumni' && (
                    <div className="space-y-8">
                        <div className="bg-surface p-8 rounded-3xl border border-border shadow-sm text-center">
                            <h2 className="text-3xl font-black mb-2"><EditableText value={alumni.hero.title} onChange={v => setAlumni({ ...alumni, hero: { ...alumni.hero, title: v } })} /></h2>
                            <p className="text-muted-foreground"><EditableText value={alumni.hero.subtitle} onChange={v => setAlumni({ ...alumni, hero: { ...alumni.hero, subtitle: v } })} /></p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold">Success Stories</h3>
                                <Button size="sm" onClick={() => setAlumni({ ...alumni, stories: [...alumni.stories, { name: 'Name', batch: 'Batch', achievement: 'Achievement', quote: 'Quote' }] })}><Plus className="w-4 h-4 mr-2" />Add Story</Button>
                            </div>
                            {alumni.stories.map((story, i) => (
                                <DeletableWrapper key={i} onDelete={() => {
                                    const newStories = alumni.stories.filter((_, idx) => idx !== i); setAlumni({ ...alumni, stories: newStories });
                                }}>
                                    <div className="p-6 bg-surface border border-border rounded-xl space-y-2">
                                        <div className="flex justify-between">
                                            <div className="font-bold text-lg"><EditableText value={story.name} onChange={v => {
                                                const newStories = [...alumni.stories]; newStories[i].name = v; setAlumni({ ...alumni, stories: newStories });
                                            }} /></div>
                                            <div className="text-sm bg-green-100 dark:bg-green-900 px-2 py-1 rounded"><EditableText value={story.batch} onChange={v => {
                                                const newStories = [...alumni.stories]; newStories[i].batch = v; setAlumni({ ...alumni, stories: newStories });
                                            }} /></div>
                                        </div>
                                        <div className="font-medium text-blue-600"><EditableText value={story.achievement} onChange={v => {
                                            const newStories = [...alumni.stories]; newStories[i].achievement = v; setAlumni({ ...alumni, stories: newStories });
                                        }} /></div>
                                        <div className="text-muted-foreground italic"><EditableText multiline value={story.quote} onChange={v => {
                                            const newStories = [...alumni.stories]; newStories[i].quote = v; setAlumni({ ...alumni, stories: newStories });
                                        }} /></div>
                                    </div>
                                </DeletableWrapper>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
