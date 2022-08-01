import React from 'react';
import { useParams, useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import LoadingBar from '../../components/loading-bar';
import MaterialAboutForm from '../../components/forms/material-about-form';
import { GET_MATERIALS_BLOCK_BY_ID } from './operations/materials-page.queries';
import { showErrorSnackbar } from '../../redux/snackbar/snackbar.actions';
import { config } from '../../configs';

const MaterialAboutDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { ERROR_BOUNDARY_STATUS } = config.errorStatuses;
  const { data, error, loading } = useQuery(GET_MATERIALS_BLOCK_BY_ID, {
    variables: { id },
    fetchPolicy: 'no-cache'
  });

  const materialsBlock = data?.getMaterialsBlockById;

  if (loading) {
    return <LoadingBar />;
  }

  if (error) {
    dispatch(showErrorSnackbar(ERROR_BOUNDARY_STATUS));
    history.push('/');
    return null;
  }

  return (
    <MaterialAboutForm
      currentType={materialsBlock?.type}
      selectedBlock={materialsBlock}
      editMode
    />
  );
};

export default MaterialAboutDetails;
