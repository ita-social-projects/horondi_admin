import {
  differenceInHours,
  differenceInCalendarDays,
  formatDistanceToNow,
  format
} from 'date-fns';

export default (time) => {
  const now = new Date();
  const hoursFromNow = differenceInHours(now, +time);
  const daysFromNow = differenceInCalendarDays(now, +time);

  if (hoursFromNow === 0) {
    return formatDistanceToNow(+time, { addSuffix: true });
  } if (hoursFromNow <= 23 && !daysFromNow) {
    return format(+time, 'H:mm');
  } 
  return format(+time, 'dd/MM/yy');
  
};
