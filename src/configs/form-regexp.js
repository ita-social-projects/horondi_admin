const formRegExp = {
  patternMaterial: '^[A-Za-z][A-Za-z0-9]*$',
  email:
    '^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$',
  pass: '^(?!.* )(?=.*[0-9])(?=.*[A-Z]).{8,30}$',
  unwrapHtml: /(<([^>]+)>)/gi,
  enAddressRegex: '^[A-Za-z0-9_|,| |./]+$',
  onlyPositiveDigits: /^[0-9]\d*$/,
  editorField: /^<p><br><\/p>|<p><\/p>$/,
  mobileNumber: /^\+380\(\d{2}\)-\d{3}-\d{2}-\d{1,2}$/g,
  userName: /[а-яА-Я]{2,}/g,
  userRoles: /(Користувач|Адмін|Суперадмін)/g,
  userStatuses: /(Активний|Неактивний)/g,
  hexString: /^#[0-9a-f]{3,6}$/i,
  uaNameCreation: /^[а-яїієґ0-9]+$/i,
  enNameCreation: /^[a-z0-9]+$/i,
  categoryCode: /^[a-z0-9|-]/i
};
export default formRegExp;
