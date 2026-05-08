import {repositorySearchResponseSchema} from "../service/schemas";
import {parseApiResponse} from "./parseApiResponse";

describe("parseApiResponse", () => {
  it("正しいスキーマのデータをパースできる", () => {
    const validData = {
      total_count: 1,
      items: [
        {
          id: 1,
          name: "react",
          full_name: "facebook/react",
          url: "https://api.github.com/repos/facebook/react",
          owner: {
            avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4",
          },
        },
      ],
    };

    const result = parseApiResponse(repositorySearchResponseSchema, {
      ...validData,
      dummy_field:
        "This field is not defined in the schema and should be ignored",
    });
    expect(result).toEqual(validData);
  });

  it("スキーマに一致しないデータをパースしようとするとエラーが投げられる", () => {
    const invalidData = {
      total_count: "invalid-count", // number型でないためスキーマに一致しない
      items: [],
    };

    expect(() =>
      parseApiResponse(repositorySearchResponseSchema, invalidData)
    ).toThrow();
  });
});
