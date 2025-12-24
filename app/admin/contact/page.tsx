'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

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

export default function AdminContactPage() {
    const [pageTitle, setPageTitle] = useState('Get In Touch');
    const [pageSubtitle, setPageSubtitle] = useState('Have questions? We\'d love to hear from you.');

    const [contactInfo, setContactInfo] = useState([
        { icon: 'MapPin', title: 'Visit Us', details: 'Kathmandu, Nepal' },
        { icon: 'Phone', title: 'Call Us', details: '+977-1-4XXXXXX' },
        { icon: 'Mail', title: 'Email Us', details: 'info@sankalpabatika.edu.np' },
        { icon: 'Clock', title: 'Office Hours', details: 'Sun-Fri: 9AM-4PM' },
    ]);

    const iconMap: Record<string, any> = { MapPin, Phone, Mail, Clock };

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-72 h-72 bg-amber-400 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
                        <EditableText value={pageTitle} onChange={setPageTitle} />
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        <EditableText value={pageSubtitle} onChange={setPageSubtitle} />
                    </p>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-16 bg-gray-50 -mt-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, i) => {
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
                                                    const newInfo = [...contactInfo];
                                                    newInfo[i].title = val;
                                                    setContactInfo(newInfo);
                                                }}
                                            />
                                        </h3>
                                        <p className="text-gray-600">
                                            <EditableText
                                                value={info.details}
                                                onChange={(val) => {
                                                    const newInfo = [...contactInfo];
                                                    newInfo[i].details = val;
                                                    setContactInfo(newInfo);
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
