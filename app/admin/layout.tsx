'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LogOut, GraduationCap, Menu, X, Eye, Edit3,
    Home, Info, UserCheck, Phone, Settings
} from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const pages = [
        { href: '/admin', label: 'Homepage', icon: Home },
        { href: '/admin/about', label: 'About', icon: Info },
        { href: '/admin/admissions', label: 'Admissions', icon: UserCheck },
        { href: '/admin/contact', label: 'Contact', icon: Phone },
        { href: '/admin/settings', label: 'Settings', icon: Settings },
    ];

    const isActive = (href: string) => pathname === href;

    return (
        <div className="min-h-screen bg-slate-900 flex">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <GraduationCap className="h-6 w-6 text-blue-400" />
                    <span className="font-bold text-white text-sm">Page Editor</span>
                </div>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg text-white hover:bg-slate-800"
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
        fixed lg:relative top-0 left-0 z-50 h-full w-56 bg-slate-900 border-r border-slate-800
        transform transition-transform duration-300 lg:translate-x-0 flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                {/* Logo */}
                <div className="p-4 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <GraduationCap className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-white text-sm">Sankalpa Batika</h1>
                            <p className="text-[10px] text-slate-500">Visual Editor</p>
                        </div>
                    </div>
                </div>

                {/* Pages List */}
                <div className="flex-1 p-3 overflow-y-auto">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider px-2 mb-2">
                        Pages
                    </p>
                    <nav className="space-y-1">
                        {pages.map((page) => (
                            <Link
                                key={page.href}
                                href={page.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all
                  ${isActive(page.href)
                                        ? 'bg-blue-600 text-white'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                    }
                `}
                            >
                                <page.icon className="h-4 w-4" />
                                <span className="font-medium">{page.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Bottom Actions */}
                <div className="p-3 border-t border-slate-800 space-y-2">
                    {/* View Live Site */}
                    <a
                        href="/"
                        target="_blank"
                        className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition-colors"
                    >
                        <Eye className="h-4 w-4" />
                        View Live Site
                    </a>

                    {/* Sign Out */}
                    <form action={logoutAction}>
                        <Button
                            type="submit"
                            variant="ghost"
                            className="w-full justify-center gap-2 text-slate-500 hover:text-white hover:bg-slate-800 text-sm h-9"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 pt-14 lg:pt-0 overflow-auto flex flex-col">
                {/* Editor Toolbar */}
                <div className="sticky top-0 z-40 bg-slate-800 border-b border-slate-700 px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Edit3 className="h-4 w-4 text-amber-400" />
                        <span className="text-sm text-slate-300">
                            Click any element to edit
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 text-xs h-8">
                            Undo
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs h-8">
                            Save Changes
                        </Button>
                    </div>
                </div>

                {/* Page Preview */}
                <div className="flex-1 bg-white overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
