'use client';

import PropTypes from 'prop-types';
// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// _mock
import { _userList } from 'src/_mock';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
// import UserNewEditForm from '../user-new-edit-form';
import UserPmsreportForm from '../user-pmsreport-form';




// ----------------------------------------------------------------------

export default function UserPmsreporttView({ id }) {
  const settings = useSettingsContext();

  const currentUser = _userList.find((user) => user.id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Pms Report"
        links={[
          // {
          //   name: 'Dashboard',
          //   href: paths.dashboard.root,
          // },
          {
            name: 'Clinic Manager',
            // href: paths.dashboard.user.root,
          },
          // { name: currentUser?.name },
          

        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserPmsreportForm currentUser={currentUser} />
    </Container>
  );
}

UserPmsreporttView.propTypes = {
  id: PropTypes.string,
};
