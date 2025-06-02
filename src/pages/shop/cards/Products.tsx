import { Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router';

import MockProducts from './MockProducts';
import Product from './Product';

const Products = () => {
  const { category } = useParams();
  const [data] = useState(MockProducts);

  if (!category) {
    return <Typography>Please choose category</Typography>;
  }

  return (
    <Grid container justifyContent={'center'} spacing={2}>
      <Grid display={'flex'} justifyContent={'end'} size={12}>
        <Typography variant="sectionTitle">{category}</Typography>
      </Grid>
      {data.map(card => {
        const shortDescription = card.description.slice(0, 80);
        const formattedPrice = (card.price / 100).toFixed(2);
        return (
          <Grid key={card.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Product
              {...card}
              description={`${shortDescription}...`}
              price={formattedPrice}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Products;
