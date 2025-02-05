import VideoJS from "./VideoJS";

interface Props {
    shortMagnet: string;
}

export default function VideoPlayer({ shortMagnet }: Props) {
    return (
        <>
            <VideoJS shortMagnet={shortMagnet} />
        </>
    );

    //const videoRef = useRef<HTMLVideoElement>(null);
    //const [mediaSource] = useState(new MediaSource());
    //
    //useEffect(() => {
    //    if (!videoRef.current) return;
    //
    //    const video = videoRef.current;
    //    video.src = URL.createObjectURL(mediaSource);
    //
    //    mediaSource.addEventListener("sourceopen", async () => {
    //        const mimeCodec = 'video/mp4; codecs="avc1.64001F, mp4a.40.2"';
    //        const sourceBuffer = mediaSource.addSourceBuffer(mimeCodec);
    //        let start = 0;
    //        const chunkSize = 1 * 1024 * 1024; // 1 MB
    //
    //        async function fetchAndAppend() {
    //            if (
    //                !sourceBuffer.updating &&
    //                mediaSource.readyState === "open"
    //            ) {
    //                const end = Math.min(start + chunkSize - 1);
    //                const rangeHeader = `bytes=${start}-${end}`;
    //                const response = await fetch(
    //                    `${import.meta.env.VITE_SERVER_BASE_URL}/download-and-stream?shortMagnet=${shortMagnet}`,
    //                    {
    //                        headers: { Range: rangeHeader },
    //                    },
    //                );
    //
    //                if (response.ok) {
    //                    const data = await response.arrayBuffer();
    //                    sourceBuffer.appendBuffer(data);
    //                    start += chunkSize;
    //                } else {
    //                    mediaSource.endOfStream();
    //                }
    //            }
    //        }
    //
    //        sourceBuffer.addEventListener("updateend", fetchAndAppend);
    //        fetchAndAppend();
    //    });
    //}, [shortMagnet, mediaSource]);
    //
    //return <video ref={videoRef} controls />;
}
