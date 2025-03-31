import { NotFoundPageLazy } from "pages/not-found";
import { ReviewsPageLazy } from "pages/reviews";
import { RouteProps } from "react-router-dom";
import { RoutePath } from "shared/config/route";

export const Routes: RouteProps[] = [
    {
        path: '/',
        element: <ReviewsPageLazy/>
    },
    {
        path: RoutePath.reviews.fullPath,
        element: <ReviewsPageLazy/>
    },
    {
        path: RoutePath.reviewDetail.fullPath,
        element: <ReviewsPageLazy/>
    },
    {
        path: RoutePath.notFound.fullPath,
        element: <NotFoundPageLazy/>
    },
]