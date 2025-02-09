import { ReactNode, useState } from "react";
import contextGenerator from "../ContextGenerator";

interface IWatchContext {
    watchMagnet: string;
    setWatchMagnet: (watchMagnet: string) => void;
}

export const {
    Provider: WatchContextProvider,
    useContextValue: useWatchContext,
} = contextGenerator<IWatchContext>("");

export const WatchContextProviderWrapper: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [watchMagnet, setWatchMagnet] = useState<string>("");

    return (
        <WatchContextProvider value={{ watchMagnet, setWatchMagnet }}>
            {children}
        </WatchContextProvider>
    );
};
