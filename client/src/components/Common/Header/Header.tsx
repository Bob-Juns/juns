import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import Hamburger from '@components/Common/Header/Hamburger';
import SideMenu from '@components/Common/SideMenu/SideMenu';

const Header = () => {
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
      <Container>
        <Wrapper>
          <Title onClick={onClickTitle}>
            <Colored>jun</Colored>stream
          </Title>
          <Hamburger isMenuOpen={isMenuOpen} onClickBurger={onClickBurger} />
        </Wrapper>
        <SideMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </Container>
    </>
  );
};
const Container = styled.header`
  width: 100vw;
  height: 5.375rem;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 995;
`;

const Wrapper = styled.section`
  width: 100%;
  height: 3.125rem;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
