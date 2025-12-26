// Force dynamic rendering to ensure fresh data on Vercel
export const dynamic = 'force-dynamic';

import { getNotices } from '@/app/actions/notices';
import NoticesList from './notices-list';

export const metadata = {
    title: 'Notices - Sankalpa Vatika',
    description: 'Latest news, announcements, and circulars from Sankalpa Vatika School.',
};

export default async function NoticesPage() {
    const { data: notices } = await getNotices();

    return (
        <div className="pt-16 md:pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-48 md:w-72 h-48 md:h-72 bg-amber-400 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6">Notice Board</h1>
                    <p className="text-base md:text-xl text-blue-100 max-w-2xl mx-auto">
                        Stay updated with the latest announcements and important information.
                    </p>
                </div>
            </section>

            {/* Notices List & Modal */}
            <section className="py-12 md:py-20 bg-surface">
                <NoticesList notices={notices || []} />
            </section>
        </div>
    );
}
