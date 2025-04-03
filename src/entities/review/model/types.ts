export interface IReview {
    id: number;
    comment: string;
    category: string;
    nickname: string;
    rating: number;
    date: string;
    dateUpdate?: string;
    timestamp: number
}