# GitHubリポジトリ検索アプリ

![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)

## 概要

リポジトリ名からGitHubのリポジトリを検索するアプリです。

## 必要要件

- Node.js v20以上
- npm

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm run start

# リント
npm run lint

# テスト実行
npm run test
```

## 使用技術

| カテゴリ       | 技術                          |
| -------------- | ----------------------------- |
| フレームワーク | Next.js 16 (App Router)       |
| 言語           | TypeScript 5                  |
| UI             | React 19, shadcn/ui, Radix UI |
| スタイリング   | Tailwind CSS 4                |
| フォーム       | React Hook Form 7 + Zod       |
| テスト         | Vitest, Testing Library, MSW  |

### shadcn/ui

アクセシビリティを向上させるためにshadcn/uiを採用しています。Radix UIをベースとしており、WAI-ARIAに準拠したコンポーネントを提供します。

### Zod

GitHub APIからのレスポンスをランタイムバリデーションし、型安全性を担保しています。

## ページ構成

| パス                   | 説明                                                  |
| ---------------------- | ----------------------------------------------------- |
| `/`                    | `/search` へリダイレクト                              |
| `/search`              | リポジトリ検索ページ（クエリパラメータ: `q`, `page`） |
| `/repo/[owner]/[repo]` | リポジトリ詳細ページ                                  |

## ディレクトリ構成

```txt
src/
├─ app/ # ルーティング専用
├─ feature/ # アプリ特定の機能を含む
│   └─ (feature01)/ # 機能ごとにフォルダ分割
├─ infra/ # 外部APIとの通信処理を管理
├─ shared/ # アプリ共通レイアウト、UIサードパーティライブラリの格納場所
├─ template/ # 複数のContainerを配置してapp/で描画するための格納場所
└─ test/ # テストライブラリのセットアップ・e2eの記述場所

```

## 工夫したポイント

### ポイント１：featuresの構成

`feature/` の各ディレクトリはContainer/Presentationパターンを用いて **データフェッチ** と **画面表示** を分離しました。UI表示とデータ取得を分離することで、表示ロジックの単体テストを容易にし、API変更時の影響範囲を限定しています。

また、Presentationコンポーネントは同一ディレクトリ内のContainerからのみimportできるようにESLintの `no-restricted-imports` ルールを追加し、アーキテクチャの一貫性を強制しています。

ドメイン機能ごとにフォルダを分割しているため、今後機能が増えた場合も `feature/` 配下へ追加することで拡張可能な構成としています。

Next.js App Routerではasync Server Componentを含む構成となるため、Vitest + RTLのみでContainerを含む結合テストを安定して行うことが難しいケースがあります。そのため、本プロジェクトでは以下のように責務ごとにテストを分離しています。

- APIレスポンス取得、runtime validation、データ変換、エラーハンドリング  
  → Vitestによる単体テスト
- Presentationコンポーネントの表示ロジック  
  → React Testing Libraryによるコンポーネントテスト
- Containerを経由した画面描画やユーザー操作を含む動作確認  
  → E2Eテスト

また、テストコードは対象コードと同じディレクトリに配置し、保守性を高めています。

```txt
feature/
  └─ (feature01)/ # 機能ごとにフォルダ分割
      ├── components/ # Container / Presentation で分割
      │    ├─ feature01Container.tsx # データ取得してPresentationへ引数を渡す
      │    └─ feature01Presentation.tsx # 表示専用（Containerからの引数をもとに表示）
      │    └─ feature01Presentation.test.tsx # 表示ロジックのテスト
      ├── schemas/ # zodによるruntime validationとレスポンス整形
      └── types/ # zod schemaから推論した型定義
