const messages = {
  SAVE_CHANGES: 'Зберегти зміни',
  SAVE_MESSAGE: 'Ви впевнені, що хочете зберегти зміни?',
  REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цю новину?',
  REMOVE_ITEM: 'Ви впевнені, що хочете видалити цей продукт?',
  REMOVE_ORDER_MESSAGE: 'Ви впевнені, що хочете видалити це замовлення?',
  REMOVE_BUSINESS_PAGE: 'Ви впевнені, що хочете видалити цю сторінку?',
  REMOVE_QUESTIONS_ANSWERS: 'Ви впевнені, що хочете видалити?',
  LOGOUT_MESSAGE: 'Ви впевнені, що хочете вийти?',
  DELETE_CATEGORY_MESSAGE: 'Ви впевнені, що хочете видалити цю категорію?',
  REMOVE_USER_MESSAGE: 'Ви впевнені,що хочете видалити цього користувача?',
  SWITCH_USER_STATUS_MESSAGE:
    'Ви впевнені,що хочете змінити статус користувача?',
  REMOVE_CONTACT_MESSAGE: 'Ви впевнені,що хочете видалити цей контакт?',
  REMOVE_COMMENT_MESSAGE: 'Ви впевнені, що хочете видалити цей коментар?',
  REMOVE_REPLY_COMMENT_MESSAGE: 'Ви впевнені, що хочете видалити цю відповідь?',
  NO_COMMENTS_MESSAGE: 'Коментарі відсутні',
  NO_ORDERS_MESSAGE: 'Замовлення відсутні',
  NO_REPLY_COMMENTS_MESSAGE: 'Відповіді відсутні',
  PATTERN_REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цей гобелен?',
  DELETE_SIZE_MESSAGE: 'Ви впевнені, що хочете видалити цей розмір?',
  NO_SIZES_MESSAGE: 'Розміри відсутні',
  NO_MODEL_MESSAGE: 'Моделі відсутні',
  NO_MATERIAL_MESSAGE: 'Матеріали відсутні',
  NO_NEWS_MESSAGE: 'Новини відсутні',
  REMOVE_MATERIAL_COLOR_MESSAGE: 'Ви впевнені, що хочете видалити цей колір?',
  EMAIL_QUESTION_REMOVE_MESSAGE:
    'Ви впевнені, що хочете видалити це запитання?',
  EMAIL_QUESTIONS_MOVE_TO_SPAM_MESSAGE:
    'Ви впевнені, що хочете перемістити вибрані запитання у СПАМ?',
  EMAIL_QUESTIONS_MOVE_TO_DELETE_MESSAGE:
    'Ви впевнені, що хочете видалити всі вибрані запитання?',
  EMAIL_QUESTION_SPAM_DETAILS:
    'Відповідь не доступна для запитань відзначених як "СПАМ"',
  MODEL_REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цю модель?',
  ERROR: 'ПОМИЛКА',
  EMPTY_LIST: 'Список порожній',
  REMOVE_MATERIAL_MESSAGE: 'Ви впевнені, що хочете видалити цей матеріал?',
  HEADER_REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити це посилання?',
  REMOVE_SLIDE_MESSAGE: 'Ви впевнені, що хочете видалити цей слайд?',
  REMOVE_COLOR_MESSAGE: 'Ви впевнені, що хочете видалити цей колір?',
  BACK_BUTTON_WARNING_MESSAGE: 'Ви впевнені, що хочете відмінити нові зміни?',
  REMOVE_CONSTRUCTOR_MESSAGE: 'Ви впевнені, що хочете видалити цей елемент?',
  NO_HISTORY_RECORDS_MESSAGE: 'Записи останніх змін відсутні',
  REMOVE_COLOR_DIALOG_TITLE: 'Видалення кольору',
  BACK_REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цю спинку?',
  BOTTOM_REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цей низ?',
  DELETE_POCKET_MESSAGE: 'Ви впевнені, що хочете видалити цю кишеню?',
  NO_POCKET_MESSAGE: 'Кишені відсутні',
  DELETE_STRAP_MESSAGE: 'Ви впевнені, що хочете видалити цей ремінець?',
  NO_STRAPS_MESSAGE: 'Ремінці відсутні',
  DELETE_POSITION_MESSAGE: 'Ви впевнені, що хочете видалити цe розміщення?',
  NO_POSITION_MESSAGE: 'Позиції відсутні',
  NO_BACKS_MESSAGE: 'Cпинки відсутні',
  NO_BOTTOMS_MESSAGE: 'Низи відсутні',
  NO_CONSTRUCTOR_MESSAGE: 'Немає доступних контрукторів для відображення',
  DELETE_CONSTRUCTOR_MESSAGE:
    'Ви впевнені, що хочете видалити цей конструктор?',
  DELETE_CLOSURE_MESSAGE: 'Ви впевнені, що хочете видалити цей замочок?',
  NO_CLOSURE_MESSAGE: 'Замочки відсутні',
  DELETE_BASIC_MESSAGE: 'Ви впевнені, що хочете видалити цю основу?',
  NO_CERTIFICATES_MESSAGE: 'Сертифікати відсутні',
  DELETE_CERTIFICATE_MESSAGE: 'Ви впевнені, що хочете видалити цей сертифікат?',
  UPDATE_CERTIFICATE_MESSAGE:
    'Ви впевнені, що хочете відмітити цей сертифікат як використаний?',
  NO_BASICS_MESSAGE: 'Основи відсутні',
  PRODUCTS_DELETE_WITH_MODEL_MESSAGE: (
    numberOfProducts,
    numberOfConstructors
  ) =>
    `Буде видалено ${numberOfProducts ? numberOfProducts + ' продуктів' : ''} ${
      numberOfProducts && numberOfConstructors ? 'і' : ''
    } ${numberOfConstructors ? 'конструктор' : ''} цієї моделі`,
  DELETE_SIZE_CONFIRMATION_MESSAGE:
    'Ви впевнені що хочете видалити цей розмір?',
  DELETED_SIZE_MESSAGE: 'Розмір успішно видалено',
  DELETE_SIZE_ERROR: (productsWithLastSize, productsToDeleteMessage) =>
    `Це останній розмір для ${productsWithLastSize.length} продуктів: ${productsToDeleteMessage}. Замініть його або видаліть продукти`
};
export default messages;
