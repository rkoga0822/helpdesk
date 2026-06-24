# helpdesk

社内ヘルプデスク（問い合わせ管理）アプリのフルスタックサンプル。
CodeLesson「課題：React＋Laravel統合」コースの構成（**認証なし・素のUI**）をベースにしています。

- `helpdesk-api/` … Laravel（REST API）
- `helpdesk-app/` … React + Vite + TypeScript（フロントエンド）

## 機能

- 問い合わせの一覧表示（ステータスで絞り込み）
- 詳細表示・ステータス更新（PUT）・削除（DELETE）
- 新規登録フォーム（React Hook Form + Laravel の 422 バリデーション表示）

## アーキテクチャ

```
helpdesk-app/src/
├── lib/api.ts            axios インスタンス
├── api/inquiries.ts      API 呼び出しを集約
├── hooks/useInquiries.ts データ取得・state 管理
├── types/inquiry.ts      型定義
├── components/           StatusBadge / StatusFilter / InquiryRow / InquiryTable
├── pages/                InquiryListPage / InquiryDetailPage / InquiryCreatePage
└── App.tsx               currentPage で画面切替（list / detail / create）
```

| Method | URL | 内容 | ボディ |
|---|---|---|---|
| GET | `/api/inquiries` | 一覧取得（`?status=` で絞り込み） | なし |
| POST | `/api/inquiries` | 作成 | title, content, requester |
| PUT | `/api/inquiries/{id}` | ステータス更新 | status |
| DELETE | `/api/inquiries/{id}` | 削除 | なし |

## セットアップ

### バックエンド（helpdesk-api）

```bash
cd helpdesk-api
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate --seed
php artisan serve --port=8002
```

### フロントエンド（helpdesk-app）

```bash
cd helpdesk-app
npm install
cp .env.example .env   # VITE_API_BASE_URL=http://localhost:8002
npm run dev
```

ブラウザで Vite が表示する URL（例: http://localhost:5173 ）を開きます。

## 補足

- データベースは SQLite。`php artisan migrate --seed` でサンプルデータ3件が投入されます。
- 認証はありません（API は誰でもアクセス可能）。
