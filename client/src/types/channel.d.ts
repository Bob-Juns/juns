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
}

interface GetChannels extends Action {
  payload: Promise<AllChannels>;
}

interface GetChannel extends Action {
  payload: Promise<CurrentChannel>;
}

type CreateChannel = MessageAction;
type DeleteChannel = MessageAction;
type UpdateChannel = MessageAction;

type ChannelAction =
  | GetChannels
  | GetChannel
  | CreateChannel
  | DeleteChannel
  | UpdateChannel;
