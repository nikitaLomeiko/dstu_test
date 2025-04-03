import { ApiClient, EndpointsEnum } from "shared/api";
import { IReview } from "../types";
import { typeRequestResponse } from "shared/api/model/types";

export const getPageReview = async (
  page: number,
  limit: number,
  params?: string
): Promise<typeRequestResponse<IReview[]>> => {
  const result = await ApiClient({
    url: `${EndpointsEnum.review}?${params !== "" ? `${params}` : ""}&_page=${page}&_limit=${limit}`,
    method: "GET",
  });

  return { data: result.data as IReview[], status: result.status, total: result.total };
};
