import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './constructor-details.styles';
import ConstructorForm from '../../../../components/constructor-form';
import { selectConstructorMethodAndMaterials } from '../../../../redux/selectors/constructor.selectors';
import { getMaterials } from '../../../../redux/material/material.actions';

const ConstructorDetails = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const {
    editableConstructorElement,
    filter
  } = useSelector(selectConstructorMethodAndMaterials);

  useEffect(() => {
    dispatch(
      getMaterials({
        filter
      })
    );
  }, [dispatch, filter]);

  return (
    <div className={styles.container}>
      <ConstructorForm isEdit editableConstructorElement={editableConstructorElement} />
    </div>
  );
};

export default ConstructorDetails;
