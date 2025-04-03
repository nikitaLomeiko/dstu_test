import { ApiClient, EndpointsEnum } from "shared/api";
import { IReview } from "../types";
import { typeRequestResponse } from "shared/api/model/types";

export const getReviewById = async (id: string): Promise<typeRequestResponse<IReview>> => {
  const result = await ApiClient({
    url: `${EndpointsEnum.review}/${id}`,
    method: "GET",
  });

  return { data: result.data as IReview, status: result.status, total: result.total };
};
