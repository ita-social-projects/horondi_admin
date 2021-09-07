import React from 'react';
import { useSelector } from 'react-redux';

import StrapsForm from '../../../components/forms/straps-form/straps-form';
import { useStyles } from './straps-add.styles';
import { strapsSelector } from '../../../redux/selectors/straps.selectors';
import LoadingBar from '../../../components/loading-bar';

const StrapsAdd = () => {
  const styles = useStyles();
  const { loading } = useSelector(strapsSelector);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      <StrapsForm />
    </div>
  );
};

export default StrapsAdd;
