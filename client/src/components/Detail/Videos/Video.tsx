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

  background-color: #fff;

  position: fixed;
  top: 3.75rem;

  z-index: 90;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Player = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`;

const mapStateToProps = (state: { details: Detail }) => ({
  details: state.details,
});

export default connect(mapStateToProps)(Video);
