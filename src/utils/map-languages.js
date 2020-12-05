import languages from '../configs/languages';

export const mapToLanguages = (...args) =>
  languages.map((lang, index) => ({
    value: args[index],
    lang
  }));
