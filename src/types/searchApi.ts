import { Torrent } from "./torrent";

export interface SearchApiResponse {
  movieName: string;
  torrents: Torrent[];
  torrentsCount: number;
}
