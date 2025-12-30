'use client';

import { motion } from 'framer-motion';
import { Home, Coffee, BookOpen, UserCheck, Clock, Utensils } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getPageContent } from '@/app/actions/settings';

const defaultContent = {
    title: 'Boarding Facilities',
    description: 'A nurturing environment where students learn independence, camaraderie, and discipline under expert pastoral care.',
    features: [
        { title: 'Comfortable Dorms', desc: 'Spacious, air-conditioned rooms with individual lockers and study desks.' },
        { title: 'Healthy Meals', desc: 'Nutritious vegetarian and non-vegetarian meals prepared in a hygienic kitchen.' },
        { title: 'Evening Prep', desc: 'Supervised study hours with subject teachers available for doubt clearing.' },
        { title: '24/7 Wardens', desc: 'Dedicated matrons and wardens ensuring safety and emotional well-being.' },
    ],
    schedule: [
        { time: '05:30 AM', activity: 'Wake Up & Morning Exercise / Yoga' },
        { time: '07:00 AM', activity: 'Breakfast' },
        { time: '08:45 AM', activity: 'School Assembly & Classes' },
        { time: '04:15 PM', activity: 'Snacks & Sports / Games' },
        { time: '06:00 PM', activity: 'Evening Prayer & Study Prep' },
        { time: '08:00 PM', activity: 'Dinner' },
        { time: '09:30 PM', activity: 'Lights Out' },
    ],
    menu: [
        { type: 'Breakfast', items: 'Chana-Anda, Haluwa, Bread-Jam, Milk' },
        { type: 'Lunch', items: 'Rice, Dal, Seasonal Veg, Salad, Achar (Chicken/Paneer twice a week)' },
        { type: 'Snacks', items: 'Noodles, Fruits, Biscuits, Tea' }
    ],
    visitation: 'Parents can visit their wards on the last Saturday of every month between 10:00 AM - 2:00 PM. In case of emergencies, please contact the warden.\n\nNote: Fast food delivery is not allowed.'
};

export default function BoardingPage() {
    const [content, setContent] = useState(defaultContent);

    useEffect(() => {
        const load = async () => {
            const result = await getPageContent('admissions_boarding');
            if (result.success && result.data) setContent(prev => ({ ...prev, ...result.data }));
        };
        load();
    }, []);

    const icons = [Home, Utensils, BookOpen, UserCheck];

    return (
        <div className="pt-20 pb-16 min-h-screen bg-background">
            <section className="relative py-20 bg-gradient-to-r from-stone-800 to-stone-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-stone-200 text-sm font-medium mb-6 border border-white/10">
                            <Home className="w-4 h-4" />
                            <span>Home Away From Home</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6">{content.title}</h1>
                        <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto">
                            {content.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {(content.features || []).map((feature, i) => {
                        const Icon = icons[i % icons.length];
                        return (
                            <div key={i} className="bg-surface border border-border p-6 rounded-3xl hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-stone-100 dark:bg-stone-900/50 rounded-2xl flex items-center justify-center mb-4 text-stone-700 dark:text-stone-300">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                                <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Daily Routine */}
                    <div className="lg:col-span-2 bg-surface border border-border rounded-3xl p-8 shadow-xl">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <Clock className="text-stone-600" />
                            A Typical Day at Hostel
                        </h3>
                        <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                            {(content.schedule || []).map((slot, i) => (
                                <div key={i} className="relative flex items-center gap-6">
                                    <div className="w-10 h-10 rounded-full bg-background border-4 border-surface shadow-sm flex items-center justify-center shrink-0 z-10 text-xs font-bold text-stone-500">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-xl flex justify-between items-center group hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
                                        <span className="font-medium text-foreground">{slot.activity}</span>
                                        <span className="text-sm font-bold text-stone-500 bg-white dark:bg-stone-800 px-3 py-1 rounded-full shadow-sm">{slot.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Menu & Visitation */}
                    <div className="space-y-8">
                        <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 rounded-3xl p-8">
                            <h3 className="text-xl font-bold mb-6 text-orange-800 dark:text-orange-200 flex items-center gap-2">
                                <Utensils className="w-5 h-5" />
                                Weekly Menu Highlights
                            </h3>
                            <div className="space-y-4">
                                {(content.menu || []).map((item, i) => (
                                    <div key={i} className="p-4 bg-white dark:bg-orange-950/30 rounded-xl">
                                        <div className="text-xs font-bold text-orange-500 uppercase mb-1">{item.type}</div>
                                        <div className="text-sm font-medium">{item.items}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-surface border border-border p-6 rounded-2xl">
                            <h4 className="font-bold mb-2">Visitation Policy</h4>
                            <p className="text-sm text-muted leading-relaxed mb-4 whitespace-pre-line">
                                {content.visitation}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
