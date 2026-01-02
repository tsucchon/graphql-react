# GraphQL Server (Apollo Server + Prisma + LibSQL)

Apollo Server と Prisma、そして LibSQL (SQLite) を使用して構築された Todo アプリケーションのバックエンドサーバーです。
シンプルな GraphQL API を提供し、Todo の作成、読み取り、更新、削除 (CRUD) が可能です。

## 主な機能

- **GraphQL API**: Apollo Server を使用した型安全な API。
- **データベース操作**: Prisma ORM を使用した直感的なデータベースアクセス。
- **データベース**: LibSQL アダプターを介した SQLite (ファイルベース) の利用。
- **データ永続化**: Todo アイテムの追加、取得、完了状態の更新、削除。

## 技術スタック

- **ランタイム**: [Node.js](https://nodejs.org/)
- **言語**: [TypeScript](https://www.typescriptlang.org/)
- **GraphQL サーバー**: [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **データベースアダプター**: [@prisma/adapter-libsql](https://www.npmjs.com/package/@prisma/adapter-libsql)
- **データベースクライアント**: [@libsql/client](https://github.com/libsql/libsql-client-ts)
- **開発ツール**: [Nodemon](https://nodemon.io/) (ホットリロード)

## 前提条件

このプロジェクトを実行するには、以下の環境が必要です。

- Node.js (v18 以上推奨)

## セットアップ手順

1.  **リポジトリの複製**
    ```bash
    git clone <repository-url>
    cd graphql-server
    ```

2.  **依存関係のインストール**
    ```bash
    npm install
    ```

3.  **環境変数の設定**
    プロジェクトルートに `.env` ファイルを作成し、以下の内容を設定してください。
    ※ データベースファイルはデフォルトでカレントディレクトリの `dev.db` を使用します。

    ```env
    DATABASE_URL="file:dev.db"
    ```

4.  **Prisma クライアントの生成とデータベースの準備**
    データベーススキーマを適用し、Prisma クライアントを生成します。

    ```bash
    npx prisma generate
    npx prisma db push
    ```

## 起動方法

### 開発モード
修正を検知して自動再起動する開発サーバーを起動します。

```bash
npm start
```

サーバーが起動すると、コンソールに以下のように表示されます。
```
Server ready at http://localhost:4000/
```

ブラウザで `http://localhost:4000/` にアクセスすると、Apollo Sandbox が開き、クエリのテストが行えます。

## API リファレンス

### Todo 型定義
```graphql
type Todo {
  id: ID!
  title: String!
  completed: Boolean!
}
```

### Queries (データ取得)

#### `getTodos`
全ての Todo アイテムを取得します。

```graphql
query GetTodos {
  getTodos {
    id
    title
    completed
  }
}
```

### Mutations (データ操作)

#### `addTodo`
新しい Todo を追加します。

```graphql
mutation AddTodo($title: String!) {
  addTodo(title: $title) {
    id
    title
    completed
  }
}
```

#### `updateTodo`
既存の Todo の完了状態を更新します。

```graphql
mutation UpdateTodo($id: ID!, $completed: Boolean!) {
  updateTodo(id: $id, completed: $completed) {
    id
    title
    completed
  }
}
```

#### `deleteTodo`
Todo を削除します。

```graphql
mutation DeleteTodo($id: ID!) {
  deleteTodo(id: $id) {
    id
    title
    completed
  }
}
```

## ライセンス

ISC
