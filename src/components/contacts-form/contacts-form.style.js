import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  contactItemUpdate: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(2),
    paddingTop: 10
  },
  contactDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  detailsContainer: {
    width: '100%',
    padding: 20,
    marginTop: 70
  },
  saveButton: {
    margin: theme.spacing(2)
  },
  inputLabel: {
    fontSize: 12,
    '&.shrink': {
      transform: 'translate(32px, -3px) scale(0.75)'
    }
  },
  textField: {
    textTransform: 'uppercase',
    padding: 10,
    margin: '5px 0',
    width: '100%'
  },
  inputError: {
    color: '#e60000',
    margin: '0px 0px 10px 10px'
  },
  imageUploadContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px'
  },
  large: {
    marginLeft: '10px',
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  imageName: {
    fontSize: '.9rem',
    marginLeft: '10px',
    color: 'rgba(0, 0, 0, 0.54)',
    '@media (max-width: 768px)': {
      display: 'none'
    }
  },
  imageUpload: {
    marginLeft: '10px',
    color: 'rgba(0, 0, 0, 0.54)'
  }
}));
