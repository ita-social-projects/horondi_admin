import { createMuiTheme } from '@material-ui/core';
import { paletteGenerator } from './Pallete';
import { typography } from './Typography';

export const theme = (colorSchema) => {
  const palette = paletteGenerator(colorSchema);

  return createMuiTheme({
    palette,
    typography
  });
};
