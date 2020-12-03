import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  editorBackground: {
    backgroundColor: (styleProps) => (styleProps.isDarkMode ? 'grey' : 'white')
  }
}));
