# Todo Client

React (Vite) + GraphQL (Apollo Client) で構築されたモダンなTodoアプリケーションです。
バックエンドからTodoを取得し、追加・更新を行うことができます。

## 技術スタック

- **Frontend Framework**: React 19 (Vite)
- **Language**: TypeScript
- **State/Network Management**: Apollo Client v4 (beta/rc)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI (Radix UI based)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 機能

- **Todo一覧表示**: サーバーから取得したTodoをアニメーション付きで表示します。
- **Todo追加**: 入力フォームから新しいタスクを追加できます。
- **完了状態の切り替え**: チェックボックスでタスクの完了/未完了を切り替えられます。完了したタスクは取り消し線が表示されます。

## セットアップ手順

### 前提条件
- Node.js がインストールされていること
- バックエンドサーバー (`http://localhost:4000`) が稼働していること

### インストール
リポジトリをクローンした後、依存関係をインストールします。

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` にアクセスしてください。

## 接続設定について
`vite.config.ts` でプロキシを設定しています。
`/graphql` へのリクエストは自動的に `http://localhost:4000` へ転送されます。

```typescript
// vite.config.ts
proxy: {
  '/graphql': {
    target: 'http://localhost:4000',
    changeOrigin: true,
    secure: false,
  }
}
```
