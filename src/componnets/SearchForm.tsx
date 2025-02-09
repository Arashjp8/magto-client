import { useRef, lazy } from "react";
import { Toaster } from "sonner";

const LoadingSpinner = lazy(() => import("../assets/icons/LoadingSpinner"));

interface SearchFormProps {
    isLoading: boolean;
    onSearch: (movieName: string) => void;
}

export default function SearchForm({ isLoading, onSearch }: SearchFormProps) {
    const ref = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!ref.current) return;

        const movieName = ref.current.value.trim();
        if (!movieName) return;

        onSearch(movieName);
        ref.current.blur();
    };

    return (
        <form onSubmit={handleSubmit} className={"flex flex-col gap-4"}>
            <input
                ref={ref}
                type={"text"}
                className={
                    "w-full h-16 px-6 bg-searchbg rounded-xl border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition duration-300 ease-in-out placeholder:text-icon/40"
                }
                placeholder={"Type a movie name..."}
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
                type={"submit"}
                className={
                    "flex items-center justify-center bg-accent text-background py-2 px-6 rounded-xl hover:bg-accent/80 transition cursor-pointer"
                }
            >
                {isLoading ? (
                    <div className={"animate-spin"}>
                        <LoadingSpinner />
                    </div>
                ) : (
                    "Search"
                )}
            </button>
        </form>
    );
}
