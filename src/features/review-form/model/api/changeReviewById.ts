import { IReview } from "entities/review";
import { ApiClient, EndpointsEnum } from "shared/api";
import { typeRequestResponse } from "shared/api/model/types";

export const changeReviewById = async (newReview: IReview): Promise<typeRequestResponse<IReview[] | string>> => {
  const review = await ApiClient<IReview[]>({
    url: `${EndpointsEnum.review}?nickname_like=${newReview.nickname}`,
    method: "GET",
  });

  if (review.data.length > 1) {
    throw new Error("Такое имя уже существует");
  }

  const result = await ApiClient<IReview[]>({
    url: `${EndpointsEnum.review}/${newReview.id}`,
    method: "PUT",
    data: newReview,
  });

  return result;
};
