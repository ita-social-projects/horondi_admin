import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginTop: '15px'
  },
  tabs: {
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: '#f5f5fa',
    '& button': {
      '& span:before': {
        backgroundColor: 'red !important'
      }
    },
    '& span.MuiTab-wrapper': {
      color: '#3F51B5'
    },
    '& span.MuiTabs-indicator': {
      backgroundColor: '#3F51B5'
    }
  },
  materialForm: {
    '& div': {
      '& div': {
        '& div': {
          paddingLeft: 0,
          paddingRight: 0
        }
      }
    }
  },
  materialItemAdd: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0 !important'
  },
  textField: {
    margin: '10px !important',
    '& div': {
      '& textarea': {
        padding: '0 1rem !important'
      }
    }
  },
  materialAdd: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  saveButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: 20,
    '@media (max-width: 450px)': {
      marginLeft: '5px'
    }
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
    '@media (max-width: 450px)': {
      padding: '0px'
    }
  },
  buttonContainer: {
    position: 'relative',
    width: '100%',
    height: 60,
    marginTop: 51,
    '@media (max-width: 600px)': {
      marginTop: 43
    }
  },
  fixedButtons: {
    position: 'fixed',
    height: 60,
    zIndex: 1001,
    backgroundColor: theme.palette.bodyColor
  },
  button: {
    marginTop: theme.spacing(0.5)
  },
  controlsBlock: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  inputError: {
    color: theme.palette.error.main,
    padding: '0 5px'
  },
  colorImages: {
    display: 'flex'
  },
  purposeSelect: {
    width: '400px',
    '@media (max-width: 450px)': {
      width: 'inherit'
    }
  },
  currencyField: {
    width: '170px',
    '@media (max-width: 450px)': {
      width: 'inherit'
    }
  },
  errorTab: {
    backgroundColor: theme.palette.error.main,
    '& span': {
      color: 'white !important'
    }
  }
}));
