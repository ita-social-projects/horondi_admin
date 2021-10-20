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
  onlyPositiveFloat: /^(?:[1-9]\d*|0(?!(?:\.0+)?$))?(?:\.\d+)?$/,
  mobileNumber: /^\+380\(\d{2}\)-\d{3}-\d{2}-\d{1,2}$/g,
  userName: /[а-яА-Я]{2,}/g,
  userRoles: /(Користувач|Адмін|Суперадмін)/g,
  userStatuses: /(Активний|Неактивний)/g,
  hexString: /^#[0-9a-f]{3,6}$/i,
  uaNameCreation: /^[а-яїієґ0-9\s]+$/i,
  enNameCreation: /^[a-z0-9\s]+$/i,
  enDescription: /^[a-z0-9!@#$%^&*)(+=,.:;'"<>`_\-—\s|/\\]+$/gi,
  uaDescription: /^[а-яїієґ0-9!@#$%^&*)(+=,.:;'"<>`_\-—\s|/\\]+$/gi,
  categoryCode: /^[a-z0-9|-]/i,
  firstName: /^([a-zа-яіїє]|[',. -][a-zа-яіїє])*$/i,
  lastName: /^([a-zа-яіїє]|[',. -][a-zа-яіїє])*$/i,
  phoneNumber:
    /^(\+38)?(?:\(0[0-9]{2}\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|0[0-9]{2}[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|0[0-9]{2}[0-9]{7})$/,
  additionalPriceRegExp: /^[0-9|]/i,
  pageCode: /^\/([a-z_\/-])+$/i, // eslint-disable-line
  postCode: /^\d{5}(?:[-\\s]\\d{4})?$/
};
export default formRegExp;
