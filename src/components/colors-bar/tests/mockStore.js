const mockStore = {
  Color: {
    list: [
      {
        _id: 'fsdfsd',
        colorHex: '#12353',
        name: [
          {
            value: 'Червоний',
            lang: 'ua'
          },
          {
            value: 'Червоний',
            lang: 'ua'
          }
        ],
        simpleName: [
          {
            value: 'Червоний',
            lang: 'ua'
          },
          {
            value: 'Червоний',
            lang: 'ua'
          }
        ]
      },
      {
        _id: 'fsdfsd2',
        colorHex: '#12353',
        name: [
          {
            value: 'Червоний',
            lang: 'ua'
          },
          {
            value: 'Red',
            lang: 'en'
          }
        ],
        simpleName: [
          {
            value: 'Білий',
            lang: 'ua'
          },
          {
            value: 'White',
            lang: 'en'
          }
        ]
      }
    ],
    color: null,
    showColorDialogWindow: false,
    showBoundMaterialsWindow: false,
    boundMaterials: [
      {
        key: '12hg',
        name: [
          {
            value: 'black'
          }
        ]
      }
    ],
    colorLoading: false,
    colorError: null
  }
};

export default mockStore;
