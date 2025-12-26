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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
            {/* Toolbar */}
            <div className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
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
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-amber-500 to-blue-500"></div>

                    <div className="mb-12 text-center space-y-4">
                        <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Form Title</h2>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            <EditableText
                                value={content.title}
                                onChange={(val: string) => setContent({ ...content, title: val })}
                                className="border-dashed border-2 border-transparent hover:border-slate-300 p-1 rounded"
                            />
                        </h1>

                        <div className="pt-4">
                            <h2 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2">Form Description</h2>
                            <div className="text-muted-foreground max-w-2xl mx-auto text-lg whitespace-pre-wrap">
                                <EditableText
                                    value={content.description}
                                    onChange={(val: string) => setContent({ ...content, description: val })}
                                    multiline
                                    className="border-dashed border-2 border-transparent hover:border-slate-300 p-1 rounded"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-10">
                        <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-blue-900/10 rounded-r-lg">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                <EditableText
                                    value={content.studentInfoTitle}
                                    onChange={(val: string) => setContent({ ...content, studentInfoTitle: val })}
                                />
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1">(Section Header 1)</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60 pointer-events-none filter grayscale-[50%]">
                            <Input placeholder="Student Name (Fixed)" />
                            <Input placeholder="DOB (Fixed)" />
                        </div>

                        <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-blue-900/10 rounded-r-lg">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                <EditableText
                                    value={content.guardianInfoTitle}
                                    onChange={(val: string) => setContent({ ...content, guardianInfoTitle: val })}
                                />
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1">(Section Header 2)</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60 pointer-events-none filter grayscale-[50%]">
                            <Input placeholder="Guardian Name (Fixed)" />
                            <Input placeholder="Contact (Fixed)" />
                        </div>

                        <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-blue-900/10 rounded-r-lg">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                <EditableText
                                    value={content.academicInfoTitle}
                                    onChange={(val: string) => setContent({ ...content, academicInfoTitle: val })}
                                />
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1">(Section Header 3)</p>
                        </div>

                        <div className="opacity-60 pointer-events-none filter grayscale-[50%]">
                            <Input placeholder="Previous School (Fixed)" />
                        </div>
                    </div>

                    <div className="mt-10 pt-10 border-t border-slate-200 dark:border-slate-800 text-center">
                        <Button size="lg" className="text-lg px-8 pointer-events-none">
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
    );
}
