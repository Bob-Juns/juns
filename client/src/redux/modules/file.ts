import axios from 'axios';
import axiosRequest from '@utils/axiosRequest';

const UPLOAD_COVER = 'upload_cover' as const;
const UPLOAD_BANNER = 'upload_banner' as const;
const DELETE_IMAGE = 'delete_image' as const;
const GET_COVER = 'get_cover' as const;
const RESET_COVER = 'reset_cover' as const;
const GET_BANNER_IMAGE = 'get_banner_image' as const;
const RESET_BANNER_IMAGE = 'reset_banner_image' as const;

const instance = axios.create({
  baseURL: '/api/file',
  withCredentials: true,
});

export const uploadCover = (file: FormData) => {
  const payload = axiosRequest(instance, 'post', '/cover-upload', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return {
    type: UPLOAD_COVER,
    payload,
  };
};

export const uploadBanner = (file: FormData) => {
  const payload = axiosRequest(instance, 'post', '/banner-upload', file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return {
    type: UPLOAD_BANNER,
    payload,
  };
};

export const deleteImage = (fileName: string) => {
  const payload = axiosRequest(
    instance,
    'post',
    '/delete',
    { fileName: fileName },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return {
    type: DELETE_IMAGE,
    payload,
  };
};

export const getCover = (payload: Image) => {
  return {
    type: GET_COVER,
    payload,
  };
};

export const resetCover = () => {
  return { type: RESET_COVER };
};

export const getBannerImage = (payload: Image) => {
  return {
    type: GET_BANNER_IMAGE,
    payload,
  };
};

export const resetBannerImage = () => {
  return { type: RESET_BANNER_IMAGE };
};

const initialState: _File = {
  cover: {
    fileName: '',
    filePath: '',
  },
  banner: {
    fileName: '',
    filePath: '',
  },
};

export const fileReducer = (state = initialState, action: FileAction) => {
  switch (action.type) {
    case UPLOAD_COVER:
    case GET_COVER:
      return {
        ...state,
        cover: action.payload,
      };

    case GET_BANNER_IMAGE:
      return {
        ...state,
        banner: action.payload,
      };

    case DELETE_IMAGE:
      return {
        ...state,
      };
    case RESET_COVER:
      return {
        ...state,
        cover: initialState.cover,
      };

    case RESET_BANNER_IMAGE:
      return {
        ...state,
        banner: initialState.banner,
      };

    case UPLOAD_BANNER:
      return {
        ...state,
        banner: action.payload,
      };

    default:
      return state;
  }
};
