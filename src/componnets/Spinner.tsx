import { lazy } from "react";

const LoadingSpinner = lazy(() => import("../assets/icons/LoadingSpinner"));

export default function Spinner() {
    return (
        <div className={"animate-spin"}>
            <LoadingSpinner />
        </div>
    );
}
