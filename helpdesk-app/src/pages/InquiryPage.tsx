import { useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import type { User } from "../types/auth";
import { useInquiries } from "../hooks/useInquiries";
import type { Inquiry, InquiryStatus } from "../types/inquiry";
import { inquiryApi } from "../api/inquiries";
import { InquiryCreatePage } from "./InquiryCreatePage";
import { InquiryDetailPage } from "./InquiryDetailPage";
import { InquiryListPage } from "./InquiryListPage";
import { InquiryEditPage } from "./InquiryEditPage";
type Page = "list" | "detail" | "create" | "edit";

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
      <header>
        <Box
          sx={{
            maxWidth: 800,
            mx: "auto", // margin: auto (左右中央)
            mt: 4, // margin-top: 32px (4 * 8px)
            px: 2, // padding-left/right: 16px
            bgcolor: "grey.50",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", color: "text.primary" }}
            gutterBottom
          >
            問い合わせ一覧
          </Typography>
          {/* テーブルがここに入ります */}
        </Box>
        <span>{user.name}</span>
        <button onClick={onLogout}>ログアウト</button>
        <nav>
          <button onClick={() => setCurrentPage("list")}>一覧</button>
          <button onClick={() => setCurrentPage("create")}>新規登録</button>
        </nav>
      </header>

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
            onEdit={() => {
              setCurrentPage("edit");
            }}
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
