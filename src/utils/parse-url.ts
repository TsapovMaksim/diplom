import queryString from "query-string";

export default function parseUrl(url: string) {
  return queryString.parseUrl(url, {
    arrayFormat: "comma",
    parseNumbers: true,
  });
}
