import { useState } from 'react';
import { config } from '../../configs';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import {
  showErrorSnackbar,
  showSuccessSnackbar
} from '../../redux/snackbar/snackbar.actions';

const { sizeAdd } = config.titles.sizesTitles;
const { DELETED_SIZE_MESSAGE, DELETE_SIZE_ERROR } = config.messages;

const useSizeHandlers = (initialSizes) => {
  const [sizes, setSizes] = useState(initialSizes || []);
  const [sizesTouched, setSizesTouched] = useState(false);
  const [sizeFormExpanded, setSizeFormExpanded] = useState('');

  const onSizeSubmit = (newSize) => {
    setSizes((currentSizes) => {
      if (newSize._id.includes('size_')) {
        return [...currentSizes, newSize];
      }

      return currentSizes.map((size) =>
        size._id === newSize._id ? newSize : size
      );
    });
  };

  const onSizeDelete = (sizeIdToDelete, products, dispatch) => {
    const productsWithLastSize = products.filter(
      ({ sizes }) => sizes.length === 1 && sizeIdToDelete === sizes[0].size._id
    );
    const productsToDeleteMessage = productsWithLastSize
      .map(({ name }) => name[0].value)
      .join(', ');
    dispatch(closeDialog());

    if (!productsWithLastSize.length) {
      setSizes((currentSizes) =>
        currentSizes.filter((size) => size._id !== sizeIdToDelete)
      );
      dispatch(showSuccessSnackbar(DELETED_SIZE_MESSAGE));
    } else {
      dispatch(
        showErrorSnackbar(
          DELETE_SIZE_ERROR(productsWithLastSize, productsToDeleteMessage)
        )
      );
    }
  };

  const handleExpandedChange = (sizeFormId) => (_event, isExpanded) => {
    if (sizeFormExpanded === sizeAdd) {
      setSizesTouched(true);
    }
    setSizeFormExpanded(isExpanded ? sizeFormId : '');
  };

  return {
    sizes,
    onSizeSubmit,
    onSizeDelete,
    sizesTouched,
    sizeFormExpanded,
    handleExpandedChange
  };
};

export default useSizeHandlers;
