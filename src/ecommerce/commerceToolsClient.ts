import {
  createAuthMiddlewareForClientCredentialsFlow,
  createAuthMiddlewareForPasswordFlow,
  createClient,
  createHttpMiddleware,
} from '@commercetools/ts-client';
import { customerScopes } from './scopes';
import { RegisterData } from '../redux/interfaces';

const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
const adminScope = import.meta.env.VITE_CTP_SCOPES;

const hostAuth = import.meta.env.VITE_CTP_AUTH_URL;
const hostApi = import.meta.env.VITE_CTP_API_URL;

const customerClientId = import.meta.env.VITE_CTP_CUSTOMER_CLIENT_ID;
const customerClientSecret = import.meta.env.VITE_CTP_CUSTOMER_CLIENT_SECRET;

// 🔹 1. AdminClient / flow for creation new customer
export const obtainAccessTokenThroughCredentialsFlow = createClient({
  middlewares: [
    createAuthMiddlewareForClientCredentialsFlow({
      host: hostAuth,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
      },
      scopes: [adminScope],
      httpClient: fetch,
    }),
    createHttpMiddleware({
      host: hostApi,
      httpClient: fetch,
    }),
  ],
});

// 🔹 2. client for login user
export const obtainAccessTokenThroughPasswordFlow = (
  email: string,
  password: string,
) => {
  return createClient({
    middlewares: [
      createAuthMiddlewareForPasswordFlow({
        host: hostAuth,
        projectKey,
        credentials: {
          clientId: customerClientId,
          clientSecret: customerClientSecret,
          user: { username: email, password },
        },
        scopes: customerScopes,
        httpClient: fetch,
      }),
      createHttpMiddleware({
        host: hostApi,
        httpClient: fetch,
      }),
    ],
  });
};

// 🔹 3. register new customer
export const signUpCustomer = async (data: RegisterData) => {
  const response = await obtainAccessTokenThroughCredentialsFlow.execute({
    uri: `/${projectKey}/customers`,
    method: 'POST',
    body: data,
  });

  if (response.statusCode === 201) {
    return response.body;
  } else {
    throw new Error(response.body?.message || 'Failed to register');
  }
};

// 🔹 4. login customer
export const loginUser = async (email: string, password: string) => {
  const userClient = obtainAccessTokenThroughPasswordFlow(email, password);

  const profile = await userClient.execute({
    uri: `/${projectKey}/me`,
    method: 'GET',
  });

  console.log(profile);

  if (profile.statusCode === 200) {
    return profile.body;
  } else {
    throw new Error(profile.body?.message || 'Failed to register');
  }
};

// 🔹 5. customer logout
export const logoutUser = () => {
  localStorage.removeItem('ct_user_token');
};

// 🔹 6. Auth check
export const checkAuth = async () => {
  const token = localStorage.getItem('ct_user_token');
  if (!token) return false;

  try {
    const client = JSON.parse(token);
    const response = await client.execute({
      uri: `/${projectKey}/me`,
      method: 'GET',
    });

    if (response.statusCode === 200) {
      return response.body;
    } else {
      throw new Error(response.body?.message || 'Failed to register');
    }
  } catch (err) {
    return false;
  }
};
