// Force dynamic rendering to ensure fresh data on Vercel
export const dynamic = 'force-dynamic';

import { getGallery } from '@/app/actions/gallery';
import { GalleryClient } from './gallery-client';
import { ImageIcon } from 'lucide-react';

export const metadata = {
    title: 'Gallery - Sankalpa Batika School',
    description: 'Explore life at Sankalpa Batika through our photo gallery and documents.',
};

export default async function GalleryPage() {
    const { data: galleryItems } = await getGallery();

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Our Gallery</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Glimpses of life, learning, and growth at Sankalpa Batika School.
                    </p>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <GalleryClient items={galleryItems || []} />
                </div>
            </section>
        </div>
    );
}
