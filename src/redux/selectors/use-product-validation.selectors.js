import * as Yup from 'yup';

export const NameSelector = ({ name }) => [name, Yup.string().required()];
