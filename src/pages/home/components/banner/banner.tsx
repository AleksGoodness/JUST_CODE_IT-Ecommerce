import { Badge, Box, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Title from '@/components/title/Title';

import bannerPlaceholder from './banner-placeholder.png';
import bannerPlaceholder2 from './banner-placeholder2.png';
import bannerPlaceholder3 from './banner-placeholder3.png';

const pictures = [bannerPlaceholder, bannerPlaceholder2, bannerPlaceholder3];

const Banner = () => {
  return (
    <Grid bgcolor={'background.paper'} borderRadius={2} container p={2}>
      <Grid
        container
        direction="column"
        gap={2}
        paddingBlock={{ xs: 5, sm: 10 }}
        size={{ xs: 12, sm: 6, md: 7 }}
      >
        <Title textTransform={'capitalize'} variant="subheader">
          welcome to
          <Typography
            color="primary.main"
            component={'span'}
            fontSize={'inherit'}
            fontWeight={700}
            pl={1}
          >
            JustGreen!
          </Typography>
        </Title>
        <Title
          fontSize={{ xs: '2.5rem', sm: '2rem', md: '4rem' }}
          variant="main"
        >
          Let’s Make a Better
          <Typography
            color="primary.main"
            component={'span'}
            fontSize={'inherit'}
            fontWeight={700}
            pl={1}
          >
            Planet
          </Typography>
        </Title>
        <Typography>
          We are an online plant shop offering a wide range of cheap and trendy
          plants. Use our plants to create an unique Urban Jungle. Order your
          favorite plants!
        </Typography>

        <Grid container gap={2}>
          <Button
            component={Link}
            sx={{ width: 'fit-content' }}
            to="/shop"
            variant="contained"
          >
            Shop Now
          </Button>
          <Typography fontWeight={700} p={1}>
            promo-code:
          </Typography>
          <Badge badgeContent={'greenery_promo'} color={'warning'} />
        </Grid>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 5 }}>
        <Swiper
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          modules={[Autoplay, EffectFade]}
          slidesPerView={1}
          speed={5000}
        >
          {pictures.map((pic, i) => (
            <SwiperSlide key={i}>
              <Grid>
                <Box
                  alt="banner"
                  component={'img'}
                  src={pic}
                  sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </Grid>
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
    </Grid>
  );
};

export default Banner;
