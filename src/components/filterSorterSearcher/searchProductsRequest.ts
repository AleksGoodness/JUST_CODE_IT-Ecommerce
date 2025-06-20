import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { createAnonymousClient } from '@/ecommerce/clientBuilder';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

const anonClient = createAnonymousClient();

export const apiRoot = createApiBuilderFromCtpClient(anonClient).withProjectKey(
  {
    projectKey,
  },
);

const SearchProductsRequest = async (keyword: string) => {
  try {
    const response = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          ['text.en-US']: keyword,
          fuzzy: true,
          markMatchingVariants: false,
          limit: 10,
        },
      })
      .execute();

    const products = response.body.results;
    console.log('Products found:', products);
    return products;
  } catch (error) {
    console.error('Search error:', error);
  }
};
export default SearchProductsRequest;
