import _ from 'lodash';
import { UserBlockPeriod } from '../consts/user-block-status';
import { config } from '../configs';

export const dayToMilliseconds = (day) => Number(day) * 1000 * 60 * 60 * 24;

export const millisecondsToDays = (milliseconds) => {
  const minutes = Math.floor(milliseconds / 60000);
  const hours = Math.round(minutes / 60);
  return Math.round(hours / 24);
};

export const getUserBlockStatus = (blockData) => {
  if (blockData?.blockPeriod === UserBlockPeriod.UNLOCKED) {
    return config.statuses.USER_ACTIVE_STATUS;
  }
  if (
    blockData?.blockPeriod === UserBlockPeriod.ONE_MONTH ||
    blockData?.blockPeriod === UserBlockPeriod.TWO_MONTH
  ) {
    const dateNow = new Date().getTime();
    const userBlockDate = new Date(blockData.updatedAt).getTime();
    const difference = dateNow - userBlockDate;
    const blockTimeInMilliseconds = dayToMilliseconds(blockData.blockPeriod);
    const timeToBlockEndInMilliseconds = blockTimeInMilliseconds - difference;
    const timeToBlockEnd = millisecondsToDays(timeToBlockEndInMilliseconds);

    return config.statuses.TIME_TO_FINISH_BLOCK_PERIOD_STATUS(timeToBlockEnd);
  }
  if (blockData?.blockPeriod === UserBlockPeriod.INFINITE) {
    return config.statuses.USER_INACTIVE_FOREVER_STATUS;
  }
};

export const userStatus = {
  false: 'Активний(-a)',
  true: 'Неактивний(-a)'
};

export const userStatusFilterObj = () => {
  const arrToFilter = [];

  _.forEach(userStatus, (value, key) => {
    arrToFilter.push({ key, value });
  });

  return arrToFilter;
};
