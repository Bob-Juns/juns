import React from 'react';
import styled from 'styled-components';
import plusIcon from '@assets/icons/plus.svg';

type Props = {
  headerTitle: string;
  onClickClose: () => void;
};

const BannerHeader = ({ headerTitle, onClickClose }: Props) => {
  return (
    <Header>
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

export default BannerHeader;
