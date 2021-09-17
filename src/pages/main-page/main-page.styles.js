import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: `calc(100vh - 125px)`
  },
  main: {
    display: 'flex',
    paddingBottom: 15,
    boxSizing: 'border-box',
    '@media (max-width: 450px)': {
      display: 'block'
    }
  },
  blockTitle: {
    padding: 15,
    color: theme.palette.text.disabled
  },
  commentsOrders: {
    height: 'calc(100vh - 179px)',
    width: '100%',
    '@media (max-width: 450px)': {
      width: '100%',
      height: 'fit-content'
    }
  },
  ordersContainer: {
    height: '100%',
    width: '49%',
    overflow: 'auto',
    display: 'inline-block',
    '@media (max-width: 450px)': {
      minHeight: 'fit-content',
      maxHeight: '100vh',
      width: '100%'
    }
  },
  order: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      fontWeight: 'bold'
    },
    '& td': {
      paddingBottom: 15,
      paddingTop: 15
    }
  },
  commentsContainer: {
    height: '100%',
    width: '49%',
    marginTop: theme.spacing(3),
    marginLeft: '2%',
    paddingBottom: 15,
    overflow: 'auto',
    display: 'inline-block',
    '@media (max-width: 450px)': {
      minHeight: 'fit-content',
      maxHeight: '100vh',
      width: '100%',
      paddingBottom: 0,
      marginLeft: '0'
    }
  },
  comments: {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    padding: '0 15px',
    height: 'calc(100% - 50px)',
    boxSizing: 'border-box'
  },
  comment: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      fontWeight: 'bold'
    },
    '& td': {
      paddingBottom: 15,
      paddingTop: 15
    }
  },
  commentInfo: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  commentText: {
    fontSize: '16px',
    marginBottom: 5
  },
  changesContainer: {
    width: '50%',
    height: 'calc(100vh - 155px)',
    marginLeft: theme.spacing(3),
    '@media (max-width: 450px)': {
      height: 'fit-content',
      width: '100%',
      marginLeft: 0,
      marginTop: theme.spacing(3)
    }
  },
  emptyList: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5em',
    marginTop: -55,
    textAlign: 'center',
    '@media (max-width: 450px)': {
      marginTop: 0,
      paddingBottom: '20px',
      fontSize: '20px'
    }
  }
}));
