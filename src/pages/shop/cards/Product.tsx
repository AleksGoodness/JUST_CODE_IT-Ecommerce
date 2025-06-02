import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router';

import { Title } from '../../../components';
import PlaceHolderImage from './CardPlaceHolder.png';

export interface Props {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  currencyCode: string;
  images: Image[];
}

export interface Image {
  url: string;
  label?: string;
  dimensions: Dimensions;
}

export interface Dimensions {
  w: number;
  h: number;
}

const Product = ({
  id,
  name,
  slug,
  description,
  price,
  currencyCode,
  images,
}: Props) => {
  return (
    <Card
      sx={{
        maxHeight: '100%',
        height: '100%',
      }}
    >
      <CardActionArea
        component={Link}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          transition: '0.25s ease',
          '&:hover': { scale: '1.05', transition: '0.2s ease' },
        }}
        to={`${slug}/${id}`}
      >
        {
          <Grid sx={{ height: '100%' }}>
            <CardMedia
              alt={images.length ? images[0].label || name : name}
              component="img"
              image={
                images.length && images[0].url
                  ? images[0].url
                  : PlaceHolderImage
              }
              sx={{
                objectFit: 'contain',
              }}
            />
          </Grid>
        }
        <CardContent
          sx={{
            maxWidth: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'end',
            height: '100%',
          }}
        >
          <Title component={'h3'} variant="subheader">
            {name}
          </Title>
          <Typography component={'p'} variant="body2">
            {description}
          </Typography>
          <Typography component={'p'} sx={{ display: 'flex', gap: '0.2rem' }}>
            <Typography color="primary" variant="body2">
              {price}
            </Typography>
            <Typography color="primary" variant="body2">
              {currencyCode}
            </Typography>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default Product;
