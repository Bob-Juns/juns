import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

type Props = {
  ask: string;
  link: string;
  onClickLink: () => any;
  onSubmitForm: (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => void;
  children: React.ReactNode;
};

const AccountForm = ({
  ask,
  link,
  onClickLink,
  onSubmitForm,
  children,
}: Props) => {
  const navigate = useNavigate();

  const onClickTitle = () => {
    navigate('/');
  };
  return (
    <Container>
      <Title onClick={onClickTitle}>
        <Colored>jun</Colored>stream
      </Title>
      <Ask>
        {ask} <Span onClick={onClickLink}>{link}</Span>
      </Ask>
      <Form onSubmit={onSubmitForm}>{children}</Form>
    </Container>
  );
};

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  padding: 5rem 1.25rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-family: 'Bungee';
  font-size: 2rem;

  cursor: pointer;
`;

const Colored = styled.span`
  color: ${(props) => props.theme.color.purple};
`;

const Ask = styled.div`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${(props) => props.theme.color.gray};
`;

const Span = styled.span`
  margin-left: 0.25rem;
  color: ${(props) => props.theme.color.purple};
  text-decoration: underline;

  cursor: pointer;
`;

const Form = styled.form`
  width: 100%;
`;

export default AccountForm;
