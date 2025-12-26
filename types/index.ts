export interface Notice {
    id: string;
    title: string;
    content: string;
    published: boolean;
    createdAt: number;
    expireAt?: number;
    attachmentUrl?: string;
    showPopup?: boolean;
}

export interface Event {
    id: string;
    name: string;
    description: string;
    date: number; // Start timestamp
    endDate?: number; // End timestamp (optional)
    location?: string;
    attachmentUrl?: string; // Photo or PDF link
}

export interface GalleryItem {
    id: string;
    url: string;
    type: 'image' | 'pdf';
    caption?: string;
    publicId?: string; // Cloudinary public_id
    category?: string;
    uploadedAt: number;
}

export interface PageContent {
    slug: string;
    title: string;
    content: string;
    lastUpdated?: number;
}

export type AdminUser = {
    email: string;
    uid: string;
};
