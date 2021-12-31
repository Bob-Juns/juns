import React, { Dispatch, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';

import styled from 'styled-components';
import chevronIcon from '@assets/icons/chevron.svg';

import Slider from 'react-slick';
import { actions } from 'store';

type Props = {
  head: string;
  category: string;
  channels: Channel;
  selectCategoryMenu: (payload: string) => any;
};

const HomeListItem = ({
  head,
  category,
  channels,
  selectCategoryMenu,
}: Props) => {
  const [mouseMove, setMouseMove] = useState<boolean>(false);
  const navigate = useNavigate();

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 4.5,
    slidesToScroll: 2,
    infinite: false,
    draggable: true,
  };

  const onClickHeader = (category: string) => {
    selectCategoryMenu(category).then(navigate('/channels'));
  };

  return (
    <Container>
      <Header category={category} onClick={() => onClickHeader(category)}>
        <Head>{head}</Head>
        <Chevron />
      </Header>
      <Wrapper>
        <CustomSlider {...settings}>
          {channels.allChannels
            .filter((channel: CurrentChannel) => channel.category === category)
            .map((channel: CurrentChannel) => (
              <Content
                key={channel.channelId}
                onMouseMove={() => setMouseMove(true)}
                onMouseDown={() => setMouseMove(false)}
                onMouseUp={() =>
                  !mouseMove && navigate(`/channel/${channel.channelId}`)
                }
              >
                <Cover src={channel.channelCover.filePath} />
                <Title category={category}>{channel.channelTitle}</Title>
              </Content>
            ))}
        </CustomSlider>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div<{ category: string }>`
  width: 100%;
  height: 0.75rem;
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) =>
    props.category === '드라마'
      ? props.theme.color.category.drama
      : props.category === '예능'
      ? props.theme.color.category.ent
      : props.category === '영화'
      ? props.theme.color.category.movie
      : props.category === '게임'
      ? props.theme.color.category.game
      : props.theme.color.category.etc};

  cursor: pointer;
`;

const Head = styled.div`
  font-size: 0.75rem;
  font-weight: 700;

  white-space: nowrap;
  text-overflow: ellipsis;

  overflow: hidden;
`;

const Chevron = styled(chevronIcon)`
  width: 0.625rem;
  transform: rotate(90deg);
`;

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const CustomSlider = styled(Slider)`
  .slick-track {
    display: flex;
  }

  .slick-slide {
    display: inline-block;
    margin-right: 0.375rem;
    outline: none;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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

const Title = styled.div<{ category: string }>`
  width: 100%;
  color: ${(props) =>
    props.category === '드라마'
      ? props.theme.color.category.drama
      : props.category === '예능'
      ? props.theme.color.category.ent
      : props.category === '영화'
      ? props.theme.color.category.movie
      : props.category === '게임'
      ? props.theme.color.category.game
      : props.theme.color.category.etc};

  font-size: 0.6rem;
  font-weight: 700;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const mapStateToProps = (state: { channels: Channel }) => ({
  channels: state.channels,
});

const mapDispatchToProps = (dispatch: Dispatch<MenuAction>) => ({
  selectCategoryMenu: (payload: string) =>
    dispatch(actions.selectCategoryMenu(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeListItem);
