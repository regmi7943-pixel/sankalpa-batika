// Force dynamic rendering to ensure fresh data on Vercel
export const dynamic = 'force-dynamic';

import { getNotices } from '@/app/actions/notices';
import { getEvents } from '@/app/actions/events';
import NoticesEventsClient from './notices-events-client';

export const metadata = {
    title: 'Notices & Events - Sankalpa Vatika',
    description: 'Latest news, announcements, and upcoming events from Sankalpa Vatika School.',
};

export default async function NoticesEventsPage() {
    const [{ data: notices = [] }, { data: events = [] }] = await Promise.all([
        getNotices(),
        getEvents(),
    ]);

    return (
        <div className="pt-16 md:pt-20">
            <NoticesEventsClient notices={notices} events={events} />
        </div>
    );
}
