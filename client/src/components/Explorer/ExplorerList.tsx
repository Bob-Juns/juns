import React, { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';

import styled from 'styled-components';

const ExplorerListItem = lazy(
  () =>
    import(
      /* webpackChunkName: "ExplorerListItem" */ '@components/Explorer/ExplorerListItem'
    ),
);
import ListItemSkeleton from '@components/Skeleton/ListItem/ListItemSkeleton';

type Props = {
  menus: Menu;
  channels: Channel;
};

const ExplorerList = ({ menus, channels }: Props) => {
  const navigate = useNavigate();

  return (
    <Container>
      {channels.allChannels
        .filter((channel: CurrentChannel) =>
          menus.categoryMenu.currentCategoryMenu === '전체'
            ? channels.allChannels
            : channel.category === menus.categoryMenu.currentCategoryMenu,
        )
        .map((channel: CurrentChannel) => (
          <Suspense key={channel.channelId} fallback={<ListItemSkeleton />}>
            <ExplorerListItem
              key={channel.channelId}
              onClick={() => navigate(`/channel/${channel.channelId}`)}
              src={channel.channelCover.filePath}
              category={channel.category}
              title={channel.channelTitle}
            />
          </Suspense>
        ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 6.75rem;
  padding: 1rem 0.5rem;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-row-gap: 1rem;
  grid-column-gap: 0.375rem;

  ${(props) =>
    props.theme.device('tablet')(`
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 1.25rem;
  grid-column-gap: 0.75rem;
  `)}
`;

const mapStateToProps = (state: { menus: Menu; channels: Channel }) => ({
  menus: state.menus,
  channels: state.channels,
});

export default connect(mapStateToProps)(ExplorerList);
