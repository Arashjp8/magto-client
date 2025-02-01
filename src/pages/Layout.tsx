import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div
            className={
                "min-h-dvh font-mono bg-background flex items-center justify-center"
            }
        >
            <Outlet />
        </div>
    );
}
