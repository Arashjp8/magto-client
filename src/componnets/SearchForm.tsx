import { useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Spinner from "./Spinner";

interface SearchFormProps {
    isLoading?: boolean;
}

export default function SearchForm({ isLoading }: SearchFormProps) {
    const ref = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const queryFromURL = searchParams.get("q") || "";

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (!ref.current) return;

            const movieName = ref.current.value.trim();
            if (!movieName) return;

            navigate(`/results?q=${encodeURIComponent(movieName)}`);
            ref.current.blur();
        },
        [navigate],
    );

    return (
        <form onSubmit={handleSubmit} className={"flex flex-col gap-4"}>
            <input
                ref={ref}
                type={"text"}
                defaultValue={queryFromURL}
                className={
                    "w-full h-16 px-6 bg-searchbg rounded-xl border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition duration-300 ease-in-out placeholder:text-icon/40"
                }
                placeholder={"Type a movie name..."}
            />
            <button
                type={"submit"}
                className={
                    "flex items-center justify-center bg-accent text-background py-2 px-6 rounded-xl hover:bg-accent/80 transition cursor-pointer"
                }
            >
                {isLoading ? <Spinner /> : "Search"}
            </button>
        </form>
    );
}
