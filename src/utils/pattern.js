import { statusPatterns } from '../consts/pattern-status';

export const materialPatternTableAction = (material) => {
  const materialTable = material.map((item) => [item.value, item.label]);
  return Object.fromEntries(materialTable);
};

export const statusPatternFilterObject = statusPatterns.map(
  ({ value, label }) => ({
    key: value,
    value: label
  })
);

export const materialPatternFilterObject = (material) =>
  material.map(({ value, label }) => ({
    key: value,
    value: label
  }));
