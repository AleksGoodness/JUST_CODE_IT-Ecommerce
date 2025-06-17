import { Box, Grid } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useLocation } from 'react-router';

import {
  useGetActiveCartQuery,
  useGetCategoriesQuery,
  useGetProductsQuery,
  useUpdateCartMutation,
} from '../../../services/api';
import {
  ICLearProduct,
  IProduct,
} from '../../../services/interfaces/products.interfaces';
import { ECartUpdateActions } from '../../../services/interfaces/updateCart.interface';
import Pagination from '../Pagination/Pagination';
import Product from './Product';
import clearProduct from './utils/clearProducts';

const Products = () => {
  const navigate = useNavigate();
  const [isLoadingProcess, setIsLoadingProcess] = useState(false);
  const { category } = useParams();
  const [goods, setGoods] = useState<ICLearProduct[]>([]);
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

  const searchParams = useMemo(() => {
    const params = new URLSearchParams(location.search);
    if (currentCategoryId) {
      params.set('filter.query', `categories.id:"${currentCategoryId}"`);
    } else {
      params.delete('filter.query');
    }

    return params.toString();
  }, [location.search, currentCategoryId]);
  //! get new products
  const { data: products } = useGetProductsQuery(`/search?${searchParams}`, {
    skip: !category,
  });

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

  const handleChangeLimit = (v: string) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set('limit', v);

    console.log(v, searchParams);

    navigate({ search: searchParams.toString() });
  };

  useEffect(() => {
    if (cart) {
      setItemsInCart(cart.lineItems.map(item => item.productId));
      setIsLoadingProcess(false);
    }
  }, [cart]);

  useEffect(() => {
    const handleCleanResults = (value: IProduct[]) => {
      const formattedData = value.map(item => clearProduct(item));
      setGoods(formattedData);
    };
    if (products) handleCleanResults(products.results);
  }, [products, location.search]);

  return (
    <Grid container justifyContent={'center'} spacing={2}>
      <select onChange={e => handleChangeLimit(e.target.value)}>
        <option>6</option>
        <option>9</option>
        <option>12</option>
      </select>

      <Grid>
        Total items
        <Box color={'primary.main'} component={'span'}>
          {products?.total}
        </Box>
      </Grid>

      <Grid container>
        {goods.length && cart
          ? goods.map(card => {
              const shortDescription = card.description.slice(0, 80);
              const formattedPrice = (card.price / 100).toFixed(2);
              return (
                <Grid key={card.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
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

      {products ? (
        <Pagination limit={products.limit} total={products.total} />
      ) : (
        ''
      )}
    </Grid>
  );
};

export default Products;
