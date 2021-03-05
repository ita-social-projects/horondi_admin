export const setMapImageHandler = (target, setMapFn, values, valuesKey) => {
  if (target.files && target.files[0]) {
    setMapFn({
      name: target.files[0].name,
      imageUrl: URL.createObjectURL(target.files[0])
    });
  }
  [values[valuesKey]] = target.files;
};

export const avatarRenderHandler = (
  uaMapImage,
  initialValues,
  mapLayout,
  cartLayout
) => {
  if (uaMapImage.imageUrl) {
    return mapLayout;
  }

  if (initialValues.uaCartImage) {
    return cartLayout;
  }
  return null;
};
