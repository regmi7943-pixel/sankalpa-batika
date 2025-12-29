import { ClipboardCheck, Sparkles, TrendingUp, Award } from 'lucide-react';

export default function EvaluationPage() {
    return (
        <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 font-bold text-sm mb-6">
                        <Award className="h-4 w-4" />
                        QUALITY ASSURANCE
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-foreground mb-6">
                        Assessment & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Evaluation</span>
                    </h1>
                </div>

                {/* Evaluation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <div className="p-8 rounded-3xl bg-surface border border-surface-dark/10">
                        <ClipboardCheck className="h-10 w-10 text-purple-600 mb-6" />
                        <h2 className="text-2xl font-bold text-foreground mb-4">Continuous Assessment (CAS)</h2>
                        <p className="text-muted leading-relaxed mb-6">
                            We don't just rely on final exams. Our students are evaluated continuously through class participation, project work, behavior, and periodic unit tests. This ensures a low-stress environment and deep understanding.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-surface-dark/5 text-center">
                                <span className="block text-2xl font-bold text-foreground">60%</span>
                                <span className="text-xs text-muted">Internal Assessment</span>
                            </div>
                            <div className="p-4 rounded-xl bg-surface-dark/5 text-center">
                                <span className="block text-2xl font-bold text-foreground">40%</span>
                                <span className="text-xs text-muted">Terminal Exams</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 rounded-3xl bg-surface border border-surface-dark/10">
                        <Sparkles className="h-10 w-10 text-pink-600 mb-6" />
                        <h2 className="text-2xl font-bold text-foreground mb-4">Skill-Based Evaluation</h2>
                        <p className="text-muted leading-relaxed mb-6">
                            Beyond academic grades, we measure "Soft Skills" and "Core Competencies" such as leadership, teamwork, communication, and digital literacy. Our report cards provide a 360-degree view of the child.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {["Communication", "Leadership", "Creative Thinking", "Digital Literacy", "Social Skills"].map((skill, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-lg bg-pink-50 text-pink-600 text-xs font-bold border border-pink-100">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Progress Chart Representation */}
                <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-[3rem] p-8 md:p-16 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
                    <TrendingUp className="h-16 w-16 mx-auto mb-8 opacity-50" />
                    <h2 className="text-3xl md:text-4xl font-black mb-6">Focus on Personal Growth</h2>
                    <p className="text-lg text-purple-100 max-w-2xl mx-auto leading-relaxed mb-10">
                        Our progress monitoring system allows parents to track their child's development in real-time through our digital portal. We organize regular Parent-Teacher Meetings (PTM) to discuss individual goals and support plans.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="px-8 py-4 rounded-2xl bg-white text-purple-900 font-bold hover:scale-105 transition-transform">View Sample Report</button>
                        <button className="px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 font-bold hover:bg-white/20 transition-all">Evaluation Portal</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
