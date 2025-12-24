import { getEvents } from '@/app/actions/events';
import { getNotices } from '@/app/actions/notices';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.sankalpabatika.edu.np'; // Replace with actual domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { data: notices } = await getNotices();
    // Events usually don't need individual pages unless specified, but let's assume listing only for now
    // If events had detail pages: const { data: events } = await getEvents();

    const noticeUrls = (notices || []).map((notice) => ({
        url: `${BASE_URL}/notices/${notice.id}`,
        lastModified: new Date(notice.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/admissions`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/notices`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/events`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/gallery`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        ...noticeUrls,
    ];
}
