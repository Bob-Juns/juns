import React from 'react';
import styled from 'styled-components';
import ChannelButton from '@components/Common/Channel/ChannelButton';

type Props = {
  isComponentOpen: boolean;
  currentIndex: string;
  title: string;
  onClickClose: () => void;
  onSubmitForm: (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => void;
  children: React.ReactNode;
  leftButtonType: 'button' | 'submit';
  leftButtonText: string;
  leftButtonBackgroundColor?: 'none' | 'white' | 'green';
  onClickLeftButton: () => void;
  rightButtonType: 'button' | 'submit';
  rightButtonText: string;
  rightButtonBackgroundColor?: 'none' | 'white' | 'green';
  onClickRightButton: () => void;
};

const ChannelEditor = ({
  isComponentOpen,
  currentIndex,
  title,
  onClickClose,
  onSubmitForm,
  children,
  leftButtonType,
  leftButtonText,
  leftButtonBackgroundColor,
  onClickLeftButton,
  rightButtonType,
  rightButtonText,
  rightButtonBackgroundColor,
  onClickRightButton,
}: Props) => {
  return (
    <Container isComponentOpen={isComponentOpen}>
      <Titles isComponentOpen={isComponentOpen}>
        <Index>{currentIndex} / 2</Index>
        <Title>{title}</Title>
        <Close onClick={onClickClose} />
      </Titles>
      <Form onSubmit={onSubmitForm}>
        <Wrapper isFirst={currentIndex === '1'}>{children}</Wrapper>
        <ButtonGroup>
          <ChannelButton
            type={leftButtonType}
            text={leftButtonText}
            backgroundColor={leftButtonBackgroundColor}
            onClick={onClickLeftButton}
          />
          <ChannelButton
            type={rightButtonType}
            text={rightButtonText}
            backgroundColor={rightButtonBackgroundColor}
            onClick={onClickRightButton}
          />
        </ButtonGroup>
      </Form>
    </Container>
  );
};

const Container = styled.div<{ isComponentOpen: boolean }>`
  width: 100vw;
  height: calc(100vh);
  height: calc(var(--vh, 1vh) * 100);

  background-color: ${(props) => props.theme.color.gray.light};

  position: fixed;
  left: 0;
  bottom: 0;

  overflow: auto;
  z-index: 99;

  visibility: ${(props) => (props.isComponentOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isComponentOpen ? '1' : '0')};
  transform: ${(props) =>
    props.isComponentOpen ? 'translateY(0)' : 'translateY(50%)'};
  transition: all 0.5s linear;
`;

const Titles = styled.div<{ isComponentOpen: boolean }>`
  width: 100%;
  height: 3.125rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  border-bottom: 1px solid rgba(173, 181, 189, 0.5);
  opacity: ${(props) => (props.isComponentOpen ? '1' : '0')};
  transition: opacity 0.7s linear;

  position: sticky;
  top: 0;
  left: 0;
`;

const Index = styled.div`
  color: ${(props) => props.theme.color.purple};
  font-size: 1rem;
  font-weight: 700;
`;

const Close = styled.div`
  width: 1rem;
  height: 2px;
  background-color: ${(props) => props.theme.color.purple};
  transform: rotate(45deg);

  cursor: pointer;

  &: after {
    content: '';
    width: 1rem;
    height: 2px;
    background-color: ${(props) => props.theme.color.purple};
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%) rotate(90deg);
  }
`;

const Title = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${(props) => props.theme.color.purple};
`;

const Form = styled.form`
  width: 100%;
  min-height: calc(100vh - 3.125rem);
  min-height: calc(var(--vh, 1vh) * 100 - 3.125rem);

  padding: 2rem 1rem 1rem;

  display: flex;
  flex-direction: column;

  overflow-x: hidden;
`;

const Wrapper = styled.div<{ isFirst: boolean }>`
  width: 200vw;
  height: 100%;

  display: flex;
  transform: ${(props) =>
    props.isFirst ? 'translateX(0)' : 'translateX(-100vw)'};
  transition: transform 0.3s linear;
`;

const ButtonGroup = styled.div`
  width: 100%;
  height: 2rem;
  margin-top: auto;

  display: flex;
  justify-content: space-between;
  algin-items: flex-end;
`;

export default ChannelEditor;
