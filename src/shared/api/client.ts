import { AxiosInstance, type AxiosRequestConfig } from "axios";
import { IClient, TypeClientResult } from "./model/types";
import { BASE_API } from "./model";

export const ApiClient = async <T>(
  { data, method = "GET", url, params, headers }: IClient,
  scheme: AxiosInstance = BASE_API
): Promise<TypeClientResult<T>> => {
  const requestParams: AxiosRequestConfig = {
    method,
    url,
    params,
    data,
  };

  scheme.defaults.headers = { ...scheme.defaults.headers, ...headers };

  return scheme(requestParams)
    .then((res) => ({ data: res.data as T, status: res.status, total: res.headers["x-total-count"] as string }))
    .catch((err) => {
      console.error("\nERROR MESSAGE:", err.response?.data.message, `\nSTATUS: ${err.response?.data.status}`);

      return { data: "isError", status: err.response?.status, total: "0" };
    });
};
