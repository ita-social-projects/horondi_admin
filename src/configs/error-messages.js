export const errorMessages = {
  USER_NOT_FOUND: 'Користувач не знайдений!',
  INVALID_PERMISSIONS: 'Недостатньо прав користувача',
  WRONG_CREDENTIALS: 'Неправильно вказані вхідні дані',
  INPUT_NOT_VALID: 'Неправильні ввідні дані',
  USER_ALREADY_EXIST: 'Користувач з такими даними вже існує',
  INVALID_ADMIN_INVITATIONAL_TOKEN:
    'Неправильне посилання на створення користувача',
  NO_COLORS: 'Створіть колір',
  USER_IS_ALREADY_BLOCKED: 'Цей користувач вже неактивний',
  YOU_CANT_BLOCK_YOURSELF: 'Ви не можете деактивувати власний профіль',
  ONLY_SUPER_ADMIN_CAN_BLOCK_ADMIN: 'У вас недостатньо прав',
  USER_IS_ALREADY_UNLOCKED: 'Цей користувач вже активний',
  YOU_CANT_UNLOCK_YOURSELF: 'Ви не можете активувати власний профіль',
  ONLY_SUPER_ADMIN_CAN_UNLOCK_ADMIN: 'У вас недостатньо прав',
  INVALID_OTP_CODE: 'Неправильний otp-код'
};

export const loginErrorMessages = {
  INVALID_EMAIL_MESSAGE: 'Некоректна email адреса',
  ENTER_EMAIL_MESSAGE: 'Введіть email',
  PASSWORD_MIN_LENGTH_MESSAGE: 'Пароль повинен містити не менше 8 символів',
  PASSWORD_MAX_LENGTH_MESSAGE: 'Пароль повинен містити не більше 20 символів',
  PASSWORD_LANG_MESSAGE: 'Використовуйте латиницю різних регістрів та цифри',
  ENTER_FIRSTNAME_MESSAGE: "Введіть ім'я",
  ENTER_LASTNAME_MESSAGE: 'Введіть прізвище',
  ENTER_PASSWORD_MESSAGE: 'Введіть пароль',
  FIRSTNAME_MIN_LENGTH_MESSAGE: "Ім'я повинно містити не менше 2 символів",
  LASTNAME_MIN_LENGTH_MESSAGE: 'Прізвище повинно містити не менше 2 символів',
  FIRSTNAME_MAX_LENGTH_MESSAGE: "Ім'я повинно містити не більше 30 символів",
  LASTNAME_MAX_LENGTH_MESSAGE: 'Прізвище повинно містити не більше 30 символів',
  SELECT_ROLE_MESSAGE: 'Оберіть роль',
  WRONG_FORMAT: 'Не допускається використання спеціальних символів',
  ENTER_CODE: 'Введіть код'
};

export const commonErrorMessages = {
  MIN_LENGTH_MESSAGE: 'Мінімум 2 символи',
  MAX_LENGTH_MESSAGE: 'Максимум 50 символiв',
  MAX_LENGTH_MESSAGE_300: 'Не більше 300 символів',
  ERROR_MESSAGE: 'Поле не може бути порожнім',
  UA_NAME_MESSAGE: 'Поле може містити тільки українські літери та цифри',
  EN_NAME_MESSAGE: 'Поле може містити тільки англійські літери та цифри',
  ERROR_ENGLISH_AND_DIGITS_ONLY: 'Тільки англійські букви і цифри',
  PRICE_ERROR: 'Це поле повинно містити тільки додатні значенння'
};
export const promoCodeErrorMessages = {
  LENGTH_CODE: 'Поле має містити від 2 до 30 символів',
  STYLE_CODE: 'Поле має містити англійські літери або цифри',
  ERROR_MESSAGE: 'Поле має бути заповнене',
  LENGTH_DISCOUNT: 'Поле має містити максимально 2 цифри',
  POSITIVE_DISCOUNT: 'Тільки більше нуля',
  MULTIPLE_DISCOUNT: 'Число має бути кратним п’яти'
};

export const patternErrorMessages = {
  PATTERN_VALIDATION_ERROR_NAME: 'Назва повинна містити від 2 до 50 символів',
  PATTERN_VALIDATION_ERROR_DESCRIPTION:
    'Опис повинний містити від 2 до 1000 символів',
  PHOTO_NOT_PROVIDED: "Фото гобелена є обов'язковим",
  CONSTRUCTOR_PHOTO_NOT_PROVIDED: "Фото для конструктора є обов'язковим"
};

export const backErrorMessages = {
  PHOTO_NOT_PROVIDED: "Фото спинки є обов'язковим",
  BACK_UA_NAME_MESSAGE: 'Введіть назву спинки українською',
  BACK_EN_NAME_MESSAGE: 'Введіть назву спинки англійською'
};

export const bottomErrorMessages = {
  PHOTO_NOT_PROVIDED: "Фото низу є обов'язковим",
  BOTTOM_UA_NAME_MESSAGE: 'Введіть назву низу українською',
  BOTTOM_EN_NAME_MESSAGE: 'Введіть назву низу англійською'
};

