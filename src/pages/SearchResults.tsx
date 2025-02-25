import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import SearchForm from "../componnets/SearchForm";
import TorrentList from "../componnets/TorrentList";
import useQuery from "../hooks/useQuery";
import { apiClient } from "../services/apiClient";
import { SearchApiResponse } from "../types/searchApiResponse";

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const movieName = searchParams.get("q");

    const fetchOptions = useCallback(async (): Promise<SearchApiResponse> => {
        if (!movieName) throw new Error("Movie name is required!");

        return await apiClient<SearchApiResponse>(
            "search",
            "GET",
            "application/json",
            {
                movie_name: movieName,
            },
        );
    }, [movieName]);

    const { state: mediaOpts } = useQuery<SearchApiResponse>(
        `${movieName}-search`,
        fetchOptions,
    );

    const isFading = mediaOpts.isLoading || mediaOpts.isFetching;

    if (mediaOpts.error) {
        return (
            <div className={"text-icon"}>
                <p>Error: {mediaOpts.error.message}</p>
            </div>
        );
    }

    return (
        <div
            className={
                "w-full lg:w-[50%] max-w-[1000px] p-6 text-xl lg:text-3xl text-icon flex flex-col gap-4"
            }
        >
            <h2 className={"font-bold"}>Search Results:</h2>
            <SearchForm
                isLoading={mediaOpts.isLoading || mediaOpts.isFetching}
            />

            <div
                className={`transition-opacity duration-300 ${isFading ? "opacity-0" : "opacity-100"}`}
            >
                {mediaOpts.data?.torrents && (
                    <TorrentList torrents={mediaOpts.data.torrents} />
                )}
            </div>
        </div>
    );
}
