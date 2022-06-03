import React from 'react';
import AboutUsSectionEditForm from '../../../components/forms/about-us-forms/about-us-section-edit-form';
import withBusinessPage from '../hoc/withBusinessPage';
import { businessPageShape } from '../../../propTypes/about-us';

const AboutUsSectionEdit = ({ businessPage }) => (
  <AboutUsSectionEditForm businessPage={businessPage} />
);

AboutUsSectionEdit.propTypes = {
  businessPage: businessPageShape.isRequired
};

export default withBusinessPage(AboutUsSectionEdit);
