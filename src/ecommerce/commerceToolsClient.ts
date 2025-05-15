import {
  createAuthMiddlewareForClientCredentialsFlow,
  createAuthMiddlewareForPasswordFlow,
  createClient,
  createHttpMiddleware,
} from '@commercetools/ts-client';
import { RegisterInputProps } from '../pages/register/interfaces';

import axios, { AxiosRequestConfig } from 'axios';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY;
const clientId = import.meta.env.VITE_CTP_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CTP_CLIENT_SECRET;
const scopes = import.meta.env.VITE_CTP_SCOPES?.split(' ') || [];
const hostAuth = import.meta.env.VITE_CTP_AUTH_URL;
const hostApi = import.meta.env.VITE_CTP_API_URL;

const axiosAdapter = (config: any) => {
  const axiosConfig: AxiosRequestConfig = {
    url: config.uri,
    method: config.method,
    data: config.body,
    headers: config.headers,
    responseType: 'json',
  };

  return axios(axiosConfig)
    .then(response => ({
      statusCode: response.status,
      headers: response.headers,
      body: response.data,
    }))
    .catch(error => {
      if (error.response) {
        return {
          statusCode: error.response.status,
          headers: error.response.headers,
          body: error.response.data,
        };
      }
      throw error;
    });
};

// 🔹 1. AdminClient
export const client = createClient({
  middlewares: [
    createAuthMiddlewareForClientCredentialsFlow({
      host: hostAuth,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
      },
      scopes,
      httpClient: axiosAdapter,
    }),
    createHttpMiddleware({
      host: hostApi,
      httpClient: axiosAdapter,
    }),
  ],
});

// 🔹 2. client for login user
export const loginClient = (email: string, password: string) => {
  return createClient({
    middlewares: [
      createAuthMiddlewareForPasswordFlow({
        host: hostAuth,
        projectKey,
        credentials: {
          clientId,
          clientSecret,
          user: { username: email, password },
        },
        scopes: [], //todo user scopes
        httpClient: axiosAdapter,
      }),
      createHttpMiddleware({
        host: hostApi,
        httpClient: axiosAdapter,
      }),
    ],
  });
};

// 🔹 3. register new user
export const signUpCustomer = async (data: RegisterInputProps) => {
  const response = await client.execute({
    uri: `/${projectKey}/customers`,
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.statusCode === 201) {
    return response.body;
  } else {
    console.log(response);
    throw new Error(response.body?.message || 'Failed to register');
  }
};

// 🔹 4. auto login
export const loginUser = async (email: string, password: string) => {
  const userClient = loginClient(email, password);

  const profile = await userClient.execute({
    uri: `/${projectKey}/me`,
    method: 'GET',
  });

  return {
    client: userClient,
    profile: profile.body,
  };
};

// 🔹 5. User logout
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
    return response.body;
  } catch (err) {
    return false;
  }
};
