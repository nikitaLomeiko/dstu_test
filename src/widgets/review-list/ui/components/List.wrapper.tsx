import { getPageReview, reviewStore } from "entities/review";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { EndpointsEnum } from "shared/api";
import { IBaseComponent } from "shared/general/types/base-component.type";
import { useIntersectionObserver } from "shared/lib/hooks/useIntersectionObserver";
import { filterStore } from "features/review-filter/model";
import { observer } from "mobx-react-lite";
import { sortStore } from "features/review-sort/model";
import { StatusData } from "shared/components/status-data";

interface IProps extends IBaseComponent {
  children: React.ReactNode;
}

export const ListWrapper: React.FC<IProps> = observer((props) => {
  const { className, css, children } = props;

  const {
    state: { count, limit, page },
  } = reviewStore;

  const {
    state: { queryString: filterString },
  } = filterStore;

  const {
    state: { queryString: sortString },
  } = sortStore;

  const [shouldFetch, setShouldFetch] = useState(true);
  const [ref] = useIntersectionObserver<HTMLDivElement>({ onIntersect: setShouldFetch });

  useEffect(() => {
    setShouldFetch(true);
    reviewStore.clearAll();
  }, [filterString, sortString]);

  const { isLoading, isError } = useQuery({
    queryKey: [EndpointsEnum.review],
    queryFn: async () => {
      const data = await getPageReview(page, limit, `${filterString}&${sortString}`);

      if (data.status === 200) {
        reviewStore.addListReview(data.data, Number(data.total));
        setShouldFetch(false);
      }

      return data;
    },
    enabled: shouldFetch,
  });

  return (
    <div className={className} style={css}>
      <div className={`flex flex-row items-center gap-1`}>
        <p>{count}</p>
        <p className="font-medium">отзывов</p>
      </div>
      <StatusData isLoading={isLoading} isError={isError} className="flex flex-col gap-4 mt-2">
        {children}
        {page * limit < count + limit && <div ref={ref}></div>}
      </StatusData>
    </div>
  );
});
