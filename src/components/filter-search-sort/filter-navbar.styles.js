import {makeStyles} from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
    container: {
        margin: '17px 0 15px 0',
        display: 'flex',
        direction: 'row',
        justifyContent: 'flex-start',
        alignItems: 'start',
        spacing: 2
    },
    dateRange: {
        display: 'flex',
        flexDirection: 'column',
    },
    dateRangeItem: {
        marginTop: -10,
        marginBottom: 20,
        marginRight: 10
    },
    multipleValues: {
        marginTop: -20,
        marginRight: 10
    },
    sortItem:{
        marginRight: 15
    }
}));
