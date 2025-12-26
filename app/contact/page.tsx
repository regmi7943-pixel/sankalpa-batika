// Force dynamic rendering to ensure fresh data on Vercel
export const dynamic = 'force-dynamic';

import { MapPin, Phone, Clock, Send, ArrowRight, MessageSquare, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getPageContent, getSiteSettings } from '@/app/actions/settings';
import ContactForm from '@/components/contact-form';

export default async function ContactPage() {
    const defaultContent = {
        pageTitle: 'Get In Touch',
        pageSubtitle: 'Have questions? We\'d love to hear from you.',
        contactInfo: [
            { icon: 'MapPin', title: 'Visit Us', details: 'Kathmandu, Nepal' },
            { icon: 'Phone', title: 'Call Us', details: '+977-1-4XXXXXX' },
            { icon: 'Mail', title: 'Email Us', details: 'info@sankalpavatika.edu.np' },
            { icon: 'Clock', title: 'Office Hours', details: 'Sun-Fri: 9AM-4PM' },
        ],
    };

    const pageResult = await getPageContent('contact');
    const settingsResult = await getSiteSettings();

    const iconMap: Record<string, any> = { MapPin, Phone, Clock, Mail };

    const settings = settingsResult.success ? settingsResult.data : {};
    const pageContent = pageResult.success && pageResult.data ? pageResult.data : {};

    // Merge page content with defaults
    const rawContent = { ...defaultContent, ...pageContent };

    // Dynamically override contact cards if they match default titles
    // This allows the admin to edit specific cards but keep them synced with global settings by default
    const dynamicCards = rawContent.contactInfo.map((info: any) => {
        if (info.title === 'Visit Us' && settings.address) {
            return { ...info, details: settings.address };
        }
        if (info.title === 'Call Us' && settings.phone1) {
            return { ...info, details: settings.phone1 };
        }
        if (info.title === 'Email Us' && settings.email1) {
            return { ...info, details: settings.email1 };
        }
        if (info.title === 'Office Hours' && settings.hours) {
            return { ...info, details: settings.hours };
        }
        return info;
    });

    const content = { ...rawContent, contactInfo: dynamicCards };
    const mapUrl = settings.googleMapsUrl || '#';

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-amber-400 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 md:mb-6 animate-fade-in">
                        {content.pageTitle}
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        {content.pageSubtitle}
                    </p>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-12 md:py-16 bg-surface -mt-10 md:-mt-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {content.contactInfo.map((info: any, i: number) => {
                            const IconComponent = iconMap[info.icon] || MapPin;
                            return (
                                <Card key={i} className="border-0 shadow-xl card-hover animate-slide-up h-full" style={{ animationDelay: `${i * 0.1}s` }}>
                                    <CardContent className="p-6 text-center flex flex-col h-full">
                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4 transform group-hover:rotate-6 transition-transform shadow-md">
                                            <IconComponent className="h-6 w-6 text-white" />
                                        </div>
                                        <h3 className="text-base font-bold text-foreground mb-2">{info.title}</h3>
                                        <p className="text-muted text-xs md:text-sm mt-auto leading-relaxed">{info.details}</p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Contact Form & Map */}
            <section className="py-16 md:py-24 bg-background border-t border-border/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
                        {/* Contact Form */}
                        <ContactForm />

                        {/* Map Placeholder */}
                        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                                    <MapPin className="h-5 w-5 text-amber-600" />
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Find Us</h2>
                            </div>

                            <div className="bg-surface rounded-3xl h-[400px] md:h-[530px] flex items-center justify-center relative overflow-hidden group border-4 border-surface-dark/10 shadow-inner">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524666041070-9d87656c25bb?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-10 group-hover:grayscale-0 group-hover:opacity-20 transition-all duration-700"></div>
                                <div className="text-center relative z-10 p-8">
                                    <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-bounce-slow border border-surface-dark/10">
                                        <MapPin className="h-10 w-10 text-blue-600" />
                                    </div>
                                    <p className="text-foreground font-bold text-xl md:text-2xl mb-2">Our Campus Location</p>
                                    <p className="text-muted text-sm md:text-base max-w-xs mx-auto">{settings.address || 'Kathmandu, Nepal'}</p>
                                    <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" className="mt-8 border-surface-dark/20 text-foreground bg-background/80 backdrop-blur-sm hover:bg-background transition-all">
                                            View on Google Maps
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
