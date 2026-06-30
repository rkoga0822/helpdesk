import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { inquiryApi } from "../api/inquiries";

export const useInquiries = () => {
  const [filter, setFilter] = useState("all");

  const {
    data: inquiries = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["inquiries", filter],
    queryFn: () => inquiryApi.getAll(filter),
    staleTime: 30_000,
  });

  return {
    inquiries,
    filter,
    setFilter,
    isLoading,
    error: error ? "問い合わせの取得に失敗しました" : null,
  };
};
