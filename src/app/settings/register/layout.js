// 'use client';

// import PropTypes from 'prop-types';
// // components
// import AuthModernCompactLayout from 'src/layouts/auth/modern-compact';

// // ----------------------------------------------------------------------

// export default function Layout({ children }) {
//   return <AuthModernCompactLayout>{children}</AuthModernCompactLayout>;
// }

// Layout.propTypes = {
//   children: PropTypes.node,
// };
'use client';

import PropTypes from 'prop-types';
// auth
import { GuestGuard } from 'src/auth/guard';
// components
import AuthClassicLayout from 'src/layouts/auth/classic';
import AuthModernCompactLayout from 'src/layouts/auth/modern-compact';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <GuestGuard>
      <AuthModernCompactLayout title="Register"> 
        {children}
      </AuthModernCompactLayout>
    </GuestGuard>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
