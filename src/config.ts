function stripTrailingSlash(u: string) {
  return u.replace(/\/+$/, "");
}

const envRoot = process.env.NEXT_PUBLIC_ROOT_URL || process.env.ROOT_URL;
const envApi = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

const defaultRoot =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://orinote.neptunia.net.eu.org";

const rootUrl = stripTrailingSlash(envRoot || defaultRoot);
const apiUrl = stripTrailingSlash(envApi || `${rootUrl}/api`);

export type Config = {
  rootUrl: string;
  apiUrl: string;
};

export const config: Config = {
  rootUrl,
  apiUrl,
};

/**
 * 返回拼接到 API 的完整 URL（会保证斜杠处理）
 * 例如 getApiUrl('/records') -> 'https://.../api/records'
 */
export function getApiUrl(path = ""): string {
  if (!path) return apiUrl;
  const p = path.replace(/^\/+/, "");
  return `${apiUrl}/${p}`;
}
