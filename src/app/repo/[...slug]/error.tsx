"use client";
import UnexpectedErrorTemplate from "@/template/Error/UnexpectedErrorTemplate";

/**
 * アプリ側でハンドリング不可能なエラーはこのエラーページでフォールバック表示を行う。
 * 例えば、APIのレスポンス形式の変更など、想定外の障害が発生した場合などはここで表示する。
 * 画面上では「一時的な障害が発生しています」といった文言とともにリトライボタンを表示し、
 */
export default function ErrorPage({reset}: {reset: () => void}) {
  return <UnexpectedErrorTemplate reset={reset} />;
}
