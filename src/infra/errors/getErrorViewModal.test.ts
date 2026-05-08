import {APP_ERROR_CODE} from "./AppError";
import {getErrorViewModelByCode} from "./getErrorViewModal";

describe("getErrorViewModelByCode", () => {
  describe("NOT_FOUNDエラーの場合", () => {
    const result = getErrorViewModelByCode(APP_ERROR_CODE.NOT_FOUND);

    it("タイトルが「リポジトリが見つかりませんでした。」を返す", () => {
      expect(result.title).toBe("リポジトリが見つかりませんでした。");
    });

    it("説明が「リポジトリ名や所有者名を確認してください。」を返す", () => {
      expect(result.description).toBe(
        "リポジトリ名や所有者名を確認してください。"
      );
    });

    it("リトライ不可（canRetry: false）を返す", () => {
      expect(result.canRetry).toBe(false);
    });
  });

  describe("RATE_LIMITエラーの場合", () => {
    const result = getErrorViewModelByCode(APP_ERROR_CODE.RATE_LIMIT);

    it("タイトルが「利用回数の上限に達しました。」を返す", () => {
      expect(result.title).toBe("利用回数の上限に達しました。");
    });

    it("説明が「時間をおいて再度お試しください。」を返す", () => {
      expect(result.description).toBe("時間をおいて再度お試しください。");
    });

    it("リトライ可能（canRetry: true）を返す", () => {
      expect(result.canRetry).toBe(true);
    });
  });

  describe("BAD_REQUESTエラーの場合", () => {
    const result = getErrorViewModelByCode(APP_ERROR_CODE.BAD_REQUEST);

    it("タイトルが「検索条件が正しくありません。」を返す", () => {
      expect(result.title).toBe("検索条件が正しくありません。");
    });

    it("説明が「検索キーワードを変更してください。」を返す", () => {
      expect(result.description).toBe("検索キーワードを変更してください。");
    });

    it("リトライ不可（canRetry: false）を返す", () => {
      expect(result.canRetry).toBe(false);
    });
  });

  describe("SERVICE_UNAVAILABLEエラーの場合", () => {
    const result = getErrorViewModelByCode(APP_ERROR_CODE.SERVICE_UNAVAILABLE);

    it("タイトルが「GitHub APIに接続できませんでした。」を返す", () => {
      expect(result.title).toBe("GitHub APIに接続できませんでした。");
    });

    it("説明が「時間をおいて再度お試しください。」を返す", () => {
      expect(result.description).toBe("時間をおいて再度お試しください。");
    });

    it("リトライ可能（canRetry: true）を返す", () => {
      expect(result.canRetry).toBe(true);
    });
  });

  describe("UNKNOWNエラーの場合", () => {
    const result = getErrorViewModelByCode(APP_ERROR_CODE.UNKNOWN);

    it("タイトルが「予期しないエラーが発生しました。」を返す", () => {
      expect(result.title).toBe("予期しないエラーが発生しました。");
    });

    it("説明が「時間をおいて再度お試しください。」を返す", () => {
      expect(result.description).toBe("時間をおいて再度お試しください。");
    });

    it("リトライ可能（canRetry: true）を返す", () => {
      expect(result.canRetry).toBe(true);
    });
  });
});
