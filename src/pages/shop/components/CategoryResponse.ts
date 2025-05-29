import { CategoryPagedResponse } from '../../../interfaces';

const CategoryResponseFormatter = (catResp: CategoryPagedResponse) => {
  const data = catResp.results.map(element => {
    return {
      id: element.id,
      name: element.name['en-US'],
      slug: element.slug['en-US'],
      description: element.description['en-US'],
    };
  });
  return data;
};

export default CategoryResponseFormatter;
