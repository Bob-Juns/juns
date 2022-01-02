import React, { useState } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import chevronIcon from '@assets/icons/chevron.svg';

import BannerCard from '@components/Dashboard/Banner/BannerList/BannerCard';

type Props = {
  banners: Banner;
};

const BannerList = ({ banners }: Props) => {
  const LIMIT = 3;
  const [more, setMore] = useState<number>(LIMIT);

  const onClickShowMore = () => {
    setMore((prev) => prev + LIMIT);
  };

  const onClickFold = () => {
    setMore(LIMIT);
  };

  return (
    <Container>
      {banners.searchedBanners.length > 0 ? (
        banners.searchedBanners
          .slice(0, more)
          .map((banner: CurrentBanner) => (
            <BannerCard
              key={banner.bannerId}
              src={banner.bannerImage.filePath}
              banner={banner}
            />
          ))
      ) : (
        <Empty>일치하는 배너가 없습니다.</Empty>
      )}
      {banners.searchedBanners.length > LIMIT && (
        <Wrapper
          onClick={
            banners.searchedBanners.length >= more
              ? onClickShowMore
              : onClickFold
          }
        >
          <Text>
            {banners.searchedBanners.length >= more ? '더보기' : '접기'}
          </Text>
          <Chevron rotate={banners.searchedBanners.length >= more ? 1 : 0} />
        </Wrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-row-gap: 1.5rem;

  ${(props) =>
    props.theme.device('tablet')(`
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 1.5rem;
  `)}
`;

const Empty = styled.div`
  margin: 3rem auto 0;
  color: ${(props) => props.theme.color.gray.base};

  ${(props) =>
    props.theme.device('tablet')(`
  width: 700px;
  font-size: 1.125rem;
  display: flex;
  justify-content: center;
  position: absolute;
  `)}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;

  cursor: pointer;
`;

const Text = styled.div`
  margin-right: 0.25rem;
  font-size: 0.625rem;
  font-weight: 700;

  color: ${(props) => props.theme.color.gray.base};
`;

const Chevron = styled(chevronIcon)<{ rotate: boolean }>`
  width: 0.625rem;
  color: ${(props) => props.theme.color.gray.base};
  transform: ${(props) => props.rotate && 'rotate(180deg)'};

  transition: transform 0.3s;
`;

const mapStateToProps = (state: { banners: Banner }) => ({
  banners: state.banners,
});

export default connect(mapStateToProps)(BannerList);
