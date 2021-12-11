import React from 'react';
import styled from 'styled-components';
import plusIcon from '@assets/icons/plus.svg';

type Props = {
  onClickCreateButton: () => void;
};

const ChannelCreateButton = ({ onClickCreateButton }: Props) => {
  return (
    <Button onClick={onClickCreateButton}>
      <Plus />
    </Button>
  );
};

const Button = styled.button`
  width: 2rem;
  height: 2rem;
  margin-right: 0.375rem;

  background-color: ${(props) => props.theme.color.purple};
  box-shadow: ${(props) => props.theme.boxShadow.primary};

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  cursor: pointer;
`;

const Plus = styled(plusIcon)`
  width: 0.75rem;
  height: 0.75rem;

  color: #fff;
`;

export default ChannelCreateButton;
