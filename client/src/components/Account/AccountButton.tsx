import React from 'react';

import styled from 'styled-components';

type Props = {
  type: 'button' | 'submit' | 'reset';
  onClick: (event: React.FormEvent<HTMLButtonElement>) => void;
  text: string;
};

const AccountButton = ({ type, onClick, text }: Props) => {
  return (
    <Button type={type} onClick={onClick}>
      {text}
    </Button>
  );
};

const Button = styled.button`
  width: 100%;
  margin-top: 1.25rem;
  padding: 1rem 0.5rem;

  color: #fff;
  background-color: ${(props) => props.theme.color.purple};

  font-size: 1rem;
  font-weight: 700;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 0.375rem;
`;

export default AccountButton;
