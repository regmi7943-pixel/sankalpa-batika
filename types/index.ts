export interface Notice {
    id: string;
    title: string;
    content: string;
    published: boolean;
    createdAt: number;
    expireAt?: number;
}

export interface Event {
    id: string;
    name: string;
    description: string;
    date: number; // timestamp
    location?: string;
}

export interface GalleryItem {
    id: string;
    url: string;
    type: 'image' | 'pdf';
    caption?: string;
    publicId?: string; // Cloudinary public_id
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
