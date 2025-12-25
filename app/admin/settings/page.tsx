'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Settings, Save, Upload, GraduationCap, Mail, Phone,
    Facebook, Instagram, Youtube, Loader2
} from 'lucide-react';
import { getSiteSettings, saveSiteSettings, uploadLogo } from '@/app/actions/settings';
import { useRef } from 'react';

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);
    const logoInputRef = useRef<HTMLInputElement>(null);

    const [schoolName, setSchoolName] = useState('Sankalpa Vatika');
    const [tagline, setTagline] = useState('Excellence in Education');
    const [logoUrl, setLogoUrl] = useState('');
    const [phone1, setPhone1] = useState('+977-1-4XXXXXX');
    const [phone2, setPhone2] = useState('+977-98XXXXXXXX');
    const [email1, setEmail1] = useState('info@sankalpavatika.edu.np');
    const [email2, setEmail2] = useState('admissions@sankalpavatika.edu.np');
    const [address, setAddress] = useState('123 Knowledge Marg, Kathmandu, Nepal');
    const [hours, setHours] = useState('Sun - Fri: 9:00 AM - 4:00 PM');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [youtube, setYoutube] = useState('');

    // Load settings
    useEffect(() => {
        async function loadSettings() {
            const result = await getSiteSettings();
            if (result.success && result.data) {
                const d = result.data;
                if (d.schoolName) setSchoolName(d.schoolName);
                if (d.tagline) setTagline(d.tagline);
                if (d.logoUrl) setLogoUrl(d.logoUrl);
                if (d.phone1) setPhone1(d.phone1);
                if (d.phone2) setPhone2(d.phone2);
                if (d.email1) setEmail1(d.email1);
                if (d.email2) setEmail2(d.email2);
                if (d.address) setAddress(d.address);
                if (d.hours) setHours(d.hours);
                if (d.facebook) setFacebook(d.facebook);
                if (d.instagram) setInstagram(d.instagram);
                if (d.youtube) setYoutube(d.youtube);
            }
            setLoading(false);
        }
        loadSettings();
    }, []);

    // Save settings
    const handleSave = async () => {
        setSaving(true);
        const settings = {
            schoolName, tagline, phone1, phone2, email1, email2, address, hours, facebook, instagram, youtube
        };
        const result = await saveSiteSettings(settings);
        if (result.success) {
            alert('Settings saved successfully!');
        } else {
            alert('Failed to save settings: ' + result.error);
        }
        setSaving(false);
    };

    // Listen to toolbar save button
    useEffect(() => {
        const handleSaveEvent = () => handleSave();
        window.addEventListener('admin-save', handleSaveEvent);
        return () => window.removeEventListener('admin-save', handleSaveEvent);
    }, [schoolName, tagline, phone1, phone2, email1, email2, address, hours, facebook, instagram, youtube]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-full bg-surface/50 dark:bg-background/50 backdrop-blur-sm">
            <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-fade-in">
                {/* Loading Overlay */}
                {saving && (
                    <div className="fixed inset-0 z-[60] bg-background/20 backdrop-blur-[2px] flex items-center justify-center">
                        <div className="bg-surface p-4 rounded-xl shadow-2xl flex items-center gap-3 border border-surface-dark/10">
                            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                            <span className="font-medium text-foreground">Saving settings...</span>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-foreground tracking-tight flex items-center gap-3">
                            <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
                                <Settings className="h-6 w-6 text-white" />
                            </div>
                            Site Settings
                        </h1>
                        <p className="text-muted-foreground mt-1 ml-12">General configuration for your school website</p>
                    </div>
                    <Button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/20 transition-all active:scale-95 py-6 px-6"
                    >
                        <Save className="h-5 w-5 mr-2" />
                        Save All Settings
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {/* School Identity */}
                    <Card className="border-none shadow-xl shadow-black/5 dark:shadow-blue-900/5 bg-surface/80 dark:bg-surface/30 backdrop-blur-md overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
                        <CardHeader className="p-6 pb-0">
                            <CardTitle className="text-lg font-bold flex items-center gap-3 text-foreground">
                                <GraduationCap className="h-5 w-5 text-blue-500" />
                                School Identity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">School Name</label>
                                    <Input
                                        value={schoolName}
                                        onChange={(e) => setSchoolName(e.target.value)}
                                        className="bg-background/50 border-surface-dark/10 focus:ring-blue-500/20 py-6"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Tagline</label>
                                    <Input
                                        value={tagline}
                                        onChange={(e) => setTagline(e.target.value)}
                                        className="bg-background/50 border-surface-dark/10 focus:ring-blue-500/20 py-6"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">School Logo</label>
                                <div className="flex items-center gap-6 p-4 rounded-2xl bg-background/40 border border-surface-dark/10">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg overflow-hidden">
                                        {logoUrl ? (
                                            <img src={logoUrl} alt="School Logo" className="w-full h-full object-contain" />
                                        ) : (
                                            <GraduationCap className="h-10 w-10 text-white" />
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <input
                                            ref={logoInputRef}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;
                                                setUploadingLogo(true);
                                                const formData = new FormData();
                                                formData.append('file', file);
                                                const result = await uploadLogo(formData);
                                                if (result.success && result.url) {
                                                    setLogoUrl(result.url);
                                                } else {
                                                    alert('Logo upload failed: ' + result.error);
                                                }
                                                setUploadingLogo(false);
                                            }}
                                        />
                                        <Button
                                            variant="outline"
                                            className="border-surface-dark/20 text-foreground hover:bg-surface"
                                            onClick={() => logoInputRef.current?.click()}
                                            disabled={uploadingLogo}
                                        >
                                            {uploadingLogo ? (
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            ) : (
                                                <Upload className="h-4 w-4 mr-2" />
                                            )}
                                            {uploadingLogo ? 'Uploading...' : 'Upload New Logo'}
                                        </Button>
                                        <p className="text-[10px] text-muted-foreground px-1">Recommended size: 512x512px (PNG/SVG)</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Info */}
                    <Card className="border-none shadow-xl shadow-black/5 dark:shadow-blue-900/5 bg-surface/80 dark:bg-surface/30 backdrop-blur-md overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
                        <CardHeader className="p-6 pb-0">
                            <CardTitle className="text-lg font-bold flex items-center gap-3 text-foreground">
                                <Phone className="h-5 w-5 text-green-500" />
                                Contact Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Primary Phone</label>
                                    <Input
                                        value={phone1}
                                        onChange={(e) => setPhone1(e.target.value)}
                                        className="bg-background/50 border-surface-dark/10 focus:ring-blue-500/20 py-6"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Secondary Phone</label>
                                    <Input
                                        value={phone2}
                                        onChange={(e) => setPhone2(e.target.value)}
                                        className="bg-background/50 border-surface-dark/10 focus:ring-blue-500/20 py-6"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">General Email</label>
                                    <Input
                                        value={email1}
                                        onChange={(e) => setEmail1(e.target.value)}
                                        className="bg-background/50 border-surface-dark/10 focus:ring-blue-500/20 py-6"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Admissions Email</label>
                                    <Input
                                        value={email2}
                                        onChange={(e) => setEmail2(e.target.value)}
                                        className="bg-background/50 border-surface-dark/10 focus:ring-blue-500/20 py-6"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Physical Address</label>
                                    <Input
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="bg-background/50 border-surface-dark/10 focus:ring-blue-500/20 py-6"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1">Office Hours</label>
                                    <Input
                                        value={hours}
                                        onChange={(e) => setHours(e.target.value)}
                                        className="bg-background/50 border-surface-dark/10 focus:ring-blue-500/20 py-6"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Social Media */}
                    <Card className="border-none shadow-xl shadow-black/5 dark:shadow-blue-900/5 bg-surface/80 dark:bg-surface/30 backdrop-blur-md overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
                        <CardHeader className="p-6 pb-0">
                            <CardTitle className="text-lg font-bold flex items-center gap-3 text-foreground">
                                <Facebook className="h-5 w-5 text-blue-500" />
                                Connectivity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1 flex items-center gap-2">
                                        <Facebook className="h-3 w-3 text-blue-600" />
                                        Facebook
                                    </label>
                                    <Input
                                        value={facebook}
                                        onChange={(e) => setFacebook(e.target.value)}
                                        placeholder="Username"
                                        className="bg-background/50 border-surface-dark/10 focus:ring-blue-500/20 py-6"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1 flex items-center gap-2">
                                        <Instagram className="h-3 w-3 text-pink-600" />
                                        Instagram
                                    </label>
                                    <Input
                                        value={instagram}
                                        onChange={(e) => setInstagram(e.target.value)}
                                        placeholder="Username"
                                        className="bg-background/50 border-surface-dark/10 focus:ring-blue-500/20 py-6"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider ml-1 flex items-center gap-2">
                                        <Youtube className="h-3 w-3 text-red-600" />
                                        YouTube
                                    </label>
                                    <Input
                                        value={youtube}
                                        onChange={(e) => setYoutube(e.target.value)}
                                        placeholder="Channel Handle"
                                        className="bg-background/50 border-surface-dark/10 focus:ring-blue-500/20 py-6"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
