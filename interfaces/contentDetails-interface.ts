export interface contentDetails {
    kind: string;
    etag: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    "nextPageToken": string;
    items: [{
        title: string;
        description: string;
        customUrl: string;
        publishedAt: string;
        snippet: {
            title: string;
            localized: { title: string; description: string };
            country: string;
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
        contentDetails: { relatedPlaylists: { uploads: string; likes: string; favorites: string }};
        statistics: {
            viewCount: string;
            subscriberCount: string;
            hiddenSubscriberCount: boolean;
            videoCount: string;
        }

    }]
}
