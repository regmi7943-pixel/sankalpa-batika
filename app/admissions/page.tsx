import { GraduationCap, CheckCircle, FileText, ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getPageContent } from '@/app/actions/settings';
import Link from 'next/link';

const defaultContent = {
    pageTitle: 'Admissions',
    pageSubtitle: 'Begin your journey with Sankalpa Batika. We welcome students who are eager to learn and grow.',
    sessionText: 'Admissions Open for 2025-26',
    steps: [
        { number: '01', title: 'Application', description: 'Fill out the online application form with required details.' },
        { number: '02', title: 'Document Submission', description: 'Submit all required documents for verification.' },
        { number: '03', title: 'Assessment', description: 'Students undergo a simple assessment or interaction.' },
        { number: '04', title: 'Admission Confirmation', description: 'Complete fee payment and receive confirmation.' },
    ],
    requirements: [
        'Birth Certificate (Original + Copy)',
        'Previous School Report Card / Marksheet',
        'Transfer Certificate (TC)',
        'Character Certificate',
        '4 Passport Size Photos',
        'Parents\' Citizenship Copy',
    ],
    faqs: [
        { question: 'What is the admission age for Nursery?', answer: 'Children must be at least 3 years old by the start of the academic session.' },
        { question: 'Is there an entrance test?', answer: 'For Nursery to Grade 1, we conduct a simple interaction. For Grade 2 and above, there is a basic written assessment.' },
        { question: 'What are the school timings?', answer: 'Our school operates from 9:00 AM to 4:00 PM, Sunday through Friday.' },
    ],
};

export default async function AdmissionsPage() {
    const result = await getPageContent('admissions');
    const content = result.success && result.data ? { ...defaultContent, ...result.data } : defaultContent;

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-amber-400 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 rounded-full px-3 md:px-4 py-1.5 md:py-2 mb-6 animate-fade-in">
                        <GraduationCap className="h-3 w-3 md:h-4 md:w-4 text-amber-400" />
                        <span className="text-amber-200 text-xs md:text-sm font-medium">{content.sessionText}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        {content.pageTitle}
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        {content.pageSubtitle}
                    </p>
                </div>
            </section>

            {/* Admission Steps */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <span className="text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-wider">How It Works</span>
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Admission Process</h2>
                        <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto rounded"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {content.steps.map((step: any, i: number) => (
                            <div key={i} className="relative p-6 md:p-8 bg-gray-50 rounded-3xl animate-slide-up h-full flex flex-col" style={{ animationDelay: `${i * 0.1}s` }}>
                                <div className="text-4xl md:text-6xl font-bold text-blue-100/60 mb-4">{step.number}</div>
                                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Required Documents */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <span className="text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-wider">Prepare These First</span>
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Required Documents</h2>
                        <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-blue-500 to-amber-500 mx-auto rounded"></div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {content.requirements.map((req: string, i: number) => (
                                <div key={i} className="flex items-center gap-3 md:gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 card-hover">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                                    </div>
                                    <span className="text-gray-700 font-medium text-sm md:text-base">{req}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 md:mt-12 p-4 md:p-6 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <FileText className="h-5 w-5 md:h-6 md:w-6 text-white" />
                            </div>
                            <div>
                                <p className="text-blue-900 font-bold text-sm md:text-base">Download Application Form</p>
                                <p className="text-blue-700 text-xs md:text-sm">You can also download and fill the form offline.</p>
                            </div>
                            <Button className="md:ml-auto bg-blue-600 hover:bg-blue-700 text-xs md:text-sm whitespace-nowrap">
                                Download PDF
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Digital Application CTA */}
            <section className="py-16 md:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>

                        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">Apply Online Today</h2>
                        <p className="text-blue-100 mb-8 md:mb-10 max-w-2xl mx-auto text-sm md:text-lg">
                            Take the first step towards a bright future. Our online application process is simple, secure, and fast.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/admissions/apply">
                                <Button size="lg" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white px-8 py-6 text-lg font-bold">
                                    Start Online Application
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg">
                                Admission Calendar
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
