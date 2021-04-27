export interface videoDetails {

    title: string;
    video_id: string;
    statistics: {
        viewCount: string;
        subscriberCount: string;
        hiddenSubscriberCount: boolean;
        videoCount: string;
    }
    thumbnails: {
        default?: {
            url: string;
            width: number;
            height: number;
        };
        medium?: {
            url: string;
            width: number;
            height: number;
        };
        high?: {
            url: string;
            width: number;
            height: number;
        };
    };

}
