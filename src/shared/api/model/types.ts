export interface IClient {
  data?: unknown | undefined;
  method?: string | undefined;
  url: string | undefined;
  params?: string | undefined;
  body?: unknown | undefined;
  headers?:
    | {
        [key: string]: string;
      }
    | undefined;
  responseType?: ResponseType;
}

export type TypeClientResult<T> =
  | {
      data: T;
      status: number;
      total: string;
    }
  | {
      data: string;
      status: number;
      total: string;
    };

export type typeRequestResponse<T> = Promise<{ data: T; status: number; total: number | string }>;
