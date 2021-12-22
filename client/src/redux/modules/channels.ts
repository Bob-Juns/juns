import axios from 'axios';
import axiosRequest from '@utils/axiosRequest';

const GET_CHANNELS = 'get_channels' as const;
const GET_CHANNEL = 'get_channel' as const;
const CREATE_CHANNEL = 'create_channel' as const;
const DELETE_CHANNEL = 'delete_channel' as const;
const UPDATE_CHANNEL = 'update_channel' as const;
const GET_FILTERED_CHANNELS = 'get_filtered_channels' as const;
const GET_SEARCHED_CHANNELS = 'get_searched_channels' as const;
const GET_CHANNEL_INTERSECTION = 'get_channel_intersection' as const;

const instance = axios.create({
  baseURL: '/api/channel',
  withCredentials: true,
});

export const getChannels = () => {
  const payload = axiosRequest(instance, 'get', '/channels');

  return {
    type: GET_CHANNELS,
    payload,
  };
};

export const getChannel = (channelId: string) => {
  const payload = axiosRequest(instance, 'get', `/${channelId}`);

  return {
    type: GET_CHANNEL,
    payload,
  };
};

export const createChannel = (createData: CurrentChannel) => {
  const payload = axiosRequest(instance, 'post', '/create', createData);

  return {
    type: CREATE_CHANNEL,
    payload,
  };
};

export const updateChannel = (
  channelId: string,
  updateData: CurrentChannel,
) => {
  const payload = axiosRequest(
    instance,
    'put',
    `/update/${channelId}`,
    updateData,
  );

  return {
    type: UPDATE_CHANNEL,
    payload,
  };
};

export const deleteChannel = (channelId: string) => {
  const payload = axiosRequest(instance, 'delete', `/delete/${channelId}`);

  return {
    type: DELETE_CHANNEL,
    payload,
  };
};

export const getFilteredChannels = (payload: string) => {
  return {
    type: GET_FILTERED_CHANNELS,
    payload,
  };
};

export const getSearchedChannels = (payload: string) => {
  return {
    type: GET_SEARCHED_CHANNELS,
    payload,
  };
};

export const getChannelIntersection = () => {
  return {
    type: GET_CHANNEL_INTERSECTION,
  };
};

const initialState: Channel = {
  currentChannel: {
    category: '',
    channelId: '',
    channelTitle: '',
    channelCover: {
      fileName: '',
      filePath: '',
    },
    channelProducer: '',
    channelCast: [],
    channelPlaylist: [],
  },
  allChannels: [],
  filteredChannels: [],
  searchedChannels: [],
  intersection: [],
};

export const channelReducer = (state = initialState, action: ChannelAction) => {
  switch (action.type) {
    case GET_CHANNELS:
      return {
        ...state,
        allChannels: action.payload,
        filteredChannels: action.payload,
      };

    case GET_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload,
      };

    case CREATE_CHANNEL:
    case DELETE_CHANNEL:
    case UPDATE_CHANNEL:
      return { ...state };

    case GET_FILTERED_CHANNELS:
      return {
        ...state,
        filteredChannels:
          action.payload === '전체'
            ? state.allChannels
            : state.allChannels.filter(
                (channel: CurrentChannel) =>
                  channel.category === action.payload,
              ),
      };

    case GET_SEARCHED_CHANNELS:
      return {
        ...state,
        searchedChannels:
          action.payload == ''
            ? state.allChannels
            : state.allChannels.filter((channel: CurrentChannel) => {
                return (
                  channel.channelTitle.match(action.payload.toString()) ||
                  channel.channelId.match(action.payload.toString())
                );
              }),
      };

    case GET_CHANNEL_INTERSECTION:
      return {
        ...state,
        intersection:
          state.filteredChannels.filter((channel: CurrentChannel) =>
            state.searchedChannels.includes(channel),
          ).length > 0
            ? state.filteredChannels.filter((channel: CurrentChannel) =>
                state.searchedChannels.includes(channel),
              )
            : state.filteredChannels,
      };

    default:
      return state;
  }
};
