import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  root: {
    marginTop: 65,
    padding: 15,
    width: '100vw',
    height: `calc(100vh - 95px)`
  },
  item: {
    '@media (max-width: 599px)': {
      padding: '12px 0!important'
    }
  },
  pageTitle: {
    paddingLeft: 15,
    paddingBottom: 15
  },
  gridContainer: {
    height: '100%'
  },
  paper: {
    height: '100%',
    padding: 15,
    boxSizing: 'border-box',
    overflowY: 'auto'
  },
  blockTitle: {
    marginBottom: 15
  },
  ordersContainer: {
    height: 'calc(50vh - 62.5px)',
    '@media (max-width: 599px)': {
      height: `calc(100vh - 125px)`,
      paddingLeft: '0',
      paddingRight: 0
    }
  },
  order: {
    marginBottom: 10,
    borderBottom: '1px solid lightgrey',
    '& span': {
      fontWeight: 'bold',
      fontSize: '1.1em',
      margin: '0 5px'
    }
  },
  emptyOrders: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5em',
    marginTop: -40
  },
  commentsContainer: {
    height: 'calc(50vh - 62.5px)',
    '@media (max-width: 599px)': {
      height: 'fit-content'
    }
  },
  changesContainer: {
    height: `calc(100vh - 125px)`
  },
  comment: {
    borderBottom: '1px solid lightgrey',
    marginTop: 15
  },
  commentInfo: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  commentText: {
    fontSize: '1.1em',
    marginBottom: 5
  }
}));
