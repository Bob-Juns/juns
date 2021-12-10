import React from 'react';
import styled from 'styled-components';

import ChannelCover from '@components/Dashboard/Channel/ChannelAction/ChannelCover';
import ChannelCategory from '@components/Dashboard/Channel/ChannelAction/ChannelCategory';
import ChannelInput from '@components/Common/Channel/ChannelInput';

type Props = {
  channelTitle: string;
  channelId: string;
  channelProducer: string;
  onChangeInputs: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ChannelFormFirst = ({
  channelTitle,
  channelId,
  channelProducer,
  onChangeInputs,
}: Props) => {
  return (
    <Container>
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
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100%;
  padding-right: 2rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export default ChannelFormFirst;
