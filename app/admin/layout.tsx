'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LogOut, GraduationCap, Menu, X, Eye, Edit3,
    Home, Info, UserCheck, Phone, Settings,
    Megaphone, Calendar, Image as Image, Mail, FileText
} from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useState } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const pageLinks = [
        { href: '/admin', label: 'Homepage', icon: Home },
        { href: '/admin/about', label: 'About', icon: Info },
        { href: '/admin/admissions', label: 'Admissions Page', icon: FileText },
        { href: '/admin/contact', label: 'Contact', icon: Phone },
    ];

    const managementLinks = [
        { href: '/admin/applications', label: 'Online Admissions', icon: UserCheck },
        { href: '/admin/messages', label: 'Messages', icon: Mail },
        { href: '/admin/notices', label: 'Notices', icon: Megaphone },
        { href: '/admin/events', label: 'Events', icon: Calendar },
        { href: '/admin/gallery', label: 'Gallery', icon: Image },
        { href: '/admin/settings', label: 'Settings', icon: Settings },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <div className="h-screen w-full bg-background flex overflow-hidden">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background border-b border-border px-4 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <span className="font-bold text-foreground text-sm">Page Editor</span>
                </div>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg text-foreground hover:bg-accent"
                >
                    {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Left Sidebar */}
            <aside className={`
        fixed lg:relative top-0 left-0 z-50 h-full w-56 bg-surface border-r border-border
        transform transition-transform duration-300 lg:translate-x-0 flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                {/* Logo */}
                <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="h-10 w-10 object-contain"
                        />
                        <div>
                            <h1 className="font-bold text-foreground text-sm">Sankalpa Vatika</h1>
                            <p className="text-[10px] text-muted-foreground">Visual Editor</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 p-3 overflow-y-auto space-y-6">
                    {/* Pages Section */}
                    <div>
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                            Pages
                        </p>
                        <nav className="space-y-1">
                            {pageLinks.map((page) => (
                                <Link
                                    key={page.href}
                                    href={page.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all
                  ${isActive(page.href)
                                            ? 'bg-blue-600 text-white'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                        }
                `}
                                >
                                    <page.icon className="h-4 w-4" />
                                    <span className="font-medium">{page.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Management Section */}
                    <div>
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">
                            Management
                        </p>
                        <nav className="space-y-1">
                            {managementLinks.map((page) => (
                                <Link
                                    key={page.href}
                                    href={page.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all
                  ${isActive(page.href)
                                            ? 'bg-blue-600 text-white'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                        }
                `}
                                >
                                    <page.icon className="h-4 w-4" />
                                    <span className="font-medium">{page.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-3 border-t border-border space-y-2">
                    {/* Theme Toggle & Live Site */}
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <a
                            href="/"
                            target="_blank"
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-medium hover:bg-accent/80 transition-colors"
                        >
                            <Eye className="h-3.5 w-3.5" />
                            Live Site
                        </a>
                    </div>

                    {/* Sign Out */}
                    <form action={logoutAction}>
                        <Button
                            type="submit"
                            variant="ghost"
                            className="w-full justify-center gap-2 text-muted-foreground hover:text-foreground hover:bg-accent text-sm h-9"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 pt-14 lg:pt-0 overflow-auto flex flex-col bg-background">
                {/* Editor Toolbar - Hidden on Settings page since it has its own save button */}
                {!isActive('/admin/settings') && (
                    <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border px-4 py-2 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-2">
                            <Edit3 className="h-4 w-4 text-amber-500" />
                            <span className="text-sm text-muted-foreground">
                                Click any element to edit
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="border-input hover:bg-accent text-xs h-8">
                                Undo
                            </Button>
                            <Button
                                id="admin-save-btn"
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8"
                                onClick={() => {
                                    const event = new CustomEvent('admin-save');
                                    window.dispatchEvent(event);
                                }}
                            >
                                Save Changes
                            </Button>
                        </div>
                    </div>
                )}

                {/* Page Preview */}
                <div className="flex-1 bg-muted/30 pt-4 md:pt-0">
                    {children}
                </div>
            </main>
        </div>
    );
}
