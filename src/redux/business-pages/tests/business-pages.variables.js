export const ukText = 'Український текст бізнес сторінки';
export const enText = 'English text of business page';
export const businessPage = {
  _id: 'de57efa1gdg543414b430',
  code: 'business-page',
  title: [{ value: 'Укр заголовок' }, { value: 'Eng title' }],
  text: [
    {
      value: ukText
    },
    {
      value: enText
    }
  ]
};
export const businessPageId = '0c3c7954dd35de268bed4fe8';
export const businessPageToRemoveId = '0c3c7954dd35de268bed4fe8';
export const businessPages = [
  {
    _id: '0c3c7954dd35de268bed4fe8',
    code: 'about-us-test',
    title: [{ value: 'Про нас' }, { value: 'About us' }],
    text: [
      {
        value: `${ukText} про нас`
      },
      {
        value: `${enText} about us`
      }
    ]
  },
  {
    _id: '0c3c7954dd35de268bed4fe8',
    code: 'privacy-policy-test',
    title: [{ value: 'Умови конфіденційності' }, { value: 'Privacy policy' }],
    text: [
      {
        value: `${ukText} умови конфіденційності`
      },
      {
        value: `${ukText} privacy policy`
      }
    ]
  }
];
export const businessPageToCreate = {
  page: {
    code: 'business-page',
    title: [{ value: 'Укр заголовок' }, { value: 'Eng title' }],
    text: [
      {
        value: ukText
      },
      {
        value: enText
      }
    ],
    lang: ['uk', 'ua']
  },
  files: []
};
export const updatedBusinessPage = {
  _id: 'de57efa1gdg543414b430',
  code: 'business-page',
  title: [
    {
      lang: 'uk',
      value: `${ukText} про нас оновлена`
    },
    {
      lang: 'en',
      value: `${enText} about us updated`
    }
  ],
  text: [
    {
      value: ukText
    },
    {
      value: enText
    }
  ]
};
export const businessPageToUpdate = {
  id: 'de57efa1gdg543414b430',
  page: {
    title: [
      {
        lang: 'uk',
        value: `${ukText} про нас оновлена`
      },
      {
        lang: 'en',
        value: `${enText} about us updated`
      }
    ]
  }
};
export const fakeBusinessPageRes = {
  data: {
    getBusinessTextById: {
      ...fakeBusinessPage
    }
  }
};

export const fakeBusinessPage = {
  _id: '0c3c7954dd35de268bed4fe8',
  title: [
    {
      lang: 'uk',
      value: 'Пустишка'
    },
    {
      lang: 'en',
      value: 'Fake'
    }
  ],
  text: [
    {
      lang: 'uk',
      value: 'Текс пустишка'
    },
    {
      lang: 'en',
      value: 'Fake text'
    }
  ]
};
export const fakePages = {
  data: {
    getAllBusinessTexts: {
      ...businessPages
    }
  }
};

export const businessPageToDeleteMock = {
  data: {
    deleteBusinessText: {
      ...businessPages
    }
  }
};
