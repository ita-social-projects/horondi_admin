import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  categoryItemUpdate: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0'
  },
  categoryDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  saveCategoryButton: {
    margin: theme.spacing(2)
  },
  returnButton: {
    margin: theme.spacing(2),
    marginRight: 0
  },
  textField: {
    margin: '10px 5px'
  },
  tabs: {
    backgroundColor: 'white',
    '& span.MuiTab-wrapper': {
      color: '#3F51B5'
    },
    '& span.MuiTabs-indicator': {
      backgroundColor: '#3F51B5'
    }
  },
  controlsBlock: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  inputError: {
    color: '#e60000',
    marginLeft: '5px'
  },
  imageUploadAvatar: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    '& div:nth-child(2)': {
      marginLeft: '15px'
    }
  },
  imageUploadContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px'
  },
  large: {
    marginLeft: '10px',
    width: theme.spacing(6),
    height: theme.spacing(6)
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
    fontSize: 14,
    marginLeft: '10px',
    color: 'rgba(0, 0, 0, 0.54)'
  },
  attachFile: {
    marginRight: '5px'
  }
}));
