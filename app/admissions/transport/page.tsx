'use client';

import { motion } from 'framer-motion';
import { Bus, MapPin, ShieldCheck, Clock, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getPageContent } from '@/app/actions/settings';

const defaultContent = {
    title: 'School Transport',
    description: 'Connecting students from Lahan and surrounding areas with a safe, punctual, and comfortable daily commute.',
    zones: [
        { name: 'Zone A', stops: 'Lahan Bazaar, Hospital Chowk, Campus Road', fee: 'Rs. XXX' },
        { name: 'Zone B', stops: 'Bastipur, Matiyarwa, Gramin Chowk', fee: 'Rs. XXX' },
        { name: 'Zone C', stops: 'Dhangadhi, Golbazar (Main Highway only)', fee: 'Rs. XXX' },
        { name: 'Zone D', stops: 'Bariyarpatti, Siraha Road', fee: 'Rs. XXX' }
    ],
    rules: [
        'Students must be at the pickup point 5 minutes early.',
        'Standing on the footboard is strictly prohibited.',
        'Eating or littering inside the bus is not allowed.',
        'Bullying or loud noise is strictly monitored.',
        'Students must not put hands or head out of the window.'
    ],
    safetyFeatures: [
        { title: 'Safety First', desc: 'Every bus is equipped with GPS tracking, First Aid kits, and CCTV cameras. A dedicated helper is present on every route.' },
        { title: 'Punctuality', desc: 'We pride ourselves on strict adherence to schedules, ensuring students arrive on time and are dropped off safely before dusk.' },
        { title: 'Wide Coverage', desc: 'Our fleet covers extensive routes across Lahan Municipality and nearby rural municipalities.' }
    ],
    contact: {
        name: 'Mr. Transport Manager',
        phone: '98XXXXXXXX',
        hours: 'Available 6:00 AM - 6:00 PM'
    }
};

export default function TransportPage() {
    const [content, setContent] = useState(defaultContent);

    useEffect(() => {
        const load = async () => {
            const result = await getPageContent('admissions_transport');
            if (result.success && result.data) setContent(prev => ({ ...prev, ...result.data }));
        };
        load();
    }, []);

    return (
        <div className="pt-20 pb-16 min-h-screen bg-background">
            <section className="relative py-20 bg-gradient-to-r from-yellow-500 to-amber-600 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-sm font-medium mb-6 border border-white/20">
                            <Bus className="w-4 h-4" />
                            <span>Safe & Reliable Commute</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6">{content.title}</h1>
                        <p className="text-lg md:text-xl text-amber-50 max-w-2xl mx-auto">
                            {content.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">

                {/* Safety Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {(content.safetyFeatures || []).map((feature, i) => (
                        <div key={i} className="bg-surface border border-border rounded-3xl p-8 hover:shadow-xl transition-shadow text-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                                {i === 0 ? <ShieldCheck className="w-8 h-8" /> : i === 1 ? <Clock className="w-8 h-8" /> : <MapPin className="w-8 h-8" />}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-muted leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Routes Table */}
                    <div className="bg-surface border border-border rounded-3xl p-8 shadow-lg">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <MapPin className="text-red-500" />
                            Transportation Zones & Routes
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left font-bold py-3 text-muted">Zone</th>
                                        <th className="text-left font-bold py-3 text-muted">Areas Covered (Major Stops)</th>
                                        <th className="text-right font-bold py-3 text-muted">Fee (Monthly)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {content.zones.map((route, i) => (
                                        <tr key={i}>
                                            <td className="py-4 font-bold text-foreground">{route.name}</td>
                                            <td className="py-4 text-muted-foreground">{route.stops}</td>
                                            <td className="py-4 text-right font-medium text-foreground">{route.fee}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl text-sm text-muted leading-relaxed">
                            <span className="font-bold text-foreground">Note:</span> Routes are subject to change based on student density. Please verify the exact pickup point with the transport in-charge.
                        </div>
                    </div>

                    {/* Rules */}
                    <div className="space-y-8">
                        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-3xl p-8">
                            <h3 className="text-xl font-bold mb-4 text-amber-800 dark:text-amber-200 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5" />
                                Student Code of Conduct
                            </h3>
                            <ul className="space-y-3">
                                {content.rules.map((rule, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></div>
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                            <h3 className="text-2xl font-bold mb-2">Transport In-Charge</h3>
                            <p className="text-blue-100 mb-6">For route queries, delays, or emergencies, please contact directly.</p>

                            <div className="space-y-2">
                                <div className="font-bold text-xl">{content.contact?.name}</div>
                                <div className="text-2xl font-black tracking-wider">{content.contact?.phone}</div>
                                <div className="text-sm opacity-80">{content.contact?.hours}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
