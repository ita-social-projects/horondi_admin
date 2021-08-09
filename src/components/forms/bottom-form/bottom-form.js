import React from 'react';
import { useSelector } from 'react-redux';
import { config } from '../../../configs';
import { bottomSelector } from '../../../redux/selectors/bottom.selectors';
import LoadingBar from '../../loading-bar';

const {
  BOTTOM_VALIDATION_ERROR,
  BOTTOM_ERROR_MESSAGE,
  BOTTOM_ERROR_ENGLISH_AND_DIGITS_ONLY,
  PHOTO_NOT_PROVIDED,
  BOTTOM_UA_NAME_MESSAGE,
  BOTTOM_EN_NAME_MESSAGE,
  BOTTOM_PRICE_ERROR,
  BOTTOM_MAX_LENGTH_MESSAGE,
  BOTTOM_MIN_LENGTH_MESSAGE
} = config.bottomErrorMessages;

const BottomForm = () => {
  const { loading } = useSelector(bottomSelector);

  return <div>{loading ? <LoadingBar /> : <form />}</div>;
};

export default BottomForm;
