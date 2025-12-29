'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, GraduationCap, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface SiteSettings {
    schoolName: string;
    tagline: string;
    logoUrl: string;
    phone1: string;
    email1: string;
    hours: string;
}

export function Navbar({ settings }: { settings: SiteSettings }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMouseEnter = (label: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setOpenDropdown(label);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 200); // Increased delay for stability
    };

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        {
            href: '/academics',
            label: 'Academics',
            subLinks: [
                { href: '/academics/introduction', label: 'Introduction' },
                { href: '/academics/curriculum', label: 'Education System & Curriculum' },
                { href: '/academics/evaluation', label: 'Evaluation' },
                { href: '/academics/departments', label: 'HODs & Department' },
            ]
        },
        {
            href: '/admissions',
            label: 'Admissions',
            subLinks: [
                { href: '/admissions#policy', label: 'Our Policy' },
                { href: '/admissions#form', label: 'Admission Inquiry Form' },
                { href: '/admissions#fee', label: 'Fee Policy' },
                { href: '/admissions#uniform', label: 'School Uniform' },
                { href: '/admissions#transport', label: 'Schools Transport' },
                { href: '/admissions#boarding', label: 'Boarding Facilities' },
            ]
        },
        { href: '/notices-events', label: 'Notices & Events' },
        {
            href: '/clubs',
            label: 'Clubs & Activities',
            subLinks: [
                { href: '/clubs#eca', label: 'ECA & CCA' },
                { href: '/clubs#stem', label: 'STEM & Robotics' },
                { href: '/clubs#book', label: 'Book Review Program' },
                { href: '/clubs#arts', label: 'Fine Arts & Music' },
                { href: '/gallery', label: 'Activity Gallery' },
                { href: '/notices-events', label: 'Newsletter' },
                { href: '/alumni', label: 'Alumni Association' },
            ]
        },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* Top Bar - Hidden when scrolled */}
            <div className={`bg-blue-900 text-white transition-all duration-300 ${isScrolled ? 'h-0 overflow-hidden opacity-0' : 'py-2 opacity-100'}`}>
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4 flex justify-between items-center text-sm">
                    <div className="flex items-center gap-4">
                        <span>📞 {settings.phone1}</span>
                        <span className="hidden sm:inline">✉️ {settings.email1}</span>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <span>🕐 {settings.hours}</span>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className={`transition-all duration-300 ${isScrolled
                ? 'bg-background shadow-lg border-b border-surface-dark/10'
                : 'bg-blue-800/90 backdrop-blur-sm'
                }`}>
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-4">
                    <div className="flex items-center justify-between h-20 gap-8">
                        {/* Logo and Brand */}
                        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
                            <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                                {settings.logoUrl ? (
                                    <img
                                        src={settings.logoUrl}
                                        alt={`${settings.schoolName} Logo`}
                                        className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="h-full w-full bg-white/10 rounded-xl flex items-center justify-center">
                                        <GraduationCap className="h-6 w-6 text-white" />
                                    </div>
                                )}
                            </div>
                            <div className="hidden sm:block">
                                <span className={`font-bold text-sm md:text-lg tracking-tight whitespace-nowrap transition-colors ${isScrolled ? 'text-foreground' : 'text-white'}`}>
                                    {settings.schoolName}
                                </span>
                                <p className={`text-[10px] md:text-xs whitespace-nowrap transition-colors ${isScrolled ? 'text-muted' : 'text-blue-100'}`}>
                                    {settings.tagline}
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center justify-end flex-1 gap-1 xl:gap-2">
                            <div className="flex items-center gap-0.5 xl:gap-1">
                                {navLinks.map((link) => (
                                    link.subLinks ? (
                                        <div
                                            key={link.label}
                                            onMouseEnter={() => handleMouseEnter(link.label)}
                                            onMouseLeave={handleMouseLeave}
                                            className="relative flex items-center h-full"
                                        >
                                            <button className={`px-3 xl:px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1 group ${isScrolled
                                                ? 'text-foreground hover:text-blue-600 hover:bg-surface'
                                                : 'text-white hover:bg-white/10'
                                                }`}>
                                                {link.label}
                                                <ChevronDown className={`h-4 w-4 opacity-50 transition-transform duration-300 ${openDropdown === link.label ? 'rotate-180 opacity-100' : ''}`} />
                                            </button>

                                            <AnimatePresence>
                                                {openDropdown === link.label && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                                        className="absolute top-full right-0 w-64 pt-2 z-50"
                                                    >
                                                        <div className="p-2 rounded-2xl bg-background/98 backdrop-blur-xl border border-surface-dark/10 shadow-2xl overflow-hidden">
                                                            <div className="space-y-1">
                                                                {link.subLinks.map((sub) => (
                                                                    <Link
                                                                        key={sub.label}
                                                                        href={sub.href}
                                                                        onClick={() => setOpenDropdown(null)}
                                                                        className="cursor-pointer px-4 py-3 rounded-xl flex items-center justify-between group hover:bg-blue-600/5 transition-colors"
                                                                    >
                                                                        <span className="font-bold text-foreground group-hover:text-blue-600 text-sm transition-colors">{sub.label}</span>
                                                                        <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-blue-600" />
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onMouseEnter={() => handleMouseEnter('')}
                                            onMouseLeave={handleMouseLeave}
                                            className={`px-3 xl:px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all duration-200 ${isScrolled
                                                ? 'text-foreground hover:text-blue-600 hover:bg-surface'
                                                : 'text-white hover:bg-white/10'
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    )
                                ))}
                            </div>
                            <div className="flex items-center gap-4 pl-4 border-l border-white/20 ml-2">
                                <ThemeToggle />
                                <Link href="/admissions">
                                    <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap">
                                        Apply Now
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center gap-2">
                            <ThemeToggle />
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className={`p-2 rounded-lg transition-colors ${isScrolled
                                    ? 'text-foreground hover:bg-surface'
                                    : 'text-white hover:bg-white/10'
                                    }`}
                            >
                                <span className="sr-only">Open menu</span>
                                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen bg-background shadow-xl border-t border-surface-dark/10' : 'max-h-0'
                    }`}>
                    <div className="px-4 py-6 space-y-2">
                        {navLinks.map((link) => (
                            <div key={link.label} className="space-y-1">
                                {link.subLinks ? (
                                    <>
                                        <button
                                            onClick={() => {
                                                // Handle toggle for this specific dropdown in mobile
                                                const btn = document.getElementById(`mobile-dropdown-${link.label}`);
                                                const content = document.getElementById(`mobile-content-${link.label}`);
                                                if (content?.classList.contains('hidden')) {
                                                    content.classList.remove('hidden');
                                                    btn?.classList.add('rotate-180');
                                                } else {
                                                    content?.classList.add('hidden');
                                                    btn?.classList.remove('rotate-180');
                                                }
                                            }}
                                            className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-foreground hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 font-bold transition-all"
                                        >
                                            {link.label}
                                            <ChevronDown id={`mobile-dropdown-${link.label}`} className="h-4 w-4 transition-transform duration-300" />
                                        </button>
                                        <div id={`mobile-content-${link.label}`} className="hidden pl-6 space-y-1 py-1">
                                            {link.subLinks.map((sub) => (
                                                <Link
                                                    key={sub.label}
                                                    href={sub.href}
                                                    onClick={() => setIsOpen(false)}
                                                    className="block px-4 py-2.5 rounded-lg text-muted hover:text-blue-600 font-medium text-sm transition-colors border-l-2 border-transparent hover:border-blue-500"
                                                >
                                                    {sub.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-3 rounded-lg text-foreground hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 font-bold transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <div className="pt-4">
                            <Link href="/admissions" onClick={() => setIsOpen(false)}>
                                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                                    Apply Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
