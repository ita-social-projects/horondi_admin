import {
  getAllBottoms,
  getBottomById,
  createBottom,
  deleteBottom
} from '../bottom.operations';

describe('bottom operations tests', () => {
  test('should get all bottoms', () => {
    getAllBottoms(5, 0, { name: '' });
  });
  test('should get bottom by id', () => {
    getBottomById('6047321793650236ddbfb841');
  });
  test('should create bottom', () => {
    createBottom();
  });
  test('should delete bottom', () => {
    deleteBottom('611f7c5a094fd63d80bc539d');
  });
});
