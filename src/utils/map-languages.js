import languages from '../configs/languages';

const mapToLanguages = (...args) =>
  languages.map((lang, index) => ({
    value: args[index],
    lang
  }));

export default mapToLanguages;
