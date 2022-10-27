import { renderHook, act } from '@testing-library/react-hooks';
import useSizeHandlers from './use-size-handlers';
import { config } from '../../configs';
import {
  sizeToUpdate,
  update,
  initialSizes,
  newSize,
  dispatch,
  productWhithSize,
  products
} from './use-size-handlers.variables';

const { sizeAdd } = config.titles.sizesTitles;

describe('useSizeHandlers hook test', () => {
  it('Should add a size to the sizes state variable', () => {
    const { result } = renderHook(() => useSizeHandlers(initialSizes));

    act(() => {
      result.current.onSizeSubmit(newSize);
    });

    expect(result.current.sizes[1]).toEqual(newSize);
  });

  it('Should update a size in the sizes state variable', () => {
    const { result } = renderHook(() => useSizeHandlers(initialSizes));

    act(() => {
      result.current.onSizeSubmit({
        ...sizeToUpdate,
        name: update.name
      });
    });

    expect(result.current.sizes[0].name).toBe(update.name);
  });
  it('Should not delete a size from the sizes state variable', () => {
    const { result } = renderHook(() => useSizeHandlers(initialSizes));

    act(() => {
      result.current.onSizeDelete(sizeToUpdate._id, productWhithSize, dispatch);
    });

    expect(result.current.sizes[0]).toEqual(sizeToUpdate);
  });

  it('Should delete a size from the sizes state variable', () => {
    const { result } = renderHook(() => useSizeHandlers(initialSizes));

    act(() => {
      result.current.onSizeDelete(sizeToUpdate._id, products, dispatch);
    });

    expect(result.current.sizes).toEqual([]);
  });

  it('Should set state accordingly when an accordion is expanded', () => {
    const { result } = renderHook(() => useSizeHandlers(initialSizes));
    const { _id: sizeFormId } = initialSizes[0];

    act(() => {
      const expand = result.current.handleExpandedChange(sizeFormId);
      expand(null, true);
    });

    expect(result.current.sizeFormExpanded).toBe(sizeFormId);
  });

  it("Should set 'sizes' field as touched on accordion expansion", () => {
    const { result } = renderHook(() => useSizeHandlers([]));

    act(() => {
      const expand = result.current.handleExpandedChange(sizeAdd);
      expand(null, true);
    });

    act(() => {
      const expand = result.current.handleExpandedChange('');
      expand(null, false);
    });

    expect(result.current.sizesTouched).toBe(true);
  });
});
