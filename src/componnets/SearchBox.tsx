import { useEffect, useRef, useState } from "react";
import { apiClient } from "../services/apiClient";
import { SearchApiResponse } from "../types/searchApi";
import { Torrent } from "../types/torrent";
import TorrentList from "./TorrentList";

export default function SearchBox() {
  const [response, setResponse] = useState<SearchApiResponse>();
  const [movieName, setMovieName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [torrents, setTorrents] = useState<Torrent[] | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(response);
    console.log("movieName:", movieName);

    if (response) {
      setIsLoading(false);
      setTorrents(response.torrents);
    }
  }, [response, movieName]);

  const fetchMagnets = async (): Promise<void> => {
    if (movieName) {
      setIsLoading(true);

      setResponse(
        await apiClient("movie-torrent", "GET", "application/json", {
          movie_name: movieName,
        }),
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (ref.current) {
      setMovieName(ref.current.value);
      fetchMagnets();
    }
  };

  return (
    <div
      className={
        "w-full lg:w-[50%] max-w-[1000px] p-6 text-xl lg:text-3xl text-icon flex flex-col gap-4"
      }
    >
      <h2 className={"font-bold"}>Search For The Movie:</h2>
      <form onSubmit={handleSubmit} className={"flex flex-col gap-4"}>
        <input
          ref={ref}
          type={"text"}
          className={
            "w-full h-16 px-6 bg-searchbg rounded-xl border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition duration-300 ease-in-out placeholder:text-icon/40"
          }
          placeholder={"Type a movie name..."}
        />
        <button
          type={"submit"}
          className={
            "bg-accent text-background py-2 px-6 rounded-xl hover:bg-accent/80 transition"
          }
        >
          {isLoading ? "Fetching Data..." : "Search"}
        </button>
      </form>
      {torrents && <TorrentList torrents={torrents} />}
    </div>
  );
}
