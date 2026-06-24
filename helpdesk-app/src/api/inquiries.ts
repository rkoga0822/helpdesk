import { api } from '../lib/api'
import type { Inquiry, InquiryCreateInput, InquiryStatus } from '../types/inquiry'

// API 呼び出しを 1 ファイルに集約する。baseURL はオリジンなので /api を付ける。
export const inquiryApi = {
  // 一覧取得（status でサーバー側フィルタ。'all' または未指定なら全件）
  getAll: async (status?: string): Promise<Inquiry[]> => {
    const params = status && status !== 'all' ? { status } : {}
    const response = await api.get<Inquiry[]>('/api/inquiries', { params })
    return response.data
  },

  create: async (input: InquiryCreateInput): Promise<Inquiry> => {
    const response = await api.post<Inquiry>('/api/inquiries', input)
    return response.data
  },

  // ステータス更新は PUT
  updateStatus: async (id: number, status: InquiryStatus): Promise<Inquiry> => {
    const response = await api.put<Inquiry>(`/api/inquiries/${id}`, { status })
    return response.data
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/inquiries/${id}`)
  },
}