```

### ポイント２：app配下をルーティング専用にする

Next.jsのApp Router規約に従い、`app/`配下にはルーティングに関係するファイル（`page.tsx`、`layout.tsx`、`loading.tsx`、`error.tsx`）のみを配置しています。これにより、ディレクトリ構造の可視性を高め、意図しないルーティングバグを防止しています。

### ポイント３：Error Handling

GitHub API のステータスコードごとにアプリケーションエラーへ変換し、ユーザー向けエラー表示を統一しています。

**エラーメッセージの一元管理:**

`errorMessages.ts`でAPIエラーメッセージを定数として一元管理し、コード全体での一貫性を確保しています。

**エラーViewModelへの変換:**

`getErrorViewModel`関数でAPIエラーをユーザー向けの表示情報に変換しています。各エラーに対して以下を定義：

- `title`: ユーザー向けエラータイトル（日本語）
- `description`: エラーの説明と対処法
- `canRetry`: リトライ可能かどうか（レート制限やサービス障害は可、404や不正なクエリは不可）

| ステータス | エラーコード        | メッセージ                            | リトライ |
| ---------- | ------------------- | ------------------------------------- | -------- |
| 404        | NOT_FOUND           | Repository not found                  | 不可     |
| 403        | RATE_LIMIT          | GitHub API rate limit exceeded        | 可       |
| 422        | BAD_REQUEST         | Invalid search query                  | 不可     |
| 503        | SERVICE_UNAVAILABLE | GitHub API is temporarily unavailable | 可       |

### ポイント４：infra層の責務分離

`infra/`配下を責務ごとに分離し、変更の影響範囲を限定しています。

```txt
infra/
├─ api/       # GitHub APIとの通信処理（fetch、エラーハンドリング）
├─ errors/    # エラー定義、エラーメッセージ、ViewModel変換
├─ parsers/   # Zodによるランタイムバリデーション
└─ service/   # ビジネスロジック（リポジトリ取得、検索など）
```

**parseApiResponse:**

Zodスキーマを用いてAPIレスポンスをランタイムバリデーションし、型安全なデータを返します。バリデーション失敗時は明確なエラーをスローします。

```typescript
export function parseApiResponse<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error("API response is invalid");
  }
  return result.data;
}
```

### ポイント５：キャッシュ戦略

GitHub APIへのリクエストは `revalidate: 60` を設定し、60秒間のキャッシュを有効にしています。これによりレート制限への対策と、ユーザー体験の向上を両立しています。

### ポイント６：Skeleton UIによるローディング体験の最適化

Next.js App Routerの `loading.tsx` とSkeleton UIを組み合わせ、データ取得中のUXを最適化しています。

**実装のポイント:**

- **ページ専用のSkeleton**: 検索ページ(`RepositorySearchPageSkeleton`)と詳細ページ(`RepositoryDetailSkeleton`)それぞれに専用のSkeletonを用意し、実際のレイアウトと一致させることでCLS（Cumulative Layout Shift）を防止
- **レスポンシブ対応**: PC表示とスマホ表示で異なるSkeletonレイアウトを適用（例: 詳細ページのアバター画像サイズ、説明文の配置）
- **グリッドレイアウトの維持**: 検索結果一覧では `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` のグリッド構造をSkeletonでも再現

```typescript
// loading.tsx - Next.jsが自動でSuspense境界として機能
export default function Page() {
  return <RepositorySearchPageSkeleton />;
}
```

### ポイント７：error.tsxによる統一されたエラーリカバリー

Next.js App Routerの `error.tsx` を活用し、エラー発生時のユーザー体験を改善しています。

**実装のポイント:**

- **共通エラーコンポーネント**: `ErrorPageRetry` コンポーネントで全ページ共通のエラー表示とリトライ機能を提供
- **ページ別エラーメッセージ**: 検索ページ（"Failed to load repositories"）と詳細ページ（"Failed to load repository data"）で文脈に応じたメッセージを表示
- **リトライ機能**: `reset()` 関数によりページ全体を再レンダリングせずにServer Componentの再取得が可能
- **エラー詳細の表示**: APIから返されるエラーメッセージ（レート制限、404など）をユーザーに表示

```typescript
// ErrorPageRetry - 再利用可能なエラーリカバリーUI
<div className="flex flex-col items-center gap-4 py-12">
  <p>{error.message}</p>
  <h2>{displayMessage}</h2>
  <Button onClick={() => reset()}>Retry</Button>
</div>
```

## テスト戦略

本プロジェクトでは、責務ごとにテスト対象を分離しています。

| テスト種別     | 対象                                                         | ツール                  |
| -------------- | ------------------------------------------------------------ | ----------------------- |
| Unit Test      | API通信、runtime validation、データ変換、エラーハンドリング  | Vitest, MSW             |
| Component Test | Presentationコンポーネントの表示ロジック                     | Vitest, Testing Library |
| E2E Test       | 検索・詳細遷移・エラー表示などの主要導線、画面全体の動作保証 | Playwright（予定）      |

### テスト方針

Next.js公式ドキュメントでは、Vitestはasync Server Componentを正式にはサポートしていません。（参考：https://nextjs.org/docs/app/guides/testing/vitest）

そのため、本プロジェクトでは非同期Server ComponentをVitestで無理に結合テストする方針は取らず、責務ごとに保証範囲を分離しています。

- APIレスポンス取得・runtime validation・データ変換・エラーハンドリング  
  → Unit Testで保証
- PresentationコンポーネントのUI表示  
  → Component Testで保証
- Containerを経由したデータ取得から画面描画までの一連の動作  
  → E2E Testで保証

これにより、テストの保守性と信頼性を両立しています。

### MSW (Mock Service Worker)

単体テスト時のAPI通信モックにMSWを使用しています。`src/test/msw/server.ts` でモックサーバーを定義し、テスト実行時にGitHub APIへのリクエストをインターセプトします。

### テストファイルの配置

コンポーネントのテストファイルはテスト対象と同じディレクトリに配置し、`*.test.tsx` の命名規則に従います。

```txt
components/
├── ComponentName.tsx
└── ComponentName.test.tsx
```

## TODO : （後で消す）

Service層のユニットテスト追加

RepositorySearchFormPresentation.test.tsxがit.todo()

RepositorySearchFrom（Fromになっている）

parseApiResponseでErrorをthrow➞AppErrorに統一してエラーコード付与

Playwrightで主要フロー（検索→詳細）をカバー

ページネーション情報がバラバラ➞PaginationProps型で分割

ページネーション計算にコメントなし➞JSDocまたはインラインコメント追加
