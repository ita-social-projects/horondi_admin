import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  image: {
    width: '200px',
    height: '200px'
  },
  input: {
    display: 'none'
  },
  thumbsContainer: {
    display: 'inline-flex',
    width: '370px',
    flexWrap: 'wrap'
  },
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '100%'
  },
  dropzone: {
    borderStyle: 'dashed',
    borderColor: '#C4C4C4',
    display: 'flex',
    width: '100%',
    height: '204px',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#242424',
    marginBottom: '10px'
  },
  dropTitle: {
    color: theme.palette.textColor
  },
  dropButton: {
    style: 'none',
    borderStyle: 'solid',
    border: '1px dashed #5B5B5B',
    boxSizing: 'border-box',
    borderRadius: '4px',
    background: 'none',
    width: '154px',
    height: '44px',
    marginLeft: '10px',
    color: theme.palette.textColor
  },
  dropIcon: {
    maxWidth: '100px'
  },
  description: {
    color: '#9E9E9E',
    fontSize: 14,
    padding: '5px'
  }
}));
