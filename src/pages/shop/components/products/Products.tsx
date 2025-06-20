import { Badge, Box, Grid, Skeleton, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router';

import {
  useGetActiveCartQuery,
  useGetCategoriesQuery,
  useGetProductsQuery,
  useUpdateCartMutation,
} from '@/services/api';

import { ECartUpdateActions } from '../../../../services/interfaces/updateCart.interface';
import LimitSelect from '../limit-select/LimitSelect';
import Pagination from '../pagination/Pagination';
import Product from '../product/Product';
import clearProduct from './utils/clearProducts';

const Products = () => {
  const [isLoadingProcess, setIsLoadingProcess] = useState(false);
  const { category } = useParams();
  const location = useLocation();

  const { data: categoriesData } = useGetCategoriesQuery({});

  const { data: cart } = useGetActiveCartQuery({});
  const [addToCart] = useUpdateCartMutation();

  const currentCategoryId = useMemo(() => {
    if (!category || !categoriesData?.results) return null;
    const found = categoriesData.results.find(
      cat => cat.slug?.['en-US'] === category || cat.id === category,
    );
    return found?.id;
  }, [category, categoriesData]);

  const [limitSkeleton, setLimitSkeleton] = useState(4);

  const searchParams = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const limit = params.get('limit');

    if (!limit) {
      params.set('limit', '4');
    } else {
      setLimitSkeleton(Number(limit));
    }

    if (currentCategoryId) {
      params.set('filter.query', `categories.id:"${currentCategoryId}"`);
    } else {
      params.delete('filter.query');
    }

    return params.toString();
  }, [location.search, currentCategoryId]);
  //! get new products
  const { data: products, isFetching } = useGetProductsQuery(
    `/search?${searchParams}`,
    {
      skip: !category,
    },
  );

  const handleAddToCart = async (productId: string) => {
    if (cart && !isLoadingProcess) {
      setIsLoadingProcess(true);
      await addToCart({
        cartId: cart.id,
        actionBody: {
          version: cart.version,
          actions: [
            {
              action: ECartUpdateActions.addNewProduct,
              productId: productId,
              variantId: 1,
              quantity: 1,
            },
          ],
        },
      }).unwrap();
    }
  };

  const [itemsInCart, setItemsInCart] = useState<string[]>([]);

  useEffect(() => {
    if (cart) {
      setItemsInCart(cart.lineItems.map(item => item.productId));
      setIsLoadingProcess(false);
    }
  }, [cart]);

  return (
    <Grid
      container
      direction={'column'}
      justifyContent={'center'}
      paddingBlock={2}
      spacing={2}
    >
      <Grid alignItems={'center'} container gap={5} justifyContent={'center'}>
        <LimitSelect />

        <Typography>Total items: </Typography>
        <Badge
          badgeContent={
            <Typography fontSize={'2rem'}>{products?.total}</Typography>
          }
          color="primary"
        />
      </Grid>
      {products ? (
        <Grid container justifyContent={'center'}>
          <Pagination limit={products.limit} total={products.total} />
        </Grid>
      ) : (
        ''
      )}

      <Grid container>
        {isFetching
          ? [...Array.from(Array(limitSkeleton))].map((_, i) => (
              <Grid
                height={540}
                key={i}
                size={{ xs: 12, sm: 6, md: 3 }}
                sx={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <Skeleton
                  sx={{
                    height: 360,
                    width: '100%',
                    transform: 'scale(1)',
                  }}
                  variant="rectangular"
                />

                <Box
                  sx={{
                    height: 180,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <Skeleton height={24} width="70%" />
                  <Skeleton height={20} width="90%" />
                  <Box sx={{ flexGrow: 1 }} />
                  <Skeleton
                    height={20}
                    sx={{ alignSelf: 'flex-end' }}
                    width="40%"
                  />
                </Box>
              </Grid>
            ))
          : null}
        {products?.results && cart && !isFetching
          ? products.results.map(product => {
              const card = clearProduct(product);
              const shortDescription = card.description.slice(0, 80);
              const formattedPrice = (card.price / 100).toFixed(2);
              return (
                <Grid key={card.id} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Product
                    isLoading={isLoadingProcess}
                    {...card}
                    addToCart={handleAddToCart}
                    description={`${shortDescription}...`}
                    isInCart={Boolean(
                      itemsInCart.find(item => item === card.id),
                    )}
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
