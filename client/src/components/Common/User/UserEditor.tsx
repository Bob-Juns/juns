import React, { useState } from 'react';

import styled from 'styled-components';
import chevronIcon from '@assets/icons/chevron.svg';

type Props = {
  title: string;
  onSubmitForm: (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => void;
  children: React.ReactNode;
};

const UserEditor = ({ title, children, onSubmitForm }: Props) => {
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  const onClickOpen = () => {
    setIsEditorOpen((prev) => !prev);
  };

  return (
    <Container>
      <Header onClick={onClickOpen}>
        <Title>{title}</Title>
        <Chevron open={isEditorOpen} />
      </Header>
      <Form open={isEditorOpen} onSubmit={onSubmitForm}>
        {children}
      </Form>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  margin-bottom: 0.75rem;
  background-color: #fff;
  border-radius: 0.375rem;

  box-shadow: ${(props) => props.theme.boxShadow.primary};
  overflow: hidden;
`;

const Header = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
`;

const Title = styled.div`
  height: 0.875rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: ${(props) => props.theme.color.purple};
`;

const Chevron = styled(chevronIcon)<{ open: boolean }>`
  width: 0.875rem;
  height: 0.875rem;
  color: ${(props) => props.theme.color.purple};
  transform: ${(props) => (props.open ? 'rotate(0)' : 'rotate(180deg)')};
  transition: transform 0.3s linear;
`;

const Form = styled.form<{ open: boolean }>`
  width: 100%;
  display: ${(props) => (props.open ? 'flex' : 'none')};
  flex-direction: column;
`;

export default UserEditor;
