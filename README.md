# GitHubリポジトリ検索アプリ

![alt text](image.png)
![alt text](image-1.png)
![alt text](image-2.png)

## 概要

リポジトリ名からGitHubのリポジトリを検索するアプリです。

### 主な機能

- **リポジトリ検索**: キーワードでGitHubリポジトリを検索
- **ページネーション**: 検索結果の一覧表示とページ切り替え
- **詳細表示**: リポジトリの詳細情報（スター数、フォーク数、使用言語など）を表示
- **エラーハンドリング**: レート制限、404エラーなどをユーザーフレンドリーに表示
- **レスポンシブデザイン**: PC・スマートフォン両対応

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

# ユニットテスト実行
npm run test

# E2Eテスト実行
npm run e2e
```

## 使用技術

| カテゴリ       | 技術                                       |
| -------------- | ------------------------------------------ |
| フレームワーク | Next.js 16.2 (App Router)                  |
| 言語           | TypeScript 5                               |
| UI             | React 19.2, shadcn/ui, Radix UI            |
| スタイリング   | Tailwind CSS 4                             |
| フォーム       | React Hook Form 7 + Zod 4                  |
| テスト         | Vitest 4, Testing Library, MSW, Playwright |

### shadcn/ui

アクセシビリティを向上させるためにshadcn/uiを採用しています。Radix UIをベースとしており、WAI-ARIAに準拠したコンポーネントを提供します。

### Zod

GitHub APIからのレスポンスをランタイムバリデーションし、型安全性を担保しています。また、Zodスキーマから型を推論することで、スキーマと型定義の二重管理を防いでいます。

```typescript
// スキーマ定義
export const repositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  owner: z.object({avatar_url: z.string()}),
});

// 型推論（スキーマと自動同期）
export type Repository = z.infer<typeof repositorySchema>;
```

## アーキテクチャ概要

本プロジェクトは以下の3層構造で設計しています。

### 1. App Router層（`app/`）

ルーティング専用。`page.tsx`、`loading.tsx`、`error.tsx` のみを配置し、ビジネスロジックは持たせない。

### 2. Template / Feature層（`template/`、`feature/`）

- **Container Component**: async Server Component としてデータ取得を担当。`Promise.all` で並列取得し、`Result<T,E>` 型でエラーハンドリング
- **Presentation Component**: Props のみに依存する純粋なUIコンポーネント。Testing Library でテスト可能

### 3. Infra層（`infra/`）

- **Service**: ビジネスロジック（Result型でエラーを返却）
- **API Client**: GitHub API との通信（fetch + キャッシュ設定）
- **Parser**: Zodによるランタイムバリデーション
- **Errors**: エラーコード定義、UI表示用ViewModel変換

**データフロー**: `page.tsx` → `Container` → `Service` → `API Client` → `Parser` → `Presentation`

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

`feature/` 配下はドメイン機能ごとにディレクトリを分割しています。これにより、関連する UI・状態管理・データ取得処理を同一箇所へ集約でき、機能追加や修正時に影響範囲を把握しやすい構成を目指しました。また、feature ごとに依存関係を閉じ込めることで、コンポーネント間の結合度が高くなり過ぎることを防いでいます。

#### ポイント1.1 Container/Presentation パターン

feature 内のコンポーネント構成には Container / Presentation パターンを採用しています。Container ではデータ取得や状態制御を担当し、Presentation では UI 表示のみを扱うことで責務を分離しました。さらに、Presentation コンポーネントが feature 内の複数ディレクトリから参照され始めると、feature 分割による独立性が薄れ、依存関係が複雑化しやすくなります。

そのため、Presentation コンポーネントは同一ディレクトリ内の Container からのみ import できるよう、ESLint の `no-restricted-imports` ルールを設定し、アーキテクチャの一貫性を保てるようにしています。

```javascript
// eslint.config.mjs
{
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [{
          group: [
            "@/feature/*/components/*/*Presentation",
            "@/feature/*/components/*/*Presentation.*",
          ],
          message: "Presentation Componentは同一ディレクトリのContainer Componentからのみインポートしてください。",
        }],
      },
    ],
  },
}
```

また、外部 API のレスポンスは service / parser 層で runtime validation を行い、UI コンポーネントが外部 API の仕様へ直接依存しない構成としています。これにより、API レスポンス構造の変更が発生した場合でも、影響範囲を Container や service 層へ閉じ込めやすくしています。

#### ポイント1.2 Promise.all による並列データ取得

詳細ページでは、リポジトリ情報と使用言語情報を `Promise.all` で並列取得し、ウォーターフォールを防いでいます。

```typescript
// RepositoryDetailContainer.tsx
export async function RepositoryDetailContainer({owner, repo}: Props) {
  // 2つのAPIを並列で呼び出し
  const [repositoryDetail, languages] = await Promise.all([
    getRepositoryDetail(owner, repo),
    getRepositoryLanguages(owner, repo),
  ]);

  if (!repositoryDetail.ok) {
    return handleError(repositoryDetail.error);
  }
  // ...
}
```

#### ポイント1.3 `feature/` 配下のテスト戦略

Next.js App Router では async Server Component を含む構成となるため、Vitest + React Testing Library のみで Container を含む結合テストを安定して行うことが難しいケースがあります。

そのため、本プロジェクトでは責務ごとにテストを分離しています。

- Presentation コンポーネントの表示ロジック
  → React Testing Library によるコンポーネントテスト

- Container を経由した画面描画やユーザー操作を含む動作確認
  → E2E テスト

また、テストコードは対象コードと同じディレクトリへ配置し、
関連する実装とテストを近い場所で保守できるようにしています。

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

### ポイント２：`app/` 配下をルーティング専用にする

Next.jsのApp Router規約に従い、`app/`配下にはルーティングに関係するファイル（`page.tsx`、`layout.tsx`、`loading.tsx`、`error.tsx`）のみを配置しています。これにより、ディレクトリ構造の可視性を高め、意図しないルーティングバグを防止しています。

### ポイント３：Error Handling

GitHub API のステータスコードごとにアプリケーションエラーへ変換し、ユーザー向けエラー表示の統一を意識しました。

#### ポイント3.1 Result<T, E>型による型安全なエラーハンドリング

例外をthrowする代わりに `Result` 型を使用し、エラーを値として扱っています。これにより、エラーハンドリングの漏れをコンパイル時に検出できます。

```typescript
// 型定義
type Result<T, E> = {ok: true; data: T} | {ok: false; error: E};

