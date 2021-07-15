const testProps = {
  column: {
    items: [
      {
        description: [{ lang: 'ua', value: 'asd' }],
        images: [{ thumbnail: '' }],
        link: '',
        order: 1,
        show: true,
        title: [{ lang: 'en', value: 'asd' }],
        _id: '1'
      }
    ],
    title: 'some title'
  }
};

const emptyColumn = {
  column: {
    items: [],
    title: 'some title'
  }
};

module.exports = {
  testProps,
  emptyColumn
};
