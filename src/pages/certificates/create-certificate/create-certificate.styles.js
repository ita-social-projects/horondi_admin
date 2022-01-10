import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 90,
    margin: theme.spacing(2)
  },
  section: {
    marginBottom: 40
  },
  title: {
    marginTop: 54,
    marginBottom: 48
  },
  heading: {
    'font-weight': 'bold',
    'font-size': '24px',
    'line-height': '32px',
    marginBottom: 16
  },
  datePickerTitle: {
    'font-weight': '600',
    'font-size': '12px',
    marginLeft: 8
  },
  generate: {
    height: 100,
    '& input': {
      height: '100%',
      width: '100%'
    },
    '& button': {
      height: '60%',
      width: '100%'
    },
    '& div': {
      width: '100%'
    }
  },
  dataPicker: {
    width: 300,
    display: 'block',
    marginBottom: 10
  },
  cellHead: {
    backgroundColor: 'rgba(91, 91, 91, 0.2)'
  }
}));
