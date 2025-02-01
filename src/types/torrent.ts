export interface Torrent {
    provider: string;
    id: string;
    title: string;
    time: string;
    seeds: number;
    peers: number;
    size: string;
    magnet: string;
    numFiles: number;
    status: string;
    category: string;
    imdb: string;
    shortMagnet: string;
}
