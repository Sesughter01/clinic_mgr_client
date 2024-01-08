import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components

// paths
import { paths } from 'src/routes/paths';

// link
import Link from '@mui/material/Link';

// Router Link
import { RouterLink } from 'src/routes/components';

// auth
import { useAuthContext } from 'src/auth/hooks';

// Toolitip
import Tooltip from '@mui/material/Tooltip';

import Logo from 'src/components/logo';

// ----------------------------------------------------------------------

const METHODS = [
  {
    id: 'Development 1',
    label: 'View our Staging Env',
    text:'Staging',
    path: paths.auth.jwt.login,
    icon: '/assets/icons/auth/ic_jwt.svg',
  },
  {
    id: 'Development 2',
    label: 'View our Production Env',
    text:'Production',
    path: paths.auth.jwt.login,
    icon: '/assets/icons/auth/ic_firebase.svg',
  },
  {
    id: 'Production 1',
    label: 'View Dentallytics',
    text:'Dentallytics',
    path: paths.auth.jwt.login,
    icon: '/assets/icons/auth/ic_amplify.svg',
  },
  {
    id: 'Production 2',
    label: 'View JIRA',
    text:'JIRA',
    path: paths.auth.jwt.login,
    icon: '/assets/icons/auth/ic_auth0.svg',
  },
];

export default function AuthModernLayout({ children, image }) {

  const { method } = useAuthContext();
  const mdUp = useResponsive('up', 'md');

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 480,
        px: { xs: 2, md: 8 },
      }}
    >
      <Logo
        sx={{
          m: { xs: 2, md: 5 },
          width: { xs: 150, md:180 },
        }}
        
      />

      <Card
        sx={{
          py: { xs: 5, md: 0 },
          px: { xs: 3, md: 0 },
          boxShadow: { md: 'none' },
          overflow: { md: 'unset' },
          bgcolor: { md: 'background.default' },
        }}
      >
        {children}
      </Card>

      <Stack direction="row" spacing={2}>
        {METHODS.map((option) => (
          <Tooltip key={option.label} title={option.label}>
            <Link component={RouterLink} href={option.path}>
              <Box
                // component="img"
                alt={option.label}
                src={option.icon}
                sx={{
                  width: 32,
                  height: 32,
                  ...(method !== option.id && {
                    filter: 'grayscale(100%)',
                  }),
                }}
              
              />
                {option.text}
            </Link>
          </Tooltip>

            
        
        ))}
        
      </Stack>
    </Stack>
  );

  const renderSection = (
    <Stack flexGrow={1} sx={{ position: 'relative' }}>
      <Box
        component="img"
        alt="auth"
        src={image || '/assets/background/overlay_3.jpg'}
        sx={{
          top: 16,
          left: 16,
          objectFit: 'cover',
          position: 'absolute',
          width: 'calc(100% - 32px)',
          height: 'calc(100% - 32px)',
        }}
      />
    
    </Stack>

    
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
        position: 'relative',
        '&:before': {
          width: 1,
          height: 1,
          zIndex: -1,
          content: "''",
          position: 'absolute',
          backgroundSize: 'cover',
          opacity: { xs: 0.24, md: 0 },
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundImage: 'url(/assets/background/overlay_4.jpg)',
        },
      }}
    >
      {renderContent}

      {mdUp && renderSection}
    </Stack>
  );
}

AuthModernLayout.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
};
