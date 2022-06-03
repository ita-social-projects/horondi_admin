import React from 'react';
import { businessPageShape } from '../../../propTypes/about-us';
import AboutUsFooterImgEditForm from '../../../components/forms/about-us-forms/about-us-footer-img-edit-form';
import withBusinessPage from '../hoc/withBusinessPage';

const AboutUsFooterImgEdit = ({ businessPage }) => (
  <AboutUsFooterImgEditForm businessPage={businessPage} />
);

AboutUsFooterImgEdit.propTypes = {
  businessPage: businessPageShape.isRequired
};

export default withBusinessPage(AboutUsFooterImgEdit);
