import { IReview } from "entities/review";
import { ApiClient, EndpointsEnum } from "shared/api";
import { typeRequestResponse } from "shared/api/model/types";

export const createNewReview = async (data: IReview): Promise<typeRequestResponse<IReview | string>> => {
  const review = await ApiClient<IReview[]>({
    url: `${EndpointsEnum.review}?nickname_like=${data.nickname}`,
    method: "GET",
  });

  if (review.data.length !== 0) {
    throw new Error("Такое имя уже существует");
  }

  const result = await ApiClient<IReview>({
    url: `${EndpointsEnum.review}`,
    method: "POST",
    data,
  });

  return result;
};
