export const convertSliderData = (data) => ({
  available: {
    title: data[0].title,
    items: data[0].items
  },
  nonAvailable: {
    title: data[1].title,
    items: data[1].items
  },
  columnData: [data[0].title, data[1].title]
});
