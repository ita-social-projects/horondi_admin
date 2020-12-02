export const AdditionsSelector = ({ additions }) => additions.length;

export const OptionsSelector = ({ options }) => options.find(AdditionsSelector);
