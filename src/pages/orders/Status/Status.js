import React from 'react';
import PropTypes from 'prop-types';

import {useStyles} from './order-status-styles.js';
import orders from "../../../configs/orders";

const {
    orderTableStatus: {
        CREATED,
        CANCELLED,
        DELIVERED,
        REFUNDED,
    },
    paymentStatusTranslation: {
        CREATED: PAYMENT_CREATED,
        DECLINED,
        EXPIRED,
        PAID
    }
} = orders;

const Status = ({status}) => {
    const styles = useStyles();
    let color;
    switch (status) {
        case CANCELLED :
        case DECLINED :
        case  EXPIRED:
        case REFUNDED: {
            color = styles.redStatus;
            break;
        }
        case DELIVERED :
        case PAID:
        case CREATED: {
            color = styles.greenStatus;
            break;
        }

        case PAYMENT_CREATED:
        default :
            color = styles.blueStatus;
    }
    return <div className={color}>{status}</div>;
};

Status.propTypes = {
    status: PropTypes.string.isRequired
};

export default Status;
