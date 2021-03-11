export const useFormikInitialValues = (newsArticle) => ({
  authorPhoto: newsArticle.author.image || '',
  newsImage: newsArticle.image || '',
  uaAuthorName: newsArticle.author.name[0].value || '',
  enAuthorName: newsArticle.author.name[1].value || '',
  uaTitle: newsArticle.title[0].value || '',
  enTitle: newsArticle.title[1].value || '',
  uaText: newsArticle.text[0].value || '',
  enText: newsArticle.text[1].value || ''
});

export const pushPreferredLanguages = (checkboxes, langArray) => {
  Object.keys(checkboxes).forEach((key) => {
    if (checkboxes[key]) {
      langArray.push(key);
    }
  });
};
