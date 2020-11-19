const formStyles = (theme) => ({
  SAVE_BUTTON_STYLES: {
    saveButton: {
      margin: theme.spacing(2)
    }
  },

  INPUT_ERROR_STYLES: {
    inputError: {
      color: '#e60000',
      marginLeft: '5px'
    }
  },

  RETURN_BUTTON_STYLES: {
    returnButton: {
      margin: theme.spacing(2),
      marginRight: 0
    }
  },

  LARGE_STYLES: {
    large: {
      marginLeft: '10px',
      width: theme.spacing(6),
      height: theme.spacing(6)
    }
  },

  TABS_STYLES: {
    tabs: {
      backgroundColor: 'white',
      '& span.MuiTab-wrapper': {
        color: '#3F51B5'
      },
      '& span.MuiTabs-indicator': {
        backgroundColor: '#3F51B5'
      }
    }
  },

  CONTROLS_BLOCK_STYLES: {
    controlsBlock: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  },

  ATTACH_FILE_STYLES: {
    attachFile: {
      marginRight: '5px'
    }
  },

  IMAGE_UPLOAD_STYLES: {
    imageUpload: {
      fontSize: 14,
      marginLeft: '10px',
      color: 'rgba(0, 0, 0, 0.54)'
    }
  },
  IMAGE_UPLOAD_CONTAINER_STYLES: {
    imageUploadContainer: {
      display: 'flex',
      alignItems: 'center',
      margin: '10px'
    }
  },
  DETAILS_STYLES: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  TEXT_FIELD_STYLES: {
    textField: {
      margin: '10px 5px'
    }
  },

  ITEM_UPDATE_STYLES: {
    display: 'flex',
    flexDirection: 'column',
    margin: '20px 0'
  },
  IMAGE_NAME_STYLES: {
    imageName: {
      fontSize: '.9rem',
      marginLeft: '10px',
      color: 'rgba(0, 0, 0, 0.54)',
      '@media (max-width: 768px)': {
        display: 'none'
      }
    }
  }
});

export { formStyles };
