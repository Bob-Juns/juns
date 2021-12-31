import React, { Dispatch, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { connect } from 'react-redux';
import { actions } from 'store';

import Page from '@components/Common/Layouts/Page';
import Video from '@components/Detail/Videos/Video';
import VideoInfo from '@components/Detail/Videos/VideoInfo';
import ChannelInfo from '@components/Detail/ChannelInfo/ChannelInfo';
import Playlist from '@components/Detail/Playlists/Playlist';

type Props = {
  getChannel: (channelId: string) => any;
  getPlaylists: (payload: AllPlaylists) => void;
  getPlaylist: (payload: CurrentPlaylist) => void;
  getPlaylistItems: (playlistId: string) => any;
  getVideo: (videoId: string) => void;
  resetDetail: () => void;
};
const Detail = ({
  getChannel,
  getPlaylists,
  getPlaylist,
  getPlaylistItems,
  getVideo,
  resetDetail,
}: Props) => {
  const { _channelId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    getChannel(_channelId as string).then(
      (response: { payload: CurrentChannel }) => {
        getPlaylists(response.payload.channelPlaylist);
        getPlaylist(response.payload.channelPlaylist[0]);
        getPlaylistItems(response.payload.channelPlaylist[0].playlistId).then(
          (res: { payload: PlaylistItems }) => {
            getVideo(res.payload.items[0].snippet.resourceId.videoId);
          },
        );
      },
    );
    return () => resetDetail();
  }, []);

  return (
    <Page>
      <Video />
      <VideoInfo />
      <ChannelInfo />
      <Playlist />
    </Page>
  );
};

const mapDispatchToProps = (
  dispatch: Dispatch<ChannelAction | DetailAction>,
) => ({
  getChannel: (channelId: string) => dispatch(actions.getChannel(channelId)),
  getPlaylists: (payload: AllPlaylists) =>
    dispatch(actions.getPlaylists(payload)),
  getPlaylist: (payload: CurrentPlaylist) =>
    dispatch(actions.getPlaylist(payload)),
  getPlaylistItems: (playlistId: string) =>
    dispatch(actions.getPlaylistItems(playlistId)),
  getVideo: (videoId: string) => dispatch(actions.getVideo(videoId)),
  resetDetail: () => dispatch(actions.resetDetail()),
});

export default connect(null, mapDispatchToProps)(Detail);
