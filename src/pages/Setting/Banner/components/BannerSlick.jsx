import { Box } from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import { isEmpty } from 'lodash';

const settings = {
  dots: true,
  accessibility: true,
  arrows: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1
};

export const BannerSlick = ({ bannerType, imageBanner, imgTime }) => {
  return (
    <>
      {bannerType === 'IMAGE' ? (
        <Slider {...settings} autoplaySpeed={imgTime}>
          {!isEmpty(imageBanner) &&
            imageBanner.map((imageSource) => {
              return (
                <Box key={imageSource}>
                  <img
                    src={imageSource}
                    width="100%"
                    style={{ maxHeight: '467px', borderRadius: '7px', objectFit: 'cover' }}
                  />
                </Box>
              );
            })}
        </Slider>
      ) : (
        <video
          src={imageBanner}
          width="100%"
          style={{ maxHeight: '467px', borderRadius: '7px' }}
          autoPlay
          muted
          loop
        />
      )}
    </>
  );
};
