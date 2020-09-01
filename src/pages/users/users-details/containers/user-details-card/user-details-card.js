import React from 'react'
import { Card, CardContent,Grid, Avatar, Typography, Button } from '@material-ui/core'
import {useStyles} from './user-details-card.styles';
import { config } from '../../../../../configs';
import PropTypes from 'prop-types';

const userTitles = config.detailTitles.users;

const UserDetailsCard = ({avatar,name,status,primaryData,secondaryData,buttonStatus}) => {

    const styles = useStyles();

    const buildInfoItem = (label,id,data) => (
        <Grid item>
            <Grid container spacing={1} direction={"column"}>
                <Grid item xs={12}>
                    <Typography className={styles.detailTitle} variant={'h6'}>{label}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className={styles.detailSubtitle} id={id} variant={'h6'}>{data}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );

    const avatarSection = <Avatar id={userTitles.avatar.id} className={styles.avatar}>{avatar}</Avatar>;
    const nameSection = <Typography id={userTitles.name.id} variant={'h3'}>{name}</Typography>
    const statusSection = <Typography id={userTitles.status.id} variant={'h5'}>{status}</Typography>
    const primarySection = userTitles.primarySection.map((item) => buildInfoItem(item.label,item.id,primaryData[item.id]));
    const secondarySection = userTitles.secondarySection.map((item) => buildInfoItem(item.label,item.id,secondaryData[item.id]));

    return (
        <Card>
            <CardContent>
                <Grid alignItems={"center"} direction={"column"} spacing={2} container>
                    <Grid item xs={12}>
                        {avatarSection}
                    </Grid>
                    <Grid item xs={12}>
                        {nameSection}
                    </Grid>
                    <Grid item xs={12}>
                        {statusSection}
                    </Grid>
                    <Grid xs={12} item container justify={'space-around'}>
                        {primarySection}
                    </Grid>
                    <Grid item container xs={12} spacing={1} direction={"column"}>
                        {secondarySection}
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='contained'
                                color='secondary'>{buttonStatus}</Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

UserDetailsCard.propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    primaryData: PropTypes.array.isRequired,
    secondaryData: PropTypes.array.isRequired,
    buttonStatus: PropTypes.string.isRequired
}

export default UserDetailsCard;