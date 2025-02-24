import { useCallback, useEffect, useState } from "react";
import { apiClient } from "../services/apiClient";
import { SearchApiResponse } from "../types/searchApiResponse";
import { Torrent } from "../types/torrent";
import { toast } from "sonner";
import SearchForm from "../componnets/SearchForm";
import TorrentList from "../componnets/TorrentList";
import { useSearchParams } from "react-router-dom";
import useQuery from "../hooks/useQuery";

export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const movieName = searchParams.get("q");

    const [response, setResponse] = useState<SearchApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [torrents, setTorrents] = useState<Torrent[] | null>(null);
    const [isFading, setIsFading] = useState<boolean>(false);

    const { queryKey, data } = useQuery(
        `${movieName}-search`,
        { endpoint: "search", queryParams: { movie_name: movieName! } },
        5000,
    );

    useEffect(() => {
        console.log(data);
        console.log(queryKey);
    }, [queryKey, data]);

    const fetchMagnets = useCallback(async () => {
        if (!movieName) return;
        setIsLoading(true);
        setIsFading(true);

        const res = await apiClient("search", "GET", "application/json", {
            movie_name: movieName,
        });

        setResponse(res);
    }, [movieName]);

    useEffect(() => {
        if (movieName) {
            fetchMagnets();
        }
    }, [movieName, fetchMagnets]);

    useEffect(() => {
        if (response) {
            setTimeout(() => {
                setTorrents(response.torrents);
                setIsFading(false);
            }, 300);
            setIsLoading(false);
        }
    }, [response]);

    const handleSearch = (newMovieName: string) => {
        if (movieName === newMovieName) {
            return toast.error("Already Searched!");
        }
        setSearchParams({ q: newMovieName });
    };

    return (
        <div
            className={
                "w-full lg:w-[50%] max-w-[1000px] p-6 text-xl lg:text-3xl text-icon flex flex-col gap-4"
            }
        >
            <h2 className={"font-bold"}>Search For The Movie:</h2>
            <SearchForm isLoading={isLoading} onSearch={handleSearch} />

            <div
                className={`transition-opacity duration-300 ${isFading ? "opacity-0" : "opacity-100"}`}
            >
                {torrents && <TorrentList torrents={torrents} />}
            </div>
        </div>
    );
}
