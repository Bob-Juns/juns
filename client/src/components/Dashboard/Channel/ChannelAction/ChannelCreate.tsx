import React, { useState } from 'react';
import styled from 'styled-components';

import ChannelEditor from '@components/Common/Layouts/ChannelEditor';
import ChannelFormFirst from '@components/Common/Channel/ChannelFormFirst';
import ChannelFormSecond from '@components/Common/Channel/ChannelFormSecond';

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

  const onChangeInputs = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onClickClose = () => {
    setIsCreateOpen(false);
  };

  const onClickPrev = () => {
    index === '1' ? setIsCreateOpen(false) : setIndex('1');
  };

  const onClickNext = () => {
    index === '1' ? setIndex('2') : console.log('create new channel');
  };

  const onSubmitForm = (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  return (
    <ChannelEditor
      isComponentOpen={isCreateOpen}
      currentIndex={index}
      title="채널생성"
      onClickClose={onClickClose}
      onSubmitForm={onSubmitForm}
      leftButtonType="button"
      leftButtonText={index === '1' ? '취소' : '이전'}
      leftButtonBackgroundColor={index === '1' ? 'none' : undefined}
      onClickLeftButton={onClickPrev}
      rightButtonType="button"
      rightButtonText={index === '2' ? '생성' : '다음'}
      rightButtonBackgroundColor={index === '2' ? 'green' : undefined}
      onClickRightButton={onClickNext}
    >
      <ChannelFormFirst
        channelTitle={inputs.channelTitle}
        channelId={inputs.channelId}
        channelProducer={inputs.channelProducer}
        onChangeInputs={onChangeInputs}
      />

      <ChannelFormSecond
        channelCast={inputs.channelCast}
        onChangeInputs={onChangeInputs}
      />
    </ChannelEditor>
  );
};

export default ChannelCreate;
