import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    gap: 10,
    marginBottom: 10
  },
  detailTitle: {
    fontWeight: 'bold'
  },
  defaultText: {
    color: 'lightgrey'
  },
  detailSubtitle: {}
}));
