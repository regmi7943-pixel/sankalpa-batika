"use client";

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function AcademicsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const tabs = [
        { href: '/academics/introduction', label: 'Introduction' },
        { href: '/academics/curriculum', label: 'Curriculum' },
        { href: '/academics/evaluation', label: 'Evaluation' },
        { href: '/academics/departments', label: 'Departments' },
    ];

    return (
        <main className="min-h-screen bg-background">
            {/* Common Header Banner */}
            <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-blue-950">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1541339907198-e08759df9a13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
                        alt="Academic Banner"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>

                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-2 text-blue-400 font-bold mb-4"
                    >
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-white">Academics</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white mb-8"
                    >
                        Academic <span className="text-blue-500 italic">Excellence</span>
                    </motion.h1>

                    {/* Navigation Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 p-2 rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 max-w-fit mx-auto">
                        {tabs.map((tab) => {
                            const isActive = pathname === tab.href;
                            return (
                                <Link
                                    key={tab.href}
                                    href={tab.href}
                                    className={`px-6 py-3 rounded-[1.5rem] font-bold text-sm transition-all duration-300 ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                                        : 'text-white/60 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {tab.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Page Content */}
            <motion.div
                key={pathname}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
        </main>
    );
}
