import { useState, useEffect } from "react";

import { Torrent } from "../types/torrent";
import Items from "./Items";
import { useWindowSize } from "../hooks/useWidowSize";
import ChevronDown from "../assets/icons/ChevronDown";
import ChevronUp from "../assets/icons/ChevronUp";

interface Props {
    torrents: Torrent[];
}

export default function TorrentList({ torrents }: Props) {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());
    const [titleLimit, setTitleLimit] = useState(64);
    const { width } = useWindowSize();

    useEffect(() => {
        if (width) {
            if (width < 640) {
                // mobile
                setTitleLimit(24);
            } else if (width < 1024) {
                // tablet
                setTitleLimit(48);
            } else {
                // desktop
                setTitleLimit(64);
            }
        }
    }, [width]);

    const handleClick = (id: string) => {
        setOpenItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const truncateTitle = (title: string, limit: number) => {
        if (title.length <= limit) return title;
        return `${title.slice(0, limit)}...`;
    };

    return (
        <ul className={"flex flex-col gap-3"}>
            {torrents.map((torrent) => {
                const isOpen = openItems.has(torrent.id);
                const displayedTitle = isOpen
                    ? torrent.title
                    : truncateTitle(torrent.title, titleLimit);

                return (
                    <li
                        key={torrent.id}
                        className={`flex flex-col px-4 py-6 justify-between overflow-hidden transition-[height] duration-300 ease-in-out ${isOpen ? "h-44" : "h-20"
                            } text-lg lg:text-xl bg-background2 border-2 border-myGrey rounded-xl`}
                    >
                        <div className={"w-full flex justify-between"}>
                            <p>{displayedTitle}</p>
                            <button
                                className={
                                    "h-fit flex justify-center items-center cursor-pointer hover:text-myYellow"
                                }
                                onClick={() => handleClick(torrent.id)}
                            >
                                {isOpen ? <ChevronUp /> : <ChevronDown />}
                            </button>
                        </div>
                        {isOpen && <Items isOpen={isOpen} torrent={torrent} />}
                    </li>
                );
            })}
        </ul>
    );
}
