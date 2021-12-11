import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import ChannelHeader from '@components/Common/Channel/ChannelHeader';
import ChannelEditor from '@components/Common/Layouts/ChannelEditor';

type Props = {
  isCreateOpen: boolean;
  setIsCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChannelCreate = ({ isCreateOpen, setIsCreateOpen }: Props) => {
  const [index, setIndex] = useState<string>('1');
  const [inputs, setInputs] = useState<ChannelInput>({
    category: '',
    channelId: '',
    channelTitle: '',
    channelCover: '',
    channelProducer: '',
    channelCast: '',
    playlistTitle: '',
    playlistId: '',
  });

  const firstFormRef = useRef<HTMLFormElement>(null);
  const secondFormRef = useRef<HTMLFormElement>(null);

  const onChangeInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onClickClose = () => {
    setIsCreateOpen(false);
    setInputs({
      category: '',
      channelId: '',
      channelTitle: '',
      channelCover: '',
      channelProducer: '',
      channelCast: '',
      playlistTitle: '',
      playlistId: '',
    });
    setTimeout(() => {
      setIndex('1');
    }, 500);
  };

  const onScrollToTop = (
    targetRef: React.MutableRefObject<HTMLFormElement | null>,
  ) => {
    setTimeout(() => {
      targetRef.current?.scrollTo(0, 0);
    }, 500);
  };

  const onClickPrev = () => {
    index === '1'
      ? setIsCreateOpen(false)
      : (setIndex('1'), onScrollToTop(secondFormRef));
  };

  const onClickNext = () => {
    index === '1'
      ? (setIndex('2'), onScrollToTop(firstFormRef))
      : console.log('create new channel');
  };

  const onSubmitForm = (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  return (
    <Container isComponentOpen={isCreateOpen}>
      <ChannelHeader
        isComponentOpen={isCreateOpen}
        currentIndex={index}
        onClickClose={onClickClose}
      />
      <ChannelEditor
        firstFormRef={firstFormRef}
        secondFormRef={secondFormRef}
        currentIndex={index}
        isComponentOpen={isCreateOpen}
        onClickClose={onClickClose}
        onSubmitForm={onSubmitForm}
        channelTitle={inputs.channelTitle}
        channelId={inputs.channelId}
        channelProducer={inputs.channelProducer}
        onChangeInputs={onChangeInputs}
        onClickLeftButton={onClickPrev}
        onClickRightButton={onClickNext}
        channelCast={inputs.channelCast}
        playlistTitle={inputs.playlistTitle}
        playlistId={inputs.playlistId}
        rightButtonText="생성"
      />
    </Container>
  );
};

const Container = styled.div<{ isComponentOpen: boolean }>`
  width: 100vw;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  background-color: ${(props) => props.theme.color.gray.light};

  display: flex;
  flex-direction: column;

  position: fixed;
  top: 0;
  left: 0;

  visibility: ${(props) => (props.isComponentOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isComponentOpen ? '1' : '0')};

  transform: ${(props) =>
    props.isComponentOpen ? 'translateY(0)' : 'translateY(50%)'};

  transition: all 0.3s linear;

  z-index: 999;
`;

export default ChannelCreate;
