import { Box, Button, CircularProgress } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';

import { Title } from '../../../components';
import PlaceHolderImage from './CardPlaceHolder.png';

export interface Props {
  id: string;
  name: string;
  description: string;
  price: string;
  currency: string;
  images: Image[];
  discount?: number;
  isInCart: boolean;
  isLoading: boolean;
  addToCart: (productId: string) => void;
}

export interface Image {
  url: string;
  label?: string;
}

const Product = ({
  id,
  name,
  description,
  price,
  currency,
  images,
  isInCart,
  discount,
  addToCart,
  isLoading,
}: Props) => {
  const handleAddToCart = () => {
    addToCart(id);
  };

  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: '100%',
        flexDirection: 'column',
        display: 'flex',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea
        onClick={() => navigate(`${name}`, { state: id })}
        sx={{
          height: '100%',
          display: 'grid',
          gridTemplateRows: '2fr 1fr',
          gridTemplateColumns: '1fr',
          gap: 0,
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            bgcolor: 'paper',
          }}
        >
          <CardMedia
            alt={images.length ? images[0].label || name : name}
            component="img"
            image={
              images.length && images[0].url ? images[0].url : PlaceHolderImage
            }
            sx={{
              width: '100%',
              // height: '100%',
              objectFit: 'cover',
              height: '340px',
            }}
          />
        </Box>

        <CardContent
          sx={{
            display: 'grid',
            gridTemplateRows: 'auto auto 1fr',
            gap: 0.5,
            p: 2,
            alignContent: 'start',
          }}
        >
          <Title component="h3" sx={{ lineHeight: 1.2 }} variant="subheader">
            {name}
          </Title>

          <Typography
            component="p"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            variant="body2"
          >
            {description}
          </Typography>

          <Typography
            color="primary"
            fontWeight="bold"
            sx={{
              alignSelf: 'end',
              textDecorationThickness: '2px',
              textDecoration: discount ? 'line-through' : 'none',
            }}
            variant="body2"
          >
            {price} {currency}
          </Typography>
          {discount ? (
            <>
              <Typography
                color="error"
                sx={{
                  fontWeight: '700',
                  lineHeight: '1',
                }}
              >
                Special Offer
              </Typography>
              <Typography
                color="error"
                sx={{
                  fontWeight: '700',
                  lineHeight: '1',
                }}
              >
                {(discount / 100).toFixed(2)} {currency}
              </Typography>
            </>
          ) : null}
        </CardContent>
      </CardActionArea>
      <Button
        disabled={isLoading}
        onClick={() => handleAddToCart()}
        sx={{
          display: 'flex',
          gap: 2,
          pointerEvents: isInCart ? 'none' : 'auto',
          bgcolor: isInCart ? 'primary.main' : 'inherit',
          color: isInCart ? 'text.primary' : 'primary.main',
          ':disabled': { bgcolor: 'inherit' },
        }}
        variant={!isInCart ? 'outlined' : 'contained'}
      >
        {isInCart ? 'In cart' : 'Add to cart'}
        {isLoading && !isInCart ? (
          <CircularProgress color={'warning'} size={'1rem'} />
        ) : null}
      </Button>
    </Card>
  );
};
export default Product;
