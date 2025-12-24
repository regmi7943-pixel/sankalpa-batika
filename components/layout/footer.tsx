import Link from 'next/link';
import { Facebook, Twitter, Mail, Phone, MapPin, Instagram, Youtube, ArrowRight, GraduationCap } from 'lucide-react';
import { NewsletterForm } from '@/components/newsletter-form';

export function Footer() {
    const quickLinks = [
        { href: '/about', label: 'About Us' },
        { href: '/admissions', label: 'Admissions' },
        { href: '/notices', label: 'Notice Board' },
        { href: '/events', label: 'Events' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/contact', label: 'Contact Us' },
    ];

    return (
        <footer className="bg-background text-foreground border-t border-surface-dark/10">
            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-center md:text-left">
                    <div>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2 text-white">Ready to Join Our School?</h3>
                        <p className="text-blue-100 text-sm md:text-base">Admissions are now open for the upcoming academic session.</p>
                    </div>
                    <Link
                        href="/admissions"
                        className="flex items-center gap-2 bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl group text-sm md:text-base"
                    >
                        Apply Now
                        <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

                    {/* School Info */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-4 md:mb-6">
                            <img
                                src="/logo.png"
                                alt="Sankalpa Vatika Logo"
                                className="h-12 w-12 md:h-14 md:w-14 object-contain"
                            />
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-foreground">Sankalpa Vatika</h3>
                                <p className="text-xs md:text-sm text-muted">Excellence in Education</p>
                            </div>
                        </div>
                        <p className="text-muted text-xs md:text-sm leading-relaxed mb-4 md:mb-6">
                            Empowering students with knowledge, character, and vision for a better tomorrow.
                        </p>
                        <div className="flex gap-2 md:gap-3">
                            {[
                                { icon: Facebook, href: '#', color: 'hover:bg-blue-600' },
                                { icon: Instagram, href: '#', color: 'hover:bg-pink-600' },
                                { icon: Twitter, href: '#', color: 'hover:bg-sky-500' },
                                { icon: Youtube, href: '#', color: 'hover:bg-red-600' },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    className={`p-2 md:p-2.5 rounded-lg bg-surface text-muted hover:text-white transition-all duration-300 ${social.color}`}
                                >
                                    <social.icon className="h-4 w-4 md:h-5 md:w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 flex items-center gap-2">
                            <span className="w-6 md:w-8 h-0.5 bg-amber-500 rounded"></span>
                            Quick Links
                        </h3>
                        <ul className="space-y-2 md:space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-muted hover:text-blue-600 dark:hover:text-blue-400 hover:pl-2 transition-all duration-200 flex items-center gap-2 group text-sm md:text-base"
                                    >
                                        <ArrowRight className="h-3 w-3 md:h-4 md:w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 flex items-center gap-2">
                            <span className="w-6 md:w-8 h-0.5 bg-amber-500 rounded"></span>
                            Contact Us
                        </h3>
                        <ul className="space-y-3 md:space-y-4">
                            <li className="flex items-start gap-2 md:gap-3">
                                <div className="bg-slate-800 p-1.5 md:p-2 rounded-lg mt-0.5 flex-shrink-0">
                                    <MapPin className="h-3 w-3 md:h-4 md:w-4 text-amber-500" />
                                </div>
                                <div>
                                    <p className="text-xs md:text-sm font-medium text-foreground">Address</p>
                                    <p className="text-muted text-xs md:text-sm">Kathmandu, Nepal</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-2 md:gap-3">
                                <div className="bg-surface p-1.5 md:p-2 rounded-lg mt-0.5 flex-shrink-0">
                                    <Phone className="h-3 w-3 md:h-4 md:w-4 text-amber-500" />
                                </div>
                                <div>
                                    <p className="text-xs md:text-sm font-medium text-foreground">Phone</p>
                                    <p className="text-muted text-xs md:text-sm">+977-1-4XXXXXX</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-2 md:gap-3">
                                <div className="bg-surface p-1.5 md:p-2 rounded-lg mt-0.5 flex-shrink-0">
                                    <Mail className="h-3 w-3 md:h-4 md:w-4 text-amber-500" />
                                </div>
                                <div>
                                    <p className="text-xs md:text-sm font-medium text-foreground">Email</p>
                                    <p className="text-muted text-xs md:text-sm break-all">info@sankalpavatika.edu.np</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 flex items-center gap-2">
                            <span className="w-6 md:w-8 h-0.5 bg-amber-500 rounded"></span>
                            Newsletter
                        </h3>
                        <p className="text-slate-400 text-xs md:text-sm mb-3 md:mb-4">
                            Subscribe to get updates on admissions and events.
                        </p>
                        <NewsletterForm />
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-surface-dark/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-xs md:text-sm text-muted">
                    <p className="text-center md:text-left">© {new Date().getFullYear()} Sankalpa Vatika. All rights reserved.</p>
                    <div className="flex items-center gap-4 md:gap-6">
                        <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
                        <Link href="/admin" className="hover:text-foreground transition-colors">Admin</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
