'use client';

import { updateApplicationStatus, deleteApplication } from '@/app/actions/admissions';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, CheckCircle, XCircle, Phone, Clock, Trash2 } from 'lucide-react';
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

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this application? This action cannot be undone.')) return;

        setIsLoading(true);
        const result = await deleteApplication(id);
        setIsLoading(false);

        if (result.success) {
            toast.success('Application deleted successfully');
        } else {
            toast.error('Failed to delete application');
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
                <DropdownMenuItem onClick={() => handleStatusUpdate('pending')} disabled={currentStatus === 'pending'} className="cursor-pointer">
                    <Clock className="mr-2 h-4 w-4 text-amber-500" />
                    Mark as Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusUpdate('contacted')} disabled={currentStatus === 'contacted'} className="cursor-pointer">
                    <Phone className="mr-2 h-4 w-4 text-blue-500" />
                    Mark as Contacted
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusUpdate('approved')} disabled={currentStatus === 'approved'} className="cursor-pointer">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    Approve Application
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleStatusUpdate('rejected')} disabled={currentStatus === 'rejected'} className="cursor-pointer">
                    <XCircle className="mr-2 h-4 w-4 text-red-500" />
                    Reject Application
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600 cursor-pointer">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Application
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
