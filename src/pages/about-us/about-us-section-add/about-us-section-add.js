import React from 'react';
import AboutUsSectionAddForm from '../../../components/forms/about-us-forms/about-us-section-add-form';
import withBusinessPage from '../hoc/withBusinessPage';
import { businessPageShape } from '../../../propTypes/about-us';

const AboutUsSectionAdd = ({ businessPage }) => (
  <AboutUsSectionAddForm businessPage={businessPage} />
);

AboutUsSectionAdd.propTypes = {
  businessPage: businessPageShape.isRequired
};

export default withBusinessPage(AboutUsSectionAdd);
