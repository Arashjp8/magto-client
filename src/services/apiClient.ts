import { SearchApiResponse } from "../types/searchApiResponse";

export async function apiClient(
    endpoint: string,
    method: string,
    contentType: string,
    queryParam?: Record<string, string>,
    responseType: "json" | "stream" = "json", // Added responseType for flexibility
): Promise<SearchApiResponse | Response> {
    try {
        const baseURL = `${import.meta.env.VITE_SERVER_BASE_URL}`;
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

        if (responseType === "json") {
            const json = await response.json();
            return json;
        }

        if (responseType === "stream") {
            return response;
        }

        throw new Error("Invalid responseType");
    } catch (error) {
        console.error(`Error while Fetching Data: ${error}`);
        throw error;
    }
}

//export async function apiClient(
//    endpoint: string,
//    method: string,
//    contentType: string,
//    queryParam?: Record<string, string>,
//) {
//    try {
//        const baseURL = `${import.meta.env.VITE_SERVER_BASE_URL}`;
//        const url = new URL(`${baseURL}/${endpoint}`);
//
//        if (queryParam) {
//            Object.keys(queryParam).forEach((key) => {
//                url.searchParams.append(key, queryParam[key]);
//            });
//        }
//
//        const options: RequestInit = {
//            method: method,
//            headers: {
//                "Content-type": contentType,
//            },
//        };
//
//        const response = await fetch(url, options);
//
//        if (!response.ok) {
//            throw new Error(`HTTP error! status: ${response.status}`);
//        }
//
//        const json = await response.json();
//        return json;
//    } catch (error) {
//        console.error(`Error while Fetching Data: ${error}`);
//        throw error;
//    }
//}
