import { makeAutoObservable } from "mobx";
import { IReview } from "../types";

interface IInitialState {
  reviews: IReview[];
  count: number;
}

class ReviewStore {
  state: IInitialState = {
    reviews: [],
    count: 0,
  };

  constructor() {
    makeAutoObservable(this);
  }

  setReview(reviews: IReview[], count: number) {
    this.state.reviews = reviews;
    this.state.count = count;
  }

  addListRevview(reviews: IReview[]) {
    this.state.reviews = [...this.state.reviews, ...reviews];
    this.state.count += reviews.length;
  }

  addNewReview(review: IReview) {
    this.state.reviews.push(review);
    this.state.count++;
  }

  deleteReview(id: number) {
    this.state.reviews = this.state.reviews.filter((review) => review.id !== id);
    this.state.count--;
  }

  changeReview(newReview: IReview) {
    const index = this.state.reviews.findIndex((review) => review.id === newReview.id);
    if (index > -1) {
      this.state.reviews[index] = newReview;
    }
  }
}

export const reviewStore = new ReviewStore();
