// Force dynamic rendering to ensure fresh data on Vercel
export const dynamic = 'force-dynamic';

import { getEvents } from '@/app/actions/events';
import EventsClient from './events-client';

export const metadata = {
    title: 'Events - Sankalpa Vatika',
    description: 'Upcoming events and activities at Sankalpa Vatika School.',
};

export default async function EventsPage() {
    const { data: events = [] } = await getEvents();

    return <EventsClient events={events} />;
}
