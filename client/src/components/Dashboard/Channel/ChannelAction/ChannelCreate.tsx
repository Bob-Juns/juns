import React from 'react';
import styled from 'styled-components';
import chevronIcon from '@assets/icons/chevron.svg';

type Props = {
  isCreateOpen: boolean;
  setIsCreateOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChannelCreate = ({ isCreateOpen, setIsCreateOpen }: Props) => {
  return (
    <Container isCreateOpen={isCreateOpen}>
      <Titles isCreateOpen={isCreateOpen}>
        <Chevron onClick={() => setIsCreateOpen(false)} />
        <Title>채널 생성</Title>
      </Titles>
      <Body></Body>
    </Container>
  );
};

const Container = styled.div<{ isCreateOpen: boolean }>`
  width: 100vw;
  height: calc(100vh);
  height: calc(var(--vh, 1vh) * 100);

  background-color: ${(props) => props.theme.color.gray.light};

  position: fixed;
  left: 0;
  bottom: 0;

  overflow: auto;
  z-index: 99;

  visibility: ${(props) => (props.isCreateOpen ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isCreateOpen ? '1' : '0')};
  transform: ${(props) =>
    props.isCreateOpen ? 'translateY(0)' : 'translateY(100%)'};
  transition: all 0.5s linear;
`;

const Titles = styled.div<{ isCreateOpen: boolean }>`
  width: 100%;
  height: 2.75rem;
  border-bottom: 1px solid rgba(173, 181, 189, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  opacity: ${(props) => (props.isCreateOpen ? '1' : '0')};
  transition: opacity 0.7s linear;

  position: sticky;
  top: 0;
  left: 0;
`;

const Chevron = styled(chevronIcon)`
  width: 0.75rem;
  color: ${(props) => props.theme.color.purple};

  position: absolute;
  top: 50%;
  left: 0.5rem;
  transform: translateY(-50%) rotate(-90deg);

  cursor: pointer;
`;

const Title = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${(props) => props.theme.color.purple};
`;

const Body = styled.div`
  width: 100%;
  min-height: calc(100vh - 2.75rem);
  min-height: calc(var(--vh, 1vh) * 100 - 2.75rem);
`;

export default ChannelCreate;
