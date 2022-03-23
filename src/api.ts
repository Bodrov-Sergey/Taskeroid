const headers: Record<string, string> = {};

function createDataSource(baseUrl: string) {
  return async (path: string, config: RequestInit = {}): Promise<Response> => {
    config.headers = {
      ...config.headers,
      ...headers,
    };
    return fetch(`${baseUrl}${path}`, config);
  };
}

const api = createDataSource(import.meta.env.VITE_API_URL as string);

export const jsonApi = <T>(path: string, config?: RequestInit): Promise<T> =>
  api(`/api${path}`, config)
    .then(res => res.json())
    .then(data => {
      if (data?.error) {
        throw data.error;
      }
      return data;
    });

export const fileApi = (path: string, fileName: string, config?: RequestInit) =>
  api(path, config)
    .then(res => res.blob())
    .then(blob => new File([blob], fileName));

export function setToken(token: string) {
  headers.Authorization = `Bearer ${token}`;
}
export function killToken() {
  delete headers.Authorization;
}
