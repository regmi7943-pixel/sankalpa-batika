import { GraduationCap, BookOpen, Target, Users } from 'lucide-react';

export default function AcademicsIntroduction() {
    return (
        <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-bold text-sm mb-6 animate-fade-in">
                        <GraduationCap className="h-4 w-4" />
                        ACADEMIC EXCELLENCE
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
                        Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Introduction</span>
                    </h1>
                    <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
                        At Sankalpa Vatika, we go beyond textbook learning. Our academic program is designed to nurture critical thinking, creativity, and a lifelong passion for knowledge.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-foreground mb-4">Our Educational Philosophy</h2>
                            <p className="text-lg text-muted leading-relaxed">
                                We believe that every student is unique. Our approach combines rigorous academic standards with personalized attention, ensuring that each learner reaches their full potential in a supportive and stimulating environment.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { icon: BookOpen, title: "Modern Curriculum", desc: "Aligned with international standards while staying true to local values." },
                                { icon: Target, title: "Result Oriented", desc: "Consistently achieving excellence in national board examinations." },
                                { icon: Users, title: "Expert Faculty", desc: "Mentorship from highly qualified and passionate educators." },
                                { icon: GraduationCap, title: "Holistic Growth", desc: "Focus on character building alongside academic success." }
                            ].map((item, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-surface border border-surface-dark/10 hover:border-blue-500/30 transition-all group">
                                    <item.icon className="h-8 w-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                                    <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                                    <p className="text-sm text-muted leading-snug">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                                alt="Classroom Learning"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl -z-10" />
                        <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-600/10 rounded-full blur-3xl -z-10" />
                    </div>
                </div>

                {/* Academic Highlights */}
                <div className="bg-blue-600 rounded-[2.5rem] p-8 md:p-16 text-white overflow-hidden relative">
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black mb-6">Empowering Future Leaders</h2>
                            <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                                Our middle and secondary programs are meticulously structured to prepare students for the challenges of higher education and beyond. We integrate STEM projects, language proficiency, and leadership training into our core curriculum.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                                    <span className="text-2xl font-bold block">100%</span>
                                    <span className="text-sm text-blue-100">SEE Pass Rate</span>
                                </div>
                                <div className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                                    <span className="text-2xl font-bold block">15:1</span>
                                    <span className="text-sm text-blue-100">Student-Teacher Ratio</span>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="rounded-2xl shadow-lg" alt="Study" />
                            <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="mt-8 rounded-2xl shadow-lg" alt="Group Work" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
