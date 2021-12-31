import React, { Dispatch, useState } from 'react';

import { connect } from 'react-redux';
import { actions } from 'store';

import ChannelCreateButton from './ChannelCreateButton';
import ChannelSearch from './ChannelSearch';
import ChannelDropdown from './ChannelDropdown';

import styled from 'styled-components';

type Props = {
  categoryMenu: CategoryMenu;
  getFilteredChannels: (payload: FilterState) => void;
  selectCategoryMenu: (payload: CurrentCategoryMenu) => void;
};

const ChannelFilter = ({
  categoryMenu,
  getFilteredChannels,
  selectCategoryMenu,
}: Props) => {
  const [input, setInput] = useState<string>('');

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    getFilteredChannels({
      query: event.currentTarget.value,
      filter:
        categoryMenu.currentCategoryMenu === '전체'
          ? '카테고리'
          : categoryMenu.currentCategoryMenu,
    });
    setInput(event.currentTarget.value);
  };

  const onSelectCategory = (filter: string) => {
    selectCategoryMenu(filter);
    getFilteredChannels({
      query: input,
      filter: filter === '전체' ? '카테고리' : filter,
    });
  };

  return (
    <Container>
      <ChannelCreateButton />
      <ChannelSearch input={input} onChangeInput={onChangeInput} />
      <ChannelDropdown onSelectCategory={onSelectCategory} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const mapStateToProps = (state: { menus: { categoryMenu: CategoryMenu } }) => ({
  categoryMenu: state.menus.categoryMenu,
});

const mapDispatchToProps = (
  dispatch: Dispatch<ChannelAction | MenuAction>,
) => ({
  getFilteredChannels: (payload: FilterState) =>
    dispatch(actions.getFilteredChannels(payload)),
  selectCategoryMenu: (payload: CurrentCategoryMenu) =>
    dispatch(actions.selectCategoryMenu(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelFilter);
