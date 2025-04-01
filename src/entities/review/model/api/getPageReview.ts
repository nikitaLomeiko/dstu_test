import { ApiClient, EndpointsEnum } from "shared/api";
import { IReview } from "../types";
import { typeRequestResponse } from "shared/api/model/types";

export const getPageReview = async (page: number, limit: number): Promise<typeRequestResponse<IReview[]>> => {
  const result = await ApiClient<IReview[]>({
    url: `${EndpointsEnum.review}?_page=${page}&_limit=${limit}`,
    method: "GET",
  });

  return result;
};
