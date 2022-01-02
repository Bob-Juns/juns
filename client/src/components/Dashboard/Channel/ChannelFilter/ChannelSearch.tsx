import React from 'react';

import styled from 'styled-components';
import searchIcon from '@assets/icons/search.svg';

type Props = {
  input: string;
  onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ChannelSearch = ({ input, onChangeInput }: Props) => {
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

  ${(props) =>
    props.theme.device('tablet')(`
  height: 3rem;
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
  width: 1rem;
  height: 1rem;
  `)}
`;

const Input = styled.input`
  width: 3rem;
  height: 100%;
  padding-right: 0.75rem;

  background-color: #fff;

  font-size: 0.75rem;

  border-radius: 0 3.125rem 3.125rem 0;
  transition: width 0.3s ease-in-out;

  &:focus {
    width: 7.5rem;
  }

  ${(props) =>
    props.theme.device('tablet')(`
  width: 4rem;
  font-size: 1rem;

  &: focus {
    width: 15rem;
  }
  `)}
`;

export default ChannelSearch;
