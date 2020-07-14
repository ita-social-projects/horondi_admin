import { createMuiTheme } from '@material-ui/core';
import { paletteGenerator } from './app.pallete';
import typographyStyles from './typography.styles';

export const theme = (colorSchema) => {
  const palette = paletteGenerator(colorSchema);

  return createMuiTheme({
    palette,
    typography: typographyStyles
  });
};
