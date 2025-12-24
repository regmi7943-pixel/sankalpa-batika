import { notFound } from 'next/navigation';
import { adminDb } from '@/lib/firebase/server';
import { Notice } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

async function getNotice(id: string) {
    try {
        const snapshot = await adminDb.ref(`notices/${id}`).once('value');
        if (!snapshot.exists()) return null;
        return { id, ...snapshot.val() } as Notice;
    } catch (error) {
        return null;
    }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
    const notice = await getNotice(params.id);
    if (!notice) return { title: 'Notice Not Found' };
    return {
        title: `${notice.title} - Sankalpa Vatika`,
    };
}

export default async function NoticeDetailPage({ params }: { params: { id: string } }) {
    const notice = await getNotice(params.id);

    if (!notice || !notice.published) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <Card>
                <CardHeader className="border-b bg-gray-50">
                    <CardTitle className="text-3xl font-bold">{notice.title}</CardTitle>
                    <div className="flex items-center text-gray-500 text-sm mt-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(notice.createdAt).toLocaleDateString(undefined, {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </div>
                </CardHeader>
                <CardContent className="p-8 prose max-w-none">
                    {/* 
               If content is rich text/HTML from editor, use dangerouslySetInnerHTML 
               BUT sanitation is required. For now assuming plain text or simple HTML.
               Ideally use a parser.
            */}
                    <div dangerouslySetInnerHTML={{ __html: notice.content }} />
                </CardContent>
            </Card>
        </div>
    );
}
