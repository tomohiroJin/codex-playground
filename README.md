# 顧客管理アプリケーション

ヘキサゴナルアーキテクチャとドメイン駆動設計（DDD）を用いた顧客管理アプリケーションです。

## 技術スタック

- Node.js
- TypeScript
- Jest (テストフレームワーク)
- インメモリデータベース

## アーキテクチャ

このプロジェクトはヘキサゴナルアーキテクチャ（ポートアンドアダプター）パターンを採用しています。

```
src/
├── domain/             # ドメイン層
│   ├── model/          # エンティティと値オブジェクト
│   └── repository/     # リポジトリインターフェース（ポート）
├── application/        # アプリケーション層
│   └── usecase/        # ユースケース
├── infrastructure/     # インフラストラクチャ層
│   ├── repository/     # リポジトリ実装（アダプター）
│   └── database/       # データベース接続
├── interface/          # インターフェース層
│   └── controller/     # コントローラー
└── index.ts            # エントリポイント
```

## 主な機能

- 顧客情報管理（登録・更新・表示）
- 購入履歴管理
- 検索機能
- データ入出力（CSV）
- 顧客一覧の CSV 出力

## 開発方法

### 環境セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# テストの実行
npm test

# テストの監視モード
npm run test:watch

# ビルド
npm run build

# ビルド後の実行
npm start
```

### テスト駆動開発（TDD）

このプロジェクトは TDD を採用しています：

1. 失敗するテストを書く
2. テストが通るように最小限のコードを実装する
3. リファクタリングする

## ドメインモデル

### 顧客（Customer）

顧客の基本情報を管理するエンティティです。

### 購入履歴（PurchaseHistory）

顧客の購入履歴を管理するエンティティです。

## データベース

開発環境ではインメモリデータベースを使用しています。

## CSV 出力

`/customers/export` エンドポイントを利用すると、顧客一覧を CSV 形式で取得
できます。クエリパラメータ `activeOnly` を指定すると、アクティブな顧客のみ
を出力します。

### リクエスト例

```bash
# すべての顧客を CSV で取得
curl -L "http://localhost:3000/customers/export" -o customers.csv

# アクティブな顧客のみを取得
curl -L "http://localhost:3000/customers/export?activeOnly=true" -o customers.csv
```

### 返される内容

レスポンスヘッダー `Content-Type: text/csv` が付与され、ボディに CSV データが
含まれます。ファイル名は自由に指定できます。
