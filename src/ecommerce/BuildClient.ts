// import {
//   type AuthMiddlewareOptions,
//   ClientBuilder,
//   type HttpMiddlewareOptions,
// } from '@commercetools/ts-client';

// import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

// const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
// const scopes = [...import.meta.env.VITE_CTP_SCOPES.split(' ')];

// const authMiddlewareOptions: AuthMiddlewareOptions = {
//   host: import.meta.env.VITE_CTP_AUTH_URL,
//   projectKey: projectKey,
//   credentials: {
//     clientId: import.meta.env.VITE_CTP_CLIENT_ID,
//     clientSecret: import.meta.env.VITE_CTP_CLIENT_SECRET,
//   },
//   scopes,
//   httpClient: fetch,
// };

// const httpMiddlewareOptions: HttpMiddlewareOptions = {
//   host: import.meta.env.VITE_CTP_API_URL,
//   httpClient: fetch,
// };

// export const CTPClient = new ClientBuilder()
//   .withClientCredentialsFlow(authMiddlewareOptions)
//   .withHttpMiddleware(httpMiddlewareOptions)
//   .build();

// export const apiRoot = createApiBuilderFromCtpClient(CTPClient);