// Service層での使用例
export async function getRepositories(
  query?: string
): Promise<GetRepositoriesResult> {
  const result = await fetchGitHubRepositories(query);

  if (!result.ok) {
    return {ok: false, error: result.error};
  }

  return {ok: true, data: {repositories: parsed.items}};
}

// Container層での使用例
const repositoryDetail = await getRepositoryDetail(owner, repo);
if (!repositoryDetail.ok) {
  return handleError(repositoryDetail.error); // 型安全にエラー処理
}
```

**設計上の判断:**

- **Handled Error（Result型）**: レート制限、不正なクエリなど、復旧可能なエラーは `ErrorView` コンポーネントで表示
- **Unhandled Error（throw）**: 予期しないエラーは `error.tsx` でキャッチしてフォールバック表示

#### ポイント3.2 エラーメッセージの一元管理

`errorMessages.ts`でAPIエラーメッセージを定数として一元管理し、コード全体での一貫性を確保しています。

#### ポイント3.3 エラーViewModelへの変換

`getErrorViewModel`関数でAPIエラーをユーザー向けの表示情報に変換しています。各エラーに対して以下を定義

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
  <Button onClick={() => reset()}>リトライ</Button>
</div>
```

## テスト戦略

本プロジェクトでは、責務ごとにテスト対象を分離しています。

| テスト種別       | 対象                                                         | ツール                  |
| ---------------- | ------------------------------------------------------------ | ----------------------- |
| Unit Test        | runtime validation、データ変換、ユーティリティ関数           | Vitest                  |
| Integration Test | Service層（API通信 + バリデーション + データ整形の結合）     | Vitest, MSW             |
| Component Test   | Presentationコンポーネントの表示ロジック                     | Vitest, Testing Library |
| E2E Test         | 検索・詳細遷移・エラー表示などの主要導線、画面全体の動作保証 | Playwright              |

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

### Integration Test

Service層のテストでは、API通信からデータ整形までを結合してテストしています。MSWでGitHub APIをモックし、実際のリクエストパラメータも検証しています。

```typescript
// getRepositories.integration.test.ts
describe("getRepositories integration", () => {
  it("GitHub APIレスポンスを取得して、アプリで使う形に整形できる", async () => {
    server.use(
      http.get("https://api.github.com/search/repositories", ({request}) => {
        const url = new URL(request.url);
        // リクエストパラメータの検証
        expect(url.searchParams.get("q")).toBe("react in:name");
        expect(url.searchParams.get("page")).toBe("1");
        return HttpResponse.json(mockApiResponse);
      })
    );

    await expect(getRepositories(12, "react", 1)).resolves.toEqual({
      ok: true,
      data: expectedResult,
    });
  });
});
```

### E2E Test

Playwrightを使用して、ユーザー操作を含む主要導線をテストしています。

```typescript
// search.spec.ts
test("リポジトリ検索ができる", async ({page}) => {
  await page.goto("/search");
  await page.getByRole("textbox").fill("react");
  await page.getByRole("button", {name: "検索"}).click();

  await expect
    .poll(() => new URL(page.url()).searchParams.get("q"))
    .toBe("react");
  await expect(page.getByText("facebook/react")).toBeVisible();
});

test("存在しないリポジトリでエラー表示される", async ({page}) => {
  await page.goto("/search");
  await page.getByRole("textbox").fill("0123456789XXXXXXXXXX");
  await page.getByRole("button", {name: "検索"}).click();

  await expect(
    page.getByText("リポジトリが見つかりませんでした。")
  ).toBeVisible();
});
```

### テストファイルの配置

コンポーネント、単体テストのテストファイルはテスト対象と同じディレクトリに配置し、`*.test.tsx` の命名規則に従います。

```txt
components/
├── ComponentName.tsx
└── ComponentName.test.tsx
```

一方e2eテストは `src/test/e2e/` 配下に `app/` と同じ階層構造を再現しページごとのテストファイル `*.spec.tsx` を作成しています。

`app/` 配下にルーティングに関連しないファイルを置かないために分けることを意識しています。

```txt
test/
  └──e2e/
      └──root.spec.tsx
      ├── search/
      |   └──search.spec.tsx
      └── repo/slug/
                └──repoDetail.spec.tsx
```
