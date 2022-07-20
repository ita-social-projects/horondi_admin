import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import LoadingBar from '../../components/loading-bar';
import MaterialAboutForm from '../../components/forms/material-about-form';
import { GET_MATERIALS_BLOCK_BY_ID } from './operations/materials-page.queries';

const MaterialAboutDetails = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_MATERIALS_BLOCK_BY_ID, {
    variables: { id },
    fetchPolicy: 'no-cache'
  });

  const materialsBlock = data?.getMaterialsBlockById;

  if (loading) {
    return <LoadingBar />;
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
