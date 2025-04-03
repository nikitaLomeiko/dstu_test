import { ApiClient, EndpointsEnum } from "shared/api";
import { IReview } from "../types";

export const incrementViewdReview = async (id: string): Promise<boolean> => {
  const review = await ApiClient({ url: `${EndpointsEnum.review}/${id}`, method: "GET" });

  if (review.status !== 200) return false;

  const result = await ApiClient({
    url: `${EndpointsEnum.review}/${id}`,
    method: "PATCH",
    data: { viewedCount: (review.data as IReview).viewedCount += 1 },
  });

  if (result.status !== 200) return false;

  return true;
};
