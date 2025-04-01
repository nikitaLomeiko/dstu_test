import { getPageReview, ReviewCard, reviewStore } from "entities/review";
import { useState } from "react";
import { useQuery } from "react-query";
import { EndpointsEnum } from "shared/api";
import { IBaseComponent } from "shared/general/types/base-component.type";
import { observer } from "mobx-react-lite";
import { MdError } from "react-icons/md";
import { useIntersectionObserver } from "shared/lib/hooks/useIntersectionObserver";

export const ReviewList: React.FC<IBaseComponent> = observer((props) => {
  const { className, css } = props;

  const {
    state: { count, limit, page, reviews },
  } = reviewStore;

  const [shouldFetch, setShouldFetch] = useState(false);

  const { isLoading, isError } = useQuery(
    EndpointsEnum.review,
    async () => {
      const data = await getPageReview(page, limit);

      if (data.status === 200) {
        reviewStore.addListReview(data.data, Number(data.total));
      }
    },
    { enabled: shouldFetch }
  );

  const [ref] = useIntersectionObserver<HTMLDivElement>({ onIntersect: setShouldFetch });

  if (isLoading) {
    return (
      <div className={`w-full items-center flex justify-center ${className}`} style={css}>
        <div className="spinner-border text-primary mt-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`w-full items-center flex justify-center ${className}`} style={css}>
        <div className="flex flex-row items-center gap-1">
          <MdError className="fill-red-500" />
          <p className="text-red-500">Ошибка при загрузке отзывов</p>
        </div>
      </div>
    );
  }

  return (
    <div className={className} style={css}>
      <div className={`flex flex-row items-center gap-1`}>
        <p>{count}</p>
        <p className="font-medium">отзывов</p>
      </div>
      <div className="flex flex-col gap-4 mt-2">
        {reviews.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
        {ref && <div ref={ref}></div>}
      </div>
    </div>
  );
});
