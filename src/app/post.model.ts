export interface Post {
    title: string;
    content: string;
    category: string;
    likes: number;
    publicationDate: string;
    username: string;
    postReference?: string;
}
