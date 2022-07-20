import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useSizeHandlers from './use-size-handlers';
import {
  sizeToUpdate,
  update,
  initialSizes,
  newSize
} from './use-size-handlers.variables';

describe('useSizeHandlers hook test', () => {
  const mockUseEffect = jest.spyOn(React, 'useEffect');

  beforeEach(() => {
    mockUseEffect.mockImplementation(() => jest.fn());
  });

  it('Should add a size to the sizes state variable', () => {
    const { result } = renderHook(() => useSizeHandlers(initialSizes, null));

    act(() => {
      result.current.onSizeSubmit(newSize);
    });

    expect(result.current.sizes[1]).toEqual(newSize);
  });

  it('Should call useEffect after the size addition', () => {
    const { result } = renderHook(() => useSizeHandlers(initialSizes, null));

    act(() => {
      result.current.onSizeSubmit(newSize);
    });

    expect(mockUseEffect).toHaveBeenCalledTimes(2);
  });

  it('Should update a size in the sizes state variable', () => {
    const { result } = renderHook(() => useSizeHandlers(initialSizes, null));

    act(() => {
      result.current.onSizeSubmit({
        ...sizeToUpdate,
        name: update.name
      });
    });

    expect(result.current.sizes[0].name).toBe(update.name);
  });

  it('Should delete a size from the sizes state variable', () => {
    const { result } = renderHook(() => useSizeHandlers(initialSizes, null));

    act(() => {
      result.current.onSizeDelete(sizeToUpdate._id);
    });

    expect(result.current.sizes).toEqual([]);
  });
});
