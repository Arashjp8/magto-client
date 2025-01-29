import { ComponentType } from "react";
import Disk from "../assets/icons/Disk";
import Magnet from "../assets/icons/Magnet";
import Play from "../assets/icons/Play";
import Seed from "../assets/icons/Seed";
import { Torrent } from "../types/torrent";

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

  return (
    <div
      className={`flex justify-between items-center ${isOpen ? "animate-fade-in" : ""}`}
    >
      {iconComponents.map(({ Component, description }, index) => {
        return (
          <div key={index} className={"flex gap-4"}>
            <button
              className={`${description === "Play" || description === "Magnet" ? "cursor-pointer" : ""}`}
            >
              <Component />
            </button>
            <p>{description}</p>
          </div>
        );
      })}
    </div>
  );
}
