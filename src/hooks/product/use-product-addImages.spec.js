import useProductAddImages from './use-product-addimages';

describe('use-product-add-images tests', () => {
  const toggleFieldsChanged = jest.fn();
  const productImages = [];
  const setProductImages = jest.fn();
  it('should correct work', () => {
    const { handleImagesLoad } = useProductAddImages({
      toggleFieldsChanged,
      productImages,
      setProductImages
    });
    handleImagesLoad(['file1', 'file2']);

    expect(toggleFieldsChanged).toHaveBeenCalled();
    expect(setProductImages).toHaveBeenCalled();
  });
});
