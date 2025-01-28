import { useEffect, useRef, useState } from "react";
import { apiClient } from "../services/apiClient";
import { SearchApiResponse } from "../types/searchApi";

export default function SearchBox() {
  const [response, setResponse] = useState<SearchApiResponse>();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log(response);
  }, [response]);

  const fetchMagnets = async (movieName: string) => {
    setResponse(
      await apiClient("movie-torrent", "GET", "application/json", {
        movie_name: movieName,
      }),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (ref.current) {
      await fetchMagnets(ref.current.value);
    }
  };

  return (
    <div
      className={
        "w-[50%] max-w-[1000px] text-3xl text-icon flex flex-col gap-4"
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
          Search
        </button>
      </form>
    </div>
  );
}
