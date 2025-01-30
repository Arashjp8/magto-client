import { useCallback, useEffect, useRef, useState } from "react";
import LoadingSpinner from "../assets/icons/LoadingSpinner";
import { apiClient } from "../services/apiClient";
import { SearchApiResponse } from "../types/searchApiResponse";
import { Torrent } from "../types/torrent";
import TorrentList from "./TorrentList";
import { toast, Toaster } from "sonner";

export default function SearchBox() {
  const [movieName, setMovieName] = useState<string | null>(null);
  const [response, setResponse] = useState<SearchApiResponse>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [torrents, setTorrents] = useState<Torrent[] | null>(null);
  const [isFading, setIsFading] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const fetchMagnets = useCallback(async (): Promise<void> => {
    if (movieName) {
      setIsLoading(true);
      setIsFading(true);

      setResponse(
        await apiClient("movie-torrent", "GET", "application/json", {
          movie_name: movieName,
        }),
      );
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (ref.current) {
      if (movieName === ref.current.value) {
        toast.error("Already Searched!");
      }

      setMovieName(ref.current.value);
      ref.current.blur();
    }
  };

  return (
    <div className="w-full lg:w-[50%] max-w-[1000px] p-6 text-xl lg:text-3xl text-icon flex flex-col gap-4">
      <h2 className="font-bold">Search For The Movie:</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          ref={ref}
          type="text"
          className="w-full h-16 px-6 bg-searchbg rounded-xl border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition duration-300 ease-in-out placeholder:text-icon/40"
          placeholder="Type a movie name..."
        />
        <Toaster
          position={"bottom-center"}
          richColors
          toastOptions={{
            classNames: {
              toast: "font-mono",
              title: "text-lg",
            },
          }}
        />
        <button
          type="submit"
          className={`flex items-center justify-center bg-accent text-background py-2 px-6 rounded-xl hover:bg-accent/80 transition cursor-pointer`}
        >
          {isLoading ? (
            <div className="animate-spin">
              <LoadingSpinner />
            </div>
          ) : (
            "Search"
          )}
        </button>
      </form>

      <div
        className={`transition-opacity duration-300 ${isFading ? "opacity-0" : "opacity-100"}`}
      >
        {torrents && <TorrentList torrents={torrents} />}
      </div>
    </div>
  );
}
