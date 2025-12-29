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
        <main className="min-h-screen bg-background pt-32">
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
