// Force dynamic rendering to ensure fresh data on Vercel
export const dynamic = 'force-dynamic';

import { getPageContent } from '@/app/actions/settings';
import { ClubsClient } from './clubs-client';

const defaultContent = {
    pageTitle: 'Clubs & Activities',
    pageSubtitle: 'Holistic development through a wide range of extracurricular engagement.',
    heroImage: '', // Placeholder for a hero image if needed
    houses: [
        { id: 'red', name: 'Red House', color: '#ef4444', description: 'The house of passion and strength.' },
        { id: 'blue', name: 'Blue House', color: '#3b82f6', description: 'The house of wisdom and calm.' },
        { id: 'green', name: 'Green House', color: '#22c55e', description: 'The house of growth and harmony.' },
        { id: 'yellow', name: 'Yellow House', color: '#eab308', description: 'The house of joy and enlightenment.' },
    ],
    clubs: [
        { id: 'music', title: 'Music Club', description: 'Exploring melodies and rhythm through various instruments.', icon: 'Music' },
        { id: 'art', title: 'Art & Craft', description: 'Unleashing creativity through colors, clay, and paper.', icon: 'Palette' },
        { id: 'sports', title: 'Sports Club', description: 'Building teamwork and physical excellence.', icon: 'Trophy' },
        { id: 'dance', title: 'Dance Club', description: 'Expressing emotions through graceful movements.', icon: 'Activity' },
    ],
    activities: [
        { title: 'Morning Assembly', time: '9:00 AM', description: 'Starting the day with prayers and news.' },
        { title: 'Library Hour', time: 'Weekly', description: 'Quiet time for reading and research.' },
        { title: 'Physical Education', time: 'Twice a week', description: 'Outdoor games and fitness drills.' },
    ]
};

export default async function ClubsPage() {
    const result = await getPageContent('clubs');
    const content = result.success && result.data ? { ...defaultContent, ...result.data } : defaultContent;

    return (
        <div className="pt-20">
            <ClubsClient content={content} />
        </div>
    );
}
