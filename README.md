# Hono Todo API

Hono で作成した Todo REST API サーバーです。

## 前提条件

- Node.js (LTS 推奨)
- npm

※ ランタイムバージョン管理に [mise](https://mise.jdx.dev/) を利用している場合は、同梱の `mise.toml` からそのまま環境をセットアップできます。

## セットアップ

### 1. 依存パッケージのインストール

mise を使用する場合:
```bash
mise install
```

パッケージのインストール:
```bash
npm install
```

## 起動方法

### 開発用サーバーの起動

`tsx watch` によるホットリロードが有効な状態で起動します。

```bash
npm run dev
```

起動後、`http://localhost:3000` にアクセスできます。

### ビルド & 本番実行

```bash
npm run build
npm start
```

## API エンドポイント

| メソッド | パス | 説明 |
| :--- | :--- | :--- |
| `GET` | `/` | ルート |
| `GET` | `/todos` | Todo 一覧取得 |
| `GET` | `/todos/:id` | Todo 詳細取得 |
| `POST` | `/todos` | Todo 新規作成 |
| `PUT` | `/todos/:id` | Todo 更新 |
| `DELETE` | `/todos/:id` | Todo 削除 |
