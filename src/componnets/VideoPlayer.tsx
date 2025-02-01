import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
    shortMagnet: string;
}

export default function VideoPlayer({ shortMagnet }: Props) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isTranscoding, setIsTranscoding] = useState(false);
    const [isTranscoded, setIsTranscoded] = useState(false);
    const [videoSrc, setVideoSrc] = useState<string | null>(null);
    const ffmpegRef = useRef<FFmpeg>(new FFmpeg());
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const messageRef = useRef<HTMLParagraphElement | null>(null);

    const load = useCallback(async () => {
        if (isLoaded) return;

        try {
            const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
            const ffmpeg = ffmpegRef.current;

            ffmpeg.on("log", ({ message }: { message: string }) => {
                if (messageRef.current)
                    messageRef.current.textContent = message;
            });

            await ffmpeg.load({
                coreURL: await toBlobURL(
                    `${baseURL}/ffmpeg-core.js`,
                    "text/javascript",
                ),
                wasmURL: await toBlobURL(
                    `${baseURL}/ffmpeg-core.wasm`,
                    "application/wasm",
                ),
            });

            setIsLoaded(true);
        } catch (error) {
            console.error("Failed to load FFmpeg:", error);
        }
    }, [isLoaded]);

    useEffect(() => {
        load();
    }, [load]);

    const transcode = useCallback(
        async (videoUrl: string, startTime: number, duration: number) => {
            if (isTranscoding) return;

            setIsTranscoding(true);

            try {
                const ffmpeg = ffmpegRef.current;

                const videoFile: Uint8Array = await fetchFile(videoUrl);
                console.log("videoFile:", videoFile);

                await ffmpeg.writeFile("input.mkv", videoFile);

                await ffmpeg.exec([
                    // TODO: remove these later
                    "-ss",
                    startTime.toString(),
                    "-t",
                    duration.toString(),
                    // TODO: until here
                    "-i",
                    "input.mkv",
                    "-c:v",
                    "libx264",
                    "-c:a",
                    "aac",
                    "-strict",
                    "experimental",
                    "output.mp4",
                ]);

                const data = await ffmpeg.readFile("output.mp4");

                if (videoRef.current) {
                    setVideoSrc(
                        URL.createObjectURL(
                            new Blob([data], { type: "video/mp4" }),
                        ),
                    );
                }
            } catch (error) {
                console.error("Transcoding failed:", error);
            } finally {
                setIsTranscoding(false);
                setIsTranscoded(true);
            }
        },
        [isTranscoding],
    );

    useEffect(() => {
        if (isLoaded && !isTranscoded) {
            transcode(
                `http://localhost:3000/api/download-and-stream?shortMagnet=${shortMagnet}`,
                60,
                6,
            );
        }
    }, [isLoaded, shortMagnet, isTranscoded, transcode]);

    return (
        <div className={"flex flex-col"}>
            <video ref={videoRef} controls src={videoSrc || ""}></video>
            <br />
            <button
                onClick={() =>
                    transcode(
                        `http://localhost:3000/api/download-and-stream?shortMagnet=${shortMagnet}`,
                        60,
                        6,
                    )
                }
                className={"bg-myGreen text-xl"}
                disabled={isTranscoding}
            >
                {isTranscoding
                    ? "Transcoding..."
                    : isTranscoded
                      ? "ReTranscode to MP4"
                      : "Transcode to MP4"}
            </button>
            <p ref={messageRef} className={"text-icon text-xl"}></p>
        </div>
    );
}
