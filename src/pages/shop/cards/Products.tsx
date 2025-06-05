import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router';

import { useGetProductsQuery } from '../../../services/api';
import Product from './Product';
import { ICLearProduct } from './utils/clearProduct.interface';
import clearProduct from './utils/clearProducts';

const Products = () => {
  const { category } = useParams();
  const [goods, setGoods] = useState<ICLearProduct[]>([]);
  const locations = useLocation();

  const { data } = useGetProductsQuery('/search' + locations.search);
  useEffect(() => {
    const handleCleanResults = (value: []) => {
      const formattedData = value.map(item => clearProduct(item));
      setGoods(formattedData);
    };
    if (data) handleCleanResults(data.results);
  }, [data, locations.search]);

  if (!category) {
    return <Typography>Please choose category</Typography>;
  }

  return (
    <Grid container justifyContent={'center'} spacing={2}>
      <Grid display={'flex'} justifyContent={'end'} size={12}>
        <Typography variant="sectionTitle">
          {category.replaceAll('-', ' ')}
        </Typography>
      </Grid>

      <Grid> {data?.limit}</Grid>

      <Grid container>
        {goods.length
          ? goods.map(card => {
              const shortDescription = card.description.slice(0, 80);
              const formattedPrice = (card.price / 100).toFixed(2);
              return (
                <Grid
                  container
                  key={card.id}
                  size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                >
                  <Product
                    {...card}
                    description={`${shortDescription}...`}
                    price={formattedPrice}
                  />
                </Grid>
              );
            })
          : null}
      </Grid>
    </Grid>
  );
};

export default Products;
