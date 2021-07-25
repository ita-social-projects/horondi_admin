import React from 'react';
import { useSelector } from 'react-redux';

// import ClosuresForm from '../../../components/forms/closures-form/closures-form';
import { useStyles } from './closures-add.styles';
import { closuresSelector } from '../../../redux/selectors/closures.selectors';
import LoadingBar from '../../../components/loading-bar';

const ClosuresAdd = () => {
  const styles = useStyles();
  const { loading } = useSelector(closuresSelector);

  if (loading) {
    return <LoadingBar />;
  }

  return <div className={styles.container}>{/* <ClosuresForm /> */}</div>;
};

export default ClosuresAdd;
