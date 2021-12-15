import React from 'react';
import styled from 'styled-components';

type Props = {
  type: 'submit' | 'button' | 'reset';
  onClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
  backgroundColor?: string;
  text: string;
};

const ChannelButton = ({ type, onClick, backgroundColor, text }: Props) => {
  return (
    <Button type={type} onClick={onClick} backgroundColor={backgroundColor}>
      {text}
    </Button>
  );
};

const Button = styled.button<{ backgroundColor?: string }>`
  width: 6rem;
  height: 2rem;

  font-weight: 700;

  color: ${(props) =>
    props.backgroundColor === 'white' ? props.theme.color.purple : '#fff'};
  background-color: ${(props) =>
    props.backgroundColor === 'white'
      ? '#fff'
      : props.backgroundColor === 'green'
      ? props.theme.color.green
      : props.backgroundColor === 'yellow'
      ? props.theme.color.yellow
      : props.theme.color.purple};
  border-radius: 3.125rem;

  ${(props) =>
    props.backgroundColor === 'none' &&
    `
  &: hover {
    background-color: #fff;
  }
  `}
`;

export default ChannelButton;
