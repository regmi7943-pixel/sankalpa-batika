'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeletableWrapperProps {
    children: React.ReactNode;
    onDelete: () => void;
    className?: string;
    buttonClassName?: string;
    showRing?: boolean;
}

export function DeletableWrapper({ children, onDelete, className = '', buttonClassName = '', showRing = true }: DeletableWrapperProps) {
    return (
        <div className={`group relative ${className}`}>
            {/* Delete Button - hidden by default, visible on hover */}
            <div className={`absolute -top-2 -right-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity ${buttonClassName}`}>
                <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8 rounded-full shadow-lg border-2 border-white scale-75 group-hover:scale-100 transition-transform"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (confirm('Are you sure you want to remove this item?')) {
                            onDelete();
                        }
                    }}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>

            {/* Wrapped Content */}
            <div className={`${showRing ? 'group-hover:ring-2 group-hover:ring-red-400 group-hover:ring-offset-2' : ''} rounded-xl transition-all`}>
                {children}
            </div>
        </div>
    );
}
