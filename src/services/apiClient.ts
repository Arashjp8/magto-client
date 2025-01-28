type ApiRequestBody =
  | { movie_name: string }
  | { magnet: string }
  | { shortMagnet: string };

export async function apiClient(
  endpoint: string,
  method: string,
  contentType: string,
  body?: ApiRequestBody,
) {
  try {
    const baseURL = import.meta.env.VITE_SERVER_BASE_URL;
    const url = `${baseURL}/${endpoint}`;

    const options: RequestInit = {
      method: method,
      headers: {
        "Content-type": contentType,
      },
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(`Error while Fetching Data: ${error}`);
    throw error;
  }
}
