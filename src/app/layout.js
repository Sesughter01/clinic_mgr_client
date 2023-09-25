<<<<<<< HEAD

import { Inter } from 'next/font/google'
=======
// i18n
// not comment import 'src/locales/i18n';
>>>>>>> f5b9e437ce3c2f02ea527d86390c53e9f98c8a16

// scrollbar
// not comment import 'simplebar-react/dist/simplebar.min.css';

// lightbox
// not comment import 'yet-another-react-lightbox/styles.css';
// not comment import 'yet-another-react-lightbox/plugins/captions.css';
// not comment import 'yet-another-react-lightbox/plugins/thumbnails.css';

// map
// not comment import 'mapbox-gl/dist/mapbox-gl.css';

// editor
// not comment import 'react-quill/dist/quill.snow.css';

// carousel
// not comment import 'slick-carousel/slick/slick.css';
// not comment import 'slick-carousel/slick/slick-theme.css';

// image
// not comment import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

// not comment import PropTypes from 'prop-types';
// locales
// not comment import { LocalizationProvider } from 'src/locales';
// theme
import ThemeProvider from 'src/theme';
import { primaryFont } from 'src/theme/typography';
// components
// not comment import ProgressBar from 'src/components/progress-bar';
// not comment import { MotionLazy } from 'src/components/animate/motion-lazy';
// not comment import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
// not comment import { SettingsProvider, SettingsDrawer } from 'src/components/settings';
// sections
// not comment import { CheckoutProvider } from 'src/sections/checkout/context';
// auth
// not comment import { AuthProvider, AuthConsumer } from 'src/auth/context/jwt';
// import { AuthProvider, AuthConsumer } from 'src/auth/context/auth0';
// import { AuthProvider, AuthConsumer } from 'src/auth/context/amplify';
// import { AuthProvider, AuthConsumer } from 'src/auth/context/firebase';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Minimal UI Kit',
  description:
    'The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style',
  keywords: 'react,material,kit,application,dashboard,admin,template',
  themeColor: '#000000',
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: [
    {
      rel: 'icon',
      url: '/favicon/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon/apple-touch-icon.png',
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={primaryFont.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

//  RootLayout.propTypes = {
//  children: PropTypes.node,
// };
