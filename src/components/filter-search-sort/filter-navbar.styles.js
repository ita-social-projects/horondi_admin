import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  container: {
    margin: '30px 0',
    display: 'flex',
    flexWrap: 'wrap',
    direction: 'row',
    justify: 'flex-start',
    alignItems: 'center',
    spacing: 2,
    '@media (max-width: 450px)': {
      width: '100%',
      '& .MuiGrid-item': {
        width: '100%',
        marginTop: '10px'
      }
    }
  },
  dateRange: {
    display: 'flex',
    flexDirection: 'column'
  },
  dateRangeItem: {
    marginTop: -10,
    marginBottom: 20,
    marginRight: 10
  },
  multipleValues: {
    marginTop: -20,
    marginRight: 10
  },
  sortItem: {
    marginRight: 15
  }
}));
