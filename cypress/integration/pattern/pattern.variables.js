const patterns = {
  items: [
    {
      name: [
        {
          lang: 'ua',
          value: 'Рожева хвилька'
        },
        {
          lang: 'en',
          value: 'Pink wave'
        }
      ],
      _id: '0c3c7929dd85de268bed4fe6',
      material: 'Cotton',
      available: true,
      images: {
        thumbnail: 'thumbnail_zzsjjooki856bu7_1.jpg'
      }
    },
    {
      _id: 'fdc7529135f2c050c877a61a',
      name: [
        {
          lang: 'uk',
          value: 'Синя хвилька'
        },
        {
          lang: 'en',
          value: 'Blue wave'
        }
      ],
      images: {
        thumbnail: 'thumbnail_335nr4j5dkebkvle7_blue-wave.jpg'
      },
      material: 'Cotton',
      available: true
    },
    {
      _id: '51af3801f347948f19f6933c',
      name: [
        {
          lang: 'uk',
          value: 'Синьо-рожева хвилька'
        },
        {
          lang: 'en',
          value: 'Blue-pink wave'
        }
      ],
      material: 'Cotton',
      available: true,
      images: {
        thumbnail: 'thumbnail_335nr431gkebp19ht_blue-pink.jpg'
      }
    },
    {
      material: 'Cotton',
      available: true,
      _id: '7c49f713a0fbbc6250a79173',
      name: [
        {
          lang: 'uk',
          value: 'Стрілки'
        },
        {
          lang: 'en',
          value: 'Arrows'
        }
      ],
      images: {
        thumbnail: 'thumbnail_335nr4j5dkebkv6hj_arrows.jpg'
      }
    }
  ],
  count: 4
};

export const typeValue = 'pattern';
export const wrongValue = 'a';
const patternToAdd = {
  _id: '7c49f713a0fbbc6250a79133',
  name: [
    {
      lang: 'uk',
      value: typeValue
    },
    {
      lang: 'en',
      value: typeValue
    }
  ],
  material: typeValue,
  available: true,
  images: {
    thumbnail: 'test'
  }
};

const patternToUpdate = {
  ...patternToAdd,
  name: [
    {
      lang: 'uk',
      value: typeValue + typeValue
    },
    {
      lang: 'en',
      value: typeValue + typeValue
    }
  ]
};

export const getAllPatterns = (req) => {
  req.reply({
    body: {
      data: {
        getAllPatterns: patterns
      }
    }
  });
};

export const addPattern = (req) => {
  patterns.items.push(patternToAdd);
  req.reply({
    body: {
      data: {
        addPattern: patternToAdd
      }
    }
  });
};

export const updatePattern = (req) => {
  patterns.items.pop();
  patterns.items.push(patternToUpdate);
  req.reply({
    body: {
      data: {
        addPattern: patternToUpdate
      }
    }
  });
};

export const updateValue = 'updated';

export const addPatternError = (req) => {
  req.reply({
    body: {
      data: {
        addPattern: {
          message: 'PATTERN_ALREADY_EXIST',
          statusCode: 400
        }
      }
    }
  });
};
export const getPatternById = (req) => {
  req.reply({
    body: {
      data: {
        getPatternById: {
          ...patternToUpdate,
          description: [
            {
              value: typeValue
            },
            {
              value: typeValue
            }
          ]
        }
      }
    }
  });
};
export const deletePattern = (req) => {
  patterns.items.pop();
  req.reply({
    body: {
      data: {
        deletePattern: patternToUpdate
      }
    }
  });
};
