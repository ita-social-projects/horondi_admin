import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { useStyles } from './straps-edit.styles';
import LoadingBar from '../../../components/loading-bar';
import StrapsForm from '../../../components/forms/straps-form/straps-form';
import { getStrap } from '../../../redux/straps/straps.actions';
import { strapsSelector } from '../../../redux/selectors/straps.selectors';

const StrapsEdit = ({ match }) => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const { loading, strap } = useSelector(strapsSelector);

  const { id } = match.params;

  useEffect(() => {
    dispatch(getStrap(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingBar />;
  }
  console.log(strap);
  return (
    <div className={styles.container}>
      {strap !== null ? <StrapsForm id={id} edit strap={strap} /> : null}
    </div>
  );
};

StrapsEdit.propTypes = {
  id: PropTypes.string,
  match: PropTypes.objectOf(PropTypes.object)
};

StrapsEdit.defaultProps = {
  id: '',
  match: {}
};

export default StrapsEdit;
