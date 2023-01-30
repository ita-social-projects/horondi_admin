import { makeStyles } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';
import { config } from '../../configs';

const { drawerWidth } = config.app;

export const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    fontWeight: 600,
    '& .MuiListItemIcon-root': {
      color: theme.palette.textColor
    }
  },
  drawerPaper: {
    width: drawerWidth,
    '&::-webkit-scrollbar': {
      width: '5px'
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#f1f1f1'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#888'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#555'
    }
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  },
  selectedCategory: {
    color: theme.palette.secondary.main,
    '& .MuiListItemIcon-root': {
      color: colors.indigo[400]
    }
  },
  notNested: {
    paddingInline: theme.spacing(2)
  },
  nested: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(2)
  },
  sliderTab: {
    paddingLeft: theme.spacing(8)
  },
  badgeRight: {
    right: theme.spacing(1.5)
  }
}));
