import React, { Dispatch, useEffect, useRef } from 'react';

import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';
import chevronIcon from '@assets/icons/chevron.svg';

type Props = {
  details: Detail;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getPlaylist: (payload: CurrentPlaylist) => void;
  getPlaylistItems: (playlistId: string) => any;
  getVideo: (videoId: string) => void;
};

const PlaylistMenu = ({
  details,
  isMenuOpen,
  setIsMenuOpen,
  getPlaylist,
  getPlaylistItems,
  getVideo,
}: Props) => {
  const focusRef = useRef<HTMLDivElement>(null);

  const onClickOutside = (event: any) => {
    if (focusRef.current && !focusRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    isMenuOpen && document.addEventListener('click', onClickOutside, true);
    return () => document.removeEventListener('click', onClickOutside, true);
  }, [focusRef, isMenuOpen]);

  const onClickMenu = (playlist: CurrentPlaylist) => {
    details.currentPlaylist !== playlist &&
      (getPlaylist(playlist),
      getPlaylistItems(playlist.playlistId).then(
        (response: { payload: { items: Items[] } }) => (
          getVideo(response.payload.items[0].snippet.resourceId.videoId),
          window.scrollTo(0, 0)
        ),
      ));
    return false;
  };

  return (
    <Container>
      <Wrapper ref={focusRef} onClick={() => setIsMenuOpen((prev) => !prev)}>
        <Selected>
          <Current>{details.currentPlaylist.playlistTitle}</Current>
          <Chevron open={isMenuOpen} />
        </Selected>
      </Wrapper>
      <List open={isMenuOpen}>
        {details.allPlaylists.map((playlist: CurrentPlaylist) => (
          <Menu
            key={playlist.playlistId}
            onClick={() => {
              onClickMenu(playlist);
            }}
          >
            {playlist.playlistTitle}
          </Menu>
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
  position: sticky;
  top: calc(100vw * 9 / 16 + 3.75rem);

  cursor: pointer;
  z-index: 90;

  ${(props) =>
    props.theme.device('tablet')(`
    top: calc(700px * 9 / 16 + 3.75rem);
    `)}
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Selected = styled.div`
  width: 100%;
  padding: 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${(props) => props.theme.color.gray.light};

  box-shadow: ${(props) => props.theme.boxShadow.primary};
`;

const Current = styled.div`
  font-size: 0.75rem;
  font-weight: 700;

  ${(props) =>
    props.theme.device('tablet')(`
    font-size: 1rem;
    `)}
`;

const Chevron = styled(chevronIcon)<{ open: boolean }>`
  width: 0.75rem;
  transform: ${(props) => (props.open ? 'rotate(0)' : 'rotate(180deg)')};
  transition: all 0.3s linear;

  ${(props) =>
    props.theme.device('tablet')(`
    width: 1rem;
    `)}
`;

const List = styled.ul<{ open: boolean }>`
  width: 100%;

  display: flex;
  flex-direction: column;

  position: absolute;

  background-color: #fff;
  box-shadow: ${(props) => props.theme.boxShadow.primary};

  visibility: ${(props) => (props.open ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.open ? '1' : '0')};
  transform: ${(props) => (props.open ? 'translateY(0)' : 'translateY(-1rem)')};
  transition: all 0.3s linear;
`;

const Menu = styled.li`
  padding: 1rem;

  background-color: ${(props) => props.theme.color.gray.light};
  font-size: 0.75rem;
  font-weight: 700;

  &: hover {
    color: ${(props) => props.theme.color.purple};
  }

  ${(props) =>
    props.theme.device('tablet')(`
    font-size: 1rem;
    `)}
`;

const mapStateToProps = (state: { details: Detail }) => ({
  details: state.details,
});

const mapDispatchToProps = (dispatch: Dispatch<DetailAction>) => ({
  getPlaylist: (payload: CurrentPlaylist) =>
    dispatch(actions.getPlaylist(payload)),
  getPlaylistItems: (playlistId: string) =>
    dispatch(actions.getPlaylistItems(playlistId)),
  getVideo: (videoId: string) => dispatch(actions.getVideo(videoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistMenu);
