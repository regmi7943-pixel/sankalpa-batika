'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { HelpCircle } from 'lucide-react';

interface DynamicIconProps {
    name: string;
    className?: string;
    fallback?: React.ReactNode;
}

export default function DynamicIcon({ name, className, fallback }: DynamicIconProps) {
    const IconComponent = (LucideIcons as any)[name];

    if (!IconComponent) {
        return <>{fallback || <HelpCircle className={className} />}</>;
    }

    return <IconComponent className={className} />;
}
