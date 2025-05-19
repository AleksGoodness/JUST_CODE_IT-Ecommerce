const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export const customerScopes = [
  'view_categories',
  'manage_my_orders',
  'manage_my_profile',
  'view_products',
  'manage_my_shopping_lists',
  'view_product_selections',
].map(scope => `${scope}:${projectKey}`);
