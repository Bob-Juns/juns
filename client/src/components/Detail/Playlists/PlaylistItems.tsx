import React, { Dispatch } from 'react';

import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';

type Props = {
  details: Detail;
  getVideo: (videoId: string) => any;
};

const PlaylistItems = ({ details, getVideo }: Props) => {
  const uniqueList = details.playlistItems.items?.filter(
    (item: Items, index: number) => {
      return (
        details.playlistItems.items?.findIndex(
          (_item: Items, _index: number) => {
            return item.snippet.title === _item.snippet.title;
          },
        ) === index
      );
    },
  );

  const onClickItem = (videoId: string) => {
    getVideo(videoId).then(() => window.scrollTo(0, 0));
  };
  return (
    <Container>
      {uniqueList
        .filter((item: Items) => item.snippet.title !== 'Private video')
        .map((item: Items) => (
          <Wrapper
            key={item.id}
            onClick={() => onClickItem(item.snippet.resourceId.videoId)}
          >
            <Thumbnail
              src={
                item.snippet.thumbnails.high
                  ? item.snippet.thumbnails.high?.url
                  : item.snippet.thumbnails.default?.url
              }
              show={
                item.snippet.resourceId.videoId === details.video.items[0]?.id
              }
            />
            <Info>
              <Title>{item.snippet.title}</Title>
              <Date>{item.snippet.publishedAt.slice(0, 10)}</Date>
              <Desc>{item.snippet.description}</Desc>
            </Info>
          </Wrapper>
        ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  cursor: pointer;
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;

  display: flex;
  justify-content: space-between;
`;

const Thumbnail = styled.div<{ src: string; show: boolean }>`
  width: 35%;
  height: 0;
  padding-top: 19.69%;

  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center center;

  box-shadow: ${(props) => props.theme.boxShadow.primary};

  position: relative;

  ${(props) =>
    props.show &&
    `
  &: after {
    content: 'playing...';

    width: 100%;
    height: 100%;

    color: #fff;
    background-color: rgba(0, 0, 0, 0.7);

    font-size: 0.625rem;
    font-weight: 700;

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  `}
`;

const Info = styled.div`
  width: 62%;

  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  width: 100%;

  color: ${(props) => props.theme.color.purple};

  font-size: 0.875rem;
  font-weight: 700;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Date = styled.time`
  width: 100%;
  margin-top: 0.375rem;
  font-size: 0.75rem;
`;

const Desc = styled.div`
  width: 100%;
  font-size: 0.75rem;
  margin-top: auto;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const mapStateToProps = (state: { details: Detail }) => ({
  details: state.details,
});

const mapDispatchToProps = (dispatch: Dispatch<DetailAction>) => ({
  getVideo: (videoId: string) => dispatch(actions.getVideo(videoId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistItems);
