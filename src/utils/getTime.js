import { format } from 'date-fns';

export default (time, showBreakLine) => {
  if (showBreakLine) {
    return `${format(+time, 'H:mm')} <br />
  ${format(+time, 'dd/MM/yy')}`;
  }

  return `${format(+time, 'H:mm')} ${format(+time, 'dd/MM/yy')}`;
};
