'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getPage, updatePage } from '@/app/actions/pages';
import { EditableText } from '@/components/admin/EditableText';
import { toast } from 'sonner';

export default function FormEditorPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [content, setContent] = useState<any>({
        title: 'Online Admission Application',
        description: 'Please fill out the form below carefully. All fields marked with * are mandatory.',
        studentInfoTitle: 'Student Information',
        guardianInfoTitle: 'Guardian Information',
        academicInfoTitle: 'Previous Academic Details',
        submitButtonText: 'Submit Application'
    });

    useEffect(() => {
        async function loadContent() {
            const result = await getPage('application-form');
            if (result.success && result.data) {
                setContent((prev: any) => ({ ...prev, ...result.data }));
            }
            setIsLoading(false);
        }
        loadContent();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        const result = await updatePage('application-form', content);
        setIsSaving(false);

        if (result.success) {
            toast.success('Form content updated successfully');
        } else {
            toast.error('Failed to update form content');
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Toolbar */}
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/applications">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </Button>
                        </Link>
                        <h1 className="text-xl font-bold">Edit Admission Form</h1>
                    </div>
                    <Button onClick={handleSave} disabled={isSaving} className="gap-2 bg-blue-600 hover:bg-blue-700">
                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        Save Changes
                    </Button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
                {/* Header matching front-end */}
                <div className="mb-8 text-center">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-blue-600/10 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
                        Form Setup
                    </div>
                    <h1 className="text-3xl font-black text-foreground mb-4">
                        <EditableText
                            value={content.title}
                            onChange={(val: string) => setContent({ ...content, title: val })}
                        />
                    </h1>
                    <div className="text-muted leading-relaxed max-w-2xl mx-auto">
                        <EditableText
                            value={content.description}
                            onChange={(val: string) => setContent({ ...content, description: val })}
                            multiline
                        />
                    </div>
                </div>

                {/* Form Container matching Inquiry Page */}
                <div className="bg-surface border border-border rounded-[2.5rem] p-8 md:p-12 shadow-xl">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-8">
                                <EditableText
                                    value={content.studentInfoTitle}
                                    onChange={(val: string) => setContent({ ...content, studentInfoTitle: val })}
                                />
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-60 pointer-events-none filter grayscale-[30%]">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted">Student's Full Name *</label>
                                    <Input placeholder="Enter student's name" className="h-12 rounded-xl bg-background" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted">Gender</label>
                                    <div className="h-12 rounded-xl bg-background border border-input flex items-center px-3 text-muted">Select Gender</div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted">Grade Applying For *</label>
                                    <div className="h-12 rounded-xl bg-background border border-input flex items-center px-3 text-muted">Select Grade</div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted">Date of Birth (BS)</label>
                                    <Input placeholder="YYYY-MM-DD" className="h-12 rounded-xl bg-background" />
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-border my-8"></div>

                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-8">
                                <EditableText
                                    value={content.guardianInfoTitle}
                                    onChange={(val: string) => setContent({ ...content, guardianInfoTitle: val })}
                                />
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-60 pointer-events-none filter grayscale-[30%]">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted">Parent/Guardian Name *</label>
                                    <Input placeholder="Enter parent's name" className="h-12 rounded-xl bg-background" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-muted">Phone Number *</label>
                                    <Input placeholder="98XXXXXXXX" type="tel" className="h-12 rounded-xl bg-background" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-bold text-muted">Email Address (Optional)</label>
                                    <Input placeholder="Enter email address" type="email" className="h-12 rounded-xl bg-background" />
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-border my-8"></div>

                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-8">
                                <EditableText
                                    value={content.academicInfoTitle}
                                    onChange={(val: string) => setContent({ ...content, academicInfoTitle: val })}
                                />
                            </h2>

                            <div className="space-y-2 opacity-60 pointer-events-none filter grayscale-[30%]">
                                <label className="text-sm font-bold text-muted">Previous School / Message</label>
                                <Input placeholder="Enter previous school details..." className="h-12 rounded-xl bg-background" />
                            </div>
                        </div>

                        <div className="mt-12">
                            <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 rounded-2xl text-xl shadow-lg shadow-blue-600/20 pointer-events-none">
                                <EditableText
                                    value={content.submitButtonText}
                                    onChange={(val: string) => setContent({ ...content, submitButtonText: val })}
                                    className="pointer-events-auto"
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
