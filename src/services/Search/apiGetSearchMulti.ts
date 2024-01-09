import { Query } from "../apiTypes";

export const getSearchMulti = (text: string): Query => ({
  endpoint: `search/multi`,
  method: "GET",
  input: `query=${text}`,
});
