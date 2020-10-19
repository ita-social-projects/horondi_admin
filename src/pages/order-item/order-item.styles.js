import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  orderContainer: {
    padding:'84px 20px 0px'
  },
  tabs: {
    backgroundColor: '#3F51B5',
    '& span.MuiTab-wrapper': {
      color: 'white'
    },
    '& span.MuiTabs-indicator': {
      backgroundColor: 'white'
    }
  },
}));
