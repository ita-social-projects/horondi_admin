import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
    image: {
        height: 360,
        width: '100%'
    },
    imageBtn: {
        width: '100%'
    }
}));