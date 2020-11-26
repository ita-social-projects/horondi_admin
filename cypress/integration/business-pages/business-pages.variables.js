export const businessTexts = [
  {
    _id: '5fa034039a59a906f0610e37',
    code: 'about-us',
    title: [
      {
        value: 'Про нас '
      },
      {
        value: 'About Us'
      }
    ]
  },
  {
    _id: '5fa034039a59a906f0610e38',
    code: 'privacy-policy',
    title: [
      {
        value: 'Умови'
      },
      {
        value: 'Terms and Conditions'
      }
    ]
  },
  {
    _id: '5fa034039a59a906f0610e33',
    code: 'payment-and-shipping',
    title: [
      {
        value: 'Оплата і доставка'
      },
      {
        value: 'Payment and Shipping'
      }
    ]
  },
  {
    _id: '5fa034039a59a906f0610e34',
    code: 'contacts',
    title: [
      {
        value: 'Контакти'
      },
      {
        value: 'Contacts'
      }
    ]
  },
  {
    _id: '5fa034039a59a906f0610e39',
    code: 'materials',
    title: [
      {
        value: 'Матеріали'
      },
      {
        value: 'Materials'
      }
    ]
  }
];

export const updateValues = ' new text';

export const getAllBusinessTexts = (req) => {
  req.reply({
    body: {
      data: {
        getAllBusinessTexts: businessTexts
      }
    }
  });
};

export const getBusinessTextById = (req) => {
  req.reply({
    body: {
      data: {
        getBusinessTextById: {
          ...addedBusinessPage
        }
      }
    }
  });
};

export const addBusinessText = (req) => {
  businessTexts.push({
    _id: addedBusinessPage._id,
    title: [
      {
        value: addedBusinessPage.title[0].value
      },
      {
        value: addedBusinessPage.title[1].value
      }
    ],
    code: addedBusinessPage.code
  });
  console.log(businessTexts);
  req.reply({
    body: {
      data: {
        addBusinessText: addedBusinessPage._id
      }
    }
  });
};

export const deleteBusinessText = (req, body) => {
  req.reply({
    body: {
      data: {
        deleteBusinessText: {
          title: [
            {
              value: addedBusinessPage.title[0].value
            },
            {
              value: addedBusinessPage.title[1].value
            }
          ]
        }
      }
    }
  });
};

export const updateBusinessText = (req) => {
  req.reply({
    body: {
      data: {
        updateBusinessText: {
          _id: addedBusinessPage._id,
          title: [
            {
              value: addedBusinessPage.title[0].value + updateValues
            },
            {
              value: addedBusinessPage.title[1].value + updateValues
            }
          ]
        }
      }
    }
  });
};

export const errorBusinessPage = (req) => {
  req.reply({
    body: {
      data: {
        addBusinessText: {
          message: 'BUSINESS_TEXT_WITH_THIS_CODE_ALREADY_EXIST',
          statusCode: 400
        }
      }
    }
  });
};

export const addedBusinessPage = {
  _id: '5fbe8fde0c20a0364c931500',
  languages: ['ua', 'en'],
  code: 'page',
  title: [
    {
      lang: 'ua',
      value: 'Сторінка'
    },
    {
      lang: 'en',
      value: 'Page'
    }
  ],
  text: [
    {
      lang: 'ua',
      value: 'деякий текст'
    },
    {
      lang: 'en',
      value: 'some text'
    }
  ]
};
