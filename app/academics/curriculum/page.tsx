import { GraduationCap, BookOpen, Layers, Lightbulb } from 'lucide-react';

export default function CurriculumPage() {
    return (
        <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 font-bold text-sm mb-6">
                        <Layers className="h-4 w-4" />
                        OUR FRAMEWORK
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-foreground mb-6">
                        Education System & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Curriculum</span>
                    </h1>
                </div>

                {/* Levels Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                    {[
                        {
                            level: "Foundation Years",
                            grades: "Pre-Primary",
                            desc: "Focus on play-based learning, sensory development, and social skills in a warm, nurturing environment.",
                            color: "bg-orange-500",
                            items: ["Sensory Play", "Basic Literacy", "Art & Music", "Motor Skills"]
                        },
                        {
                            level: "Primary School",
                            grades: "Grades 1 - 5",
                            desc: "Building strong foundations in core subjects with an emphasis on inquiry and discovery.",
                            color: "bg-blue-600",
                            items: ["Integrated Sciences", "Mathematics", "Languages", "Information Tech"]
                        },
                        {
                            level: "Secondary School",
                            grades: "Grades 6 - 10",
                            desc: "Rigorous academic preparation balanced with career counseling and personal development.",
                            color: "bg-indigo-600",
                            items: ["Advanced STEM", "Social Studies", "Literature", "Career Guidance"]
                        }
                    ].map((item, i) => (
                        <div key={i} className="group p-8 rounded-[2rem] bg-surface shadow-xl border border-surface-dark/10 hover:shadow-2xl transition-all h-full flex flex-col">
                            <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 transform group-hover:rotate-6 transition-transform`}>
                                <BookOpen className="h-8 w-8" />
                            </div>
                            <span className="text-sm font-bold text-muted uppercase tracking-widest block mb-2">{item.grades}</span>
                            <h3 className="text-2xl font-black text-foreground mb-4">{item.level}</h3>
                            <p className="text-muted mb-8 flex-grow">{item.desc}</p>
                            <div className="space-y-3">
                                {item.items.map((sub, j) => (
                                    <div key={j} className="flex items-center gap-2 text-sm font-bold text-foreground/80">
                                        <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                                        {sub}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Special Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 md:p-12 rounded-[2.5rem] bg-surface-dark/5 border border-surface-dark/10">
                        <Lightbulb className="h-12 w-12 text-yellow-500 mb-6" />
                        <h2 className="text-3xl font-bold text-foreground mb-6">Innovative Pedagogy</h2>
                        <ul className="space-y-4">
                            {[
                                "Project Based Learning (PBL) to solve real-world problems.",
                                "Digital integration in every classroom for modern learning.",
                                "Strong focus on moral and value-based education.",
                                "Regular field trips and practical lab sessions."
                            ].map((li, i) => (
                                <li key={i} className="flex gap-3 text-muted">
                                    <div className="w-5 h-5 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 font-bold text-[10px]">✓</div>
                                    {li}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-[2.5rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                        <img
                            src="https://images.unsplash.com/photo-1510172951991-856a654063f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                            className="w-full h-full object-cover"
                            alt="Learning"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
