import React from 'react';
import { useStyles } from './header-add.styles';
import HeaderForm from '../../../components/header-form';

const HeaderAdd = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <HeaderForm />
    </div>
  );
};

export default HeaderAdd;
