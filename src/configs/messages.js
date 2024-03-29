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
  constructorPageMessages: {
    bottom: {
      ITEM_REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цей низ?',
      NO_ITEMS_MESSAGE: 'Низи відсутні'
    },
    back: {
      ITEM_REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цю спинку?',
      NO_ITEMS_MESSAGE: 'Cпинки відсутні'
    },
    pocket: {
      ITEM_REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цей низ?',
      NO_ITEMS_MESSAGE: 'Кишені відсутні'
    },
    strap: {
      ITEM_REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цей ремінець?',
      NO_ITEMS_MESSAGE: 'Ремінці відсутні'
    },
    position: {
      ITEM_REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цe розміщення?',
      NO_ITEMS_MESSAGE: 'Розміщення відсутні'
    },
    closure: {
      ITEM_REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цю защіпку?',
      NO_ITEMS_MESSAGE: 'Защіпки відсутні'
    },
    basic: {
      ITEM_REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цю основу?',
      NO_ITEMS_MESSAGE: 'Основи відсутні'
    },
    IS_IN_CONSTRUCTOR_MESSAGE(modelsName) {
      return `Цей елемент є частиною конструктора(ів): ${modelsName}.
      Для видалення, спершу приберіть цей елемент
      з обраних у відповідних конструкторах.`;
    }
  },
  NO_CONSTRUCTOR_MESSAGE: 'Немає доступних контрукторів для відображення',
  DELETE_CONSTRUCTOR_MESSAGE:
    'Ви впевнені, що хочете видалити цей конструктор?',
  NO_CERTIFICATES_MESSAGE: 'Сертифікати відсутні',
  DELETE_CERTIFICATE_MESSAGE: 'Ви впевнені, що хочете видалити цей сертифікат?',
  UPDATE_CERTIFICATE_MESSAGE:
    'Ви впевнені, що хочете відмітити цей сертифікат як використаний?',
  NO_BASICS_MESSAGE: 'Основи відсутні',
  PRODUCTS_DELETE_WITH_MODEL_MESSAGE: (
    numberOfProducts,
    numberOfConstructors
  ) =>
    `Буде видалено ${numberOfProducts ? `${numberOfProducts} продуктів` : ''} ${
      numberOfProducts && numberOfConstructors ? 'і' : ''
    } ${numberOfConstructors ? 'конструктор' : ''} цієї моделі`,
  DELETE_SIZE_CONFIRMATION_MESSAGE:
    'Ви впевнені що хочете видалити цей розмір?',
  DELETED_SIZE_MESSAGE: 'Розмір успішно видалено',
  DELETE_SIZE_ERROR: (productsWithLastSize, productsToDeleteMessage) =>
    `Це останній розмір для ${productsWithLastSize.length} продуктів: ${productsToDeleteMessage}. Замініть його або видаліть продукти`,
  SEND_CONFIRMATION_CODE:
    'Для запрошення суперадміна необхідно ввести код, який буде надіслано Вам на пошту',
  INVITE_ADMIN_TITLE: 'Запросити cпецкористувача ?',
  INVITE_ADMIN_MESSAGE: (email) => `Надіслати запрошення ${email} ?`
};
export default messages;
