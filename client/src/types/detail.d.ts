type Video = {
  etag: string;
  items: {
    etag: string;
    id: string;
    kind: string;
    snippet: {
      categoryId: string;
      channelId: string;
      title: string;
      defaultAudioLanguage: string;
      description: string;
      liveBroadcastContent: string;
      localized: {
        description: string;
        title: string;
      };
      publishedAt: string;
      tags: string[];
      thumbnails: {
        default: {
          url: string;
          width: string;
          height: string;
        };
        high?: {
          url: string;
          width: string;
          height: string;
        };
        maxres?: {
          url: string;
          width: string;
          height: string;
        };
        medium?: {
          url: string;
          width: string;
          height: string;
        };
        standard?: {
          url: string;
          width: string;
          height: string;
        };
      };
    };
    statistics: {
      commentCount: string;
      dislikeCount: string;
      favoriteCount: string;
      likeCount: string;
      viewCount: string;
    };
  }[];
  kind: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
};

type Items = {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: string;
        height: string;
      };
      high?: {
        url: string;
        width: string;
        height: string;
      };
      maxres?: {
        url: string;
        width: string;
        height: string;
      };
      medium?: {
        url: string;
        width: string;
        height: string;
      };
      standard?: {
        url: string;
        width: string;
        height: string;
      };
    };
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: string;
      videoId: string;
    };
    videoOwnerChannelId: string;
    videoOwnerChannelTitle: string;
  };
};

type PlaylistItems = {
  kind: string;
  etag: string;
  id: string;
  nextPageToken?: string;
  items: Items[];
  pageInfo?: {
    resultsPerPage: number;
    totalResults: number;
  };
};

type CurrentPlaylist = {
  playlistTitle: string;
  playlistId: string;
};

type AllPlaylists = CurrentPlaylist[];

interface Detail {
  video: Video;
  currentPlaylist: CurrentPlaylist;
  allPlaylists: AllPlaylists;
  playlistItems: PlaylistItems;
}

type DetailAction = MessageAction | Action;
