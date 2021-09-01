import React from 'react';
import { useSelector } from 'react-redux';

import BasicsForm from '../../../components/forms/basics-form';
import { useStyles } from './basic-add.styles';
import { basicsSelector } from '../../../redux/selectors/basics.selectors';
import LoadingBar from '../../../components/loading-bar';

const BasicAdd = () => {
  const styles = useStyles();
  const { loading } = useSelector(basicsSelector);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      <BasicsForm />
    </div>
  );
};

export default BasicAdd;
