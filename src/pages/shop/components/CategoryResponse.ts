const CategoryResponse = {
  limit: 20,
  offset: 0,
  count: 4,
  total: 4,
  results: [
    {
      id: '2ea99341-59ef-48d9-a5a0-0ee903bb118f',
      version: 1,
      versionModifiedAt: '2025-05-22T22:20:53.479Z',
      lastMessageSequenceNumber: 1,
      createdAt: '2025-05-22T22:20:53.479Z',
      lastModifiedAt: '2025-05-22T22:20:53.479Z',
      lastModifiedBy: {
        isPlatformClient: true,
        user: {
          typeId: 'user',
          id: '5fe6cb71-7d99-468c-8711-194d73a39857',
        },
      },
      createdBy: {
        isPlatformClient: true,
        user: {
          typeId: 'user',
          id: '5fe6cb71-7d99-468c-8711-194d73a39857',
        },
      },
      key: 'palms_large_indoor_plants',
      name: {
        'en-US': 'Palms & Large Indoor Plants',
      },
      slug: {
        'en-US': 'palmslarge-indoor-plants',
      },
      description: {
        'en-US': 'Palms & Large Indoor Plants',
      },
      ancestors: [],
      orderHint: '0.1',
      metaTitle: {
        'en-US': 'Palms & Large Indoor Plants',
      },
      metaDescription: {
        'en-US': 'Palms & Large Indoor Plants',
      },
      assets: [],
    },
    {
      id: 'fef70e14-0c1f-4a51-8f6b-c61b10eca4b3',
      version: 1,
      versionModifiedAt: '2025-05-22T22:22:18.460Z',
      lastMessageSequenceNumber: 1,
      createdAt: '2025-05-22T22:22:18.460Z',
      lastModifiedAt: '2025-05-22T22:22:18.460Z',
      lastModifiedBy: {
        isPlatformClient: true,
        user: {
          typeId: 'user',
          id: '5fe6cb71-7d99-468c-8711-194d73a39857',
        },
      },
      createdBy: {
        isPlatformClient: true,
        user: {
          typeId: 'user',
          id: '5fe6cb71-7d99-468c-8711-194d73a39857',
        },
      },
      key: 'cacti_succulents',
      name: {
        'en-US': 'Cacti & Succulents',
      },
      slug: {
        'en-US': 'cacti-succulents',
      },
      description: {
        'en-US': 'Cacti & Succulents',
      },
      ancestors: [],
      orderHint: '0.2',
      metaTitle: {
        'en-US': 'Cacti & Succulents',
      },
      metaDescription: {
        'en-US': 'Cacti & Succulents',
      },
      assets: [],
    },
    {
      id: 'c4107657-c4c7-488f-a191-cb6084810553',
      version: 1,
      versionModifiedAt: '2025-05-22T22:27:21.624Z',
      lastMessageSequenceNumber: 1,
      createdAt: '2025-05-22T22:27:21.624Z',
      lastModifiedAt: '2025-05-22T22:27:21.624Z',
      lastModifiedBy: {
        isPlatformClient: true,
        user: {
          typeId: 'user',
          id: '5fe6cb71-7d99-468c-8711-194d73a39857',
        },
      },
      createdBy: {
        isPlatformClient: true,
        user: {
          typeId: 'user',
          id: '5fe6cb71-7d99-468c-8711-194d73a39857',
        },
      },
      key: 'flowering_indoor_lants',
      name: {
        'en-US': 'Flowering Indoor Plants',
      },
      slug: {
        'en-US': 'flowering-indoor-plants',
      },
      description: {
        'en-US': 'Flowering Indoor Plants',
      },
      ancestors: [],
      orderHint: '0.3',
      metaTitle: {
        'en-US': 'Flowering Indoor Plants',
      },
      metaDescription: {
        'en-US': 'Flowering Indoor Plants',
      },
      assets: [],
    },
    {
      id: '885e8c9e-cb08-4a4e-bfe3-90dfd512d851',
      version: 1,
      versionModifiedAt: '2025-05-22T22:28:25.682Z',
      lastMessageSequenceNumber: 1,
      createdAt: '2025-05-22T22:28:25.682Z',
      lastModifiedAt: '2025-05-22T22:28:25.682Z',
      lastModifiedBy: {
        isPlatformClient: true,
        user: {
          typeId: 'user',
          id: '5fe6cb71-7d99-468c-8711-194d73a39857',
        },
      },
      createdBy: {
        isPlatformClient: true,
        user: {
          typeId: 'user',
          id: '5fe6cb71-7d99-468c-8711-194d73a39857',
        },
      },
      key: 'bonsai_trees',
      name: {
        'en-US': 'Bonsai Trees',
      },
      slug: {
        'en-US': 'bonsai-trees',
      },
      description: {
        'en-US': 'Bonsai Trees',
      },
      ancestors: [],
      orderHint: '0.4',
      metaTitle: {
        'en-US': 'Bonsai Trees',
      },
      metaDescription: {
        'en-US': 'Bonsai Trees',
      },
      assets: [],
    },
  ],
};

const CategoryResponseFormatter = () => {
  const data = CategoryResponse.results.map(element => {
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
