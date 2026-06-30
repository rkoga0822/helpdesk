import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inquiryApi } from "../api/inquiries";
import type { Inquiry, InquiryStatus, UpdateInquiryInput } from "../types/inquiry";

const inquiriesQueryKey = ["inquiries"] as const;

export const useCreateInquiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inquiryApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inquiriesQueryKey });
    },
  });
};

export const useUpdateInquiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: number; input: UpdateInquiryInput }) =>
      inquiryApi.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inquiriesQueryKey });
    },
  });
};

export const useUpdateInquiryStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: InquiryStatus }) =>
      inquiryApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inquiriesQueryKey });
    },
  });
};

export const useDeleteInquiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: Inquiry["id"]) => inquiryApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inquiriesQueryKey });
    },
  });
};
