import { useState } from 'react';

const useFormDialog = (state = false, callback = (a) => a) => {
  const [open, setOpen] = useState(state);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return callback({ open, handleOpen, handleClose });
};

export default useFormDialog;
