import React from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';

import styled from 'styled-components';
import { useMedia } from 'use-media';

type Props = {
  users: User;
  channels: Channel;
};

const RandomChannels = ({ users, channels }: Props) => {
  const navigate = useNavigate();
  const isLarge = useMedia({ minWidth: 768 });

  return (
    <Container>
      <Header>
        <Bold>{users.currentUser.userName ?? 'Guest'}</Bold>님, 오늘은 이 영상
        어때요?
      </Header>
      <Wrapper>
        {channels.randomChannels
          .slice(0, isLarge ? 5 : 4)
          .map((channel: CurrentChannel) => (
            <Content
              key={channel.channelId}
              onClick={() => navigate(`/channel/${channel.channelId}`)}
            >
              <Cover src={channel.channelCover.filePath} />
              <Title>{channel.channelTitle}</Title>
            </Content>
          ))}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 1rem;
`;

const Wrapper = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-row-gap: 1.125rem;
  grid-column-gap: 0.375rem;

  ${(props) =>
    props.theme.device('tablet')(`
  grid-template-columns: repeat(5, 1fr);
  `)}
`;

const Header = styled.div`
  width: 100%;
  margin-bottom: 0.75rem;

  font-size: 0.875rem;
  color: ${(props) => props.theme.color.green};

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 1.125rem;
  `)}
`;

const Bold = styled.span`
  font-weight: 700;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  cursor: pointer;
`;

const Cover = styled.div<{ src: string }>`
  width: 100%;
  height: 0;
  padding-top: 133.34%;
  margin-bottom: 0.375rem;

  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center center;

  box-shadow: ${(props) => props.theme.boxShadow.primary};

  border-radius: 0.375rem;
`;

const Title = styled.div`
  width: 100%;
  color: ${(props) => props.theme.color.green};
  font-size: 0.625rem;
  font-weight: 700;

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 0.875rem;
  `)}
`;

const mapStateToProps = (state: { users: User; channels: Channel }) => ({
  users: state.users,
  channels: state.channels,
});

export default connect(mapStateToProps)(RandomChannels);
