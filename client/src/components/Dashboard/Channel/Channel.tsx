import React, { useState } from 'react';
import styled from 'styled-components';
import ChannelFilter from '@components/Dashboard/Channel/ChannelFilter/ChannelFilter';
import ChannelList from '@components/Dashboard/Channel/ChannelList/ChannelList';
import ChannelCreate from '@components/Dashboard/Channel/ChannelAction/ChannelCreate';

const Channel = () => {
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

  return (
    <>
      <Container>
        <ChannelFilter onClickCreateButton={() => setIsCreateOpen(true)} />
        <ChannelList />
      </Container>
      <ChannelCreate
        isCreateOpen={isCreateOpen}
        setIsCreateOpen={setIsCreateOpen}
      />
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default Channel;
