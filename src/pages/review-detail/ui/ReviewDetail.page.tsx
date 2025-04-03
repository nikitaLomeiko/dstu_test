import { useParams } from "react-router-dom";
import { ReviewDetailWidget } from "widgets/review-detail";

export const ReviewDetailPage = () => {
  const {id} = useParams()

  return (
    <div className="container-md">
      <ReviewDetailWidget className="!mt-5" id={id || '-1'}/>
    </div>
  );
};
