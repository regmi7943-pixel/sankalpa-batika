import { Users, GraduationCap, Microscope, Palette, Binary, Languages } from 'lucide-react';

export default function DepartmentsPage() {
    const departments = [
        { name: "Science & Tech", icon: Microscope, color: "bg-blue-500", lead: "Dr. Anish Sharma", staff: 12 },
        { name: "Mathematics", icon: Binary, color: "bg-indigo-500", lead: "Ms. Sunita Rai", staff: 8 },
        { name: "Languages & Lit", icon: Languages, color: "bg-emerald-500", lead: "Mr. Rajan Karki", staff: 14 },
        { name: "Social Sciences", icon: Users, color: "bg-orange-500", lead: "Ms. Deepa Shah", staff: 9 },
        { name: "Creative Arts", icon: Palette, color: "bg-pink-500", lead: "Mr. Bikash Gurung", staff: 6 },
        { name: "Physical Education", icon: GraduationCap, color: "bg-red-500", lead: "Mr. Hemant Pandey", staff: 5 },
    ];

    return (
        <div className="pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-bold text-sm mb-6">
                        <Users className="h-4 w-4" />
                        OUR ACADEMIC TEAM
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-foreground mb-6">
                        HODs & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Departments</span>
                    </h1>
                </div>

                {/* HOD Profile Section */}
                <div className="mb-20">
                    <h2 className="text-3xl font-bold text-foreground mb-10 border-l-4 border-blue-600 pl-4">Departmental Heads</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {departments.map((dep, i) => (
                            <div key={i} className="group p-6 rounded-3xl bg-surface border border-surface-dark/10 hover:shadow-xl transition-all">
                                <div className={`${dep.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                                    <dep.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-1">{dep.name}</h3>
                                <p className="text-sm text-blue-600 font-bold mb-4">{dep.lead}</p>
                                <div className="flex items-center gap-2 text-xs text-muted font-bold">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map(n => (
                                            <div key={n} className="w-6 h-6 rounded-full bg-surface-dark/20 border-2 border-surface" />
                                        ))}
                                    </div>
                                    {dep.staff} Dedicated Staff
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Join our team banner */}
                <div className="bg-surface border border-surface-dark/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-lg">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Dedicated to Academic Support</h2>
                        <p className="text-muted leading-relaxed">
                            Our departments work collaboratively to ensure a synchronized curriculum across all grades. Each HOD brings years of pedagogical expertise to lead their respective teams towards student success.
                        </p>
                    </div>
                    <button className="px-10 py-4 rounded-2xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all">Meet Our Faculty</button>
                </div>
            </div>
        </div>
    );
}
