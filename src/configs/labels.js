const labels = {
  pattern: {
    image: 'Фото гобелена',
    material: 'Код матеріалу',
    available: 'Доступний',
    handmade: 'Зроблений вручну',
    avatarText: 'Фото'
  },
  product: {
    sortBySelectOptions: [
      {
        label: 'популярністю',
        value: 'popularity'
      },
      {
        label: 'від дорогих до дешевих',
        value: 'sortDesc'
      },
      {
        label: 'від дешевих до дорогих',
        value: 'sortAsc'
      },
      {
        label: 'рейтингом',
        value: 'rate'
      }
    ],
    stepsLabels: [
      'Введіть інформацію про продукт',
      'Оберіть категорію, підкатегорію, модель, колір, гобелен та ціну продукту',
      'Вкажіть ціну продукту',
      'Оберіть опційні параметри',
      'Завантажте фото для продукту',
      'Підтвердження створення продукту'
    ],
    infoLabels: [
      { label: 'Назва', name: 'name', required: true },
      {
        label: 'Основний матеріал',
        name: 'mainMaterial',
        required: true
      },
      {
        label: 'Внутрішній матеріал',
        name: 'innerMaterial',
        required: false
      },
      { label: 'Замок', name: 'closure', required: false },
      {
        label: 'Довжина лямок(см)',
        name: 'strapLengthInCm',
        required: false
      },
      { label: 'Опис', name: 'description', required: false }
    ],
    selectsLabels: [
      {
        label: 'Категорія ',
        name: 'category',
        type: 'select',
        required: true
      },
      {
        label: 'Підкатегорія ',
        name: 'subcategory',
        type: 'select',
        required: true
      },
      {
        label: 'Модель ',
        name: 'model',
        type: 'select',
        required: true
      },
      {
        label: 'Колір ',
        name: 'colors',
        type: 'select',
        required: true
      },
      {
        label: 'Гобелен ',
        name: 'pattern',
        type: 'select',
        required: true
      }
    ],
    optionsLabels: [
      { label: 'Розміри', name: 'sizes' },
      { label: 'Нижні матеріали', name: 'bottomMaterials' }
    ],
    sizeCardsLabels: [
      { label: 'Розмір', name: 'name' },
      { label: `Об'єм(л)`, name: 'volumeInLiters' },
      { label: 'Ширина(см)', name: 'widthInCm' },
      { label: 'Висота(см)', name: 'heightInCm' },
      { label: 'Глибина(см)', name: 'depthInCm' }
    ],
    materialsLabels: [{ label: `Назва`, name: 'name' }],
    optionsValues: {
      sizes: [],
      bottomMaterials: [],
      additions: false
    },
    priceLabel: {
      label: 'Ціна(USD) ',
      name: 'basePrice'
    }
  },
  doughnut: {
    select: [
      { label: 'Популярні категорії', value: 'categories' },
      { label: 'Статуси замовлень', value: 'orders' }
    ],
    dateMenuOptions: [
      { label: 'За 7 Днів', value: 7 },
      { label: 'За 14 Днів', value: 14 },
      { label: 'За 30 Днів', value: 30 }
    ]
  }
};
export default labels;
