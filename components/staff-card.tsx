'use client';

import React from 'react';

interface StaffCardProps {
    staff: {
        id: string;
        url: string;
        caption?: string;
    };
}

export default function StaffCard({ staff }: StaffCardProps) {
    // Parse caption: "Name - Department"
    const [name, department] = (staff.caption || '').split(' - ');

    return (
        <div className="group space-y-4 p-4 bg-background dark:bg-surface/50 rounded-3xl border border-surface-dark/10 shadow-sm hover:shadow-xl transition-all animate-fade-in">
            <div className="aspect-square bg-surface dark:bg-background rounded-2xl overflow-hidden border border-surface-dark/10 relative">
                <img
                    src={staff.url}
                    alt={name || 'Staff Member'}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="space-y-1">
                <h3 className="font-bold text-foreground text-sm md:text-base line-clamp-1">{name || 'Staff Member'}</h3>
                <p className="text-blue-600 dark:text-blue-400 text-[10px] md:text-xs font-semibold uppercase tracking-wider line-clamp-1">{department || 'Academic Department'}</p>
            </div>
        </div>
    );
}
