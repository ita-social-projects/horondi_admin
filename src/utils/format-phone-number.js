export const formatPhoneNumber = (phone = '') => {
  if (typeof phone !== 'string') {
    return '';
  }
  return (
    `+${phone.slice(0, 3)}(${phone.slice(3, 5)})-${phone.slice(
      5,
      8
    )}-${phone.slice(8, 10)}-${phone.slice(10, 12)}` || ''
  );
};
