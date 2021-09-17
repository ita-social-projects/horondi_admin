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
    ukrPost: 'Укрпошта'
  },
  deliveryLabels: {
    city: 'Місто',
    department: 'Відділення',
    region: 'Область',
    district: 'Район'
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
    selfPickUp: 'SELFPICKUP'
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
  }
};

export default orders;
