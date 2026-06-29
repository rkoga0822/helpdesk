import { QueryClient, useMutation } from "@tanstack/react-query";
import { inquiryApi } from "../api/inquiries";

export const useCreateInquiry = (options?: { onSuccess?: () => void }) => {
  const queryCliet = new QueryClient();

  return useMutation({
    mutationFn: inquiryApi.create, //作成の時はこのAPIを呼ぶ

    onSuccess: () => {
      //POST成功後
      queryCliet.invalidateQueries({
        //問い合わせ一覧のキャッシュは古いから更新
        queryKey: ["inquiries"], //GET /api/inquiriesが走る
      });
    },
  });
};
