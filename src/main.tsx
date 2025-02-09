import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "video.js/dist/video-js.css";
import { WatchContextProviderWrapper } from "./context/WatchContext/WatchContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <WatchContextProviderWrapper>
            <App />
        </WatchContextProviderWrapper>
    </StrictMode>,
);
