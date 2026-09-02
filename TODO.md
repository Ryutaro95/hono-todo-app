# 学習ロードマップ & TODO

これまでの進捗と、今後Honoの理解度をステップアップしていくためのTODOリストです。

## 完了したこと

- [x] **環境構築**: mise を使った Node.js (LTS) のセットアップ
- [x] **雛形作成**: create-hono による TypeScript + Node.js 構成の初期化
- [x] **ミドルウェア設定**: `cors`, `logger`, `prettyJSON` の集約適用
- [x] **CRUD API 実装**: インメモリー配列を使った `/todos` API（一覧・個別・作成・更新・削除）
- [x] **バリデーション導入**: `zod` + `@hono/zod-validator` による型安全な入力値検証（body / param）
- [x] **モジュール分割**: `app.route()` を使ったファイル分割構成（`src/routes/todos.ts`, `src/routes/users.ts`）
- [x] **実践的なAPIパターン**: `/users` によるクエリパラメータ検証（query）、enum/email検証、親子ルーティング（`/users/:id/profile`）

---

## 今後のTODOリスト

### 1. 実践的なAPIパターンの追加

- [ ] **ファイルアップロードAPI**: `c.req.formData()` を使い、画像などのファイル（`multipart/form-data`）を受け取るエンドポイントを実装する。
- [ ] **認証付きAPI**: `Authorization` ヘッダー（Bearerトークン）を検証する認証ミドルウェアを自作し、保護されたエンドポイント（例: `/me` や `/admin`）を作る。

### 2. エラーハンドリングとライフサイクル

- [x] **グローバルエラーハンドラー (`app.onError`)**: `throw new Error(...)` を一括でキャッチし、一貫したJSONフォーマットで500エラーを返す処理を追加する。
- [x] **404ハンドラー (`app.notFound`)**: 未定義パスへのアクセスに対してカスタムJSONレスポンスを返す。
- [ ] **コンテキスト変数 (`c.set` / `c.get`)**: 認証ミドルウェアで取得したユーザー情報をハンドラー側へ引き渡す仕組みを体験する。

### 3. Honoの目玉機能「RPC（型安全クライアント）」

- [ ] **`hono/client` の導入**: サーバーのルーティング型（`type AppType = typeof routes`）をクライアントコードから直接読み込み、APIのURL・パラメータ・レスポンス型が完全補完される開発体験を試す。

### 4. データの永続化（DB接続）

- [ ] **SQLite / ORM の導入**: メモリ上の配列から Drizzle ORM または Prisma + SQLite へ移行し、サーバーを再起動してもデータが消えないようにする。

### 5. テストとマルチランタイム体験

- [ ] **`app.request()` による単体テスト**: サーバーを起動せずに Vitest などを使って高速にAPIの結合テストを書く。
- [ ] **別ランタイム（Cloudflare Workers / Bun）への移植**: ビジネスロジックをそのままに、エントリポイントの差し替えだけで別環境で動くHonoのポータビリティを体感する。
