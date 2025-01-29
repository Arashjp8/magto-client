import { useState } from "react";
import { Torrent } from "../types/torrent";
import ChevronDown from "../assets/icons/ChevronDown";
import ChevronUp from "../assets/icons/ChevronUp";
import Items from "./Items";

interface Props {
  torrents: Torrent[];
}

export default function TorrentList({ torrents }: Props) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

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

  return (
    <ul className={"flex flex-col gap-3"}>
      {torrents.map((torrent) => {
        const isOpen = openItems.has(torrent.id);

        return (
          <li
            key={torrent.id}
            className={`flex flex-col px-4 py-6 justify-between overflow-hidden transition-[height] duration-300 ease-in-out ${isOpen ? "h-44" : "h-20"} text-lg lg:text-xl bg-background2 border-2 border-myGrey rounded-xl`}
          >
            <div className={"w-full flex justify-between"}>
              <p>{torrent.title}</p>
              <button
                className={`h-fit flex justify-center items-center cursor-pointer hover:text-myYeollow`}
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
