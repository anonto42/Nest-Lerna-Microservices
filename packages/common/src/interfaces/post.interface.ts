;

export interface Post {
    id: string;
    userId: string;
    content: string;
    mediaUrls: string[];
    likes: string[];
    comments: Comment[];
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
}