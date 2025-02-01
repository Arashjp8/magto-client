import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div
            className={
                "font-mono h-screen w-full flex flex-col items-center justify-center bg-background text-icon text-center px-6"
            }
        >
            <h1 className={"text-8xl font-bold relative"} data-text={"404"}>
                404
            </h1>
            <p className={"text-xl md:text-2xl mt-4 text-icon/80"}>
                Oops! The page you’re looking for doesn’t exist.
            </p>
            <Link
                to={"/"}
                className={
                    "mt-6 bg-accent text-background px-6 py-3 rounded-lg text-lg font-bold hover:bg-accent/80 transition-all"
                }
            >
                Go Home
            </Link>
        </div>
    );
}
