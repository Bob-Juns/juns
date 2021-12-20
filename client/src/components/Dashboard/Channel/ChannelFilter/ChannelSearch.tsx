import React, { Dispatch, useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';
import searchIcon from '@assets/icons/search.svg';

type Props = {
  categoryMenu: CategoryMenu;
  getSearchedChannels: (payload: string) => any;
  intersection: AllChannels;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const ChannelSearch = ({
  categoryMenu,
  getSearchedChannels,
  intersection,
  setMessage,
}: Props) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (intersection.length < 1) {
      setMessage('일치하는 채널이 없습니다.');
    } else {
      setMessage('');
    }
    getSearchedChannels(input);
  }, [categoryMenu.currentCategoryMenu]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.length > 0 && intersection.length < 1) {
      setMessage('일치하는 채널이 없습니다.');
    } else {
      setMessage('');
    }
    getSearchedChannels(event.currentTarget.value.toLowerCase());
    setInput(event.currentTarget.value);
  };

  return (
    <Container>
      <Wrapper>
        <Icon />
      </Wrapper>
      <Input
        type="search"
        name="search"
        value={input}
        onChange={onChangeInput}
        inputMode="search"
        placeholder="검색"
      />
    </Container>
  );
};

const Container = styled.div`
  height: 2rem;
  display: flex;
  position: relative;
  border-radius: 3.125rem;
  box-shadow: ${(props) => props.theme.boxShadow.primary};
`;

const Wrapper = styled.div`
  width: 2.2rem;
  height: 2rem;

  background-color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 3.125rem 0 0 3.125rem;
`;

const Icon = styled(searchIcon)`
  width: 0.75rem;
  height: 0.75rem;

  color: ${(props) => props.theme.color.purple};
`;

const Input = styled.input`
  width: 3rem;
  height: 2rem;
  padding-right: 0.75rem;

  background-color: #fff;

  font-size: 0.75rem;

  border-radius: 0 3.125rem 3.125rem 0;
  transition: width 0.3s ease-in-out;

  &:focus {
    width: 7.5rem;
  }
`;

const mapStateToProps = (state: { menus: { categoryMenu: CategoryMenu } }) => ({
  categoryMenu: state.menus.categoryMenu,
});

const mapDispatchToProps = (dispatch: Dispatch<ChannelAction>) => ({
  getSearchedChannels: (payload: string) =>
    dispatch(actions.getSearchedChannels(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelSearch);
