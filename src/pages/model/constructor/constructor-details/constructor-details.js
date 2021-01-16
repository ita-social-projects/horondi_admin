import React from 'react';
import { useSelector } from 'react-redux';
import { useStyles } from './constructor-details.styles';
import ConstructorForm from '../../../../components/forms/constructor-form';
import { selectConstructorMethodAndMaterials } from '../../../../redux/selectors/constructor.selectors';
import LoadingBar from '../../../../components/loading-bar';

const ConstructorDetails = () => {
  const styles = useStyles();
  const {
    editableConstructorElement,
    loading
  } = useSelector(selectConstructorMethodAndMaterials);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      <ConstructorForm isEdit editableConstructorElement={editableConstructorElement} />
    </div>
  );
};

export default ConstructorDetails;
