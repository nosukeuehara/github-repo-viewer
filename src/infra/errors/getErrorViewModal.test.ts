import {APP_ERROR_MESSAGE} from "./errorMessages";
import {getErrorViewModel} from "./getErrorViewModal";

describe("getErrorViewModel", () => {
  describe("NOT_FOUNDエラーの場合", () => {
    const error = new Error(APP_ERROR_MESSAGE.NOT_FOUND);
    const result = getErrorViewModel(error);

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
    const error = new Error(APP_ERROR_MESSAGE.RATE_LIMIT);
    const result = getErrorViewModel(error);

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
    const error = new Error(APP_ERROR_MESSAGE.BAD_REQUEST);
    const result = getErrorViewModel(error);

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
    const error = new Error(APP_ERROR_MESSAGE.SERVICE_UNAVAILABLE);
    const result = getErrorViewModel(error);

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

  describe("未知のエラーメッセージの場合", () => {
    const error = new Error("Unknown error message");
    const result = getErrorViewModel(error);

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
