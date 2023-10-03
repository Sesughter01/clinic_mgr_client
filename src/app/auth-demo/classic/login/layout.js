'use client';

import PropTypes from 'prop-types';
// components
import AuthClassicLayout from 'src/layouts/auth/classic';

// ----------------------------------------------------------------------

export default function Layout({ children, title }) {
  return <AuthClassicLayout title="EDMS Clinic Manager">{children}</AuthClassicLayout>;
}

Layout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  
};
