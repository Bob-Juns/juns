import axios from 'axios';
import axiosRequest from '@utils/axiosRequest';

const UPLOAD_COVER = 'upload_cover' as const;
const DELETE_COVER = 'delete_cover' as const;
const GET_COVER = 'get_cover' as const;
const RESET_COVER = 'reset_cover' as const;

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

export const deleteCover = (fileName: { fileName: string }) => {
  const payload = axiosRequest(instance, 'post', '/cover-delete', fileName, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return {
    type: DELETE_COVER,
    payload,
  };
};

export const getCover = (payload: Cover) => {
  return {
    type: GET_COVER,
    payload,
  };
};

export const resetCover = () => {
  return { type: RESET_COVER };
};

const initialState: _File = {
  cover: {
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

    case DELETE_COVER:
    case RESET_COVER:
      return {
        ...state,
        cover: initialState.cover,
      };

    default:
      return state;
  }
};
