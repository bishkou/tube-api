<h1 align="center">Welcome to tube-api 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/tube-api" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/tube-api.svg">
  </a>
  <a href="https://github.com/bishkou/tube-api#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/bishkou/tube-api/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/bishkou/tube-api/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/bishkou/tube-api" />
  </a>
</p>

* **Check a Password against 613,584,246 real world passwords previously exposed in data breaches.**

* **Check if a Password has been leaked before**
* **Check if a Password is Strong**


### 🏠 [Homepage](https://github.com/bishkou/tube-api)

## Install

```sh
npm i tube-api
```

## Get Channel details by ID

```ts
/** channelDetails fetchs the api for channel info **/
import { Youtube } from 'tube-api';

const YOUTUBE_API_KEY = '' // your youtube_api_key
const ytube = new Youtube(YOUTUBE_API_KEY);


/**
 * @param {string} channelId 
 * @example
 * Channel URL: https://www.youtube.com/channel/UCn8zNIfYAQNdrFRrr8oibKw
 * channelId is UCn8zNIfYAQNdrFRrr8oibKw 
 */
const details = await ytube.channelDetails('UCn8zNIfYAQNdrFRrr8oibKw')

console.log(details);
/**
{
  title: 'freeCodeCamp.org',
  thumbnails: {
    default: {
      url: 'https://yt3.ggpht.com/ytc/AAUvwnifaQZvAunS0OFb2y_cieoVjLCVjqQW8Exf3BC1gg=s88-c-k-c0x00ffffff-no-rj',
      width: 88,
      height: 88
    },
    medium: {
      url: 'https://yt3.ggpht.com/ytc/AAUvwnifaQZvAunS0OFb2y_cieoVjLCVjqQW8Exf3BC1gg=s240-c-k-c0x00ffffff-no-rj',
      width: 240,
      height: 240
    },
    high: {
      url: 'https://yt3.ggpht.com/ytc/AAUvwnifaQZvAunS0OFb2y_cieoVjLCVjqQW8Exf3BC1gg=s800-c-k-c0x00ffffff-no-rj',
      width: 800,
      height: 800
    }
  },
  country: 'US',
  uploads_id: 'UU8butISFwT-Wl7EV0hUK0BQ',
  statistics: {
    viewCount: '177010008',
    subscriberCount: '3480000',
    hiddenSubscriberCount: false,
    videoCount: '1253'
  }
}
**/

```

## Fetch Video List of the Channel
***NOTE*** :
Calling this function might **take some time** depending on how many videos a channel has,
generally if it's below 50 it will be fast.

```ts
/** videosList fetch the api for the list of video on the channel **/
import { Youtube } from 'tube-api';

const YOUTUBE_API_KEY = '' // your youtube_api_key
const ytube = new Youtube(YOUTUBE_API_KEY);

/**
 * @param {string} channelId 
 * @example
 * Channel URL: https://www.youtube.com/channel/UCn8zNIfYAQNdrFRrr8oibKw
 * channelId is UCn8zNIfYAQNdrFRrr8oibKw 
 */
const details = await ytube.channelDetails('UCn8zNIfYAQNdrFRrr8oibKw');


/**
 * @param {string} uploads_id Taken from the channelDetails result
 * @param {Array} empty array
 */
const videos = await ytube.videosList(details.uploads_id, [])

console.log(vidoes)
/**
[ {
    title: 'Tkinter Calculator - Python Basics with Sam',
    video_id: 'PkLwJicRI8s',
    thumbnails: {
      default: [Object],
      medium: [Object],
      high: [Object],
      standard: [Object],
      maxres: [Object]
    },
    statistics: {
      viewCount: '22679',
      likeCount: '797',
      dislikeCount: '10',
      favoriteCount: '0',
      commentCount: '26'
    }
  },
  ... 1153 more items
]

 **/

```

## Fetch Video Details by ID

```ts
/** videoInfo fetchs the api for the video details **/
import { Youtube } from 'tube-api';

const YOUTUBE_API_KEY = '' // your youtube_api_key
const ytube = new Youtube(YOUTUBE_API_KEY);

/**
 * @param {string} videoId
 * @example
 * Video URL: https://www.youtube.com/watch?v=RBSGKlAvoiM
 * videoId is RBSGKlAvoiM 
 */
const video = await this.yt.videoInfo('RBSGKlAvoiM');


/**
{
  title: 'Data Structures Easy to Advanced Course - Full Tutorial from a Google Engineer',
  video_id: 'RBSGKlAvoiM',
  thumbnails: {
    default: {
      url: 'https://i.ytimg.com/vi/RBSGKlAvoiM/default.jpg',
      width: 120,
      height: 90
    },
    medium: {
      url: 'https://i.ytimg.com/vi/RBSGKlAvoiM/mqdefault.jpg',
      width: 320,
      height: 180
    },
    high: {
      url: 'https://i.ytimg.com/vi/RBSGKlAvoiM/hqdefault.jpg',
      width: 480,
      height: 360
    },
    standard: {
      url: 'https://i.ytimg.com/vi/RBSGKlAvoiM/sddefault.jpg',
      width: 640,
      height: 480
    },
    maxres: {
      url: 'https://i.ytimg.com/vi/RBSGKlAvoiM/maxresdefault.jpg',
      width: 1280,
      height: 720
    }
  },
  statistics: {
    viewCount: '2748752',
    likeCount: '67222',
    dislikeCount: '655',
    favoriteCount: '0',
    commentCount: '1541'
  }
}

 **/

```

## HOW DOES THIS WORK


## Author

👤 **Chedy**

* Github: [@bishkou](https://github.com/bishkou)
* LinkedIn: [@chedyhm](https://linkedin.com/in/chedyhm)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/bishkou/password-checker/issues). You can also take a look at the [contributing guide](https://github.com/bishkou/password-checker/blob/master/CONTRIBUTING.md).

## Show your support

Give a STAR if this project helped you!

## Source of the data

* All thanks to Youtube API Documentation.
* LINK: [YOUTUBE API V3](https://developers.google.com/youtube/v3)


## 📝 License

* Copyright © 2021 [Chedy](https://github.com/bishkou).
* This project is [MIT](https://github.com/bishkou/tube_api/blob/master/LICENSE) licensed.

***
_This README was generated with by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
