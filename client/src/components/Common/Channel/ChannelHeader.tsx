import React from 'react';
import styled from 'styled-components';
import plusIcon from '@assets/icons/plus.svg';

type Props = {
  isComponentOpen: boolean;
  currentIndex: string;
  onClickClose: () => void;
};

const ChannelHeader = ({
  isComponentOpen,
  currentIndex,
  onClickClose,
}: Props) => {
  return (
    <Header isComponentOpen={isComponentOpen}>
      <Index>
        <Current>{currentIndex}&nbsp;</Current>
        <Total>2</Total>
      </Index>
      <Title>채널생성</Title>
      <Close onClick={onClickClose} />
    </Header>
  );
};

const Header = styled.div<{ isComponentOpen: boolean }>`
  width: 100vw;
  height: 3.125rem;
  padding: 0 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${(props) => props.theme.color.gray.light};
  border-bottom: 1px solid rgba(173, 181, 189, 0.5);
`;

const Index = styled.div`
  color: ${(props) => props.theme.color.purple};
  font-size: 0.75rem;
  font-weight: 700;

  display: flex;
`;

const Current = styled.div`
  color: ${(props) => props.theme.color.green};
`;

const Total = styled.div`
  &: before {
    content: '/ ';
  }
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${(props) => props.theme.color.purple};
`;

const Close = styled(plusIcon)`
  width: 1rem;
  color: ${(props) => props.theme.color.purple};
  transform: rotate(45deg);

  cursor: pointer;
`;

export default ChannelHeader;
