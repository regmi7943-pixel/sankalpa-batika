// Force dynamic rendering to ensure fresh data on Vercel
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { Target, Eye, Heart, GraduationCap, Award, Shield, Users, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPageContent } from '@/app/actions/settings';
import { getGallery } from '@/app/actions/gallery';
import StaffCard from '@/components/staff-card';
import DynamicIcon from '@/components/DynamicIcon';

const defaultContent = {
    pageTitle: 'About Sankalpa Vatika',
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

const iconMap: Record<string, any> = { Award, Shield, Users, Zap, Heart };

export default async function AboutPage() {
    const [result, galleryRes] = await Promise.all([
        getPageContent('about'),
        getGallery()
    ]);

    const content = result.success && result.data ? { ...defaultContent, ...result.data } : defaultContent;
    const allStaff = (galleryRes.data || []).filter((item: any) => item.category === 'staff');
    const previewStaff = allStaff.slice(0, 3);

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-48 md:w-72 h-48 md:h-72 bg-amber-400 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 animate-fade-in">
                        {content.pageTitle}
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto animate-fade-in px-4" style={{ animationDelay: '0.1s' }}>
                        {content.pageSubtitle}
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 md:py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                        {/* Mission */}
                        <div className="bg-gradient-to-br from-blue-50/50 dark:from-blue-900/10 to-background p-6 md:p-8 rounded-3xl border border-blue-100 dark:border-blue-900/20 animate-slide-up shadow-sm">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
                                <DynamicIcon name={content.missionIcon} className="h-6 w-6 md:h-8 md:w-8 text-white" fallback={<Target className="h-6 w-6 md:h-8 md:w-8 text-white" />} />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">{content.missionTitle}</h2>
                            <p className="text-muted leading-relaxed mb-4 text-sm md:text-base">
                                {content.missionText}
                            </p>
                            <ul className="space-y-2 text-muted text-sm md:text-base">
                                {content.missionPoints.map((point: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Vision */}
                        <div className="bg-gradient-to-br from-amber-50/50 dark:from-amber-900/10 to-background p-6 md:p-8 rounded-3xl border border-amber-100 dark:border-amber-900/20 animate-slide-up shadow-sm" style={{ animationDelay: '0.1s' }}>
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-amber-500 flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20">
                                <DynamicIcon name={content.visionIcon} className="h-6 w-6 md:h-8 md:w-8 text-white" fallback={<Eye className="h-6 w-6 md:h-8 md:w-8 text-white" />} />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">{content.visionTitle}</h2>
                            <p className="text-muted leading-relaxed mb-4 text-sm md:text-base">
                                {content.visionText}
                            </p>
                            <ul className="space-y-2 text-muted text-sm md:text-base">
                                {content.visionPoints.map((point: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-16 md:py-20 bg-surface">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <span className="text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-wider">What We Believe</span>
                        <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-2">Our Core Values</h2>
                        <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto mt-4 rounded"></div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {content.values.map((value: any, i: number) => {
                            const IconComponent = iconMap[value.icon] || Heart;
                            return (
                                <div key={i} className="text-center group animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-background dark:bg-surface shadow-md flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl group-hover:scale-105 transition-all border border-surface-dark/10">
                                        <DynamicIcon name={value.icon} className="h-8 w-8 md:h-12 md:w-12 text-blue-600 dark:text-blue-400" fallback={<Heart className="h-8 w-8 md:h-12 md:w-12 text-blue-600 dark:text-blue-400" />} />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{value.title}</h3>
                                    <p className="text-muted text-xs md:text-sm max-w-[200px] mx-auto">{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-16 md:py-20 bg-background">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <span className="text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-wider">Our Journey</span>
                        <h2 className="text-2xl md:text-4xl font-bold text-foreground mt-2">School History</h2>
                        <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto mt-4 rounded"></div>
                    </div>

                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900/30"></div>

                        <div className="space-y-8 md:space-y-12">
                            {content.timeline.map((item: any, i: number) => (
                                <div key={i} className="relative flex items-start gap-6 md:gap-8 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                                    <div className="z-10 flex-shrink-0">
                                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg text-sm md:text-base">
                                            {item.year}
                                        </div>
                                    </div>

                                    <div className="flex-1 p-4 md:p-6 bg-surface rounded-xl md:rounded-2xl border border-surface-dark/10 card-hover">
                                        <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{item.title}</h3>
                                        <p className="text-muted text-sm md:text-base">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Section Preview */}
            <section className="py-16 md:py-24 bg-surface border-t border-surface-dark/10">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/20">
                        <GraduationCap className="h-8 w-8 md:h-10 md:w-10 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Met Our Dedicated Team</h2>
                    <p className="text-muted mb-12 text-sm md:text-lg max-w-3xl mx-auto">
                        Our faculty members are highly qualified, experienced, and passionate about teaching. They are committed to providing a supportive and challenging learning environment for all students.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto justify-center">
                        {previewStaff.map((staff: any) => (
                            <StaffCard key={staff.id} staff={staff} />
                        ))}

                        {previewStaff.length === 0 && (
                            <div className="col-span-full py-10 opacity-40">
                                <p className="italic">No staff members to display.</p>
                            </div>
                        )}
                    </div>

                    {allStaff.length > 3 && (
                        <div className="mt-12">
                            <Link href="/staff">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-sm md:text-base font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2 mx-auto">
                                    View Our All Staff
                                    <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
