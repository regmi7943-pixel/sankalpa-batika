'use client';

import { updateApplicationStatus } from '@/app/actions/admissions';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, CheckCircle, XCircle, Phone, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export function StatusActions({ id, currentStatus }: { id: string, currentStatus: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleStatusUpdate = async (status: string) => {
        setIsLoading(true);
        const result = await updateApplicationStatus(id, status);
        setIsLoading(false);

        if (result.success) {
            toast.success(`Status updated to ${status}`);
        } else {
            toast.error('Failed to update status');
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MoreHorizontal className="h-5 w-5" />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleStatusUpdate('pending')} disabled={currentStatus === 'pending'}>
                    <Clock className="mr-2 h-4 w-4 text-amber-500" />
                    Mark as Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusUpdate('contacted')} disabled={currentStatus === 'contacted'}>
                    <Phone className="mr-2 h-4 w-4 text-blue-500" />
                    Mark as Contacted
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusUpdate('approved')} disabled={currentStatus === 'approved'}>
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Approve Application
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusUpdate('rejected')} disabled={currentStatus === 'rejected'}>
                    <XCircle className="mr-2 h-4 w-4 text-red-500" />
                    Reject Application
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
