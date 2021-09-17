import * as reactRedux from 'react-redux';
import useStrapFilters from './use-strap-filters';

const spyDispatch = jest
  .spyOn(reactRedux, 'useDispatch')
  .mockImplementation(() => (cb) => null);
const spyUseSelector = jest
  .spyOn(reactRedux, 'useSelector')
  .mockImplementation(() => (cb) => cb({ Straps: { filter: { name: '' } } }));

describe('use-strap-filters test', () => {
  it('should return expected result', () => {
    const { searchOptions, clearOptions } = useStrapFilters();
    searchOptions.setSearchFilter('name');
    clearOptions.clearAllFilters();

    expect(spyDispatch).toHaveBeenCalled();
    expect(spyUseSelector).toHaveBeenCalled();
  });
});
