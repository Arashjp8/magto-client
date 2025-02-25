import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function Layout() {
    return (
        <div
            className={
                "min-h-dvh font-mono bg-background flex items-center justify-center"
            }
        >
            <Toaster
                position="bottom-center"
                richColors
                toastOptions={{
                    classNames: {
                        toast: "font-mono",
                        title: "text-lg",
                    },
                }}
            />
            <Outlet />
        </div>
    );
}
