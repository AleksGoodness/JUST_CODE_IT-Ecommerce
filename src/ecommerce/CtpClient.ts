import {
  ApiRoot,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { CTPClient } from './BuildClient';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(CTPClient).withProjectKey({
  projectKey: import.meta.env.VITE_CTP_PROJECT_KEY,
});

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
const getProject = () => {
  return apiRoot.get().execute();
};

// Retrieve Project information and output the result to the log
getProject().then(console.log).catch(console.error);
export function getProjectDetails() {
  apiRoot
    .get()
    .execute()
    .then(function ({ body }) {
      console.log(JSON.stringify(body));
    });
}
