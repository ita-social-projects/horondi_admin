import { DELETE_MATERIALS_BLOCK } from '../operations/materials-page.mutations';
import {
  GET_MATERIALS_BLOCKS_BY_TYPE,
  GET_MATERIALS_BLOCK_BY_ID
} from '../operations/materials-page.queries';

export const mockCurrentType = 'bottom';

export const materialsBlock = {
  _id: '62013e2fb96ee84338cf5005',
  title: 'Hello',
  type: 'bottom',
  text: [
    {
      lang: 'ua',
      value:
        "Lorem Ipsum - це текст-риба, що використовується в друкарстві та дизайні. Lorem Ipsum є, фактично, стандартною рибою аж з XVI сторіччя, коли невідомий друкар взяв шрифтову гранку та склав на ній підбірку зразків шрифтів. Риба не тільки успішно пережила п'ять століть, але й прижилася в електронному верстуванні, залишаючись по суті незмінною. Вона популяризувалась в 60-их роках минулого сторіччя завдяки виданню зразків шрифтів Letraset, які містили уривки з Lorem Ipsum, і вдруге - нещодавно завдяки програмам комп'ютерного верстування на кшталт Aldus Pagemaker, які використовували різні версії Lorem Ipsum."
    },
    {
      lang: 'en',
      value:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  ],
  image: {
    thumbnail: 'thumbnail_img.jpg',
    small: 'small_img.jpg'
  },
  translationsKey: '62013e2fb96ee84338cf5004'
};

export const mockMaterialBlock = [
  {
    request: {
      query: GET_MATERIALS_BLOCKS_BY_TYPE,
      variables: {
        type: mockCurrentType,
        skip: 0,
        limit: 0
      }
    },
    result: {
      loading: false,
      data: {
        getMaterialsBlocksByType: {
          items: [materialsBlock],
          count: 1
        }
      }
    }
  },
  {
    request: {
      query: DELETE_MATERIALS_BLOCK,
      variables: {
        id: '62013e2fb96ee84338cf5005'
      }
    },
    result: {
      data: {
        getMaterialsBlocksByType: {
          _id: '62013e2fb96ee84338cf5005'
        }
      }
    }
  },
  {
    request: {
      query: GET_MATERIALS_BLOCK_BY_ID,
      variables: {
        id: '62013e2fb96ee84338cf5005'
      }
    },
    result: {
      loading: false,
      data: {
        getMaterialsBlockById: materialsBlock
      }
    }
  }
];
