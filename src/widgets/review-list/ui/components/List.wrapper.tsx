import { getPageReview, reviewStore } from "entities/review";
import { useState } from "react";
import { MdError } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { EndpointsEnum } from "shared/api";
import { IBaseComponent } from "shared/general/types/base-component.type";
import { useIntersectionObserver } from "shared/lib/hooks/useIntersectionObserver";

interface IProps extends IBaseComponent {
  children: React.ReactNode;
}

export const ListWrapper: React.FC<IProps> = (props) => {
  const { className, css, children } = props;

  const {
    state: { count, limit, page },
  } = reviewStore;

  const [shouldFetch, setShouldFetch] = useState(true);

  const { isLoading, isError } = useQuery({
    queryKey: [EndpointsEnum.review],
    queryFn: async () => {
      const data = await getPageReview(page, limit);
      
      if (data.status === 200) {
        reviewStore.addListReview(data.data, Number(data.total));
      }

      return data
    },
    enabled: shouldFetch,
  });

  const [ref] = useIntersectionObserver<HTMLDivElement>({ onIntersect: setShouldFetch });

  return (
    <div className={className} style={css}>
      <div className={`flex flex-row items-center gap-1`}>
        <p>{count}</p>
        <p className="font-medium">отзывов</p>
      </div>
      {isLoading && (
        <div className={`w-full items-center flex justify-center ${className}`} style={css}>
          <div className="spinner-border text-primary mt-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {isError && (
        <div className={`w-full items-center flex justify-center ${className}`} style={css}>
          <div className="flex flex-row items-center gap-1">
            <MdError className="fill-red-500" />
            <p className="text-red-500">Ошибка при загрузке отзывов</p>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4 mt-2">{children}</div>
      <div ref={ref}></div>
    </div>
  );
};
