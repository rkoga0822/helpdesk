import { useState } from "react";
import axios from "axios";
import type { User } from "../types/auth";
import { useInquiries } from "../hooks/useInquiries";
import type { Inquiry, InquiryStatus } from "../types/inquiry";
import { inquiryApi } from "../api/inquiries";
import { InquiryCreatePage } from "./InquiryCreatePage";
import { InquiryDetailPage } from "./InquiryDetailPage";
import { InquiryListPage } from "./InquiryListPage";
import { InquiryEditPage } from "./InquiryEditPage";
import { InquiryHeader } from "../components/InquiryHeader";
import type { Page } from "../types/page";

type InquiryPageProps = {
  user: User;
  onLogout: () => void;
};

export const InquiryPage = ({ user, onLogout }: InquiryPageProps) => {
  const {
    inquiries,
    filter,
    setFilter,
    isLoading,
    error,
    addInquiry,
    updateInquiry,
    removeInquiry,
  } = useInquiries();

  const [currentPage, setCurrentPage] = useState<Page>("list");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleSelectInquiry = (id: number) => {
    setSelectedId(id);
    setCurrentPage("detail");
  };
  const handleBack = () => {
    setSelectedId(null);
    setCurrentPage("list");
  };
  const handleCreated = (inquiry: Inquiry) => {
    addInquiry(inquiry);
    setCurrentPage("list");
  };

  const handleUpdateStatus = async (id: number, status: InquiryStatus) => {
    const updated = await inquiryApi.updateStatus(id, status);
    updateInquiry(updated);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("この問い合わせを削除しますか？")) return;
    try {
      await inquiryApi.delete(id);
      removeInquiry(id);
      handleBack();
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 403) {
        alert("削除には管理者権限が必要です");
      }
    }
  };

  const handleEditInquiry = () => {
    setCurrentPage("edit");
  };

  const selectedInquiry = inquiries.find((i) => i.id === selectedId);

  return (
    <div>
      <InquiryHeader
        user={user}
        onLogout={onLogout}
        onNavigate={setCurrentPage}
      />
      <main>
        {currentPage === "list" && (
          <InquiryListPage
            inquiries={inquiries}
            filter={filter}
            onChangeFilter={setFilter}
            isLoading={isLoading}
            error={error}
            onSelectInquiry={handleSelectInquiry}
          />
        )}
        {currentPage === "detail" && selectedInquiry && (
          <InquiryDetailPage
            inquiry={selectedInquiry}
            onBack={handleBack}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDelete}
            onEdit={handleEditInquiry}
          />
        )}
        {currentPage === "create" && (
          <InquiryCreatePage onCreated={handleCreated} onBack={handleBack} />
        )}

        {currentPage === "edit" && selectedInquiry && (
          <InquiryEditPage
            inquiry={selectedInquiry}
            onBack={() => setCurrentPage("detail")}
            onUpdated={(updated) => {
              updateInquiry(updated);
              setCurrentPage("detail");
            }}
          />
        )}
      </main>
    </div>
  );
};
