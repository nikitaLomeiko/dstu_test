import { makeAutoObservable } from "mobx";
import { categoriesConfig } from "../config/categories.config";

const KEY_LOCAL_STORAGE = "filter-data";

interface IInitialState {
  queryString: string;
  categorySelectIds: number[];
  rating: number;
}

class FilterStore {
  state: IInitialState = {
    categorySelectIds: [],
    queryString: "",
    rating: 1,
  };

  constructor() {
    makeAutoObservable(this);
  }

  private setQueryString() {
    this.state.queryString =
      this.state.categorySelectIds.reduce((prev, cuurent) => {
        return (prev += `category_like=${categoriesConfig[cuurent]}&`);
      }, "") + `rating_gte=${this.state.rating}`;
  }

  toggleSelectCategory(id: number) {
    const state = this.state;
    if (state.categorySelectIds.includes(id)) {
      state.categorySelectIds = state.categorySelectIds.filter((item) => item !== id);
    } else {
      state.categorySelectIds = [...state.categorySelectIds, id];
    }

    this.setQueryString();
  }

  changeRating(rating: number) {
    this.state.rating = rating;
    this.setQueryString();
  }

  saveToLocalStorage() {
    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(this.state));
  }

  loadFromLocalStorage() {
    const data = localStorage.getItem(KEY_LOCAL_STORAGE);

    if (data !== null) {
      this.state = JSON.parse(data);
    }
  }

  clearAll() {
    localStorage.removeItem(KEY_LOCAL_STORAGE);
    this.state = {
      categorySelectIds: [],
      queryString: "",
      rating: 1,
    };
  }
}

export const filterStore = new FilterStore();
