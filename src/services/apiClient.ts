export async function apiClient<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    contentType: string = "application/json",
    queryParams?: Record<string, string>,
    body?: unknown,
): Promise<T> {
    const baseURL = import.meta.env.VITE_SERVER_NEW_BASE_URL;
    const url = new URL(`${baseURL}/${endpoint}`);

    if (queryParams) {
        Object.entries(queryParams).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }

    const options: RequestInit = {
        method,
        headers: {
            "Content-Type": contentType,
        },
        body: body ? JSON.stringify(body) : undefined,
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(
                errorData?.message || `HTTP error! Status: ${response.status}`,
            );
        }

        return response.json();
    } catch (error) {
        console.error("API Request Failed:", error);
        throw error;
    }
}
