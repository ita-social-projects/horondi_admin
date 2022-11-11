const formRegExp = {
  patternMaterial: '^[A-Za-z0-9]*$',
  backMaterial: '^[A-Za-z0-9]*$',
  backColor: '^[A-Za-z0-9]*$',
  email:
    '^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$',
  pass: '^(?!.* )(?=.*[0-9])(?=.*[A-Z]).{8,30}$',
  unwrapHtml: /(<([^>]+)>)/gi,
  enAddressRegex: '^[A-Za-z0-9_|,| |./]+$',
  uaRegex: '[А-ЩЬЮЯҐЄІЇа-щьюяґєії]',
  enRegex: /[a-z]/i,
  onlyPositiveFloat: /^(?!0\d)\d*(\.\d+)?$/,
  mobileNumber: /^\+380\(\d{2}\)-\d{3}-\d{2}-\d{1,2}$/g,
  userName: /[а-яА-Я]{2,}/g,
  userRoles: /(Користувач|Адмін|Суперадмін)/g,
  userStatuses: /(Активний|Неактивний)/g,
  hexString: /^#[0-9a-f]{3,6}$/i,
  uaNameCreation: /^[а-яїієґ0-9\s-]+$/gi,
  enNameCreation: /^[a-z0-9\s-]+$/gi,
  enDescription: /^[a-z0-9!@#$%^&*)(+=,.:;'"<>`_\-—\s|/\\]+$/gi,
  uaDescription: /^[а-яїієґ0-9!@#$%^&*)(+=,.:;'"<>`_\-—\s|/\\]+$/gi,
  categoryCode: /^[a-z0-9|-]/i,
  firstName: /^([a-zа-яіїє]|[',. -][a-zа-яіїє])*$/i,
  lastName: /^([a-zа-яіїє]|[',. -][a-zа-яіїє])*$/i,
  phoneNumber: /^(\+380|0)\d{9}$/,
  additionalPriceRegExp: /^[0-9|]/i,
  pageCode: /^[a-z0-9|-]/i,
  postCode: /^\d{5}(?:[-\\s]\\d{4})?$/,
  promoCodeName: /^([a-z])[a-z]{2,}\w*/i,
  promoCodeDiscountMultiple: /^\d*[05]$/,
  promoCodeDiscountPositive: /^[1-9]\d*$/
};
export default formRegExp;
