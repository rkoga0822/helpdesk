import { useState } from 'react'
import { useInquiries } from './hooks/useInquiries'
import { InquiryListPage } from './pages/InquiryListPage'
import { InquiryDetailPage } from './pages/InquiryDetailPage'
import { InquiryCreatePage } from './pages/InquiryCreatePage'
import { inquiryApi } from './api/inquiries'
import type { Inquiry, InquiryStatus } from './types/inquiry'

type Page = 'list' | 'detail' | 'create'

function App() {
  const {
    inquiries,
    filter,
    setFilter,
    isLoading,
    error,
    addInquiry,
    updateInquiry,
    removeInquiry,
  } = useInquiries()

  const [currentPage, setCurrentPage] = useState<Page>('list')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  const handleSelectInquiry = (id: number) => {
    setSelectedId(id)
    setActionError(null)
    setCurrentPage('detail')
  }

  const handleBack = () => {
    setSelectedId(null)
    setActionError(null)
    setCurrentPage('list')
  }

  const handleCreated = (inquiry: Inquiry) => {
    addInquiry(inquiry)
    setCurrentPage('list')
  }

  const handleUpdateStatus = async (id: number, status: InquiryStatus) => {
    setActionError(null)
    try {
      const updated = await inquiryApi.updateStatus(id, status)
      updateInquiry(updated)
    } catch {
      setActionError('ステータスの更新に失敗しました')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('この問い合わせを削除しますか？')) return
    setActionError(null)
    try {
      await inquiryApi.delete(id)
      removeInquiry(id)
      handleBack()
    } catch {
      setActionError('削除に失敗しました')
    }
  }

  const selectedInquiry = inquiries.find((i) => i.id === selectedId)

  return (
    <div>
      <header>
        <h1>問い合わせ管理</h1>
        <nav>
          <button onClick={() => setCurrentPage('list')}>一覧</button>
          <button onClick={() => setCurrentPage('create')}>新規登録</button>
        </nav>
      </header>

      {actionError && <p style={{ color: 'red' }}>{actionError}</p>}

      <main>
        {currentPage === 'list' && (
          <InquiryListPage
            inquiries={inquiries}
            filter={filter}
            onChangeFilter={setFilter}
            isLoading={isLoading}
            error={error}
            onSelectInquiry={handleSelectInquiry}
          />
        )}

        {currentPage === 'detail' && selectedInquiry && (
          <InquiryDetailPage
            inquiry={selectedInquiry}
            onBack={handleBack}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDelete}
          />
        )}

        {currentPage === 'detail' && !selectedInquiry && (
          <p>問い合わせが見つかりませんでした。</p>
        )}

        {currentPage === 'create' && (
          <InquiryCreatePage onCreated={handleCreated} onBack={handleBack} />
        )}
      </main>
    </div>
  )
}

export default App
