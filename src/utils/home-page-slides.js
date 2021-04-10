export const getHomePageSlidesInitialValues = (slide, slideOrder) => ({
  slideImage: slide.images.large || '',
  uaTitle: slide.title[0].value || '',
  enTitle: slide.title[1].value || '',
  uaDescription: slide.description[0].value || '',
  enDescription: slide.description[1].value || '',
  link: slide.link || '',
  show: slide.show || false,
  order: slide.order || slideOrder
});
