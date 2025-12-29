'use client';

import { motion } from 'framer-motion';
import { Music, Palette, Trophy, Activity, Clock, ShieldCheck, Star, Users } from 'lucide-react';

const iconMap: Record<string, any> = {
    Music, Palette, Trophy, Activity, Clock, ShieldCheck, Star, Users
};

export function ClubsClient({ content }: { content: any }) {
    return (
        <div className="space-y-24 pb-32">
            {/* Hero Section */}
            <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-slate-900">
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight"
                    >
                        {content.pageTitle}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-blue-100/80 font-medium"
                    >
                        {content.pageSubtitle}
                    </motion.p>
                </div>
            </section>

            {/* House System */}
            <section className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Our Spirit</span>
                    <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4 italic tracking-tight">The House System</h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-amber-500 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {content.houses.map((house: any, idx: number) => (
                        <motion.div
                            key={house.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
                        >
                            <div
                                className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700"
                                style={{ backgroundColor: house.color }}
                            />
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner"
                                style={{ backgroundColor: `${house.color}15` }}
                            >
                                <ShieldCheck className="h-8 w-8" style={{ color: house.color }} />
                            </div>
                            <h3 className="text-xl font-black text-foreground mb-4 tracking-tight">{house.name}</h3>
                            <p className="text-muted text-sm leading-relaxed font-medium">{house.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Clubs Grid */}
            <section className="bg-slate-50 dark:bg-slate-900/50 py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
                        <div className="space-y-2">
                            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em] block">Explore Interests</span>
                            <h2 className="text-3xl md:text-5xl font-black text-foreground italic tracking-tight">Active Clubs</h2>
                        </div>
                        <p className="max-w-md text-muted font-medium">Diverse opportunities for students to pursue their passions and develop specialized skills outside the classroom.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                        {content.clubs.map((club: any, idx: number) => {
                            const Icon = iconMap[club.icon] || Star;
                            return (
                                <motion.div
                                    key={club.id}
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="group flex flex-col sm:flex-row gap-8 p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500"
                                >
                                    <div className="w-20 h-20 shrink-0 bg-blue-600/5 dark:bg-blue-600/10 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-500">
                                        <Icon className="h-10 w-10 text-blue-600 group-hover:text-white transition-colors duration-500" />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-black text-foreground tracking-tight">{club.title}</h3>
                                        <p className="text-muted leading-relaxed font-medium">{club.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Activities Schedule */}
            <section className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-foreground italic tracking-tight">General Activities</h2>
                    <p className="text-muted font-medium">Daily and weekly routines that enrich our school environment.</p>
                </div>

                <div className="space-y-4">
                    {content.activities.map((activity: any, idx: number) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group flex items-center justify-between p-8 bg-surface dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl hover:border-blue-500/30 transition-all duration-300"
                        >
                            <div className="flex items-center gap-6">
                                <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-blue-600 transition-colors">
                                    <Clock className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-black text-lg text-foreground mb-1">{activity.title}</h4>
                                    <p className="text-sm text-muted font-medium">{activity.description}</p>
                                </div>
                            </div>
                            <span className="px-4 py-2 bg-blue-100/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-black text-xs rounded-full whitespace-nowrap">
                                {activity.time}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
