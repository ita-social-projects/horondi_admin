import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: `calc(100vh - 125px)`
  },
  main: {
    display: 'flex',
    paddingBottom: 15,
    boxSizing: 'border-box',
    '@media (max-width: 599px)': {
      display: 'block'
    }
  },
  blockTitle: {
    padding: 15,
    color: theme.palette.text.disabled
  },
  commentsOrders: {
    height: 'calc(100vh - 179px)',
    width: '50%',
    '@media (max-width: 599px)': {
      width: '100%',
      height: 'fit-content'
    }
  },
  ordersContainer: {
    height: '50%',
    overflow: 'auto',
    marginBottom: theme.spacing(3),
    '@media (max-width: 599px)': {
      height: '100vh'
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
    height: '50%',
    marginTop: theme.spacing(3),
    paddingBottom: 15,
    '@media (max-width: 599px)': {
      height: 'fit-content',
      width: '100%',
      paddingBottom: 0
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
    borderBottom: '1px solid lightgrey',
    marginBottom: 10
  },
  commentInfo: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  commentText: {
    fontSize: '1.1em',
    marginBottom: 5
  },
  changesContainer: {
    width: '50%',
    height: 'calc(100vh - 155px)',
    marginLeft: theme.spacing(3),
    '@media (max-width: 599px)': {
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
    textAlign: 'center'
  }
}));
