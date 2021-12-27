type CurrentChannel = {
  category: string;
  channelId: string;
  channelTitle: string;
  channelCover: {
    fileName: string;
    filePath: string;
  };
  channelProducer: string;
  channelCast: string[];
  channelPlaylist: {
    playlistTitle: string;
    playlistId: string;
  }[];
};

type AllChannels = CurrentChannel[];

interface Channel {
  currentChannel: CurrentChannel;
  allChannels: AllChannels;
  filteredChannels: AllChannels;
  searchedChannels: AllChannels;
}

interface GetChannels extends Action {
  payload: Promise<AllChannels>;
}

interface GetChannel extends Action {
  payload: Promise<CurrentChannel>;
}

interface GetFilteredChannels extends Action {
  payload: FilterState;
}

type ChannelAction = GetChannels | GetChannel | MessageAction | Action;
