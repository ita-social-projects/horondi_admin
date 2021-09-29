export const getUserInitialValues = (user, edit, IMG_URL) => ({
  userImage: edit ? IMG_URL + user?.images?.medium : '',
  userFirstName: user?.firstName || '',
  userLastName: user?.lastName || '',
  email: user?.email || '',
  phoneNumber: user?.phoneNumber || '',
  country: user?.address?.country || '',
  region: user?.address?.region || '',
  city: user?.address?.city || '',
  street: user?.address?.street || '',
  buildingNumber: user?.address?.buildingNumber || '',
  appartment: user?.address?.appartment || '',
  zipcode: user?.address?.zipcode || ''
});

export const userFormOnSubmit = (
  editAndUpload,
  dispatch,
  updateUser,
  updateActionPayload,
  edit,
  secondUpdateActionPayload
) => {
  if (editAndUpload) {
    dispatch(updateUser(updateActionPayload));
    return;
  }
  if (edit) {
    dispatch(updateUser(secondUpdateActionPayload));
  }
};
