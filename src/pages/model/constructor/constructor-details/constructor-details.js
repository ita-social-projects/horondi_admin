import React from 'react';
import { useSelector } from 'react-redux';
import { useStyles } from './constructor-details.styles';
import ConstructorForm from '../../../../components/forms/business-page-form/constructor-form';
import { selectConstructorMethodAndMaterials } from '../../../../redux/selectors/constructor.selectors';

const ConstructorDetails = () => {
  const styles = useStyles();
  const {
    editableConstructorElement
  } = useSelector(selectConstructorMethodAndMaterials);

  return (
    <div className={styles.container}>
      <ConstructorForm isEdit editableConstructorElement={editableConstructorElement} />
    </div>
  );
};

export default ConstructorDetails;
