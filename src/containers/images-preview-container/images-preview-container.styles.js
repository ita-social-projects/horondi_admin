import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  primary: {
    display: 'inline-block',
    width: '255px',
    height: '290px',
    marginTop: 30
  },
  imagePrimaryInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  },
  thumbsContainer: {
    display: 'inline-flex',
    width: '500px',
    flexWrap: 'wrap'
  },
  thumb: {
    display: 'inline-flex',
    flexDirection: 'column',
    width: 100,
    height: 100
  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  },
  img: {
    display: 'inline-flex',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  item: {
    display: 'flex',
    flexDirection: 'column'
  },
  checkbox: {
    display: 'flex',
    justifyContent: 'start',
    padding: 0
  },
  listContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 550,
    gap: 40,
    marginTop: 30
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 5
  },
  deleteLabel: {
    color: '#F44336',
    padding: 10
  }
}));
