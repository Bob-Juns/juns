import axios from 'axios';
import axiosRequest from '@utils/axiosRequest';

const GET_PLAYLISTS = 'get_playlists' as const;
const GET_PLAYLIST = 'get_playlist' as const;
const GET_PLAYLIST_ITEMS = 'get_playlist_items' as const;
const GET_VIDEO = 'get_video' as const;
const RESET_DETAIL = 'reset_detail' as const;

const instance = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPlaylists = (payload: AllPlaylists) => {
  return {
    type: GET_PLAYLISTS,
    payload,
  };
};

export const getPlaylist = (payload: CurrentPlaylist) => {
  return {
    type: GET_PLAYLIST,
    payload,
  };
};

export const getPlaylistItems = (playlistId: string) => {
  const payload = axiosRequest(
    instance,
    'get',
    `/playlistItems?key=${process.env.GOOGLE_API_KEY}&part=snippet&playlistId=${playlistId}&maxResults=50`,
  );

  return {
    type: GET_PLAYLIST_ITEMS,
    payload,
  };
};

export const getVideo = (videoId: string) => {
  const payload = axiosRequest(
    instance,
    'get',
    `/videos?key=${process.env.GOOGLE_API_KEY}&part=id,snippet,statistics&id=${videoId}`,
  );

  return {
    type: GET_VIDEO,
    payload,
  };
};

export const resetDetail = () => {
  return {
    type: RESET_DETAIL,
  };
};

const initialState: Detail = {
  video: {
    etag: '',
    kind: '',
    items: [],
    pageInfo: {
      resultsPerPage: 0,
      totalResults: 0,
    },
  },
  currentPlaylist: {
    playlistTitle: '',
    playlistId: '',
  },
  allPlaylists: [],
  playlistItems: {
    kind: '',
    etag: '',
    id: '',
    items: [],
  },
};

export const detailReducer = (state = initialState, action: DetailAction) => {
  switch (action.type) {
    case GET_PLAYLISTS:
      return {
        ...state,
        allPlaylists: action.payload,
      };

    case GET_PLAYLIST:
      return {
        ...state,
        currentPlaylist: action.payload,
      };

    case GET_PLAYLIST_ITEMS:
      return {
        ...state,
        playlistItems: action.payload,
      };

    case GET_VIDEO:
      return {
        ...state,
        video: action.payload,
      };

    case RESET_DETAIL:
      return initialState;

    default:
      return state;
  }
};
