import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("./categories", () => {
    return HttpResponse.json([
      { id: 1, category: "Electronics" },
      { id: 2, category: "Beauty" },
      { id: 3, category: "Gardening" },
    ]);
  }),
];
