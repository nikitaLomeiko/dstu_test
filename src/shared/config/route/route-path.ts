import { IRoute } from "./types";

enum enumPath {
  reviews = "reviews",
  reviewDetail = "reviewDetail",
  notFound = "notFound",
}

export const RoutePath: Record<enumPath, IRoute> = {
  [enumPath.reviews]: {
    path: "/reviews",
    fullPath: "/reviews",
  },
  [enumPath.reviewDetail]: {
    path: "/reviews/",
    fullPath: "/reviews/:id",
  },
  [enumPath.notFound]: {
    path: "/not-found",
    fullPath: "*",
  },
};