export const closuresErrorMessages = {
  PHOTO_NOT_PROVIDED: "Фото защіпки є обов'язковим",
  CLOSURES_UA_NAME_MESSAGE: 'Введіть назву защіпки українською',
  CLOSURES_EN_NAME_MESSAGE: 'Введіть назву защіпки англійською'
};

export const pocketsErrorMessages = {
  POCKETS_POSITION_ERROR_MESSAGE: 'Оберіть позицію із запропронованого списку',
  POCKETS_ERROR: 'Додайте фото для кишені',
  POCKETS_UA_NAME_MESSAGE: 'Введіть назву кишені українською',
  POCKETS_EN_NAME_MESSAGE: 'Введіть назву кишені англійською'
};

export const basicsErrorMessages = {
  PHOTO_NOT_PROVIDED: "Фото основи є обов'язковим"
};

export const constructorErrorMessages = {
  PHOTO_NOT_PROVIDED: 'Додайте фото для конструктора'
};

export const strapsErrorMessages = {
  STRAPS_COLOR_ERROR_MESSAGE: 'Оберіть колір із запропонованого списку'
};

export const categoryErrorMessages = {
  CATEGORY_VALIDATION_ERROR: 'Це поле повинно містити від 2 до 30 символів',
  CATEGORY_VALIDATION_ERROR_CATEGORY_NAME:
    'Назва повинна містити від 2 до 50 символів',
  CATEGORY_CODE_MESSAGE: 'Поле не може містити спеціальні символи',
  CATEGORY_ERROR: 'Додайте фото для категорії'
};

export const headerErrorMessages = {
  HEADER_VALIDATION_ERROR: 'Введіть посилання для сторінки',
  NOT_UA_NAME_MESSAGE: `Введіть ім'я посилання українською`,
  NOT_EN_NAME_MESSAGE: `Введіть ім'я посилання англійською`
};

export const newsErrorMessages = {
  NAME_MIN_LENGTH_MESSAGE: `Ім'я автора повинне містити не менше 2 символів`,
  TITLE_MIN_LENGTH_MESSAGE: 'Заголовок повинен містити не менше 10 символів',
  TEXT_MIN_LENGTH_MESSAGE: 'Текстове поле повино містити не менше 10 символів',
  NOT_EN_TEXT_MESSAGE: 'Введіть текст новини англійською',
  NOT_UA_TEXT_MESSAGE: 'Введіть текст новини українською',
  NOT_EN_TITLE_MESSAGE: 'Введіть заголовок новини англійською',
  NOT_UA_TITLE_MESSAGE: 'Введіть заголовок новини українською',
  NOT_EN_AUTHOR_NAME_MESSAGE: "Введіть ім'я автора новини англійською",
  NOT_UA_AUTHOR_NAME_MESSAGE: "Введіть ім'я автора новини українською"
};

export const modelErrorMessages = {
  PHOTO_NOT_PROVIDED: 'Додайте фото для моделі',
  NOT_EN_DESCRIPTION_MESSAGE: `Введіть опис моделі англійською`,
  NOT_UA_DESCRIPTION_MESSAGE: `Введіть опис моделі українською`,
  NO_STRING_TYPE_MESSAGE: `Повинно містити букви, цифри та спецсимволи`
};

export const contactErrorMessages = {
  INVALID_EMAIL_MESSAGE: 'Некоректна email адреса',
  ENTER_EMAIL_MESSAGE: 'Введіть email',
  PHONE_NUMBER_LENGTH_MESSAGE:
    'Довжина номеру телефону повинна містити 12 символів',
  PHONE_NUMBER_TYPE_MESSAGE: 'Номер повинен містити лише числа',
  ENTER_PHONE_NUMBER_MESSAGE: 'Введіть номер',
  INPUT_LENGTH_MESSAGE: 'Довжина повинна містити не менше 10 символів',
  ENTER_UA_SCHEDULE_MESSAGE: 'Введіть розклад українською',
  ENTER_EN_SCHEDULE_MESSAGE: 'Введіть розклад англійською',
  ENTER_UA_ADDRESS_MESSAGE: 'Введіть адресу українською',
  ENTER_EN_ADDRESS_MESSAGE: 'Введіть адресу англійською',
  IMAGE_FORMAT_MESSAGE:
    'Введіть коректний формат, наприклад: https://example.com/',
  ENTER_LINK_MESSAGE: 'Введіть посилання',
  CONTACT_ERROR_MESSAGE: 'Помилка збереження',
  INVALID_PHONE_MESSAGE:
    'Введіть коректний формат, наприклад: +380(XX)-XXX-XX-XX'
};

export const emailQuestionsErrorMessages = {
  ANSWER_INPUT_MESSAGE: 'Введіть текст для відповіді'
};

