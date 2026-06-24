import { useForm } from 'react-hook-form'
import axios from 'axios'
import { inquiryApi } from '../api/inquiries'
import type { Inquiry, InquiryCreateInput } from '../types/inquiry'

type LaravelValidationError = {
  message: string
  errors: Record<string, string[]>
}

type InquiryCreatePageProps = {
  onCreated: (inquiry: Inquiry) => void
  onBack: () => void
}

// 新規登録フォーム。React Hook Form で入力を管理し、POST /api/inquiries で作成する
export function InquiryCreatePage({ onCreated, onBack }: InquiryCreatePageProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<InquiryCreateInput>()

  const onSubmit = async (data: InquiryCreateInput) => {
    try {
      const inquiry = await inquiryApi.create(data)
      onCreated(inquiry)
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 422) {
        // Laravel の 422 バリデーションエラーを各フィールドに紐付ける
        const body = e.response.data as LaravelValidationError
        Object.entries(body.errors).forEach(([field, messages]) => {
          setError(field as keyof InquiryCreateInput, {
            type: 'server',
            message: messages[0],
          })
        })
      }
    }
  }

  return (
    <div>
      <button onClick={onBack}>← 一覧へ戻る</button>
      <h2>新規問い合わせ</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>タイトル</label>
          <input
            {...register('title', {
              required: 'タイトルを入力してください',
              maxLength: { value: 100, message: '100文字以内で入力してください' },
            })}
          />
          {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
        </div>

        <div>
          <label>内容</label>
          <textarea
            rows={4}
            {...register('content', {
              required: '内容を入力してください',
              maxLength: { value: 1000, message: '1000文字以内で入力してください' },
            })}
          />
          {errors.content && <p style={{ color: 'red' }}>{errors.content.message}</p>}
        </div>

        <div>
          <label>投稿者名</label>
          <input
            {...register('requester', {
              required: '投稿者名を入力してください',
              maxLength: { value: 100, message: '100文字以内で入力してください' },
            })}
          />
          {errors.requester && <p style={{ color: 'red' }}>{errors.requester.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '送信中...' : '登録する'}
        </button>
      </form>
    </div>
  )
}
