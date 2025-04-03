import { makeAutoObservable } from "mobx";
import { IReview } from "../types";

interface IInitialState {
  page: number;
  reviews: IReview[];
  count: number;
  limit: number;
}

class ReviewStore {
  state: IInitialState = {
    reviews: [],
    count: 0,
    page: 1,
    limit: 10,
  };

  constructor() {
    makeAutoObservable(this);
  }

  addListReview(reviews: IReview[], count: number) {
    this.state.reviews = [...this.state.reviews, ...reviews];
    this.state.count = count;
    this.state.page++;
  }

  addNewReview(review: IReview) {
    this.state.reviews.unshift(review);
    this.state.count++;
  }

  deleteReview(id: string) {
    this.state.reviews = this.state.reviews.filter((review) => review.id !== id);
    this.state.count--;
  }

  changeReview(newReview: IReview) {
    const index = this.state.reviews.findIndex((review) => review.id === newReview.id);
    if (index > -1) {
      this.state.reviews[index] = newReview;
    }
  }

  clearAll() {
    this.state.reviews = [];
    this.state.page = 1;
    this.state.count = 0;
  }
}

export const reviewStore = new ReviewStore();
