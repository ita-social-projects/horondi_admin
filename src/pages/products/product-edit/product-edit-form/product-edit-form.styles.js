import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        height: '100%'
    },
    container: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(2.5),
        width: '100%'
    },
    image: {
        height: 360,
        width: '100%'
    },
    carousel: {
        margin: '5% auto',
        width: 300,
        '@media (max-width: 1150px)': {
            width: 250,
        },
        '@media (max-width: 959px)': {
            width: 400,
        },
        '@media (max-width: 450px)': {
            width: 250,
        }
    },
    title: {
        fontWeight: '600'
    },
    imageBtn: {
        width: 140
    }
}));