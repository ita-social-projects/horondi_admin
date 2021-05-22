import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20
  },
  details: {
    alignItems: 'center'
  },
  column: {
    flexBasis: '33.33%',
    margin: 'auto'
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  input: {
    width: '100%',
    border: 'none'
  },
  question: {
    maxWidth: '18%',
    visibility: 'visible',
    transition: 'opacity 150ms linear, visibility 0s linear 150ms'
  },
  detailedQuestion: {
    transition: 'opacity 150ms linear, visibility 0s linear 150ms'
  },
  questionText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingRight: '0.5rem'
  },
  delete: {
    display: 'inline-flex',
    flex: '0',
    marginRight: '22px',
    marginLeft: '18px'
  },
  buttons: {
    justifyContent: 'flex-start',
    marginLeft: '5px'
  },
  hidden: {
    visibility: 'hidden'
  },
  visible: {
    visibility: 'visible'
  }
}));
