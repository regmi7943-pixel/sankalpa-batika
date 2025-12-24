'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function Navbar() {
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
                        <span>📞 +977-1-4XXXXXX</span>
                        <span className="hidden sm:inline">✉️ info@sankalpavatika.edu.np</span>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <span>🕐 Sun - Fri: 9:00 AM - 4:00 PM</span>
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
                            <div className={`p-2 rounded-xl transition-all duration-300 ${isScrolled ? 'bg-blue-600' : 'bg-white/20'
                                }`}>
                                <GraduationCap className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <span className={`font-bold text-lg tracking-tight transition-colors ${isScrolled ? 'text-foreground' : 'text-white'
                                    }`}>
                                    Sankalpa Vatika
                                </span>
                                <p className={`text-xs transition-colors ${isScrolled ? 'text-muted' : 'text-blue-100'
                                    }`}>
                                    Excellence in Education
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
