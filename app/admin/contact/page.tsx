'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { getPageContent, savePageContent } from '@/app/actions/settings';

// Editable Text Component
function EditableText({
    value,
    onChange,
    className = '',
}: {
    value: string;
    onChange: (val: string) => void;
    className?: string;
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    useEffect(() => {
        setTempValue(value);
    }, [value]);

    if (isEditing) {
        return (
            <input
                autoFocus
                type="text"
                value={tempValue}
                onChange={(e) => setTempValue(e.target.value)}
                onBlur={() => { onChange(tempValue); setIsEditing(false); }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') { onChange(tempValue); setIsEditing(false); }
                    if (e.key === 'Escape') { setTempValue(value); setIsEditing(false); }
                }}
                className={`${className} bg-blue-50 border-2 border-blue-400 rounded px-2 py-1 outline-none w-full`}
            />
        );
    }

    return (
        <span
            onClick={() => setIsEditing(true)}
            className={`${className} cursor-pointer hover:bg-blue-100 hover:outline hover:outline-2 hover:outline-blue-400 hover:outline-dashed rounded px-1 -mx-1 transition-all inline-block`}
            title="Click to edit"
        >
            {value}
        </span>
    );
}

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
                    <div className="bg-white p-4 rounded-xl shadow-2xl flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                        <span className="font-medium">Saving changes...</span>
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
            <section className="py-16 bg-gray-50 -mt-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {content.contactInfo.map((info, i) => {
                            const IconComponent = iconMap[info.icon] || MapPin;
                            return (
                                <Card key={i} className="border-0 shadow-lg">
                                    <CardContent className="p-6 text-center">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                                            <IconComponent className="h-7 w-7 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                                            <EditableText
                                                value={info.title}
                                                onChange={(val) => {
                                                    const newInfo = [...content.contactInfo];
                                                    newInfo[i].title = val;
                                                    setContent({ ...content, contactInfo: newInfo });
                                                }}
                                            />
                                        </h3>
                                        <p className="text-gray-600">
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
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Contact Form & Map */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">First Name</label>
                                        <Input placeholder="John" className="bg-gray-50" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Last Name</label>
                                        <Input placeholder="Doe" className="bg-gray-50" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                    <Input type="email" placeholder="john@example.com" className="bg-gray-50" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Subject</label>
                                    <select className="w-full h-10 rounded-md border border-gray-200 bg-gray-50 px-3 text-sm">
                                        <option>Select a subject</option>
                                        <option>Admission Inquiry</option>
                                        <option>General Information</option>
                                        <option>Feedback</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Message</label>
                                    <textarea
                                        rows={4}
                                        placeholder="How can we help you?"
                                        className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm"
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
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Us</h2>
                            <div className="bg-gray-100 rounded-2xl h-[400px] flex items-center justify-center">
                                <div className="text-center">
                                    <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 font-medium">Google Maps</p>
                                    <p className="text-gray-400 text-sm">Map will be displayed here</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
