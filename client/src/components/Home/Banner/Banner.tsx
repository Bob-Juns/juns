import React, { lazy, Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';

import styled from 'styled-components';

const BannerItem = lazy(
  () =>
    import(
      /* webpackChunkName: "BannerItem" */ '@components/Home/Banner/BannerItem'
    ),
);
import BannerSkeleton from '@components/Skeleton/Home/BannerSkeleton';

import Slider from 'react-slick';

type Props = {
  banners: Banner;
};

const Banner = ({ banners }: Props) => {
  const [mouseMove, setMouseMove] = useState<boolean>(false);
  const navigate = useNavigate();

  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Container>
      <CustomSlider {...settings}>
        {banners.allBanners
          .slice()
          .sort(() => Math.random() - 0.5)
          .map((banner: CurrentBanner) => (
            <Suspense key={banner.bannerId} fallback={<BannerSkeleton />}>
              <BannerItem
                src={banner.bannerImage.filePath}
                onMouseMove={() => setMouseMove(true)}
                onMouseDown={() => setMouseMove(false)}
                onMouseUp={() =>
                  !mouseMove && navigate(`/channel/${banner.bannerLink}`)
                }
              />
            </Suspense>
          ))}
      </CustomSlider>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;

  margin-top: 1rem;
  overflow: hidden;
`;

const CustomSlider = styled(Slider)`
  .slick-slide {
    display: inline-block;

    cursor: pointer;
  }

  .slick-dots {
    display: flex !important;
    justify-content: center;

    & li button {
      font-size: 0 !important;

      &:before {
        content: '•';
        font-size: 1rem !important;
        color: ${(props) => props.theme.color.gray.base} !important;
      }
    }

    & li.slick-active button {
      font-size: 0 !important;

      &:before {
        content: '•';
        font-size: 1rem !important;
        color: ${(props) => props.theme.color.yellow} !important;
      }
    }
  }
`;

const mapStateToProps = (state: { banners: Banner }) => ({
  banners: state.banners,
});

export default connect(mapStateToProps)(Banner);
