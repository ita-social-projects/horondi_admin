const formStyles = (theme) => ({
  saveButton: {
    margin: theme.spacing(2)
  },

  inputError: {
    color: '#e60000',
    marginLeft: '5px'
  },

  inputLabel: {
    marginTop: '7px'
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: '120px',
    marginTop: '20px'
  },

  purposeSelect: {
    width: '390px'
  },

  returnButton: {
    margin: theme.spacing(2),
    marginRight: 0,
    marginLeft: 0
  },

  large: {
    marginLeft: '10px',
    width: theme.spacing(6),
    height: theme.spacing(6)
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

  attachFile: {
    marginRight: '5px'
  },

  imageUpload: {
    fontSize: 14,
    marginLeft: '10px',
    paddingTop: '10px'
  },

  imageUploadAvatar: {
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    '& div:nth-child(2)': {
      marginLeft: '15px'
    }
  },

  details: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  textField: {
    margin: '10px 5px'
  },
  autoComplete: {
    margin: '10px',
    width: '33%',
    '@media (max-width: 450px)': {
      width: 'inherit'
    }
  },
  itemUpdate: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0'
  },

  imageName: {
    fontSize: '.9rem',
    marginLeft: '10px',
    color: 'rgba(0, 0, 0, 0.54)',
    '@media (max-width: 768px)': {
      display: 'none'
    }
  }
});

export { formStyles };
