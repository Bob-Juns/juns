import React, { Dispatch, useState, useEffect, useRef } from 'react';

import { connect } from 'react-redux';
import { actions } from 'store';

import styled from 'styled-components';
import searchIcon from '@assets/icons/search.svg';

import SearchedList from '@components/Home/Search/SearchedList';

type Props = {
  getSearchedChannels: (payload: string) => void;
};

const Search = ({ getSearchedChannels }: Props) => {
  const [input, setInput] = useState('');

  const focusRef = useRef<HTMLElement>(null);

  const onClickOutside = (event: any) => {
    if (focusRef.current && !focusRef.current.contains(event.target)) {
      getSearchedChannels('');
      setInput('');
    }
  };

  useEffect(() => {
    document.addEventListener('click', onClickOutside, true);
    return () => {
      document.removeEventListener('click', onClickOutside, true);
    };
  }, [focusRef]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    getSearchedChannels(event.currentTarget.value);
    setInput(event.currentTarget.value);
  };
  return (
    <>
      <Container ref={focusRef}>
        <Wrapper>
          <Icon />
        </Wrapper>
        <Input
          type="search"
          name="search"
          value={input}
          onChange={onChangeInput}
          placeholder="검색"
          inputMode="search"
        />
        <SearchedList />
      </Container>
    </>
  );
};

const Container = styled.section`
  width: calc(100% - 1rem);
  height: 2rem;
  margin: 0 0.5rem;
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
  width: calc(100% - 4.2rem);
  height: 2rem;
  padding-right: 0.75rem;

  background-color: #fff;

  font-size: 0.75rem;

  border-radius: 0 3.125rem 3.125rem 0;
  transition: width 0.3s ease-in-out;
`;

const mapDispatchToProps = (dispatch: Dispatch<ChannelAction>) => ({
  getSearchedChannels: (payload: string) =>
    dispatch(actions.getSearchedChannels(payload)),
});

export default connect(null, mapDispatchToProps)(Search);
