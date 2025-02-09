import { SearchApiResponse } from "../types/searchApiResponse";

export async function apiClient(
    endpoint: string,
    method: string,
    contentType: string,
    queryParam?: Record<string, string>,
): Promise<SearchApiResponse> {
    try {
        //const baseURL = `${import.meta.env.VITE_SERVER_BASE_URL}`;
        const baseURL = `${import.meta.env.VITE_SERVER_NEW_BASE_URL}`;
        const url = new URL(`${baseURL}/${endpoint}`);

        if (queryParam) {
            Object.keys(queryParam).forEach((key) => {
                url.searchParams.append(key, queryParam[key]);
            });
        }

        const options: RequestInit = {
            method: method,
            headers: {
                "Content-type": contentType,
            },
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
