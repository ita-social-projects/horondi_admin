export const getHeaderInitialValues = (header) => ({
  uaName: header.title ? header.title[0].value : '',
  enName: header.title ? header.title[1].value : '',
  priority: header.priority || 1,
  link: header.link || ''
});
