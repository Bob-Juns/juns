import React from 'react';
import styled from 'styled-components';

type Props = {
  message: string;
  type: string;
  id: string;
  refs?: React.RefObject<HTMLInputElement>;
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
};

const AccountInput = ({
  message,
  type,
  id,
  refs,
  value,
  mode,
  placeholder,
  onChange,
  max,
  disabled,
  label,
}: Props) => {
  return (
    <Container>
      <Message>{message}</Message>
      <Input
        type={type}
        id={id}
        name={id}
        ref={refs}
        value={value}
        inputMode={mode ? mode : 'text'}
        placeholder={placeholder}
        onChange={onChange}
        maxLength={max && max}
        disabled={disabled}
      />
      <Label htmlFor={id}>{label}</Label>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 1.25rem;
  display: flex;
  flex-direction: column-reverse;
`;

const Message = styled.div`
  height: 0.75rem;
  margin: 0.25rem;
  font-size: 0.75rem;
  color: ${(props) => props.theme.color.red};
`;

const Label = styled.label`
  width: 100%;

  color: ${(props) => props.theme.color.purple};
  opacity: 0.5;

  font-size: 1rem;
  font-weight: 700;
`;

const Input = styled.input`
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.5rem 0.25rem;

  font-size: 0.75rem;

  opacity: 0.5;

  border-bottom: 1px solid ${(props) => props.theme.color.gray.base};

  &:focus {
    opacity: 1;
    border-bottom: 2px solid ${(props) => props.theme.color.purple};
  }

  &:focus + ${Label} {
    opacity: 1;
  }
`;

export default AccountInput;
