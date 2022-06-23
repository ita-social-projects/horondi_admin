import React from 'react';
import { businessPageShape } from '../../../propTypes/about-us';
import AboutUsTitleEditForm from '../../../components/forms/about-us-forms/about-us-title-edit-form';
import withBusinessPage from '../hoc/withBusinessPage';

const AboutUsTitleEdit = ({ businessPage }) => (
  <AboutUsTitleEditForm businessPage={businessPage} />
);

AboutUsTitleEdit.propTypes = {
  businessPage: businessPageShape.isRequired
};

export default withBusinessPage(AboutUsTitleEdit);
