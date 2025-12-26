'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
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

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        { href: '/admissions', label: 'Admissions' },
        { href: '/notices', label: 'Notices' },
        { href: '/events', label: 'Events' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            {/* Top Bar - Hidden when scrolled */}
            <div className={`bg-blue-900 text-white transition-all duration-300 ${isScrolled ? 'h-0 overflow-hidden opacity-0' : 'py-2 opacity-100'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <img
                                    src={settings.logoUrl || '/logo.png'}
                                    alt={`${settings.schoolName} Logo`}
                                    className="h-10 w-10 md:h-12 md:w-12 object-contain group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div>
                                <span className={`font-bold text-sm sm:text-base md:text-lg tracking-tight transition-colors ${isScrolled ? 'text-foreground' : 'text-white'
                                    }`}>
                                    {settings.schoolName}
                                </span>
                                <p className={`text-[10px] md:text-xs transition-colors ${isScrolled ? 'text-muted' : 'text-blue-100'
                                    }`}>
                                    {settings.tagline}
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isScrolled
                                        ? 'text-foreground hover:text-blue-600 hover:bg-surface'
                                        : 'text-white hover:bg-white/10'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex items-center gap-2 pl-4 ml-2 border-l border-white/20">
                                <ThemeToggle />
                                <Link href="/admissions">
                                    <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
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
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-3 rounded-lg text-foreground hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 font-medium transition-colors"
                            >
                                {link.label}
                            </Link>
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
