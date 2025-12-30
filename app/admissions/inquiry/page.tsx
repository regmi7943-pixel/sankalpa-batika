'use client';

import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { getPageContent, getSiteSettings } from '@/app/actions/settings';

const defaultContent = {
    hero: {
        title: 'Start Your Journey',
        subtitle: 'We\'d love to hear from you. Fill out the inquiry form below, and our admissions team will get back to you shortly.'
    },
    whyChoose: [
        'Experienced & Caring Faculty',
        'Safe & Spacious Environment',
        'Modern Teaching Methodology',
        'Focus on Moral Values',
        'Extensive ECA Programs'
    ]
};

export default function AdmissionInquiryPage() {
    const [content, setContent] = useState(defaultContent);
    const [siteSettings, setSiteSettings] = useState<any>(null);

    useEffect(() => {
        const load = async () => {
            const result = await getPageContent('admissions_inquiry');
            if (result.success && result.data) setContent(prev => ({ ...prev, ...result.data }));

            const settings = await getSiteSettings();
            if (settings.success && settings.data) setSiteSettings(settings.data);
        };
        load();
    }, []);

    return (
        <div className="pt-20 pb-16 min-h-screen bg-background">
            <section className="relative py-16 bg-gradient-to-r from-blue-900 to-indigo-800 text-white">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="max-w-2xl">
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-3xl md:text-5xl font-black mb-4"
                        >
                            {content.hero.title}
                        </motion.h1>
                        <p className="text-blue-100 text-lg">
                            {content.hero.subtitle}
                        </p>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-2 bg-surface border border-border rounded-3xl p-8 shadow-xl">
                        <form className="space-y-6">
                            <h2 className="text-2xl font-bold text-foreground mb-6">Student Inquiry Form</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted">Student's Full Name</label>
                                    <Input placeholder="Enter student's name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted">Gender</label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted">Grade Applying For</label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Grade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="nursery">Nursery</SelectItem>
                                            <SelectItem value="lkg">LKG</SelectItem>
                                            <SelectItem value="ukg">UKG</SelectItem>
                                            <SelectItem value="1">Grade 1</SelectItem>
                                            <SelectItem value="2">Grade 2</SelectItem>
                                            <SelectItem value="3">Grade 3</SelectItem>
                                            <SelectItem value="4">Grade 4</SelectItem>
                                            <SelectItem value="5">Grade 5</SelectItem>
                                            <SelectItem value="6">Grade 6</SelectItem>
                                            <SelectItem value="7">Grade 7</SelectItem>
                                            <SelectItem value="8">Grade 8</SelectItem>
                                            <SelectItem value="9">Grade 9</SelectItem>
                                            <SelectItem value="10">Grade 10</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted">Date of Birth (BS)</label>
                                    <Input placeholder="YYYY-MM-DD" />
                                </div>
                            </div>

                            <div className="h-px bg-border my-6"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted">Parent/Guardian Name</label>
                                    <Input placeholder="Enter parent's name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted">Phone Number</label>
                                    <Input placeholder="98XXXXXXXX" type="tel" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold text-muted">Email Address (Optional)</label>
                                    <Input placeholder="Enter email address" type="email" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted">Message / Specific Queries</label>
                                <Textarea className="min-h-[120px]" placeholder="Tell us about the student or ask any questions..." />
                            </div>

                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl text-lg shadow-lg shadow-blue-600/20">
                                <Send className="w-5 h-5 mr-2" />
                                Submit Inquiry
                            </Button>
                        </form>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-amber-500 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                            <h3 className="text-xl font-bold mb-6">Contact Admissions</h3>
                            <div className="space-y-4 relative z-10">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-amber-100 font-medium opacity-80">Call Us</div>
                                        <div className="font-bold">{siteSettings?.phone1 || '033-590093'}</div>
                                        <div className="font-bold">{siteSettings?.phone2 || '98XXXXXXXX'}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-amber-100 font-medium opacity-80">Email Us</div>
                                        <div className="font-bold break-all">{siteSettings?.email2 || 'admissions@sankalpavatika.edu.np'}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-amber-100 font-medium opacity-80">Visit Hours</div>
                                        <div className="font-bold whitespace-pre-line">{siteSettings?.hours || 'Sunday - Friday\n9:00 AM - 4:00 PM'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface border border-border rounded-3xl p-6 shadow-sm">
                            <h3 className="font-bold text-foreground mb-4">Why Choose Sankalpa?</h3>
                            <ul className="space-y-3">
                                {content.whyChoose.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm text-muted">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
