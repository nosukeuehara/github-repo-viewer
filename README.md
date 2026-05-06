memo

ディレクトリ構成
app/:ルーティング専用にする。
feature/:フロントエンドの機能を記述する
infra/:API関連をまとめる
shared/:プロジェクト内で使うコンポーネントやレイアウトなどをまとめる
template/:無くす予定
test/:テスト関連のセットアップやe2eテストの記述場所

api:
外部APIとの通信を担当

service:
ユースケース単位の業務処理を担当

parsers:
外部レスポンスのruntime validationを担当

errors:
アプリケーション共通エラー定義

単体テスト：featureのPresentation
結合テスト：featureのContainer
➞UI単体の確認は表示責務に閉じた Presentation Component で行い、API通信を含む画面上の振る舞いはデータ取得の窓口である Container Component で確認します。
