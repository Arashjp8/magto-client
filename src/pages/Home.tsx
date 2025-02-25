import SearchForm from "../componnets/SearchForm";

export default function Home() {
    return (
        <div
            className={
                "w-full lg:w-[50%] max-w-[1000px] p-6 text-xl lg:text-3xl text-icon flex flex-col gap-4"
            }
        >
            <h2 className={"font-bold"}>Search For The Movie:</h2>
            <SearchForm />
        </div>
    );
}
