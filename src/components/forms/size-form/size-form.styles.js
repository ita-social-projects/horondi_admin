import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '120px',
    marginTop: '20px'
  },
  sizeForm: {
    '& div': {
      '& div': {
        '& div': {
          paddingRight: '0px'
        }
      }
    }
  },
  sizeItemAdd: {
    width: '400px',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '20px 0',
    '@media (max-width: 900px)': {
      width: '300px',
      margin: '20px auto 20px'
    }
  },
  textField: {
    width: '100%',
    margin: '10px',
    '& div': {
      '& textarea': {
        padding: '0 1rem'
      }
    }
  },

  saveButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: 20
  },
  colorPaletteButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: '.5rem'
  },
  returnButton: {
    margin: theme.spacing(2)
  },
  container: {
    width: '100%',
    padding: '20px',
    marginTop: '10px',
    marginLeft: '20px',
    '@media (max-width: 900px)': {
      padding: '0px',
      marginLeft: '0px'
    }
  },

  inputError: {
    color: theme.palette.error.main,
    padding: '0 5px'
  },
  error: {
    color: '#e60000',
    marginLeft: '5px'
  },
  purposeSelect: {
    width: '390px',
    margin: '10px',
    '@media (max-width: 900px)': {
      width: '300px',
      display: 'block',
      margin: 'auto'
    }
  },
  select: {
    '@media (max-width: 900px)': {
      width: '100%'
    }
  },
  checkboxes: {
    '@media (max-width: 900px)': {
      marginLeft: '15px'
    }
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  contentWrapper: {
    marginLeft: '25px',
    marginRight: '25px',
    '@media (max-width: 900px)': {
      padding: '0px',
      margin: '0px',
      width: '100%',
      '& .MuiFormControlLabel-root': {
        marginLeft: '15px'
      }
    }
  },
  buttonsWrapper: {
    marginLeft: '25px'
  }
}));
