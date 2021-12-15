import React from 'react';
import styled from 'styled-components';

type Props = {
  type: string;
  id: string;
  mode?:
    | 'text'
    | 'search'
    | 'none'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal';
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  max?: number;
  disabled?: boolean;
  label: string;
  message: string;
};

const ChannelInput = ({
  type,
  id,
  mode,
  value,
  placeholder,
  onChange,
  max,
  disabled,
  label,
  message,
}: Props) => {
  return (
    <Container>
      <Label htmlFor={id}>{label}</Label>
      <Input
        type={type}
        id={id}
        name={id}
        value={value}
        inputMode={mode ? mode : 'text'}
        placeholder={placeholder}
        onChange={onChange}
        maxLength={max}
        disabled={disabled}
      />
      <Message>{message}</Message>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;

  &: first-child {
    margin-top: 0;
  }
`;

const Label = styled.label`
  width: 100%;

  color: ${(props) => props.theme.color.purple};

  font-size: 1rem;
  font-weight: 700;
`;

const Input = styled.input`
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem 0.25rem;

  font-size: 0.75rem;
  border-bottom: 1px solid ${(props) => props.theme.color.gray.base};
`;

const Message = styled.div`
  height: 0.75rem;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: ${(props) => props.theme.color.red};
`;

export default ChannelInput;
