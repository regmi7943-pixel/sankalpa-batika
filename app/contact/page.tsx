import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";

export const metadata = {
    title: 'Contact Us - Sankalpa Batika School',
    description: 'Get in touch with Sankalpa Batika School. Find our address, phone number, email, and send us a message.',
};

export default function ContactPage() {
    const contactInfo = [
        {
            icon: MapPin,
            title: 'Visit Us',
            details: ['Kathmandu', 'Nepal'],
            color: 'from-blue-500 to-blue-600',
        },
        {
            icon: Phone,
            title: 'Call Us',
            details: ['+977-1-4XXXXXX'],
            color: 'from-emerald-500 to-emerald-600',
        },
        {
            icon: Mail,
            title: 'Email Us',
            details: ['info@sankalpabatika.edu.np'],
            color: 'from-amber-500 to-orange-500',
        },
        {
            icon: Clock,
            title: 'Office Hours',
            details: ['Sun-Fri: 9AM-4PM'],
            color: 'from-purple-500 to-purple-600',
        },
    ];

    return (
        <div className="pt-16 md:pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-48 md:w-72 h-48 md:h-72 bg-amber-400 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6">Get In Touch</h1>
                    <p className="text-base md:text-xl text-blue-100 max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you.
                    </p>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="py-8 md:py-16 bg-gray-50 -mt-8 md:-mt-16 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        {contactInfo.map((info, i) => (
                            <Card key={i} className="card-hover overflow-hidden">
                                <CardContent className="p-4 md:p-6 text-center">
                                    <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-r ${info.color} flex items-center justify-center mx-auto mb-3 md:mb-4`}>
                                        <info.icon className="h-5 w-5 md:h-7 md:w-7 text-white" />
                                    </div>
                                    <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-1 md:mb-2">{info.title}</h3>
                                    {info.details.map((detail, j) => (
                                        <p key={j} className="text-gray-600 text-xs md:text-sm break-all">{detail}</p>
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Map */}
            <section className="py-12 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

                        {/* Contact Form */}
                        <div>
                            <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                                    <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">Send a Message</h2>
                                    <p className="text-gray-500 text-xs md:text-sm hidden sm:block">We'll respond within 24 hours</p>
                                </div>
                            </div>

                            <form className="space-y-4 md:space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                                    <div className="space-y-1 md:space-y-2">
                                        <label htmlFor="firstName" className="text-xs md:text-sm font-medium text-gray-700">First Name</label>
                                        <Input
                                            id="firstName"
                                            placeholder="John"
                                            className="bg-gray-50 border-gray-200 focus:bg-white transition-colors text-sm"
                                        />
                                    </div>
                                    <div className="space-y-1 md:space-y-2">
                                        <label htmlFor="lastName" className="text-xs md:text-sm font-medium text-gray-700">Last Name</label>
                                        <Input
                                            id="lastName"
                                            placeholder="Doe"
                                            className="bg-gray-50 border-gray-200 focus:bg-white transition-colors text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1 md:space-y-2">
                                    <label htmlFor="email" className="text-xs md:text-sm font-medium text-gray-700">Email</label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        className="bg-gray-50 border-gray-200 focus:bg-white transition-colors text-sm"
                                    />
                                </div>

                                <div className="space-y-1 md:space-y-2">
                                    <label htmlFor="phone" className="text-xs md:text-sm font-medium text-gray-700">Phone Number</label>
                                    <Input
                                        id="phone"
                                        placeholder="+977-98XXXXXXXX"
                                        className="bg-gray-50 border-gray-200 focus:bg-white transition-colors text-sm"
                                    />
                                </div>

                                <div className="space-y-1 md:space-y-2">
                                    <label htmlFor="subject" className="text-xs md:text-sm font-medium text-gray-700">Subject</label>
                                    <select
                                        id="subject"
                                        className="flex h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="admission">Admission Inquiry</option>
                                        <option value="general">General Information</option>
                                        <option value="feedback">Feedback</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="space-y-1 md:space-y-2">
                                    <label htmlFor="message" className="text-xs md:text-sm font-medium text-gray-700">Message</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        placeholder="How can we help you?"
                                        className="flex w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-3 text-sm placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors resize-none"
                                    ></textarea>
                                </div>

                                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-5 md:py-6 text-sm md:text-lg shadow-lg">
                                    Send Message
                                    <Send className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                                </Button>
                            </form>
                        </div>

                        {/* Map Placeholder */}
                        <div>
                            <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                                    <MapPin className="h-5 w-5 md:h-6 md:w-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">Find Us</h2>
                                    <p className="text-gray-500 text-xs md:text-sm hidden sm:block">Visit our campus</p>
                                </div>
                            </div>

                            <div className="bg-gray-100 rounded-xl md:rounded-2xl overflow-hidden h-[250px] md:h-[400px] lg:h-[500px] relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <MapPin className="h-12 w-12 md:h-16 md:w-16 text-gray-300 mx-auto mb-3 md:mb-4" />
                                        <p className="text-gray-500 font-medium text-sm md:text-base">Google Maps</p>
                                        <p className="text-gray-400 text-xs md:text-sm">Map will be displayed here</p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Contact */}
                            <Card className="mt-4 md:mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
                                <CardContent className="p-4 md:p-6">
                                    <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">Need Quick Assistance?</h3>
                                    <p className="text-blue-100 text-xs md:text-sm mb-3 md:mb-4">Our admissions office is ready to help.</p>
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 flex items-center justify-center">
                                            <Phone className="h-4 w-4 md:h-5 md:w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs md:text-sm text-blue-200">Call us directly</p>
                                            <p className="font-bold text-sm md:text-base">+977-1-4XXXXXX</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
