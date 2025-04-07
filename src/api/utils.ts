interface HTTPResponse<T> {
  httpCode: number;
  errorMessage: string;
  data: T;
}

type ApiFetcher = {
  <Response = any>(endpoint: string): Promise<Response>;
  <Response = any>(endpoint: string, method: 'DELETE'): Promise<Response>;
  <Payload, Response = any>(endpoint: string, method: 'PATCH' | 'PUT', data: Payload): Promise<Response>;
};

export const apiFetcher: ApiFetcher = async <Response, Payload>(
  endpoint: string,
  method?: 'DELETE' | 'PATCH' | 'PUT',
  data?: Payload
) => {
  const init: RequestInit = {
    method: method ?? 'GET'
  };

  if (data) {
    init.body = data instanceof FormData ? data : JSON.stringify(data);
  }

  const response = await fetch(import.meta.env.VITE_API_URL + endpoint, init);
  const responseJson: HTTPResponse<Response> = await response.json();

  if (responseJson.httpCode < 200 || responseJson.httpCode > 299) {
    throw new Error(responseJson.errorMessage);
  }

  return responseJson.data;
};
