import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { useRef, useState } from "react";

export default function VideoPlayer() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isTranscoding, setIsTranscoding] = useState(false);
    const ffmpegRef = useRef<FFmpeg>(new FFmpeg());
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const messageRef = useRef<HTMLParagraphElement | null>(null);

    const load = async () => {
        try {
            if (isLoaded) return;
            const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
            const ffmpeg = ffmpegRef.current;

            ffmpeg.on("log", ({ message }: { message: string }) => {
                if (messageRef.current)
                    messageRef.current.textContent = message;
                console.log(message);
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
    };

    const transcode = async () => {
        if (isTranscoding) return;
        setIsTranscoding(true);

        try {
            const ffmpeg = ffmpegRef.current;

            await ffmpeg.writeFile(
                "input.webm",
                await fetchFile(
                    "https://raw.githubusercontent.com/ffmpegwasm/testdata/master/Big_Buck_Bunny_180_10s.webm",
                ),
            );

            await ffmpeg.exec(["-i", "input.webm", "output.mp4"]);
            const data = await ffmpeg.readFile("output.mp4");

            if (videoRef.current) {
                videoRef.current.src = URL.createObjectURL(
                    new Blob([data], { type: "video/mp4" }),
                );
            }
        } catch (error) {
            console.error("Transcoding failed:", error);
        } finally {
            setIsTranscoding(false);
        }
    };

    return isLoaded ? (
        <>
            <video ref={videoRef} controls></video>
            <br />
            <button onClick={transcode}>Transcode webm to mp4</button>
            <p ref={messageRef}></p>
            <p>Open Developer Tools (Ctrl+Shift+I) to View Logs</p>
        </>
    ) : (
        <button onClick={load} className={"bg-myGreen "}>
            Load ffmpeg-core (~31 MB)
        </button>
    );
}
