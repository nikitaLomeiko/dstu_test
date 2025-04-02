import { IReview } from "entities/review";
import { ApiClient, EndpointsEnum } from "shared/api";
import { typeRequestResponse } from "shared/api/model/types";

export const changeReviewById = async (
  id: string,
  newReview: IReview
): Promise<typeRequestResponse<IReview[] | string>> => {
  const review = await ApiClient<IReview[]>({
    url: `${EndpointsEnum.review}?nickname_like=${newReview.nickname}`,
    method: "GET",
  });

  if (review.data.length !== 0) {
    return { data: "Такое имя уже существует", status: 0, total: 0 };
  }

  const result = await ApiClient<IReview[]>({
    url: `${EndpointsEnum.review}/${id}`,
    method: "PUT",
    body: newReview,
  });

  return result;
};
