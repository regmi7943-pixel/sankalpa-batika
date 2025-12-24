import Image from 'next/image';
import { GraduationCap, Target, Eye, Users, Award, BookOpen, Heart } from 'lucide-react';

export const metadata = {
    title: 'About Us - Sankalpa Batika School',
    description: 'Learn about our mission, vision, history, and the dedicated team behind Sankalpa Batika School.',
};

export default function AboutPage() {
    const values = [
        { icon: BookOpen, title: 'Excellence', description: 'Striving for the highest standards in education.' },
        { icon: Heart, title: 'Integrity', description: 'Building character through honesty and ethics.' },
        { icon: Users, title: 'Community', description: 'Fostering a sense of belonging and teamwork.' },
        { icon: Award, title: 'Innovation', description: 'Embracing new ideas and modern teaching methods.' },
    ];

    const timeline = [
        { year: '2010', title: 'School Founded', description: 'Established with a vision to provide quality education.' },
        { year: '2015', title: 'New Campus', description: 'Moved to our current modern facility.' },
        { year: '2018', title: 'Recognition', description: 'Awarded Best School in District.' },
        { year: '2023', title: 'Digital Initiative', description: 'Launched smart classrooms.' },
    ];

    const team = [
        { name: 'Dr. Ram Sharma', role: 'Principal', image: null },
        { name: 'Sita Devi Thapa', role: 'Vice Principal', image: null },
        { name: 'Binod Kumar', role: 'Academic Head', image: null },
        { name: 'Anita Rai', role: 'Admin Head', image: null },
    ];

    return (
        <div className="pt-16 md:pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-48 md:w-72 h-48 md:h-72 bg-amber-400 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6">About Sankalpa Batika</h1>
                    <p className="text-base md:text-xl text-blue-100 max-w-2xl mx-auto">
                        A premier educational institution committed to nurturing young minds and building future leaders.
                    </p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-12 md:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">
                        {/* Mission */}
                        <div className="bg-gradient-to-br from-blue-50 to-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-blue-100 card-hover">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-4 md:mb-6">
                                <Target className="h-6 w-6 md:h-8 md:w-8 text-white" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Our Mission</h2>
                            <p className="text-gray-600 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
                                To provide a safe, nurturing, and stimulating learning environment where every child can discover their potential.
                            </p>
                            <ul className="space-y-2 text-gray-600 text-sm md:text-base">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                    Foster critical thinking and creativity
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                    Promote moral values and ethics
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                    Encourage physical and emotional well-being
                                </li>
                            </ul>
                        </div>

                        {/* Vision */}
                        <div className="bg-gradient-to-br from-amber-50 to-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-amber-100 card-hover">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mb-4 md:mb-6">
                                <Eye className="h-6 w-6 md:h-8 md:w-8 text-white" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Our Vision</h2>
                            <p className="text-gray-600 leading-relaxed mb-3 md:mb-4 text-sm md:text-base">
                                To be a center of excellence in education that inspires students to become global citizens.
                            </p>
                            <ul className="space-y-2 text-gray-600 text-sm md:text-base">
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                                    Leading institution in holistic education
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                                    Preparing students for global challenges
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                                    Building responsible citizens
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-12 md:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 md:mb-16">
                        <span className="text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-wider">What We Believe</span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4">Our Core Values</h2>
                        <div className="section-divider mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {values.map((value, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:shadow-xl transition-shadow">
                                    <value.icon className="h-7 w-7 md:h-10 md:w-10 text-blue-600" />
                                </div>
                                <h3 className="text-base md:text-xl font-bold text-gray-900 mb-1 md:mb-2">{value.title}</h3>
                                <p className="text-gray-600 text-xs md:text-base">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* History Timeline */}
            <section className="py-12 md:py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 md:mb-16">
                        <span className="text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-wider">Our Journey</span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4">School History</h2>
                        <div className="section-divider mx-auto"></div>
                    </div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-blue-200 lg:left-1/2 lg:-translate-x-0.5"></div>

                        {timeline.map((item, i) => (
                            <div key={i} className={`relative flex items-start gap-4 md:gap-8 mb-8 md:mb-12 ${i % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                                <div className={`hidden lg:block flex-1 ${i % 2 === 0 ? 'text-left' : 'text-right'}`}>
                                    <div className={`p-4 md:p-6 bg-gray-50 rounded-xl md:rounded-2xl ${i % 2 === 0 ? 'ml-8' : 'mr-8'}`}>
                                        <h3 className="text-base md:text-lg font-bold text-gray-900">{item.title}</h3>
                                        <p className="text-gray-600 mt-1 text-sm md:text-base">{item.description}</p>
                                    </div>
                                </div>

                                <div className="z-10 flex-shrink-0">
                                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg text-xs md:text-sm">
                                        {item.year}
                                    </div>
                                </div>

                                <div className="flex-1 lg:hidden">
                                    <div className="p-3 md:p-4 bg-gray-50 rounded-xl">
                                        <h3 className="text-base md:text-lg font-bold text-gray-900">{item.title}</h3>
                                        <p className="text-gray-600 mt-1 text-xs md:text-sm">{item.description}</p>
                                    </div>
                                </div>

                                <div className="hidden lg:block flex-1"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="py-12 md:py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10 md:mb-16">
                        <span className="text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-wider">Meet The Team</span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4">Our Leadership</h2>
                        <div className="section-divider mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {team.map((member, i) => (
                            <div key={i} className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg card-hover group">
                                <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                    <Users className="h-16 w-16 md:h-24 md:w-24 text-blue-300 group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <div className="p-4 md:p-6 text-center">
                                    <h3 className="text-sm md:text-lg font-bold text-gray-900">{member.name}</h3>
                                    <p className="text-blue-600 text-xs md:text-sm">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
