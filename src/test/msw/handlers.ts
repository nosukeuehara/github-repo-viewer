import {http, HttpResponse} from "msw";

export const handlers = [
  http.get("https://api.github.com/search/repositories", () => {
    return HttpResponse.json({
      total_count: 1,
      items: [
        {
          id: 1,
          name: "react",
          full_name: "facebook/react",
          url: "https://api.github.com/repos/facebook/react",
          owner: {
            avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
          },
        },
      ],
    });
  }),

  // http.get("https://api.github.com/search/repositories", () => {
  //   return new HttpResponse(null, {
  //     status: 403,
  //   });
  // }),
];
