import { ApiClient, BASE_API, EndpointsEnum } from "shared/api";

export const deleteReviewById = async (id: string): Promise<boolean> => {
  await ApiClient(
    {
      url: `${EndpointsEnum.review}/${id}`,
      method: "DELETE",
    },
    BASE_API
  );

  return true;
};
