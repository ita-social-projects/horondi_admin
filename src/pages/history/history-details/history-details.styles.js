import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  detailsTitle: ({ darkMode }) => ({
    fontSize: '26px',
    fontWeight: '700',
    color: !darkMode ? '#828282' : '#ffffff',
    marginLeft: 5,
    marginBottom: 35,
    '@media (max-width: 450px)': {
      fontSize: '18px',
      lineHeight: '25px'
    }
  }),
  userInfoTitle: ({ darkMode }) => ({
    fontSize: '20px',
    fontWeight: '700',
    color: !darkMode ? '#828282' : '#ffffff',
    padding: '10px 0 10px 10px'
  }),
  userInfoItem: ({ darkMode }) => ({
    fontSize: '17px',
    marginTop: 0,
    fontWeight: '500',
    color: !darkMode ? '#828282' : '#ffffff',
    marginRight: 20,
    '@media (max-width: 450px)': {
      fontSize: '11px',
      marginRight: '10px'
    }
  }),
  userPaper: {
    padding: '10px'
  },
  userInfoData: {
    margin: '6px 10px',
    display: 'flex',
    alignItems: 'center'
  },
  table: {
    overflow: 'scroll'
  },
  tableCell: ({ darkMode }) => ({
    textAlign: 'center',
    width: '30,333%',
    color: !darkMode ? '#444444' : '#ffffff',
    fontSize: 15,
    fontWeight: 500
  })
}));
