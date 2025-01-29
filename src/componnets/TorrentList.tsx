import { useState } from "react";
import { Torrent } from "../types/torrent";

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
      {torrents.map((torrent) => (
        <li
          key={torrent.id}
          className={`flex px-4 py-6 justify-start overflow-hidden transition-[height] duration-300 ease-in-out ${openItems.has(torrent.id) ? "h-48" : "h-20"} text-lg lg:text-xl bg-background2 border-2 border-myGrey rounded-xl cursor-pointer`}
          onClick={() => handleClick(torrent.id)}
        >
          {torrent.title}
        </li>
      ))}
    </ul>
  );
}
