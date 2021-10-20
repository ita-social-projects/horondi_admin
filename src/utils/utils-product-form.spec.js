import { actionDispatchHandler } from './product-form';

const dispatch = jest.fn();
const setFiles = jest.fn();
const setPrimary = jest.fn();
const images = [
  {
    src: 'image',
    primary: false
  },
  {
    src: 'image',
    primary: false
  },
  {
    src: 'image1',
    primary: true
  }
];

describe('utils product form test', () => {
  it('should call actionDispatchHandler', () => {
    actionDispatchHandler(true, dispatch, setFiles, setPrimary, images);

    expect(dispatch).toHaveBeenCalled();
    expect(setFiles).toHaveBeenCalled();
    expect(setPrimary).toHaveBeenCalled();
  });
});
