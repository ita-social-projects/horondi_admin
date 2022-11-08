const statuses = {
  SUCCESS_ADD_STATUS: 'Успішно додано!',
  SUCCESS_CREATION_STATUS: 'Успішно створено!',
  SUCCESS_DELETE_STATUS: 'Успішно видалено!',
  SUCCESS_UPDATE_STATUS: 'Успішно змінено!',
  SUCCESS_CONFIRMATION_STATUS: 'Успішно підтверджено реєстрацію!',
  SUCCESS_SEND_EMAIL: 'Успішно надіслано лист на пошту!',
  USER_ACTIVE_STATUS: 'Активний(-a)',
  USER_INACTIVE_STATUS: 'Неактивний(-a)',
  TIME_TO_FINISH_BLOCK_PERIOD_STATUS: (period) =>
    `Користувач буде автоматично розблокований через ${period} днів `,
  USER_INACTIVE_FOREVER_STATUS: 'Користувач деактивований назавжди',
  ACTIVE_STATUS: 'Активний',
  IN_PROGRESS_STATUS: 'В процесі',
  USED_STATUS: 'Використаний',
  EXPIRED_STATUS: 'Протермінований',
  PENDING_STATUS: 'В обробці'
};
export default statuses;
