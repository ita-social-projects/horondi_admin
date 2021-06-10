import { config as configs } from '../configs';

export const statusPatternFilterObject =
  configs.labels.statusPatterns.select.map(({ value, label }) => ({
    key: value,
    value: label
  }));
export const materialPatternFilterObject =
  configs.labels.materialPatterns.select.map(({ value, label }) => ({
    key: value,
    value: label
  }));
