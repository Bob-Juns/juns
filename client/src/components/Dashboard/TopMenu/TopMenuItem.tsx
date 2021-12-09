import React from 'react';
import styled from 'styled-components';

type Props = {
  menu: string;
  onClick: () => void;
  selected: boolean;
};

const TopMenuItem = ({ menu, onClick, selected }: Props) => {
  return (
    <Item onClick={onClick} selected={selected}>
      {menu}
    </Item>
  );
};

const Item = styled.div<{ selected?: boolean }>`
  width: calc(100vw / 4);
  height: 100%;
  margin-top: 2px;
  font-size: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${(props) =>
    props.selected &&
    `
    font-weight: 700;
    color: ${props.theme.color.purple};
    border-bottom: 3px solid ${props.theme.color.purple};
  `}

  &:hover {
    color: ${(props) => props.theme.color.purple};
    font-weight: 700;
    border-bottom: 3px solid ${(props) => props.theme.color.purple};
  }
`;

export default TopMenuItem;
