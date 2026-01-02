'use client';

import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { getPageContent, getSiteSettings } from '@/app/actions/settings';
import { submitApplication } from '@/app/actions/admissions';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        studentName: '',
        gender: '',
        grade: '',
        dob: '',
        parentName: '',
        phone: '',
        email: '',
        message: ''
    });

    useEffect(() => {
        const load = async () => {
            const result = await getPageContent('admissions_inquiry');
            if (result.success && result.data) setContent((prev: typeof defaultContent) => ({ ...prev, ...result.data }));

            const settings = await getSiteSettings();
            if (settings.success && settings.data) setSiteSettings(settings.data);
        };
        load();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.studentName || !formData.parentName || !formData.phone || !formData.grade) {
            toast.error('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true);
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                data.append(key, String(value));
            }
        });

        const result = await submitApplication(data);
        setIsSubmitting(false);

        if (result.success) {
            toast.success('Inquiry submitted successfully! We will contact you soon.');
            setFormData({
                studentName: '',
                gender: '',
                grade: '',
                dob: '',
                parentName: '',
                phone: '',
                email: '',
                message: ''
            });
        } else {
            toast.error(result.error || 'Failed to submit inquiry.');
        }
    };

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
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <h2 className="text-2xl font-bold text-foreground mb-6">Student Inquiry Form</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted">Student's Full Name *</label>
                                    <Input
                                        name="studentName"
                                        required
                                        value={formData.studentName}
                                        onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                                        placeholder="Enter student's name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted">Gender</label>
                                    <Select
                                        value={formData.gender}
                                        onValueChange={(val) => setFormData({ ...formData, gender: val })}
                                    >
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
                                    <label className="text-sm font-bold text-muted">Grade Applying For *</label>
                                    <Select
                                        value={formData.grade}
                                        onValueChange={(val) => setFormData({ ...formData, grade: val })}
                                    >
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
                                    <Input
                                        name="dob"
                                        value={formData.dob}
                                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                        placeholder="YYYY-MM-DD"
                                    />
                                </div>
                            </div>

                            <div className="h-px bg-border my-6"></div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted">Parent/Guardian Name *</label>
                                    <Input
                                        name="parentName"
                                        required
                                        value={formData.parentName}
                                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                                        placeholder="Enter parent's name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted">Phone Number *</label>
                                    <Input
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        placeholder="98XXXXXXXX"
                                        type="tel"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold text-muted">Email Address (Optional)</label>
                                    <Input
                                        name="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="Enter email address"
                                        type="email"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted">Message / Specific Queries</label>
                                <Textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="min-h-[120px]"
                                    placeholder="Tell us about the student or ask any questions..."
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl text-lg shadow-lg shadow-blue-600/20"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 mr-2" />
                                        Submit Inquiry
                                    </>
                                )}
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
                                {content.whyChoose.map((item: string, i: number) => (
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
