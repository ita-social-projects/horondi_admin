export const id = '5c3c7929dd85de268bed4fe1';
export const _id = '5c3c7929dd85de268bed4fe3';
export const invalidId = '5c3c7929dd85de268bed4fe2';
export const images = ['test'];
export const updatedImage = 'update';
export const loading = false;
export const error = false;
export const updatedImages = { _id: '5c3c7929dd85de268bed4f23' };
export const initialState = {
  photos: [],
  homePageLoading: false,
  homePageError: null
};

export const looksImagesMock = {
  result: {
    data: {
      getHomePageLooksImages: [
        {
          _id: id,
          images: null
        }
      ]
    }
  }
};

export const looksImageUpdateMock = {
  result: {
    data: {
      updateHomePageLooksImage: {
        _id: id,
        images: null
      }
    }
  }
};
