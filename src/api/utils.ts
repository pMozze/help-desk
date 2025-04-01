import { HTTPResponse } from './models';

export const apiFetcher = async (endpoint: string, init?: RequestInit) => {
  const response = await fetch(import.meta.env.VITE_API_URL + endpoint, init);
  const responseJson: HTTPResponse<any> = await response.json();

  if (responseJson.httpCode !== 200) {
    throw new Error(responseJson.errorMessage);
  }

  return responseJson.data;
};
