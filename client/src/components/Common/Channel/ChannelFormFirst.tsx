import React from 'react';
import styled from 'styled-components';

import ChannelCover from '@components/Dashboard/Channel/ChannelAction/ChannelCover';
import ChannelCategory from '@components/Dashboard/Channel/ChannelAction/ChannelCategory';
import ChannelInput from '@components/Common/Channel/ChannelInput';
import ChannelButton from '@components/Common/Channel/ChannelButton';

type Props = {
  refs: React.MutableRefObject<HTMLFormElement | null>;
  isComponentOpen: boolean;
  currentIndex: string;
  onClickClose: () => void;
  onSubmitForm: (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => void;
  channelTitle: string;
  channelId: string;
  channelProducer: string;
  onChangeInputs: (event: React.ChangeEvent<HTMLInputElement>) => void;
  leftButtonType: 'button' | 'submit';
  leftButtonText: string;
  leftButtonBackgroundColor?: 'none' | 'white' | 'green' | 'yellow';
  onClickLeftButton: () => void;
  rightButtonType: 'button' | 'submit';
  rightButtonText: string;
  rightButtonBackgroundColor?: 'none' | 'white' | 'green' | 'yellow';
  onClickRightButton: () => void;
};

const ChannelFormFirst = ({
  refs,
  onSubmitForm,
  channelTitle,
  channelId,
  channelProducer,
  onChangeInputs,
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
    <Form onSubmit={onSubmitForm} ref={refs}>
      <Wrapper>
        <ChannelCover />
        <ChannelCategory />
      </Wrapper>
      <ChannelInput
        type="text"
        id="channelTitle"
        value={channelTitle}
        onChange={onChangeInputs}
        placeholder="ex) 짧은 대본"
        label="제목(한글)"
      />
      <ChannelInput
        type="text"
        id="channelId"
        value={channelId}
        onChange={onChangeInputs}
        placeholder="ex) short-paper"
        label="제목(영어)"
      />
      <ChannelInput
        type="text"
        id="channelProducer"
        value={channelProducer}
        onChange={onChangeInputs}
        placeholder="ex) 짧은 대본"
        label="제작"
      />
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
  );
};

const Form = styled.form`
  width: 100vw;
 100%;
  padding: 1.25rem 1rem 1rem;

  background-color: ${(props) => props.theme.color.gray.light};

  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: auto;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  width: 100%;
  height: 2rem;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  algin-items: flex-end;
`;

export default ChannelFormFirst;
