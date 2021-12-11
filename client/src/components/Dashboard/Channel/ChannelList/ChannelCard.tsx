import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import menuIcon from '@assets/icons/menu.svg';
import ChannelCardMenu from './ChannelCardMenu';

const ChannelCard = () => {
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
  const focusRef = useRef<HTMLDivElement>(null);

  const onClickOutside = (event: any) => {
    if (focusRef.current && !focusRef.current.contains(event.target)) {
      setIsSettingOpen(false);
    }
  };

  useEffect(() => {
    isSettingOpen && document.addEventListener('click', onClickOutside, true);
    return () => {
      document.removeEventListener('click', onClickOutside, true);
    };
  }, [focusRef, isSettingOpen]);

  return (
    <Container>
      <Left />
      <Right />
      <Category>
        <ChannelCardMenu open={isSettingOpen} />
        <Text>drama</Text>
        <Wrapper
          onClick={() => setIsSettingOpen((prev) => !prev)}
          ref={focusRef}
        >
          <Setting />
        </Wrapper>
      </Category>
      <Titles>
        <Title>짧은 대본</Title>
        <Title>short-paper</Title>
      </Titles>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  box-shadow: ${(props) => props.theme.boxShadow.primary};
  border-radius: 0.75rem;

  position: relative;
`;
const Left = styled.div`
  width: 50%;
  height: 100%;
  background-color: ${(props) => props.theme.color.purple};
  border-radius: 0.75rem 0 0 0.75rem;
`;
const Right = styled.div`
  width: 50%;
  height: 100%;
  background-color: #fff;
  border-radius: 0 0.75rem 0.75rem 0;
`;

const Category = styled.div`
  width: 100%;
  height: 50%;
  margin-right: auto;
  padding: 0 0.75rem;

  position: absolute;
  top: 0;
  background-color: ${(props) => props.theme.color.purple};

  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 0.75rem 0.75rem 0.75rem 0;
`;

const Text = styled.div`
  font-family: 'Bungee';
  font-size: 0.625rem;
  color: #fff;
`;

const Wrapper = styled.div`
  width: 1rem;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

const Setting = styled(menuIcon)`
  width: 100%;
  color: #fff;
`;

const Titles = styled.div`
  height: 50%;
  width: 100%;
  padding: 0.625rem 0.75rem;

  position: absolute;
  bottom: 0;

  color: ${(props) => props.theme.color.purple};
  background-color: #fff;

  display: flex;
  align-items: flex-end;

  border-radius: 0.75rem 0 0.75rem 0.75rem;
  cursor: pointer;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 0.75rem;

  &: last-child {
    margin-left: 0.25rem;
    font-size: 0.5rem;
  }
`;

export default ChannelCard;
