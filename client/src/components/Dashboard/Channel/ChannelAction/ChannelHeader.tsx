import React from 'react';
import styled from 'styled-components';
import plusIcon from '@assets/icons/plus.svg';

type Props = {
  headerTitle: string;
  currentIndex: string;
  onClickClose: () => void;
};

const ChannelHeader = ({ headerTitle, currentIndex, onClickClose }: Props) => {
  return (
    <Header>
      <Index>
        <Current>{currentIndex}&nbsp;</Current>
        <Total>2</Total>
      </Index>
      <Title>{headerTitle}</Title>
      <Close onClick={onClickClose} />
    </Header>
  );
};

const Header = styled.div`
  width: 100vw;
  height: 3.125rem;
  padding: 0 1rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${(props) => props.theme.color.gray.light};
  border-bottom: 1px solid rgba(173, 181, 189, 0.5);

  ${(props) =>
    props.theme.device('tablet')(`
  height: 4rem;
  `)}
`;

const Index = styled.div`
  color: ${(props) => props.theme.color.purple};
  font-size: 0.75rem;
  font-weight: 700;

  display: flex;

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 1rem;
  `)}
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

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 1.25rem;
  `)}
`;

const Close = styled(plusIcon)`
  width: 1rem;
  color: ${(props) => props.theme.color.purple};
  transform: rotate(45deg);

  cursor: pointer;

  ${(props) =>
    props.theme.device('tablet')(`
  width: 1.25rem;
  `)}
`;

export default ChannelHeader;
