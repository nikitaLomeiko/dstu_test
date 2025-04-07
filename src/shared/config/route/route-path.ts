import { IRoute } from "./types";

enum enumPath {
  reviews = "reviews",
  reviewDetail = "reviewDetail",
  notFound = "notFound",
}

export const RoutePath: Record<enumPath, IRoute> = {
  [enumPath.reviews]: {
    path: "/dstu_test/reviews/",
    fullPath: "/dstu_test/reviews",
  },
  [enumPath.reviewDetail]: {
    path: "/dstu_test/reviews/",
    fullPath: "/dstu_test/reviews/:id",
  },
  [enumPath.notFound]: {
    path: "/not-found",
    fullPath: "*",
  },
};
