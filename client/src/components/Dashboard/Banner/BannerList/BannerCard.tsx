import React, { useState, useEffect, useRef } from 'react';

import styled, { StyledComponent } from 'styled-components';
import menuIcon from '@assets/icons/menu.svg';

import BannerCardMenu from '@components/Dashboard/Banner/BannerList/BannerCardMenu';

type Props = {
  src: string;
  banner: CurrentBanner;
};

const BannerCard = ({ src, banner }: Props) => {
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
      <BannerCardMenu open={isSettingOpen} banner={banner} />
      <Image src={src} />
      <Info>
        <Title>{banner.bannerTitle}</Title>
        <Wrapper ref={focusRef}>
          <Setting onClick={() => setIsSettingOpen((prev) => !prev)} />
        </Wrapper>
      </Info>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;

  box-shadow: ${(props) => props.theme.boxShadow.primary};
  border-radius: 1rem;

  position: relative;

  &:first-child {
    margin-top: 0;
  }
`;

const Image = styled.div<{ src: string }>`
  width: 100%;
  height: 0;
  padding-top: 40%;

  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center center;

  border-radius: 1rem 1rem 0 0;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #fff;

  border-radius: 0 0 1rem 1rem;
`;
const Title = styled.div`
  color: ${(props) => props.theme.color.purple};
  font-size: 0.875rem;
  font-weight: 700;
`;

const Wrapper = styled.div`
  width: 0.875rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Setting = styled(menuIcon)`
  width: 100%;
  color: ${(props) => props.theme.color.gray.base};
  cursor: pointer;
`;

export default BannerCard;
