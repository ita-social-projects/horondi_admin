import { makeStyles } from '@material-ui/core/styles';

const flexRow = {
  display: 'flex',
  flexDirection: 'row'
};

export const useStyles = makeStyles(() => ({
  hide: {
    display: 'none'
  },
  show: {
    display: 'flex',
    flexDirection: 'column'
  },
  radioButtons: {
    ...flexRow
  },
  label: {
    maxWidth: '300px'
  },
  addPocketBtn: {
    ...flexRow,
    marginTop: '20px',
    background: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    '& img': {
      marginRight: '6px'
    }
  },
  addPocketForm: {
    marginTop: '10px',
    '& .option': {
      marginTop: '10px'
    }
  },
  saveButton: {
    alignSelf: 'flex-end',
    marginTop: '6px'
  },
  select: {
    marginLeft: '6px',
    minWidth: '150px'
  }
}));
