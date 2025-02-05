import { useEffect, useRef } from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";
import { VideoJsPlayerOptions } from "../types/videoJs";

interface Props {
    shortMagnet: string;
}

export default function VideoJS({ shortMagnet }: Props) {
    const videoRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<Player | null>(null);

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
                    src: `${import.meta.env.VITE_SERVER_BASE_URL}/download-and-stream?shortMagnet=${shortMagnet}`,
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
            console.log("if fired");
            const videoElement = document.createElement("video-js");

            videoElement.classList.add("vjs-big-play-centered");
            videoRef.current?.appendChild(videoElement);

            if (!videoElement) return;
            console.log("after !videoElement");

            playerRef.current = videojs(videoElement, videoJsOptions);

            console.log(videojs.getAllPlayers());
        } else if (playerRef.current) {
            console.log("esle if fired");
            playerRef.current.src(videoJsOptions.sources);
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [shortMagnet]);

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
