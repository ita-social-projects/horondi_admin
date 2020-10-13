const formRegExp = {
  patternMaterial: '^[A-Za-z][A-Za-z0-9]*$',
  email:
    '^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$',
  password: '^(?!.* )(?=.*[0-9])(?=.*[A-Z]).{8,30}$',
  unwrapHtml: /(<([^>]+)>)/gi,
  enAddressRegex: '^[A-Za-z0-9_|,| |./]+$',
  editorField: /^<p><br><\/p>$/
};
export default formRegExp;
