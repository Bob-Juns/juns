import React, { Dispatch, lazy, Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';

import styled from 'styled-components';
import chevronIcon from '@assets/icons/chevron.svg';

import Slider from 'react-slick';
import { actions } from 'store';

const HomeListItemContent = lazy(
  () =>
    import(
      /* webpackChunkName: "HomeListItem" */ '@components/Home/HomeList/HomeListItemContent'
    ),
);

import ListItemSkeleton from '@components/Skeleton/ListItem/ListItemSkeleton';

type Props = {
  head: string;
  category: string;
  channels: Channel;
  selectCategoryMenu: (payload: string) => void;
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
    slidesToShow: 6.5,
    slidesToScroll: 1,
    infinite: false,
    draggable: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 4.5,
          slideToScroll: 2,
        },
      },
    ],
  };

  const onClickHeader = async (category: string) => {
    await selectCategoryMenu(category);
    navigate('/explorer');
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
              <Suspense key={channel.channelId} fallback={<ListItemSkeleton />}>
                <HomeListItemContent
                  onMouseMove={() => setMouseMove(true)}
                  onMouseDown={() => setMouseMove(false)}
                  onMouseUp={() =>
                    !mouseMove && navigate(`/channel/${channel.channelId}`)
                  }
                  src={channel.channelCover.filePath}
                  title={channel.channelTitle}
                  category={category}
                />
              </Suspense>
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
  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 1rem;
  `)}
`;

const Chevron = styled(chevronIcon)`
  width: 0.625rem;
  transform: rotate(90deg);

  ${(props) =>
    props.theme.device('tablet')(`
  width: 0.875rem;
  `)}
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

const mapStateToProps = (state: { channels: Channel }) => ({
  channels: state.channels,
});

const mapDispatchToProps = (dispatch: Dispatch<MenuAction>) => ({
  selectCategoryMenu: (payload: string) =>
    dispatch(actions.selectCategoryMenu(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeListItem);
