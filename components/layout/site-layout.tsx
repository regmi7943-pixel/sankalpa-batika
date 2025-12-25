import { getSiteSettings } from '@/app/actions/settings';
import { Navbar } from './navbar';
import { Footer } from './footer';

// Default settings for fallback
const defaultSettings = {
    schoolName: 'Sankalpa Vatika',
    tagline: 'Excellence in Education',
    logoUrl: '/logo.png',
    phone1: '+977-1-4XXXXXX',
    phone2: '+977-98XXXXXXXX',
    email1: 'info@sankalpavatika.edu.np',
    email2: 'admissions@sankalpavatika.edu.np',
    address: 'Kathmandu, Nepal',
    hours: 'Sun - Fri: 9:00 AM - 4:00 PM',
    facebook: '',
    instagram: '',
    youtube: ''
};

export async function SiteLayout({ children, showLayout = true }: { children: React.ReactNode; showLayout?: boolean }) {
    // Skip layout for admin pages
    if (!showLayout) {
        return <>{children}</>;
    }

    // Fetch settings server-side
    const result = await getSiteSettings();
    const settings = { ...defaultSettings, ...(result.data || {}) };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar settings={settings} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer settings={settings} />
        </div>
    );
}
