import { config } from '../../../../configs';

export const withId = {
  description: [{ value: '' }, { value: '' }],
  images: { thumbnail: '' },
  link: '',
  show: 'false',
  title: [{ value: '' }, { value: '' }],
  _id: '1'
};

export const withoutId = {
  description: [{ value: '' }, { value: '' }],
  images: { thumbnail: '' },
  link: '',
  show: 'false',
  title: [{ value: '' }, { value: '' }],
  _id: ''
};

export const slideOrder = 4;
export const slideId = '1';
export const {SAVE_TITLE} = config.buttonTitles;
export const {CREATE_SLIDE_TITLE} = config.buttonTitles;
