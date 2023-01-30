import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { push } from 'connected-react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useStyles } from './error-page.styles';
import { config } from '../../configs';

const { ERROR_BOUNDARY_STATUS, ERROR_PAGE_STATUS } = config.errorStatuses;

const ErrorPage = () => {
  const dispatch = useDispatch();

  const { errorMessage } = useSelector(({ Error }) => ({
    errorMessage: Error.error
  }));
  useEffect(() => {
    if (!errorMessage) {
      dispatch(push('/error'));
    }
  }, [dispatch, errorMessage]);

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h2>
        {errorMessage && ERROR_BOUNDARY_STATUS
          ? ERROR_BOUNDARY_STATUS
          : ERROR_PAGE_STATUS}
      </h2>
      <Link to='/'>
        <Button variant='contained'>На головну</Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
