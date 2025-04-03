import { IBaseComponent } from "shared/general/types/base-component.type";
import { IReview } from "../model/types";
import React from "react";
import { ReviewHeader } from "./components/ReviewHeader";
import { Rating } from "shared/ui/rating";
import { MdRemoveRedEye } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";

interface IProps extends Omit<IReview, "id" | "timestamp">, IBaseComponent {
  featureSlot?: React.ReactNode;
  formSlot?: React.ReactNode;
  isChange?: boolean;
}

export const ReviewDetail: React.FC<IProps> = (props) => {
  const {
    category,
    comment,
    date,
    nickname,
    rating,
    className,
    css,
    dateUpdate,
    featureSlot,
    viewedCount,
    formSlot,
    isChange,
  } = props;

  return (
    <div className={`card ${className}`} style={css}>
      <div className="card-header">
        <ReviewHeader nickname={nickname} category={category} />
      </div>
      {!isChange ? (
        <>
          <div className="card-body">
            <Rating rating={rating} />
            <p className="card-text mt-3">{comment}</p>
          </div>
          <div className="card-footer text-body-secondary">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-3">
                <div className="flex flex-row items-center gap-1">
                  <MdRemoveRedEye />
                  <p className="text-[14px]">{viewedCount || "Просмотров нет"}</p>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <FaRegCalendarAlt />
                  <p className="text-[14px]">{dateUpdate === "" ? date : `изменено: ${dateUpdate}`}</p>
                </div>
              </div>
              <div>{featureSlot}</div>
            </div>
          </div>
        </>
      ) : (
        formSlot
      )}
    </div>
  );
};
