import React from 'react';
import styled from 'styled-components';
import exclamationIcon from '@assets/icons/exclamation.svg';

type Props = {
  message: string;
};

const AccountWarning = ({ message }: Props) => {
  return (
    <Container>
      <Exclamation />
      <Message>{message}</Message>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 2rem;
  margin-top: 1.25rem;
  padding: 0 1rem;

  background-color: ${(props) => props.theme.color.warning.light};

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const Exclamation = styled(exclamationIcon)`
  width: 1rem;
  height: 1rem;
  margin-right: 1rem;
  color: ${(props) => props.theme.color.warning.dark};

  position: absolute;
  left: 1rem;
`;

const Message = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.color.warning.dark};
`;

export default AccountWarning;
