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
  }
}));
