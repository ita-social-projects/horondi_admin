import * as Yup from 'yup';

export const AdditionsSelector = ({ additions }) => additions.length;

export const OptionsSelector = ({ options }) => options.find(AdditionsSelector);

export const ColorsSelector = ({ colors }) => colors[0].simpleName[0].value;

export const NameSelector = ({ name }) => [name, Yup.string().required()];
