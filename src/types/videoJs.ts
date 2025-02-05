export interface VideoJsSource {
    type: string;
    src: string;
}

export interface VideoJsControlBarConfig {
    children: string[];
}

export interface VideoJsPlayerOptions {
    autoplay: boolean;
    muted: boolean;
    controls: boolean;
    userActions: {
        hotkeys: boolean;
    };
    disablePictureInPicture: boolean;
    fill: boolean;
    loop: boolean;
    inactivityTimeout: number;
    bigPlayButton: boolean;
    sources: VideoJsSource[];
    controlBar: VideoJsControlBarConfig;
    defaultVolume: number;
}
