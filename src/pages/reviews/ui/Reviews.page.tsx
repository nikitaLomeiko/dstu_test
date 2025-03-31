import { ReviewList } from "widgets/review-list";
import { ReviewSettings } from "widgets/review-settings";

export const ReviewsPage = () => {
  return (
    <div>
      <ReviewSettings />
      <div className="container-md">
        <ReviewList className="mt-3" />
      </div>
    </div>
  );
};
