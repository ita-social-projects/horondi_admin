import React from 'react';
import { AdminServiceConsumer } from '../context';

const wrapWithAdminService = () => (Wrapped) => (props) => (
  <AdminServiceConsumer>
    {(adminService) => <Wrapped {...props} adminService={adminService} />}
  </AdminServiceConsumer>
);

export default wrapWithAdminService;
