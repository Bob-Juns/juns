import React from 'react';
import styled from 'styled-components';

import ChannelInput from '@components/Common/Channel/ChannelInput';
import ChannelButton from '@components/Common/Channel/ChannelButton';

type Props = {
  inputs: ChannelInputs;
  onChangeInputs: (event: React.ChangeEvent<HTMLInputElement>) => void;
  messages: ChannelMessages;
  onClickPrev: () => void;
  onSubmitForm: (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>,
  ) => void;
  children: React.ReactNode;
};

const ChannelFormFirst = ({
  inputs,
  onChangeInputs,
  messages,
  onClickPrev,
  onSubmitForm,
  children,
}: Props) => {
  return (
    <Form onSubmit={onSubmitForm}>
      <Wrapper>{children}</Wrapper>
      <ChannelInput
        type="text"
        id="channelTitle"
        value={inputs.channelTitle}
        onChange={onChangeInputs}
        placeholder="ex) 짧은 대본"
        label="채널 제목"
        message={messages.channelTitle}
      />
      <ChannelInput
        type="text"
        id="channelId"
        value={inputs.channelId}
        onChange={onChangeInputs}
        placeholder="ex) short-paper"
        label="채널 ID"
        message={messages.channelId}
      />
      <ChannelInput
        type="text"
        id="channelProducer"
        value={inputs.channelProducer}
        onChange={onChangeInputs}
        placeholder="ex) 짧은 대본"
        label="제작"
        message={messages.channelProducer}
      />
      <ButtonGroup>
        <ChannelButton
          type="button"
          text="취소"
          backgroundColor="red"
          onClick={onClickPrev}
        />
        <ChannelButton type="submit" text="다음" onClick={onSubmitForm} />
      </ButtonGroup>
    </Form>
  );
};

const Form = styled.form`
  width: 100vw;

  padding: 1.25rem 1rem 1rem;

  background-color: ${(props) => props.theme.color.gray.light};

  display: flex;
  flex-direction: column;

  overflow-x: hidden;
  overflow-y: auto;

  ${(props) =>
    props.theme.device('tablet')(`
  max-width: 700px;
  margin: 0 auto;
  `)}
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

  ${(props) =>
    props.theme.device('tablet')(`
    height: 2.5rem;
  `)}
`;

export default ChannelFormFirst;
