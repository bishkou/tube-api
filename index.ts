import fetch from 'node-fetch';

import { contentDetails } from './interfaces/contentDetails-interface';
import { listDetails  } from './interfaces/listDetails-interface';
import { channelDetails } from './interfaces/channelDetails-interface';
import { videoDetails } from "./interfaces/videoDetails-interface";


/**
 * @param {string} key The YouTube Data API v3 key to use
 */
export class Youtube {
    private readonly CHANNELS_URL = 'https://www.googleapis.com/youtube/v3/channels?';
    private readonly PLAYLIST_URL = 'https://www.googleapis.com/youtube/v3/playlistItems?';
    private readonly VIDEO_URL = 'https://www.googleapis.com/youtube/v3/videos?';

    constructor(private API_KEY: string) {
        // Checking if the API KEY provided is valid
        const channelUrl = `${this.CHANNELS_URL}id=UCZU5ofyBsEmVuKYrijLFxrg&key=${this.API_KEY}`;
        fetch(channelUrl)
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    Promise.reject(data.error?.message);
                }else {
                    console.info('Connected to Youtube API successfully');
                }
            })

    }

    /**
     * Get Channel Data or Test the API
     * @param {string} channelUrl The specific fetching Url with API_KEY
     * @returns {Promise<?contentDetails>}
     * @example
     */

    private getData(channelUrl: string): Promise<contentDetails> {
        return fetch(channelUrl)
            .then((response: { json: () => any; }) => response.json())
            .then(data => {
                if (data.pageInfo.totalResults === 0) {
                    return Promise.reject(new Error(`Wrong ID`))
                } else {
                    return data;
                }
            });
    }

    /**
     * Get Video List Max 50 per request
     * @param {string} channelUrl The specific fetching Url with API_KEY
     * @param {string} pageToken The code for a specific set of videos
     * @returns {Promise<?listDetails>}
     * @example
     */

    private getList(channelUrl: string, pageToken?: string): Promise<listDetails> {
        return fetch(channelUrl + (pageToken ? `&pageToken=${pageToken}` : ''))
            .then((response: { json: () => any; }) => response.json())
            .then(data => {
                if(data.error){
                    return Promise.reject(new Error(data.error.message))
                }else {
                    return data;
                }
            })
    }

    /**
     * Get Video List Max 50 per request
     * @param {Array} videos The array all the videos are appended to
     * @param {Array} listDetails The array of Video List, MAX=50
     * @returns {Promise<?Array>}
     * @example
     */
    async getVideos(videos: [videoDetails], listDetails: listDetails) {
        await Promise.all(listDetails.items.map( async data =>{
            const video_id = data.snippet?.resourceId?.videoId;
            const videoDetails = await this.videoInfo(video_id);

            videos.push(videoDetails)
        }));
    }

    /**
     * Get channel Details by ID
     * @param {string} channel_id The channel ID
     * @returns {Promise<?channelDetails>}
     * @example
     */

    public async channelDetails(channel_id: string): Promise<channelDetails> {

        console.info('Fetching Channel Information...')

        const channelUrl = `${this.CHANNELS_URL}id=${channel_id}&part=contentDetails,snippet,statistics&key=${this.API_KEY}`;
        const data: contentDetails = await this.getData(channelUrl);
        return  {
        title: data.items[0]?.snippet?.localized?.title,
        thumbnails: data.items[0]?.snippet?.thumbnails,
        country: data.items[0]?.snippet?.country,
        uploads_id: data.items[0]?.contentDetails?.relatedPlaylists?.uploads,
        statistics: data.items[0]?.statistics,
        };
    }


    /**
     * Get Channel videos By channel Uploads ID
     * @param {string} uploads_id The channel Uploads ID
     * @param {Array} videos an empty array
     * @returns {Promise<?videoDetails>}
     * @example
     */

    public async videosList (uploads_id: string ,videos: [videoDetails]): Promise<[videoDetails]>  {
        console.info('Fetching Video List...')

        const listUrl = `${this.PLAYLIST_URL}playlistId=${uploads_id}&part=snippet&maxResults=50&key=${this.API_KEY}`

        let listDetails: listDetails = await this.getList(listUrl);

        await this.getVideos(videos, listDetails);
        console.info(`Fetching videos in progress... ${videos.length} videos fetched`)

        while (listDetails.nextPageToken) {
            listDetails = await this.getList(listUrl, listDetails.nextPageToken);
            await this.getVideos(videos, listDetails);
            console.info(`Fetching videos in progress... ${videos.length} videos fetched`)
        }
        console.info('Videos fetched successfully');
        return videos;
    }

    /**
     *
     * Get Video Details by ID
     * @param {string} video_id The Video ID
     * @returns {Promise<?videoDetails>}
     * @example
     */

    public async videoInfo (video_id: string): Promise<videoDetails> {
        const videoUrl = `${this.VIDEO_URL}part=snippet,statistics,contentDetails&id=${video_id}&key=${this.API_KEY}`;
        const data = await this.getData(videoUrl);
        return {
            title: data.items[0]?.snippet?.title,
            video_id: video_id,
            thumbnails: data.items[0]?.snippet?.thumbnails,
            statistics: data.items[0]?.statistics
        }
    }

}

