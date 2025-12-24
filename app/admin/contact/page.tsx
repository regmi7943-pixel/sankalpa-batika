'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Loader2, Plus } from 'lucide-react';
import { DeletableWrapper } from '@/components/admin/deletable-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { getPageContent, savePageContent } from '@/app/actions/settings';


import { EditableText } from '@/components/admin/EditableText';
import { IconPicker } from '@/components/admin/IconPicker';


const defaultContent = {
    pageTitle: 'Get In Touch',
    pageSubtitle: 'Have questions? We\'d love to hear from you.',
    contactInfo: [
        { icon: 'MapPin', title: 'Visit Us', details: 'Kathmandu, Nepal' },
        { icon: 'Phone', title: 'Call Us', details: '+977-1-4XXXXXX' },
        { icon: 'Mail', title: 'Email Us', details: 'info@sankalpabatika.edu.np' },
        { icon: 'Clock', title: 'Office Hours', details: 'Sun-Fri: 9AM-4PM' },
    ],
};

export default function AdminContactPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [content, setContent] = useState(defaultContent);

    // Load content
    useEffect(() => {
        async function loadContent() {
            const result = await getPageContent('contact');
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
        const result = await savePageContent('contact', content);
        if (result.success) {
            alert('Changes saved successfully!');
        } else {
            alert('Failed to save changes: ' + result.error);
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
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    const iconMap: Record<string, any> = { MapPin, Phone, Mail, Clock };

    return (
        <div className="relative">
            {/* Loading Overlay */}
            {saving && (
                <div className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="bg-surface p-4 rounded-xl shadow-2xl flex items-center gap-3 border border-border">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                        <span className="font-medium text-foreground">Saving changes...</span>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                        <EditableText value={content.pageTitle} onChange={(val) => setContent({ ...content, pageTitle: val })} />
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        <EditableText value={content.pageSubtitle} onChange={(val) => setContent({ ...content, pageSubtitle: val })} />
                    </p>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-16 bg-surface -mt-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {content.contactInfo.map((info, i) => {
                            const IconComponent = iconMap[info.icon] || MapPin;
                            return (
                                <DeletableWrapper
                                    key={i}
                                    onDelete={() => {
                                        const newInfo = content.contactInfo.filter((_, index) => index !== i);
                                        setContent({ ...content, contactInfo: newInfo });
                                    }}
                                >
                                    <Card className="border-0 shadow-lg h-full">
                                        <CardContent className="p-6 text-center">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                                                <IconPicker
                                                    value={info.icon || 'MapPin'}
                                                    onChange={(newIcon) => {
                                                        const newInfo = [...content.contactInfo];
                                                        newInfo[i].icon = newIcon;
                                                        setContent({ ...content, contactInfo: newInfo });
                                                    }}
                                                    className="h-7 w-7 text-white"
                                                />
                                            </div>
                                            <h3 className="text-lg font-bold text-foreground mb-2">
                                                <EditableText
                                                    value={info.title}
                                                    onChange={(val) => {
                                                        const newInfo = [...content.contactInfo];
                                                        newInfo[i].title = val;
                                                        setContent({ ...content, contactInfo: newInfo });
                                                    }}
                                                />
                                            </h3>
                                            <p className="text-muted">
                                                <EditableText
                                                    value={info.details}
                                                    onChange={(val) => {
                                                        const newInfo = [...content.contactInfo];
                                                        newInfo[i].details = val;
                                                        setContent({ ...content, contactInfo: newInfo });
                                                    }}
                                                />
                                            </p>
                                        </CardContent>
                                    </Card>
                                </DeletableWrapper>
                            );
                        })}
                        {/* Add Contact Info Button */}
                        <Button
                            variant="outline"
                            className="border-dashed border-blue-200 text-blue-600 hover:bg-blue-50 h-full min-h-[200px] rounded-2xl flex flex-col gap-2 p-6 bg-white shadow-sm"
                            onClick={() => {
                                setContent({
                                    ...content,
                                    contactInfo: [...content.contactInfo, { icon: 'MapPin', title: 'New Location', details: 'Address here' }]
                                });
                            }}
                        >
                            <Plus className="h-6 w-6" />
                            <span className="font-semibold">Add Contact Card</span>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Contact Form & Map */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-6">Send a Message</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted">First Name</label>
                                        <Input placeholder="John" className="bg-surface" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted">Last Name</label>
                                        <Input placeholder="Doe" className="bg-surface" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted">Email</label>
                                    <Input type="email" placeholder="john@example.com" className="bg-surface" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted">Subject</label>
                                    <select className="w-full h-10 rounded-md border border-border bg-surface px-3 text-sm text-foreground">
                                        <option>Select a subject</option>
                                        <option>Admission Inquiry</option>
                                        <option>General Information</option>
                                        <option>Feedback</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted">Message</label>
                                    <textarea
                                        rows={4}
                                        placeholder="How can we help you?"
                                        className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground"
                                    ></textarea>
                                </div>

                                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 py-6">
                                    Send Message
                                    <Send className="ml-2 h-5 w-5" />
                                </Button>
                            </form>
                        </div>

                        {/* Map */}
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-6">Find Us</h2>
                            <div className="bg-surface rounded-2xl h-[400px] flex items-center justify-center">
                                <div className="text-center">
                                    <MapPin className="h-16 w-16 text-muted-light mx-auto mb-4" />
                                    <p className="text-muted font-medium">Google Maps</p>
                                    <p className="text-muted-light text-sm">Map will be displayed here</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