export const materialErrorMessages = {
  MAX_LENGTH_MESSAGE: `Не більше 100 символів`,
  NOT_EN_DESCRIPTION_MESSAGE: `Введіть опис матеріалу англійською`,
  NOT_UA_DESCRIPTION_MESSAGE: `Введіть опис матеріалу українською`
};

export const sizeErrorMessages = {
  MAX_LENGTH_MESSAGE: `Не більше 20 символів`,
  MIN_LENGTH_MESSAGE: `Не менше 1см`,
  MAX_LENGTH_MESSAGE_SIZE: `Не більше 35см`,
  MIN_LENGTH_MESSAGE_SIZE: `Не менше 1 символу`,
  MAX_WEIGHT_MESSAGE_SIZE: `Не більше 5 кг`,
  MIN_WEIGHT_MESSAGE_SIZE: `Не менше 0.1 кг`,
  NO_NUMBER_TYPE_MESSAGE: `Повинно містити число`,
  NO_STRING_TYPE_MESSAGE: `Повинно містити букви`
};

export const colorErrorMessages = {
  MAX_LENGTH_MESSAGE: `Не більше 100 символів`,
  COLOR_VALIDATION_ERROR: `Неправильний формат кольору`,
  NOT_EN_SIMPLE_NAME_MESSAGE: `Введіть просту назву кольору англійською`,
  NOT_UA_SIMPLE_NAME_MESSAGE: `Введіть просту назву кольору українською`
};

export const statsErrorMessages = {
  NO_STATS: 'Статистика для вибраного значення відсутня'
};

export const homePageSlideErrorMessages = {
  NOT_UA_NAME_MESSAGE: `Введіть ім'я слайду українською`,
  NOT_EN_NAME_MESSAGE: `Введіть ім'я слайду англійською`,
  NOT_EN_DESCRIPTION_MESSAGE: `Введіть опис слайду англійською`,
  NOT_UA_DESCRIPTION_MESSAGE: `Введіть опис слайду українською`
};

export const paginationInputErrorMessages = {
  MUST_BE_NUMBER: 'Тільки цифри',
  MUST_BE_POSITIVE: 'Тільки більше нуля',
  PAGE_NOT_FOUND: 'Сторінку не знайдено'
};

export const businessPageErrorMessages = {
  ENTER_CODE_ERROR_MESSAGE: 'Введіть унікальний ідентифікатор для сторінки',
  ENTER_TITLE_ERROR_MESSAGE: 'Введіть заголовок',
  ENTER_TEXT_ERROR_MESSAGE: 'Введіть текст для сторінки',
  MIN_TEXT_LENGTH_MESSAGE: 'Мінімум 10 символiв'
};

export const productErrorMessages = {
  REQUIRED_PHOTOS: "Головне фото для продукту є обов'язковим",
  REQUIRED_FIELD: "Обов'язкове поле",
  NAME_TOO_SHORT_MESSAGE: 'Назва продукту повинна містити не менше 6 символів',
  NAME_TOO_LONG_MESSAGE: 'Назва продукту повинна містити не більше 50 символів',
  CORRECT_DATA_ERROR:
    'Заповніть необхідні поля коректними даними для усіх мов ',
  NOT_UA_NAME_MESSAGE: 'Введіть назву українською',
  NOT_EN_NAME_MESSAGE: 'Введіть назву англійською'
};

export const userErrorMessages = {
  USER_FIRSTNAME_MESSAGE: "Введіть коректне ім'я",
  USER_FIRSTNAME_MIN_LENGTH_MESSAGE: "Ім'я повинно містити не менше 2 символів",
  USER_FIRSTNAME_MAX_LENGTH_MESSAGE:
    "Ім'я повинно містити не більше 30 символів",
  USER_LASTNAME_MESSAGE: 'Введіть коректне прізвище',
  USER_LASTNAME_MIN_LENGTH_MESSAGE:
    'Прізвище повинно містити не менше 2 символів',
  USER_LASTNAME_MAX_LENGTH_MESSAGE:
    'Прізвище повинно містити не більше 30 символів',
  USER_PASSWORD_MESSAGE: 'Введіть пароль',
  USER_PASSWORD_MIN_LENGTH_MESSAGE:
    'Пароль повинен містити не менше 8 символів',
  USER_PASSWORD_MAX_LENGTH_MESSAGE:
    'Пароль повинен містити не більше 20 символів',
  USER_PASSWORD_LANG_MESSAGE:
    'Використовуйте латиницю різних регістрів та цифри',
  USER_EMAIL_MESSAGE: 'Введіть email',
  USER_INVALID_EMAIL_MESSAGE: 'Некоректна email адреса',
  USER_PHONE_NUMBER_MESSAGE: 'Введіть номер телефону',
  USER_INVALID_PHONE_NUMBER_MESSAGE: 'Введіть номер телефону',
  USER_INVALID_ADDRESS_MESSAGE: 'Введіть коректну адресу',
  USER_ERROR_MESSAGE: 'Поле не може бути порожнім'
};
