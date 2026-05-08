import {APP_ERROR_CODE, AppErrorCode} from "./AppError";

export type ErrorViewModel = {
  title: string;
  description: string;
  canRetry: boolean;
};

const ERROR_VIEW_MODEL_BY_CODE: Record<AppErrorCode, ErrorViewModel> = {
  [APP_ERROR_CODE.NOT_FOUND]: {
    title: "リポジトリが見つかりませんでした。",
    description: "リポジトリ名や所有者名を確認してください。",
    canRetry: false,
  },
  [APP_ERROR_CODE.RATE_LIMIT]: {
    title: "利用回数の上限に達しました。",
    description: "時間をおいて再度お試しください。",
    canRetry: true,
  },
  [APP_ERROR_CODE.BAD_REQUEST]: {
    title: "検索条件が正しくありません。",
    description: "検索キーワードを変更してください。",
    canRetry: false,
  },
  [APP_ERROR_CODE.SERVICE_UNAVAILABLE]: {
    title: "GitHub APIに接続できませんでした。",
    description: "時間をおいて再度お試しください。",
    canRetry: true,
  },
  [APP_ERROR_CODE.UNKNOWN]: {
    title: "予期しないエラーが発生しました。",
    description: "時間をおいて再度お試しください。",
    canRetry: true,
  },
};

export function getErrorViewModelByCode(code: AppErrorCode): ErrorViewModel {
  return ERROR_VIEW_MODEL_BY_CODE[code];
}
