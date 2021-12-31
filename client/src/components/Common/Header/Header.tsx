import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import Hamburger from '@components/Common/Header/Hamburger';
import SideMenu from '@components/Common/SideMenu/SideMenu';

type Props = {
  location?: string;
};

const Header = ({ location }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const onClickTitle = () => {
    navigate('/');
  };

  const onClickBurger = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Container location={location}>
        <Wrapper>
          <Title onClick={onClickTitle}>
            <Colored>jun</Colored>streaming
          </Title>
          <Hamburger isMenuOpen={isMenuOpen} onClickBurger={onClickBurger} />
        </Wrapper>
        <SideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </Container>
    </>
  );
};
const Container = styled.header<{ location?: string }>`
  width: 100vw;
  height: 3.75rem;
  background-color: ${(props) =>
    props.location === 'detail' ? '#fff' : 'rgba(255, 255, 255, 0.9)'};
  backdrop-filter: ${(props) => props.location !== 'detail' && 'blur(1px)'};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 98;
`;

const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
  border-bottom: 1px solid rgba(173, 181, 189, 0.3);
`;

const Title = styled.h1`
  font-family: 'Bungee';
  font-size: 1.125rem;

  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);

  cursor: pointer;
`;

const Colored = styled.span`
  color: ${(props) => props.theme.color.purple};
`;

export default Header;
