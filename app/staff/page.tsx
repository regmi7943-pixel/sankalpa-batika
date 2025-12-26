// Force dynamic rendering to ensure fresh data on Vercel
export const dynamic = 'force-dynamic';

import { Users } from 'lucide-react';
import { getGallery } from '@/app/actions/gallery';
import StaffCard from '@/components/staff-card';

export const metadata = {
    title: 'Our Staff - Sankalpa Vatika School',
    description: 'Meet the dedicated faculty and staff members of Sankalpa Vatika School.',
};

export default async function StaffPage() {
    const galleryRes = await getGallery();
    const staffMembers = (galleryRes.data || []).filter((item: any) => item.category === 'staff');

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
                </div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Users className="h-8 w-8 md:h-10 md:w-10 text-white" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-6 animate-fade-in">
                        Our Dedicated Team
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        Meet the passionate educators and professional staff committed to nurturing the future leaders of tomorrow.
                    </p>
                </div>
            </section>

            {/* Staff Grid */}
            <section className="py-20 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {staffMembers.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                            {staffMembers.map((staff: any) => (
                                <StaffCard key={staff.id} staff={staff} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-surface rounded-3xl border border-surface-dark/10">
                            <p className="text-muted-foreground italic">No staff members found.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
