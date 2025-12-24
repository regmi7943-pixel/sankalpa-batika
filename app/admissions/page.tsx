import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ArrowRight, CheckCircle, FileText, ClipboardList,
    Users, Calendar, Phone, ChevronDown, Download,
    GraduationCap, BookOpen, Clock, HelpCircle
} from "lucide-react";

export const metadata = {
    title: 'Admissions - Sankalpa Batika School',
    description: 'Apply for admission to Sankalpa Batika School. Learn about our admission process, requirements, and deadlines.',
};

export default function AdmissionsPage() {
    const steps = [
        {
            number: '01',
            title: 'Inquiry',
            description: 'Visit our school or contact us to learn about our programs and facilities.',
            icon: Phone,
        },
        {
            number: '02',
            title: 'Application',
            description: 'Fill out the admission form online or at the school office with required documents.',
            icon: ClipboardList,
        },
        {
            number: '03',
            title: 'Assessment',
            description: 'A friendly interaction to understand your child\'s learning level and interests.',
            icon: Users,
        },
        {
            number: '04',
            title: 'Enrollment',
            description: 'Complete documentation and fee payment to secure your child\'s seat.',
            icon: CheckCircle,
        },
    ];

    const documents = [
        'Birth Certificate (Original + Copy)',
        'Previous School Report Card / Marksheet',
        'Transfer Certificate (TC)',
        'Character Certificate',
        '4 Passport Size Photos',
        'Parents\' Citizenship Copy',
        'Filled Application Form',
    ];

    const faqs = [
        {
            question: 'What is the admission age for Nursery?',
            answer: 'Children must be at least 3 years old by the start of the academic session to be eligible for Nursery admission.',
        },
        {
            question: 'Is there an entrance test for all grades?',
            answer: 'For Nursery to Grade 1, we conduct a simple interaction. For Grade 2 and above, there is a basic written assessment in English and Mathematics.',
        },
        {
            question: 'What are the school timings?',
            answer: 'Our school operates from 9:00 AM to 4:00 PM, Sunday through Friday. Saturday is a holiday.',
        },
        {
            question: 'Do you offer transportation?',
            answer: 'Yes, we provide safe and reliable school bus service covering major areas of Kathmandu valley.',
        },
    ];

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-amber-300 text-sm mb-6">
                        <Calendar className="h-4 w-4" />
                        <span>Admissions Open for 2025-26</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Join Our Family</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
                        Begin your child's journey towards excellence. We're excited to welcome new students to Sankalpa Batika.
                    </p>
                    <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 shadow-lg">
                        Download Prospectus
                        <Download className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </section>

            {/* Admission Process */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">How It Works</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Admission Process</h2>
                        <div className="section-divider mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="relative group">
                                {/* Connector Line */}
                                {i < steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-blue-100 -translate-x-4 z-0">
                                        <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-300" />
                                    </div>
                                )}

                                <Card className="relative z-10 text-center card-hover border-2 border-transparent hover:border-blue-100 h-full">
                                    <CardContent className="pt-8 pb-6">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                                            <step.icon className="h-10 w-10 text-white" />
                                        </div>
                                        <span className="text-4xl font-bold text-blue-100">{step.number}</span>
                                        <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{step.title}</h3>
                                        <p className="text-gray-600 text-sm">{step.description}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Requirements & Apply */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Documents Required */}
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                                    <FileText className="h-6 w-6 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Documents Required</h2>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <ul className="space-y-4">
                                    {documents.map((doc, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle className="h-4 w-4 text-green-600" />
                                            </div>
                                            <span className="text-gray-700">{doc}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Apply Now Card */}
                        <div>
                            <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 shadow-2xl overflow-hidden">
                                <CardContent className="p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <GraduationCap className="h-10 w-10 text-amber-400" />
                                        <div>
                                            <h3 className="text-2xl font-bold">Ready to Apply?</h3>
                                            <p className="text-blue-200 text-sm">Start your application today</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
                                            <BookOpen className="h-6 w-6 text-amber-400" />
                                            <div>
                                                <p className="font-semibold">Classes Available</p>
                                                <p className="text-sm text-blue-200">Nursery to Grade 10</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
                                            <Clock className="h-6 w-6 text-amber-400" />
                                            <div>
                                                <p className="font-semibold">Application Deadline</p>
                                                <p className="text-sm text-blue-200">March 31, 2025</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-6 text-lg shadow-lg">
                                            Apply Online
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Button>
                                        <Button variant="outline" className="w-full border-2 border-white/30 text-white hover:bg-white/10 py-6">
                                            Download Application Form
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Have Questions?</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <div className="section-divider mx-auto"></div>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <details key={i} className="group bg-gray-50 rounded-2xl overflow-hidden">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <HelpCircle className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <span className="font-semibold text-gray-900">{faq.question}</span>
                                    </div>
                                    <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
                                </summary>
                                <div className="px-6 pb-6 pl-20">
                                    <p className="text-gray-600">{faq.answer}</p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact CTA */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
                    <p className="text-gray-600 mb-6">Our admissions team is here to help you through every step.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <Button className="bg-blue-600 hover:bg-blue-700 px-8">
                                Contact Us
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Button variant="outline" className="border-2">
                            <Phone className="mr-2 h-5 w-5" />
                            +977-1-4XXXXXX
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
