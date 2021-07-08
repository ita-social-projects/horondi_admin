const mockDefaultProps = {
  lang: 'ua',
  inputOptions: {
    values: { uaAuthorName: 'author' },
    touched: { uaAuthorName: 'title' },
    errors: { uaAuthorName: 'err' },
    inputs: [
      {
        label: {
          ua: 'Назва матеріалу',
          en: 'Material name'
        },
        name: 'AuthorName',
        required: false,
        isEditor: false
      },
      {
        label: {
          ua: 'Опис матеріалу',
          en: 'Material description'
        },
        name: 'AuthorName',
        required: false,
        isEditor: true
      }
    ],
    handleChange: () => {},
    handleBlur: () => {}
  }
};

module.exports = {
  mockInputOptions: mockDefaultProps.inputOptions,
  mockLang: mockDefaultProps.lang
};
