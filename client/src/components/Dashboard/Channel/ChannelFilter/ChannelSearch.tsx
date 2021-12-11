import React from 'react';
import styled from 'styled-components';
import searchIcon from '@assets/icons/search.svg';
const ChannelSearch = () => {
  return (
    <Container>
      <Wrapper>
        <Icon />
      </Wrapper>
      <Input
        type="search"
        name="search"
        inputMode="search"
        placeholder="검색"
      />
    </Container>
  );
};

const Container = styled.div`
  height: 2rem;
  display: flex;
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

export default ChannelSearch;
