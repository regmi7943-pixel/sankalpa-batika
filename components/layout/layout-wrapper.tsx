'use client';

import { usePathname } from 'next/navigation';

export function LayoutWrapper({
    children,
    siteLayout
}: {
    children: React.ReactNode;
    siteLayout: React.ReactNode;
}) {
    const pathname = usePathname();

    // Hide navbar and footer on admin and login pages
    const isAdminOrLogin = pathname?.startsWith('/admin') || pathname?.startsWith('/khul-ja-sim-sim');

    if (isAdminOrLogin) {
        return <>{children}</>;
    }

    return <>{siteLayout}</>;
}
