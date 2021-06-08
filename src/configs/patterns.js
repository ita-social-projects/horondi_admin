const patterns = {
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
  },
  patternTableStatus: {
    AVAILABLE: 'Доступний',
    NOT_AVAILABLE: 'Немає в наявності'
  }
};

export default patterns;
