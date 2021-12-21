import { BASE_URL } from "../constants";

export const request = (
  url: string,
  method = "GET",
  headers: HeadersInit = {},
  body: BodyInit | null = null
) => {
  return fetch(`${BASE_URL}${url}`, {
    headers,
    method,
    body,
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((err) => Promise.reject(err));
    }
    return res.json();
  });
};
