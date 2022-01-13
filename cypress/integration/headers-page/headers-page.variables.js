let allHeaders = [
  {
    _id: '5fa034049a59a906f0610e57',
    priority: 1,
    link: '/accessories',
    title: [
      { lang: 'ua', value: 'Аксесуари' },
      { lang: 'en', value: 'Accessories' }
    ]
  },
  {
    _id: '5fa034049a59a906f0610e58',
    priority: 2,
    link: '/backpacks',
    title: [
      { lang: 'ua', value: 'Рюкзаки' },
      { lang: 'en', value: 'Backpacks' }
    ]
  }
];
export const headersDataToAdd = {
  uaName: 'Сумки',
  enName: 'Bags',
  link: '/bags'
};
export const addHeadersItem = {
  _id: '5fa034049a59a906f0610e59',
  priority: 3,
  link: headersDataToAdd.link,
  title: [
    { lang: 'ua', value: headersDataToAdd.uaName },
    { lang: 'en', value: headersDataToAdd.enName }
  ]
};
export const newUaName = 'Нові сумки';
export const getAllHeadersStub = (req) => {
  req.reply({
    body: {
      data: {
        getAllHeaders: allHeaders
      }
    }
  });
};
export const getHeaderByIdStub = (req, body) => {
  const { variables } = body;

  req.reply({
    body: {
      data: {
        getHeaderById: allHeaders.find((header) => header._id === variables.id)
      }
    }
  });
};
export const updateHeaderStub = (req, body) => {
  const { variables } = body;

  for (let i = 0; i < allHeaders.length; i++) {
    if (allHeaders[i]._id === variables.id)
      allHeaders[i].title[0].value = newUaName;
  }

  req.reply({
    body: {
      data: {
        updateHeader: allHeaders.find((article) => article._id === variables.id)
      }
    }
  });
};
export const deleteHeaderStub = (req, body) => {
  const { variables } = body;

  allHeaders = allHeaders.filter((item) => item._id !== variables.id);

  req.reply({
    body: {
      data: {
        deleteHeader: { _id: variables.id }
      }
    }
  });
};
export const addHeaderStub = (req) => {
  allHeaders.push(addHeadersItem);

  req.reply({
    body: {
      data: {
        addHeader: addHeadersItem
      }
    }
  });
};
export const headerAlreadyExistsStub = (req) => {
  req.reply({
    body: {
      data: {
        addHeader: { message: 'HEADER_ALREADY_EXIST', statusCode: 400 }
      }
    }
  });
};
