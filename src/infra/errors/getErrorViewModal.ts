import {APP_ERROR_MESSAGE} from "./errorMessages";

export function getErrorViewModel(error: Error) {
  switch (error.message) {
    case APP_ERROR_MESSAGE.NOT_FOUND:
      return {
        title: "リポジトリが見つかりませんでした。",
        description: "リポジトリ名や所有者名を確認してください。",
        canRetry: false,
      };

    case APP_ERROR_MESSAGE.RATE_LIMIT:
      return {
        title: "利用回数の上限に達しました。",
        description: "時間をおいて再度お試しください。",
        canRetry: true,
      };

    case APP_ERROR_MESSAGE.BAD_REQUEST:
      return {
        title: "検索条件が正しくありません。",
        description: "検索キーワードを変更してください。",
        canRetry: false,
      };

    case APP_ERROR_MESSAGE.SERVICE_UNAVAILABLE:
      return {
        title: "GitHub APIに接続できませんでした。",
        description: "時間をおいて再度お試しください。",
        canRetry: true,
      };

    default:
      return {
        title: "予期しないエラーが発生しました。",
        description: "時間をおいて再度お試しください。",
        canRetry: true,
      };
  }
}
