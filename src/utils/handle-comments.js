export const handleComments = (
  commentItems,
  tableTitles,
  NO_COMMENTS_MESSAGE
) => (commentItems ? tableTitles : [NO_COMMENTS_MESSAGE]);
