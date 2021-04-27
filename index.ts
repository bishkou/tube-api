import fetch from 'node-fetch';

import { contentDetails } from './interfaces/contentDetails-interface';
import { listDetails  } from './interfaces/listDetails-interface';
import { channelDetails } from './interfaces/channelDetails-interface';
import {videoDetails} from "./interfaces/videoDetails-interface";

export class Youtube {
    CHANNELS_URL = 'https://www.googleapis.com/youtube/v3/channels?';
    PLAYLIST_URL = 'https://www.googleapis.com/youtube/v3/playlistItems?';
    VIDEO_URL = 'https://www.googleapis.com/youtube/v3/videos?';

    constructor(private API_KEY: string) {
        // Checking if the API KEY provided is valid
        const testChannelId = 'UCZU5ofyBsEmVuKYrijLFxrg';
        const url = `${this.CHANNELS_URL}id=${testChannelId}&key=${this.API_KEY}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if(data.error){
                    // console.error(data.error?.message)
                    throw new Error(data.error?.message)
                }else {
                    console.info('Connected to Youtube API successfully');
                }
            })

    }

    getData(url: string): Promise<contentDetails> {
        return fetch(url)
            .then((response: { json: () => any; }) => response.json())
            .then(data => {
                if (data.pageInfo.totalResults === 0) {
                    // console.error(data.error?.message)
                    return Promise.reject(new Error(`Wrong ID`))
                    // throw new Error(`Wrong ID`);
                } else {
                    return data;
                }
            });
    }

    getList(url: string, pageToken?: string): Promise<listDetails> {
        return fetch(url + (pageToken ? `&pageToken=${pageToken}` : ''))
            .then((response: { json: () => any; }) => response.json())
            .then(data => {
                if(data.error){
                    // console.error(data.error?.message)
                    return Promise.reject(new Error(data.error?.message))
                }else {
                    return data;
                }
            })
    }

    async getVideos(videos: [videoDetails], listDetails: listDetails) {
        await Promise.all(listDetails.items.map( async data =>{
            const video_id = data.snippet?.resourceId?.videoId;
            const videoDetails = await this.videoInfo(video_id);

            videos.push(videoDetails)
        }));
    }


    async channelDetails(channel_id: string): Promise<channelDetails> {
        console.info('Fetching Channel Information...')

        // const channel_id = 'UCWphVpAsuxyZLw-u9b5A3Gg';
      const url = `${this.CHANNELS_URL}id=${channel_id}&part=contentDetails,snippet,statistics&key=${this.API_KEY}`;
        console.log(url)
      const data: contentDetails = await this.getData(url);
      return  {
        title: data.items[0]?.snippet?.localized?.title,
        thumbnails: data.items[0]?.snippet?.thumbnails,
        country: data.items[0]?.snippet?.country,
        uploads_id: data.items[0]?.contentDetails?.relatedPlaylists?.uploads,
        statistics: data.items[0]?.statistics,
      };
      // console.log(content);
    }

    // videos list
    async videosList (uploads_id: string ,videos: [videoDetails]): Promise<[videoDetails]>  {
        console.info('Fetching Video List...')

        // const uploads_id = 'UU8butISFwT-Wl7EV0hUK0BQ'
        const url3 = `${this.PLAYLIST_URL}playlistId=${uploads_id}&part=snippet&maxResults=50&key=${this.API_KEY}`
        console.log(url3)

        let listDetails: listDetails = await this.getList(url3);

        await this.getVideos(videos, listDetails);
        console.info(`Fetching videos in progress... ${videos.length} videos fetched`)

        while (listDetails.nextPageToken) {
            listDetails = await this.getList(url3, listDetails.nextPageToken);
            await this.getVideos(videos, listDetails);
            console.info(`Fetching videos in progress... ${videos.length} videos fetched`)
        }

        return videos;
        // console.log(url3)
        // console.log(videos)
    }

    async videoInfo (video_id: string): Promise<videoDetails> {
        console.info('Fetching Video Information...')
        const url2 = `${this.VIDEO_URL}part=snippet,statistics,contentDetails&id=${video_id}&key=${this.API_KEY}`;
        console.log(url2)
        const data = await this.getData(url2);
        return {
            title: data.items[0]?.snippet?.title,
            video_id: video_id,
            thumbnails: data.items[0]?.snippet?.thumbnails,
            statistics: data.items[0]?.statistics
        }
    }

}

