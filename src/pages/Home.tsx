import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import SearchForm from "../componnets/SearchForm";
import TorrentList from "../componnets/TorrentList";
import useQuery from "../hooks/useQuery";
import { apiClient } from "../services/apiClient";
import { SearchApiResponse } from "../types/searchApiResponse";

export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const movieName = searchParams.get("q");

    // BUG: cache doesn't work on page back it only works when changin search query

    const queryFn = useCallback(async (): Promise<SearchApiResponse> => {
        if (!movieName) throw new Error("Movie name is required!");

        try {
            const res = await apiClient("search", "GET", "application/json", {
                movie_name: movieName,
            });
            return res;
        } catch (err) {
            console.error("Error while fetching data", err);
            throw new Error("Error while fetching data");
        }
    }, [movieName]);

    const { state } = useQuery<SearchApiResponse>(
        `${movieName}-search`,
        queryFn,
    );

    const [isFading, setIsFading] = useState<boolean>(false);

    useEffect(() => {
        if (state.isLoading || state.isFetching) {
            setIsFading(true);
        } else {
            setIsFading(false);
        }
    }, [state.isLoading, state.isFetching]);

    const handleSearch = (newMovieName: string) => {
        if (movieName === newMovieName) {
            return toast.error("Already Searched!");
        }
        setSearchParams({ q: newMovieName });
    };

    return (
        <div className="w-full lg:w-[50%] max-w-[1000px] p-6 text-xl lg:text-3xl text-icon flex flex-col gap-4">
            <h2 className="font-bold">Search For The Movie:</h2>
            <SearchForm isLoading={state.isLoading} onSearch={handleSearch} />

            <div
                className={`transition-opacity duration-300 ${isFading ? "opacity-0" : "opacity-100"}`}
            >
                {state.data?.torrents && (
                    <TorrentList torrents={state.data.torrents} />
                )}
            </div>
        </div>
    );
}
