import { ComponentType } from "react";
import Disk from "../assets/icons/Disk";
import Magnet from "../assets/icons/Magnet";
import Play from "../assets/icons/Play";
import Seed from "../assets/icons/Seed";
import { Torrent } from "../types/torrent";
import { toast, Toaster } from "sonner";
import Tick from "../assets/icons/Tick";
import { useNavigate } from "react-router-dom";

interface Props {
    isOpen: boolean;
    torrent: Torrent;
}

type IconCopmonents = {
    Component: ComponentType;
    description: string | number;
    content?: string;
};

export default function Items({ isOpen, torrent }: Props) {
    const iconComponents: IconCopmonents[] = [
        { Component: Magnet, description: "Magnet", content: torrent.magnet },
        { Component: Play, description: "Play" },
        { Component: Seed, description: torrent.seeds },
        { Component: Disk, description: torrent.size },
    ];

    const navigate = useNavigate();

    const copyToClipboard = (text: string) => {
        if (!text) return;

        navigator.clipboard
            .writeText(text)
            .then(() => {
                toast.success("Copied to clipboard!", {
                    icon: <Tick />,
                });
            })
            .catch((err) => {
                toast.error("Failed to copy:");
                console.error("Failed to copy:", err);
            });
    };

    return (
        <div
            className={`flex justify-between items-center ${isOpen ? "animate-fade-in" : ""}`}
        >
            {iconComponents.map(
                ({ Component, description, content }, index) => {
                    return (
                        <div key={index} className={"flex gap-4"}>
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
                                className={`${description === "Play" || description === "Magnet" ? "cursor-pointer hover:text-myYeollow" : ""}`}
                                onClick={() => {
                                    if (description === "Magnet" && content) {
                                        copyToClipboard(content);
                                    } else if (description === "Play") {
                                        navigate("/watch");
                                    }
                                }}
                            >
                                <Component />
                            </button>
                            <p>{description}</p>
                        </div>
                    );
                },
            )}
        </div>
    );
}
