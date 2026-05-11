import {AppHandledError} from "@/infra/errors/handledError";
import {ErrorView} from "../ui/ErrorView";
import {APP_ERROR_CODE} from "@/infra/errors/AppError";
import {APP_ERROR_MESSAGE} from "@/infra/errors/errorMessages";
import {getErrorViewModelByCode} from "@/infra/errors/getErrorViewModal";
import {notFound} from "next/navigation";

/**
 * ハンドリング可能なアプリケーションエラーを画面表示用のUIへ変換する。
 * 想定外の障害や復旧困難なエラーは、
 * この関数では扱わず error.tsx 側でフォールバック表示を行う。
 */

export function handleError(
  error: AppHandledError
): never | React.ReactElement {
  if (error.code === APP_ERROR_CODE.NOT_FOUND) {
    notFound();
  }

  if (error.code === APP_ERROR_CODE.UNKNOWN) {
    throw new Error(APP_ERROR_MESSAGE.UNKNOWN);
  }

  return <ErrorView errorView={getErrorViewModelByCode(error.code)} />;
}
