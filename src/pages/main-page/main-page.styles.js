import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    marginTop: 65,
    padding: 24,
    width: '100vw',
    height: `calc(100vh - 125px)`,
    boxSizing: 'border-box',
    '@media (max-width: 599px)': {}
  },
  container: {
    display: 'flex',
    padding: '15px 0',
    boxSizing: 'border-box',
    '@media (max-width: 599px)': {
      display: 'block'
    }
  },
  blockTitle: {
    padding: 15
  },
  commentsOrders: {
    height: 'calc(100vh - 170px)',
    width: '50%',
    '@media (max-width: 599px)': {
      width: '100%',
      height: 'fit-content'
    }
  },
  ordersContainer: {
    height: '50%',
    marginBottom: 15,
    '& h5': {
      // padding: "15px 0 0 15px",
    },
    '@media (max-width: 599px)': {
      height: '100vh'
    }
  },
  orders: {
    height: 'calc(100% - 50px)',
    overflowY: 'auto'
  },
  order: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'darkgrey',
      fontWeight: 'bold'
    }
  },
  commentsContainer: {
    height: '50%',
    marginTop: 15,
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
    justifyContent: 'space-between',
    overflowY: 'auto',
    padding: '0 15px',
    height: 'calc(100% - 35px)'
  },
  comment: {
    borderBottom: '1px solid lightgrey',
    marginBottom: 15
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
    marginLeft: 15,
    '@media (max-width: 599px)': {
      height: 'fit-content',
      width: '100%',
      marginLeft: 0,
      marginTop: 15
    }
  },
  emptyOrders: {
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
