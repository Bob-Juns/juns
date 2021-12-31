import React from 'react';
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';

import styled from 'styled-components';

import Slider from 'react-slick';

type Props = {
  banners: Banner;
};

const Banner = ({ banners }: Props) => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
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
            <Image
              key={banner.bannerId}
              src={banner.bannerImage.filePath}
              onClick={() => navigate(`/channel/${banner.bannerLink}`)}
            />
          ))}
      </CustomSlider>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;

  margin-bottom: 1rem;
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

const Image = styled.figure<{ src: string }>`
  width: 100%;
  height: 0;
  padding-top: 50%;

  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center center;
`;

const mapStateToProps = (state: { banners: Banner }) => ({
  banners: state.banners,
});

export default connect(mapStateToProps)(Banner);
