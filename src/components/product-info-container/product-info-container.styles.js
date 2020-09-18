import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    textfield: {
        margin: theme.spacing(1),
        width: '100%'
    },
    title: {
        fontWeight: 600
    }
}));

export default useStyles;