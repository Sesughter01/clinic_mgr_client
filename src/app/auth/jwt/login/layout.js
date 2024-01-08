'use client';

import PropTypes from 'prop-types';
// auth
import { GuestGuard } from 'src/auth/guard';
// components
import AuthClassicLayout from 'src/layouts/auth/classic';
import AuthModernLayout from 'src/layouts/auth/modern';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    // <GuestGuard>
    //   <AuthClassicLayout>{children}</AuthClassicLayout>
    // </GuestGuard>
    <GuestGuard>
      <AuthModernLayout>{children}</AuthModernLayout>
    </GuestGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
