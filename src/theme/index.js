// src/theme/index.js
 
'use client';
 
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
import { customShadows } from './custom-shadows';
import { componentsOverrides } from './overrides';
import NextAppDirEmotionCacheProvider from './next-emotion-cache';
 
export default function ThemeProvider({ children }) {
  const baseOption = useMemo(
    () => ({
      palette: palette('light'),
      shadows: shadows('light'),
      customShadows: customShadows('light'),
      typography,
      shape: { borderRadius: 8 },
    }),
    []
  );
 
  const theme = createTheme(baseOption);
 
  theme.components = componentsOverrides(theme);
 
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'css' }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
 
ThemeProvider.propTypes = {
  children: PropTypes.node,
};