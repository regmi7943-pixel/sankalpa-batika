'use client';

import { useEffect, useState } from 'react';
import { Notice } from '@/types';
import NoticeModal from '@/components/notice-modal';

interface HomeNoticePopupProps {
    notices: Notice[];
}

export default function HomeNoticePopup({ notices }: HomeNoticePopupProps) {
    const [popupNotice, setPopupNotice] = useState<Notice | null>(null);

    useEffect(() => {
        // Find the latest notice that has showPopup = true
        // and is published (implicit as notices are filtered on server usually, but good to check)
        const relevantNotice = notices.find(n => n.showPopup && n.published);

        if (relevantNotice) {
            const today = new Date().toDateString();
            const lastViewed = localStorage.getItem('sankalpa_popup_last_viewed');

            // Check if user has already seen a popup today
            // Note: User requirement says "show once per day per user"
            if (lastViewed !== today) {
                // Delay slightly for better UX
                const timer = setTimeout(() => {
                    setPopupNotice(relevantNotice);
                }, 1500);
                return () => clearTimeout(timer);
            }
        }
    }, [notices]);

    const handleClose = () => {
        setPopupNotice(null);
        // Mark as viewed for today
        const today = new Date().toDateString();
        localStorage.setItem('sankalpa_popup_last_viewed', today);
    };

    if (!popupNotice) return null;

    return (
        <NoticeModal
            isOpen={!!popupNotice}
            onClose={handleClose}
            notice={popupNotice}
        />
    );
}
