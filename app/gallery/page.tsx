// Force dynamic rendering to ensure fresh data on Vercel
export const dynamic = 'force-dynamic';

import { getGallery, getCategories } from '@/app/actions/gallery';
import { GalleryClient } from './gallery-client';
import { GalleryHero } from './gallery-hero';

export const metadata = {
    title: 'Gallery - Sankalpa Vatika School',
    description: 'Explore life at Sankalpa Vatika through our photo gallery and documents.',
};

export default async function GalleryPage() {
    const [galleryRes, catRes] = await Promise.all([
        getGallery(),
        getCategories()
    ]);

    const galleryItems = galleryRes.data || [];
    const categories = catRes.data || [];

    return (
        <div className="min-h-screen pt-12 pb-20">
            <GalleryHero />

            {/* Gallery Section */}
            <section className="container mx-auto px-4">
                <GalleryClient items={galleryItems} categories={categories} />
            </section>
        </div>
    );
}
