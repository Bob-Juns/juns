import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';

import styled from 'styled-components';
import ReactPlayer from 'react-player/lazy';

type Props = {
  details: Detail;
};
const Video = ({ details }: Props) => {
  const [videoId, setVideoId] = useState<string>('');

  useEffect(() => {
    details.video.items.length >= 1 && setVideoId(details.video.items[0].id);
  }, [details.video.items]);

  return (
    <Background>
      <Container>
        <Player
          width="100%"
          height="100%"
          controls
          url={`https://www.youtube.com/watch?v=${videoId}`}
        />
      </Container>
    </Background>
  );
};

const Background = styled.div`
  width: 100vw;
  height: calc(100vw * 9 / 16);

  background-color: ${(props) => props.theme.color.gray.light};

  position: fixed;
  top: 3.75rem;
  left: 0;

  z-index: 90;

  ${(props) =>
    props.theme.device('tablet')(`
  height: calc(700px * 9 /16);
  `)}
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Player = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;

  ${(props) =>
    props.theme.device('tablet')(`
  max-width: 700px;
  max-height: calc(700px * 9 /16);

  left: 50%;
  transform: translateX(-50%);
  `)}
`;

const mapStateToProps = (state: { details: Detail }) => ({
  details: state.details,
});

export default connect(mapStateToProps)(Video);
