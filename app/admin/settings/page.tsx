'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Settings, Save, Upload, GraduationCap, Mail, Phone,
    Facebook, Instagram, Youtube, Loader2
} from 'lucide-react';
import { getSiteSettings, saveSiteSettings } from '@/app/actions/settings';

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [schoolName, setSchoolName] = useState('Sankalpa Batika');
    const [tagline, setTagline] = useState('Excellence in Education');
    const [phone1, setPhone1] = useState('+977-1-4XXXXXX');
    const [phone2, setPhone2] = useState('+977-98XXXXXXXX');
    const [email1, setEmail1] = useState('info@sankalpabatika.edu.np');
    const [email2, setEmail2] = useState('admissions@sankalpabatika.edu.np');
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
        <div className="relative p-6 max-w-4xl mx-auto space-y-6">
            {/* Loading Overlay */}
            {saving && (
                <div className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
                    <div className="bg-white p-4 rounded-xl shadow-2xl flex items-center gap-3">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                        <span className="font-medium">Saving settings...</span>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        <Settings className="h-6 w-6 text-gray-600" />
                        Site Settings
                    </h1>
                    <p className="text-gray-500 text-sm">General configuration for your website</p>
                </div>
                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Settings
                </Button>
            </div>

            {/* School Identity */}
            <Card className="border shadow-sm">
                <CardHeader className="border-b bg-gray-50">
                    <CardTitle className="text-base flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-blue-600" />
                        School Identity
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">School Name</label>
                            <Input value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Tagline</label>
                            <Input value={tagline} onChange={(e) => setTagline(e.target.value)} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">School Logo</label>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-blue-600 flex items-center justify-center">
                                <GraduationCap className="h-8 w-8 text-white" />
                            </div>
                            <Button variant="outline" size="sm">
                                <Upload className="h-4 w-4 mr-2" />
                                Upload
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="border shadow-sm">
                <CardHeader className="border-b bg-gray-50">
                    <CardTitle className="text-base flex items-center gap-2">
                        <Phone className="h-5 w-5 text-green-600" />
                        Contact Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Primary Phone</label>
                            <Input value={phone1} onChange={(e) => setPhone1(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Secondary Phone</label>
                            <Input value={phone2} onChange={(e) => setPhone2(e.target.value)} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Primary Email</label>
                            <Input value={email1} onChange={(e) => setEmail1(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Admissions Email</label>
                            <Input value={email2} onChange={(e) => setEmail2(e.target.value)} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Address</label>
                        <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Office Hours</label>
                        <Input value={hours} onChange={(e) => setHours(e.target.value)} />
                    </div>
                </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="border shadow-sm">
                <CardHeader className="border-b bg-gray-50">
                    <CardTitle className="text-base flex items-center gap-2">
                        <Facebook className="h-5 w-5 text-blue-600" />
                        Social Media Links
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Facebook className="h-4 w-4 text-blue-600" />
                            Facebook
                        </label>
                        <Input value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="https://facebook.com/yourpage" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Instagram className="h-4 w-4 text-pink-600" />
                            Instagram
                        </label>
                        <Input value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="https://instagram.com/yourpage" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Youtube className="h-4 w-4 text-red-600" />
                            YouTube
                        </label>
                        <Input value={youtube} onChange={(e) => setYoutube(e.target.value)} placeholder="https://youtube.com/yourchannel" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
