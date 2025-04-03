export interface IReview {
  id: string;
  comment: string;
  category: string;
  nickname: string;
  rating: number;
  date: string;
  dateUpdate?: string;
  timestamp: number;
  viewedCount: number;
}
