const orders = {
  statusOptions: [
    { label: 'Статус замовлення', value: '' },
    { label: 'Створено', value: 'CREATED' },
    { label: 'Підтвердженно', value: 'CONFIRMED' },
    { label: 'Виготовлено', value: 'PRODUCED' },
    { label: 'Скасовано', value: 'CANCELLED' },
    { label: 'Повернення коштів', value: 'REFUNDED' },
    { label: 'Відправлено', value: 'SENT' },
    { label: 'Доставлено', value: 'DELIVERED' }
  ],
  paymentOptions: [
    { label: 'Метод оплати', value: '' },
    { label: 'Картка', value: 'CARD' },
    { label: 'Готівка', value: 'CASH' }
  ],
  paymentSatatusOptions: [
    { label: 'Стан оплати', value: '' },
    { label: 'Створено', value: 'CREATED' },
    { label: 'Протерміновано', value: 'EXPIRED' },
    { label: 'Підтверджено', value: 'APPROVED' },
    { label: 'Відхилено', value: 'DECLINED' },
    { label: 'Перенаправлено', value: 'REVERSED' },
    { label: 'В обробці', value: 'PROCESSING' }
  ],
  deliveryTitles: {
    deliveryAddress: 'Адреса доставки',
    novaPostCourieru: "Новa Пошта кур'єр",
    ukrPostCourier: "Укрпошта кур'єр",
    novaPost: 'Нова пошта',
    ukrPost: 'Укрпошта',
    worldWide: 'Міжнародна доставка'
  },
  deliveryLabels: {
    city: 'Місто',
    department: 'Відділення',
    region: 'Область',
    district: 'Район',
    messenger: 'Месенджер',
    messengerPhone: 'Номер телефону',
    country: 'Країна',
    stateOrProvince: 'Штат/Провінція',
    street: 'Вулиця',
    cityCode: 'Код міста'
  },
  deliveryAdditionalInfo: {
    noOneCity: 'Жодного міста не знайдено',
    noOneDepartment: 'Жодного відділення не знайдено',
    noOneRegion: 'Жодної області не знайдено',
    noOneDistrict: 'Жодного району не знайдено'
  },
  deliveryTypes: {
    novaPost: 'NOVAPOST',
    ukrPost: 'UKRPOST',
    novaPostCourier: 'NOVAPOSTCOURIER',
    ukrPostCourier: 'UKRPOSTCOURIER',
    selfPickUp: 'SELFPICKUP',
    worldWide: 'WORLDWIDE'
  },

  dialogTitle: 'Замовлення',
  dialogContent:
    'Зміна статусу "Замовлення створено" чи "Замовлення підтверджено" на інші унеможливить подальше редагування деталей замовлення. Ви дійсно хочете продовжити?',
  buttonTitle: 'Продовжити',
  productLabels: {
    product: 'Продукти',
    addProduct: 'Додати продукт',
    quantity: 'Кількість: ',
    size: 'Розмір: ',
    saveProduct: 'Зберегти'
  },
  productAdditionalInfo: {
    noOneProduct: 'Жодного продукту не знайдено'
  },
  userAdditionalInfo: {
    noOneUser: 'Жодного користувача не знайдено'
  },
  userLabels: {
    addRegisteredUser: 'Додати користувача'
  },
  orderTableStatus: {
    CREATED: 'Створено',
    CONFIRMED: 'Підтверджено',
    PRODUCED: 'Виготовлено',
    CANCELLED: 'Скасовано',
    REFUNDED: 'Повернення коштів',
    SENT: 'Відправлено',
    DELIVERED: 'Доставлено',
    EXPIRED: 'Протерміновано',
    DECLINED: 'Відхилено',
    REVERSED: 'Перенаправлено',
    PROCESSING: 'В обробці',
    PAID: 'Оплачено'
  },
  paymentStatusTranslation: {
    CREATED: 'Створено',
    EXPIRED: 'Протерміновано',
    DECLINED: 'Відхилено',
    REVERSED: 'Перенаправлено',
    PROCESSING: 'В обробці',
    PAID: 'Оплачено'
  },
  promoCodesConsts: {
    status: {
      active: 'Активний',
      expired: 'Завершений',
      planned: 'Запланований'
    },
    error: 'Промокод або сертифікат не знайдено',
    deletePromo: 'Ви впевнені, що хочете видалити цeй промокод?',
    namePromo: 'Назва промокоду',
    createPromo: 'Створи Промокод:',
    date: {
      validityPeriod: 'Термін дії:',
      validFrom: 'Термін дії',
      validTo: 'Термін до'
    },
    discount: {
      title: 'Розмір знижки у процентах:',
      label: 'Розмір знижки'
    },
    categories: {
      title: 'Застосувати до:',
      checkboxes: [{ label: 'Зроби сам', value: 'constructor' }]
    }
  },
  size: {
    deleted: 'Розмір видалено'
  },
  discount: {
    tittle: 'Iнформація про знижку:',
    promoCode: 'Промокод:',
    certificate: 'Сертифікат:',
    code: 'Код:',
    discount: 'Pозмір знижки:',
    categories: 'Категорія:'
  }
};

export default orders;
