import buttonTitles from '../../../../configs/button-titles';
import statuses from '../../../../configs/statuses';

const { SUCCESS_DELETE_STATUS } = statuses;
const { DELETE_TITLE } = buttonTitles;

export const size = 'small';
export const id = '5f62f5386d3d7c14710c0111';
export const mockCallBack = jest.fn(() => id);
export const title = DELETE_TITLE;
export const status = SUCCESS_DELETE_STATUS;
