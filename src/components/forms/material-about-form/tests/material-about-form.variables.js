import { ADD_MATERIALS_BLOCK } from '../../../../pages/material/operations/materials-page.mutations';

export const files = [new File([], 'foo,png', { type: 'image' })];
export const target = {
  target: {
    result: 'foo'
  }
};
export const mockMaterialAboutBlock = [
  {
    request: {
      query: ADD_MATERIALS_BLOCK,
      variables: {
        materialsBlock: {
          type: 'bottom',
          title: 'title',
          text: [
            { lang: 'ua', value: 'uaText' },
            { lang: 'en', value: 'enText' }
          ]
        },
        image: 'upload'
      }
    },
    result: {
      loading: false,
      error: {},
      data: {
        addMaterialAboutBlock: {
          items: []
        }
      }
    }
  }
];
