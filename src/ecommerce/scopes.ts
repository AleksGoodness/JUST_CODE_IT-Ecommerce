const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;

export const customerScopes = [
  'view_categories',
  'view_products',
  'view_product_selections',
  'manage_my_orders',
  'manage_my_profile',
  'manage_my_shopping_lists',
].map(scope => `${scope}:${projectKey}`);

export const anonymousScopes = [
  'view_customers',
  'view_categories',
  'view_products',
  'view_discount_codes',
  'view_product_selections',
  'manage_my_profile',
  'manage_my_shopping_lists',
  'manage_my_payments',
  'manage_my_orders',
  'create_anonymous_token',
].map(scope => `${scope}:${projectKey}`);
