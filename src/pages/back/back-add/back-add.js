import React from 'react';
import { useSelector } from 'react-redux';
import { useStyles } from './back-add.styles';
import BackForm from '../../../components/forms/back-form';
import LoadingBar from '../../../components/loading-bar';
import { backSelector } from '../../../redux/selectors/back.selectors';

const BackAdd = () => {
  const styles = useStyles();
  const { loading } = useSelector(backSelector);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      <BackForm />
    </div>
  );
};

export default BackAdd;
