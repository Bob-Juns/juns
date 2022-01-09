import React, { useEffect } from 'react';

import styled from 'styled-components';

type Props = {
  open: boolean;
  title: string;
  icon: React.ReactNode;
  onClickCancel: () => void;
  onClickConfirm: (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => void;
  children: React.ReactNode;
};

const Modal = ({
  open,
  icon,
  title,
  onClickCancel,
  onClickConfirm,
  children,
}: Props) => {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);

  return (
    <Background open={open}>
      <Container open={open}>
        <Icon>{icon}</Icon>
        <Body>
          <Title>{title}</Title>
          <Desc>{children}</Desc>
        </Body>
        <ButtonGroup>
          <Cancel type="button" onClick={onClickCancel}>
            취소
          </Cancel>
          <Confirm type="button" onClick={onClickConfirm}>
            확인
          </Confirm>
        </ButtonGroup>
      </Container>
    </Background>
  );
};

const Background = styled.div<{ open: boolean }>`
  width: 100vw;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${(props) => (props.open ? '999' : '-1')};
  opacity: ${(props) => (props.open ? '1' : '0')};
  transition: all 0.3s linear;
`;

const Container = styled.div<{ open: boolean }>`
  width: 300px;
  height: fit-content;
  min-height: 260px;
  padding: 2rem 1rem 1rem;

  background-color: #fff;
  border-radius: 0.375rem;

  display: flex;
  flex-direction: column;

  transform: ${(props) => (props.open ? 'scale(1)' : 'scale(0.5)')};
  transition: transform 0.3s;

  ${(props) =>
    props.theme.device('tablet')(`
  width: 500px;
  min-height: 300px;
  `)}
`;

const Icon = styled.div`
  width: 3.125rem;
  color: ${(props) => props.theme.color.gray.base};

  ${(props) =>
    props.theme.device('tablet')(`
  width: 3.75rem;
  `)}
`;

const Body = styled.div`
  width: 100%;
  margin-top: 1rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  width: 100%;
  height: 25%;

  display: flex;
  align-items: center;

  font-size: 1.125rem;
  font-weight: 700;

  color: ${(props) => props.theme.color.purple};

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 1.5rem;
  `)}
`;

const Desc = styled.div`
  width: 100%;
  height: 50%;
  margin-top: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.2;
  color: #000;

  ${(props) =>
    props.theme.device('tablet')(`
  font-size: 1rem;
  `)}
`;

const ButtonGroup = styled.div`
  width: 100%;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
`;

const Cancel = styled.button`
  width: 47%;
  height: 2rem;
  border-radius: 0.375rem;
  background-color: ${(props) => props.theme.color.gray.light};
  color: ${(props) => props.theme.color.red};
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.theme.device('tablet')(`
  height: 3.125rem;
  font-size: 1.125rem;
  `)}
`;

const Confirm = styled(Cancel)`
  background-color: ${(props) => props.theme.color.purple};
  color: #fff;
`;

export default Modal;
