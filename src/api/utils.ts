interface HTTPResponse<T> {
  httpCode: number;
  errorMessage: string;
  data: T;
}

type ApiFetcher = {
  <Response = any>(endpoint: string): Promise<Response>;
  <Response = any>(endpoint: string, method: 'DELETE'): Promise<Response>;
  <Payload, Response = any>(endpoint: string, method: 'POST' | 'PUT', data: Payload): Promise<Response>;
};

export const apiFetcher: ApiFetcher = async <Response, Payload>(
  endpoint: string,
  method?: 'DELETE' | 'POST' | 'PUT',
  data?: Payload
) => {
  const response = await fetch(import.meta.env.VITE_API_URL + endpoint, {
    method: method ?? 'GET',
    body: data ? JSON.stringify(data) : undefined
  });

  const responseJson: HTTPResponse<Response> = await response.json();

  if (responseJson.httpCode < 200 || responseJson.httpCode > 299) {
    throw new Error(responseJson.errorMessage);
  }

  return responseJson.data;
};
