import React from 'react';
import styled from 'styled-components';

import ChannelFormFirst from '@components/Common/Channel/ChannelFormFirst';
import ChannelFormSecond from '@components/Common/Channel/ChannelFormSecond';

type Props = {
  firstFormRef: React.MutableRefObject<HTMLFormElement | null>;
  secondFormRef: React.MutableRefObject<HTMLFormElement | null>;
  currentIndex: string;
  isComponentOpen: boolean;
  onClickClose: () => void;
  onSubmitForm: (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => void;
  channelTitle: string;
  channelId: string;
  channelProducer: string;
  channelCast: string;
  playlistTitle: string;
  playlistId: string;
  onChangeInputs: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickLeftButton: () => void;
  rightButtonText: string;
  onClickRightButton: () => void;
};

const ChannelEditor = ({
  firstFormRef,
  secondFormRef,
  currentIndex,
  isComponentOpen,
  onClickClose,
  onSubmitForm,
  channelTitle,
  channelId,
  channelProducer,
  channelCast,
  playlistTitle,
  playlistId,
  onChangeInputs,
  onClickLeftButton,
  rightButtonText,
  onClickRightButton,
}: Props) => {
  return (
    <Container isFirst={currentIndex === '1'}>
      <ChannelFormFirst
        refs={firstFormRef}
        isComponentOpen={isComponentOpen}
        currentIndex={currentIndex}
        onClickClose={onClickClose}
        onSubmitForm={onSubmitForm}
        channelTitle={channelTitle}
        channelId={channelId}
        channelProducer={channelProducer}
        onChangeInputs={onChangeInputs}
        leftButtonType="button"
        leftButtonText="취소"
        leftButtonBackgroundColor="none"
        onClickLeftButton={onClickLeftButton}
        rightButtonType="button"
        rightButtonText="다음"
        onClickRightButton={onClickRightButton}
      />
      <ChannelFormSecond
        refs={secondFormRef}
        isComponentOpen={isComponentOpen}
        currentIndex={currentIndex}
        onClickClose={onClickClose}
        onSubmitForm={onSubmitForm}
        channelCast={channelCast}
        playlistTitle={playlistTitle}
        playlistId={playlistId}
        onChangeInputs={onChangeInputs}
        leftButtonType="button"
        leftButtonText="이전"
        onClickLeftButton={onClickLeftButton}
        rightButtonType="submit"
        rightButtonText={rightButtonText}
        rightButtonBackgroundColor="green"
        onClickRightButton={onClickRightButton}
      />
    </Container>
  );
};

const Container = styled.div<{ isFirst: boolean }>`
  width: 200vw;
  height: calc(100vh - 3.125rem);
  height: calc(var(--vh, 1vh) * 100 - 3.125rem);

  display: flex;

  background-color: ${(props) => props.theme.color.gray.light};

  transform: ${(props) =>
    props.isFirst ? 'translateX(0)' : 'translateX(-100vw)'};
  transition: all 0.3s linear;
`;

export default ChannelEditor;
