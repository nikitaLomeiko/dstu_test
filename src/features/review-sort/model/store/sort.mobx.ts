import { makeAutoObservable } from "mobx";

type TypeSort = "deafult" | "desc" | "asc";

interface IInitialState {
  typeSort: TypeSort;
  queryString: string;
}

class SortStore {
  state: IInitialState = {
    typeSort: "deafult",
    queryString: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  changeTypeSort(type: TypeSort) {
    this.state.typeSort = type;

    if (type === "deafult") {
      this.state.queryString = "";
      return;
    }

    this.state.queryString = `_sort=timestamp&_order=${type}`;
  }
}

export const sortStore = new SortStore();
