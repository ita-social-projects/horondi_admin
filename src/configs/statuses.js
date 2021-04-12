const statuses = {
  SUCCESS_ADD_STATUS: 'Успішно додано!',
  SUCCESS_CREATION_STATUS: 'Успішно створено!',
  SUCCESS_DELETE_STATUS: 'Успішно видалено!',
  SUCCESS_UPDATE_STATUS: 'Успішно змінено!',
  SUCCESS_CONFIRMATION_STATUS: 'Успішно підтверджено реєстрацію!',
  SUCCESS_SEND_EMAIL: 'Успішно надіслано лист на пошту!',
  ERROR_PAGE_STATUS: 'Сторінку не знайдено!',
  ERROR_BOUNDARY_STATUS: 'Сталася помилка!',
  USER_ACTIVE_STATUS: 'Активний(-a)',
  USER_INACTIVE_STATUS: 'Неактивний(-a)',
  LOGIN_PAGE_STATUS: 'Невірний логін або пароль',
  TIME_TO_FINISH_BLOCK_PERIOD_STATUS: (period) =>
    `Користувач буде автоматично розблокований через ${period} днів `,
  USER_INACTIVE_FOREVER_STATUS: 'Користувач деактивований назавжди'
};
export default statuses;
