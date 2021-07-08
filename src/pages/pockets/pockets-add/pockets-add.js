import React from 'react';
import { useSelector } from 'react-redux';

import PocketsForm from '../../../components/forms/pockets-form/pockets-form';
import { useStyles } from './pockets-add.styles';
import { pocketsSelector } from '../../../redux/selectors/pockets.selectors';
import LoadingBar from '../../../components/loading-bar';

const PocketsAdd = () => {
  const styles = useStyles();
  const { loading } = useSelector(pocketsSelector);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      <PocketsForm />
    </div>
  );
};

export default PocketsAdd;
