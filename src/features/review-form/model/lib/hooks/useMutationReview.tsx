import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeReviewById, createNewReview, deleteReviewById } from "../../api";
import { IReview } from "entities/review";
import { EndpointsEnum } from "shared/api";

export const useMutationReview = (reviews: IReview[]) => {
    const queryClient = useQueryClient();

  const mutationRemove = useMutation({
    mutationFn: deleteReviewById,
    onSuccess: () => {
      queryClient.setQueryData([EndpointsEnum.review], () => ({ data: reviews, total: reviews.length }));
      queryClient.invalidateQueries({ queryKey: [EndpointsEnum.review] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: changeReviewById,
    onSuccess: () => {
      queryClient.setQueryData([EndpointsEnum.review], () => ({ data: reviews, total: reviews.length }));
      queryClient.invalidateQueries({ queryKey: [EndpointsEnum.review] });
    },
  });

  const mutationCreate = useMutation({
      mutationFn: createNewReview,
      onSuccess: () => {
        queryClient.setQueryData([EndpointsEnum.review], () => ({ data: reviews, total: reviews.length }));
        queryClient.invalidateQueries({ queryKey: [EndpointsEnum.review] });
      },
    });

  return {mutationRemove, mutationUpdate, mutationCreate}
}