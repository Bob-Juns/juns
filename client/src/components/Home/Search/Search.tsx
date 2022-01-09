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

  const focusRef = useRef<HTMLDivElement>(null);

  const onClickOutside = (event: any) => {
    if (
      input !== '' &&
      focusRef.current &&
      !focusRef.current.contains(event.target)
    ) {
      getSearchedChannels(''), setInput('');
    }
  };

  useEffect(() => {
    return () => getSearchedChannels('');
  }, []);

  useEffect(() => {
    document.addEventListener('click', onClickOutside, true);
    return () => {
      document.removeEventListener('click', onClickOutside, true);
    };
  }, [focusRef, input]);

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

const Container = styled.div`
  width: calc(100% - 1rem);
  height: 2rem;
  margin: 4.75rem 0.5rem 0;

  display: flex;

  position: relative;
  border-radius: 3.125rem;
  box-shadow: ${(props) => props.theme.boxShadow.primary};

  ${(props) =>
    props.theme.device('tablet')(`
  height: 2.5rem;
  `)}
`;

const Wrapper = styled.div`
  width: 2.2rem;
  height: 100%;
  background-color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 3.125rem 0 0 3.125rem;

  ${(props) =>
    props.theme.device('tablet')(`
  width: 3.125rem;
  `)}
`;

const Icon = styled(searchIcon)`
  width: 0.75rem;
  height: 0.75rem;

  color: ${(props) => props.theme.color.purple};

  ${(props) =>
    props.theme.device('tablet')(`
  width: 1.125rem;
  height: 1.125rem;
  `)}
`;

const Input = styled.input`
  width: calc(100% - 2.2rem);
  height: 100%;
  padding-right: 0.75rem;

  background-color: #fff;

  font-size: 0.75rem;

  border-radius: 0 3.125rem 3.125rem 0;
  transition: width 0.3s ease-in-out;

  ${(props) =>
    props.theme.device('tablet')(`
  width: calc(100% - 3.125rem);
  font-size: 1rem;
  `)}
`;

const mapDispatchToProps = (dispatch: Dispatch<ChannelAction>) => ({
  getSearchedChannels: (payload: string) =>
    dispatch(actions.getSearchedChannels(payload)),
});

export default connect(null, mapDispatchToProps)(Search);
