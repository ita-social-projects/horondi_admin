import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    noRecords: {
        fontSize: 20,
        color: theme.palette.text.disabled,
        fontWeight: '500'
    },
    title:{
        marginBottom: '5px'
    }
}));
