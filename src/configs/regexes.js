export const userNameRegex = /^([a-zа-яіїє]|[',. -][a-zа-яіїє])*$/i;
export const phoneNumberWithoutLettersRegex = /^[0-9 ()+-]+$/;
export const phoneNumberRegex =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;
export const imgNameRegex = /(thumbnail|small|medium|large)_(.+)/;
export const onlyNumbersRegex = /^\d*$/;
