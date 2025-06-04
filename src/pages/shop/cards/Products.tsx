import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router';

import { useGetProductsQuery } from '../../../services/api';
import clearObject, { ProductDetails } from '../../details/clearObject';
import Product from './Product';

const Products = () => {
  const context = useOutletContext();
  const { category } = useParams();
  const [goods, setGoods] = useState<ProductDetails[]>([]);

  const { data } = useGetProductsQuery(
    context !== undefined && context !== 'all'
      ? `?where=masterData(current(categories(id="${context}")))`
      : '',
  );

  useEffect(() => {
    const handleCleanResults = (value: []) => {
      const formattedData = value.map(item => clearObject(item));
      setGoods(formattedData);
    };
    if (data) handleCleanResults(data.results);
  }, [data]);

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
              const shortDescription = card.description['en-US'].slice(0, 80);
              const formattedPrice = (card.cost / 100).toFixed(2);
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
