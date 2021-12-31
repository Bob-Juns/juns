import axios from 'axios';
import axiosRequest from '@utils/axiosRequest';

const GET_BANNERS = 'get_banners' as const;
const GET_BANNER = 'get_banner' as const;
const CREATE_BANNER = 'create_banner' as const;
const UPDATE_BANNER = 'update_banner' as const;
const DELETE_BANNER = 'delete_banner' as const;
const SEARCH_BANNER = 'search_banner' as const;

const instance = axios.create({
  baseURL: '/api/banner',
  withCredentials: true,
});

export const getBanners = () => {
  const payload = axiosRequest(instance, 'get', '/banners');

  return {
    type: GET_BANNERS,
    payload,
  };
};

export const getBanner = (bannerId: string) => {
  const payload = axiosRequest(instance, 'get', `/${bannerId}`);

  return {
    type: GET_BANNER,
    payload,
  };
};

export const createBanner = (createData: CurrentBanner) => {
  const payload = axiosRequest(instance, 'post', '/create', createData);

  return {
    type: CREATE_BANNER,
    payload,
  };
};

export const updateBanner = (bannerId: string, updateData: CurrentBanner) => {
  const payload = axiosRequest(
    instance,
    'put',
    `/update/${bannerId}`,
    updateData,
  );

  return {
    type: UPDATE_BANNER,
    payload,
  };
};

export const deleteBanner = (bannerId: string) => {
  const payload = axiosRequest(instance, 'delete', `/delete/${bannerId}`);

  return {
    type: DELETE_BANNER,
    payload,
  };
};

export const searchBanner = (payload: string) => {
  return {
    type: SEARCH_BANNER,
    payload,
  };
};

const initialState: Banner = {
  currentBanner: {
    bannerId: '',
    bannerTitle: '',
    bannerImage: {
      fileName: '',
      filePath: '',
    },
    bannerLink: '',
  },
  allBanners: [],
  searchedBanners: [],
};

export const bannerReducer = (state = initialState, action: BannerAction) => {
  switch (action.type) {
    case GET_BANNERS:
      return {
        ...state,
        allBanners: action.payload,
        searchedBanners: action.payload,
      };

    case GET_BANNER:
      return {
        ...state,
        currentBanner: action.payload,
      };

    case CREATE_BANNER:
    case UPDATE_BANNER:
    case DELETE_BANNER:
      return { ...state };

    case SEARCH_BANNER:
      return {
        ...state,
        searchedBanners:
          action.payload === ''
            ? state.allBanners
            : state.allBanners.filter((banner: CurrentBanner) => {
                return (
                  banner.bannerId.match(action.payload.toString()) ||
                  banner.bannerTitle.match(action.payload.toString())
                );
              }),
      };

    default:
      return state;
  }
};
