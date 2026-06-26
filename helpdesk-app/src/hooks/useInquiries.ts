// import { useEffect, useState } from 'react'
// import { inquiryApi } from '../api/inquiries'
// import type { Inquiry } from '../types/inquiry'
// import { useQuery } from '@tanstack/react-query'

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { inquiryApi } from "../api/inquiries";
import type { Inquiry } from "../types/inquiry";

// // 一覧データの取得・フィルタ・state 操作をまとめたカスタムフック
// export function useInquiries() {
//   const [inquiries, setInquiries] = useState<Inquiry[]>([])
//   const [filter, setFilter] = useState<string>('all') // 'all' | InquiryStatus
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   //filter が変わるたびに GET /api/inquiries?status=... を再実行
//   useEffect(() => {
//     setIsLoading(true)
//     setError(null)
//     inquiryApi
//       .getAll(filter)
//       .then(setInquiries)
//       .catch(() => setError('問い合わせの取得に失敗しました'))
//       .finally(() => setIsLoading(false))
//   }, [filter])

//   // 以下は API を呼ばず state だけを更新する（API 成功後に呼ぶ）
//   const addInquiry = (inquiry: Inquiry) => {
//     setInquiries((prev) => [inquiry, ...prev])
//   }

//   const updateInquiry = (updated: Inquiry) => {
//     setInquiries((prev) => prev.map((i) => (i.id === updated.id ? updated : i)))
//   }

//   const removeInquiry = (id: number) => {
//     setInquiries((prev) => prev.filter((i) => i.id !== id))
//   }

//   return {
//     inquiries,
//     filter,
//     setFilter,
//     isLoading,
//     error,
//     addInquiry,
//     updateInquiry,
//     removeInquiry,
//   }
// }

//一覧表示のTanStack Query化
export const useInquiries = () => {
  const [filter, setFilter] = useState("all");
  

  const {
    data: inquiries = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["inquiries", filter],
    queryFn: () => inquiryApi.getAll(filter),
  });

  const errorMessage = error
  ? "問い合わせの取得に失敗しました"
  : null;

  //以下は API を呼ばず state だけを更新する（API 成功後に呼ぶ）
  // const addInquiry = (inquiry: Inquiry) => {
  //   setInquiries((prev) => [inquiry, ...prev]);
  // };

  // const updateInquiry = (updated: Inquiry) => {
  //   setInquiries((prev) =>
  //     prev.map((i) => (i.id === updated.id ? updated : i)),
  //   );
  // };

  // const removeInquiry = (id: number) => {
  //   setInquiries((prev) => prev.filter((i) => i.id !== id));
  // };
  return {
    inquiries,
    filter,
    setFilter,
    isLoading,
    error:errorMessage,
  };
};
