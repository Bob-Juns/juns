import React from 'react';
import styled from 'styled-components';

import ChannelInput from '@components/Common/Channel/ChannelInput';

type Props = {
  channelCast: string;
  onChangeInputs: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ChannelFormSecond = ({ channelCast, onChangeInputs }: Props) => {
  return (
    <Container>
      <ChannelInput
        type="text"
        id="channelCast"
        value={channelCast}
        onChange={onChangeInputs}
        placeholder="ex) 홍길동  (최대 5명)"
        label="출연진"
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100%;
  padding-right: 2rem;
`;

export default ChannelFormSecond;
