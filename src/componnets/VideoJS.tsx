import { useEffect, useRef } from "react";
import { VideoJsPlayerOptions } from "../types/videoJs";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import { useWatchContext } from "../context/WatchContext/WatchContext";

export default function VideoJS() {
    const videoRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<Player | null>(null);
    const { watchMagnet } = useWatchContext();

    useEffect(() => {
        const videoJsOptions: VideoJsPlayerOptions = {
            autoplay: false,
            muted: false,
            controls: true,
            userActions: {
                hotkeys: true,
            },
            disablePictureInPicture: true,
            fill: true,
            loop: true,
            inactivityTimeout: 2000,
            bigPlayButton: true,
            sources: [
                {
                    type: "video/mp4",
                    //src: `${import.meta.env.VITE_SERVER_BASE_URL}/download-and-stream?magnet=${shortMagnet}`,
                    src: `${import.meta.env.VITE_SERVER_NEW_BASE_URL}/streaming?magnet=${watchMagnet}`,
                    //src: "http://localhost:3000",
                },
            ],
            controlBar: {
                children: [
                    "RemainingTimeDisplay",
                    "playToggle",
                    "progressControl",
                    "volumePanel",
                    "qualitySelector",
                    "SubtitlesButton",
                    "fullscreenToggle",
                ],
            },
            defaultVolume: 0.5,
        };

        if (!playerRef.current) {
            const videoElement = document.createElement("video-js");

            videoElement.classList.add("vjs-big-play-centered");
            videoRef.current?.appendChild(videoElement);

            if (!videoElement) return;

            playerRef.current = videojs(videoElement, videoJsOptions);

            console.log(videojs.getAllPlayers());
        } else if (playerRef.current) {
            playerRef.current.src(videoJsOptions.sources);
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [watchMagnet]);

    return (
        <div
            className={"video-js min-h-screen"}
            style={{
                width: "100%",
            }}
            data-vjs-player
        >
            <div
                ref={videoRef}
                style={{
                    width: "100%",
                    height: "100%",
                }}
            />
        </div>
    );
}
