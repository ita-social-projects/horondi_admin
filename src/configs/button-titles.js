const buttonTitles = {
  DELETE_TITLE: 'Видалити',
  EDIT_TITLE: 'Редагувати',
  CREATE_NEWS_TITLE: 'Додати новину',
  CREATE_PATTERN_TITLE: 'Додати гобелен',
  REMOVE_TITLE: 'Видалити новину',
  PATTERN_REMOVE_TITLE: 'Видалити гобелен',
  REMOVE_BUSINESS_PAGE_TITLE: 'Видалити сторінку',
  CANCEL_TITLE: 'Відмінити',
  LOGOUT_TITLE: 'Вихід',
  CREATE_BUSINESS_PAGE: 'Додати бізнес сторінку',
  CREATE_CONTACT_TITLE: 'Додати контакти',
  REMOVE_CONTACT_TITLE: 'Видалити контакт',
  REMOVE_USER_TITLE: 'Видалити користувача',
  SWITCH_USER_STATUS_TITLE: 'Змінити статус користувача',
  USER_INACTIVE_TITLE: 'Деактивувати',
  USER_ACTIVE_TITLE: 'Активувати',
  ADD_CATEGORY: 'Додати категорію',
  GO_BACK_TITLE: 'Назад',
  DELETE_CATEGORY: 'Видалити категорію',
  ADD_SUBCATEGORY: 'Додати підкатегорію',
  ADD_CATEGORY_IMAGE: 'Зберегти посилання',
  ADD_CATEGORY_NAME: 'Додати назву',
  CANCEL: 'Відмінити',
  SAVE_CATEGORY: 'Зберегти категорію',
  SAVE_SUBCATEGORY: 'Зберегти підкатегорію',
  CREATE_SPECIAL_USER: 'Створити спецкористувача',
  CREATE_CATEGORY: 'Створити категорію',
  CREATE_SUBCATEGORY: 'Створити підкатегорію',
  USER_UNACTIVE_TITLE: 'Деактивувати',
  REMOVE_COMMENT_TITLE: 'Видалити коментар',
  SHOW_COMMENTS_TITLE: 'Переглянути коментарі',
  HIDE_COMMENTS_TITLE: 'Приховати коментарі',
  ADD_PHOTO_LABEL: '+',
  REMOVE_EMAIL_QUESTION: 'Видалити запитання?',

  titleGenerator: (editMode, isMain) => {
    const editModeMap = new Map([
      [true, 'Зберегти'],
      [false, 'Створити']
    ]);
    const isMainMap = new Map([
      [true, 'категорію'],
      [false, 'підкатегорію']
    ]);
    return `${editModeMap.get(editMode)} ${isMainMap.get(isMain)}`;
  }
};
export default buttonTitles;
