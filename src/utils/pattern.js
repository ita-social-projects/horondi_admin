import { config as configs } from '../configs';

export const materialPatternTableAction = {
  '6043b2ec3e06ad3edcdb7b17': 'Нитка для шиття',
  '6043a1f33e06ad3edcdb7b09': 'Мальмо',
  '6043aaab3e06ad3edcdb7b11': 'Шкірзамінник',
  '6043ab033e06ad3edcdb7b12': 'Кордура',
  '6043acc83e06ad3edcdb7b14': 'Оксфорд 135',
  '6043c2d13e06ad3edcdb7b33': 'Защіпка'
};

export const patternStatusTableAction = {
  true: 'Так',
  false: 'Hi'
};

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
