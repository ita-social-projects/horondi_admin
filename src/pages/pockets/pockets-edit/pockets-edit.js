import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { useStyles } from './pockets-edit.styles';
import LoadingBar from '../../../components/loading-bar';
import PocketsForm from '../../../components/forms/pockets-form/pockets-form';
import { getPocket } from '../../../redux/pockets/pockets.actions';
import { pocketsSelector } from '../../../redux/selectors/pockets.selectors';

const PocketEdit = ({ match }) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const { loading, pocket } = useSelector(pocketsSelector);

  const { id } = match.params;

  useEffect(() => {
    dispatch(getPocket(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      {pocket !== null ? <PocketsForm id={id} edit pocket={pocket} /> : null}
    </div>
  );
};

PocketEdit.propTypes = {
  id: PropTypes.string,
  match: PropTypes.objectOf(PropTypes.object)
};

PocketEdit.defaultProps = {
  id: '',
  match: {}
};

export default PocketEdit;
