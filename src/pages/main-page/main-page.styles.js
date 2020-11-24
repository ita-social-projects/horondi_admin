import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    root: {
      marginTop: 65,
      padding: 15,
      width: '100vw',
      height: `calc(100vh - 95px)`
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
      height: '50%'
    },
    commentsContainer: {
      height: '50%'
    },
    changesContainer: {
      height: '100%'
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
  };
});
