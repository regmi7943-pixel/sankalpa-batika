export const dynamic = 'force-dynamic';

import { getApplications, updateApplicationStatus } from '@/app/actions/admissions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Calendar, Clock, CheckCircle, XCircle, MoreHorizontal, User, School, AlertCircle, Edit3 } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

export default async function ApplicationsPage() {
    const result = await getApplications();
    const applications = result.success ? result.data || [] : [];

    const pendingCount = applications.filter((app: any) => app.status === 'pending').length;
    const todayCount = applications.filter((app: any) => {
        const appDate = new Date(app.timestamp);
        const today = new Date();
        return appDate.getDate() === today.getDate() &&
            appDate.getMonth() === today.getMonth() &&
            appDate.getFullYear() === today.getFullYear();
    }).length;

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Online Applications</h1>
                    <p className="text-muted-foreground mt-1">Manage and review admission requests.</p>
                    <div className="mt-4">
                        <Link href="/admin/applications/editor">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Edit3 className="h-4 w-4" />
                                Edit Form Content
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Card className="p-4 flex items-center gap-4 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-full">
                            <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-muted-foreground">Total Pending</p>
                            <p className="text-xl font-bold text-blue-700 dark:text-blue-300">{pendingCount}</p>
                        </div>
                    </Card>
                    <Card className="p-4 flex items-center gap-4 bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30">
                        <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-full">
                            <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-muted-foreground">Today's New</p>
                            <p className="text-xl font-bold text-green-700 dark:text-green-300">{todayCount}</p>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {applications.length === 0 ? (
                    <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed border-muted-foreground/20">
                        <School className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                        <h3 className="text-lg font-medium text-muted-foreground">No applications found</h3>
                        <p className="text-sm text-muted-foreground/70">New submissions will appear here.</p>
                    </div>
                ) : (
                    applications.map((app: any) => (
                        <ApplicationCard key={app.id} application={app} />
                    ))
                )}
            </div>
        </div>
    );
}

function ApplicationCard({ application }: { application: any }) {
    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-900/50',
        contacted: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-900/50',
        approved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-900/50',
        rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-900/50',
    };

    const statusLabel = {
        pending: 'Pending Review',
        contacted: 'Contacted',
        approved: 'Approved',
        rejected: 'Rejected',
    };

    return (
        <Card className="overflow-hidden transition-all hover:shadow-md border-surface-dark/10">
            <div className={`h-1.5 w-full bg-gradient-to-r ${application.status === 'approved' ? 'from-green-500 to-emerald-600' :
                application.status === 'rejected' ? 'from-red-500 to-rose-600' :
                    application.status === 'contacted' ? 'from-blue-500 to-cyan-600' :
                        'from-amber-400 to-orange-500' // pending
                }`} />
            <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x border-surface-dark/10">

                    {/* Main Info */}
                    <div className="p-6 flex-1 space-y-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-xl font-bold text-foreground">{application.studentName}</h3>
                                    <Badge variant="outline" className={`capitalize font-normal border ${statusColors[application.status as keyof typeof statusColors] || statusColors.pending}`}>
                                        {statusLabel[application.status as keyof typeof statusLabel] || application.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1.5">
                                        <School className="h-3.5 w-3.5" />
                                        Applying for <strong>Grade {application.grade}</strong>
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                                    <span className="flex items-center gap-1.5">
                                        <User className="h-3.5 w-3.5" />
                                        {application.gender}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5" />
                                        DOB: {application.dob || 'N/A'}
                                    </span>
                                </div>
                            </div>

                            <StatusActions id={application.id} currentStatus={application.status} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 bg-muted/20 p-4 rounded-xl border border-surface-dark/5">
                            <div>
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Guardian Details</p>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        <User className="h-4 w-4 text-primary/70" />
                                        {application.parentName}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Phone className="h-4 w-4" />
                                        <a href={`tel:${application.phone}`} className="hover:text-primary transition-colors">{application.phone}</a>
                                    </div>
                                    {application.email && (
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Mail className="h-4 w-4" />
                                            <a href={`mailto:${application.email}`} className="hover:text-primary transition-colors">{application.email}</a>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4" />
                                        {application.address || 'Address not provided'}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Academic History</p>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2 text-sm">
                                        <School className="h-4 w-4 mt-0.5 text-primary/70" />
                                        <div>
                                            <p className="font-medium">Previous School</p>
                                            <p className="text-muted-foreground">{application.previousSchool || 'Not provided / First time'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {application.notes && (
                            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-100 dark:border-amber-900/30">
                                <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                    <AlertCircle className="h-3.5 w-3.5" />
                                    Inquiry Message / Notes
                                </p>
                                <p className="text-sm text-foreground italic">"{application.notes}"</p>
                            </div>
                        )}
                    </div>

                    {/* Metadata & Timestamp */}
                    <div className="p-4 lg:w-48 bg-muted/10 flex lg:flex-col items-center justify-between lg:justify-center gap-2 text-center">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Applied On</p>
                            <div className="flex lg:flex-col items-center gap-1.5">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">
                                    {format(new Date(application.timestamp), 'MMM d, yyyy')}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {format(new Date(application.timestamp), 'h:mm a')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// Client component for actions to avoid full page reloads if possible, but for simplicity here we use server actions directly via a client wrapper component if needed, or just standard form actions.
// Actually, for dropdowns in RSC, we need a client component.
import { StatusActions } from './status-actions';
