import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import Logo from 'src/components/logo';
//
import { HeaderSimple as Header } from '../_common';

// ----------------------------------------------------------------------

export default function AuthNewLayout({ children }) {
  return (
    <>
      {/* <Header /> */}

      <Box
        component="main"
        sx={{
          py: 12,
          display: 'flex',
          minHeight: '100vh',
          textAlign: 'center',
          px: { xs: 2, md: 0 },
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          '&:before': {
            width: 1,
            height: 1,
            zIndex: -1,
            content: "''",
            opacity: 0.24,
            position: 'absolute',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundImage: 'url(/assets/background/overlay_4.jpg)',
          },
        }}
      >
        {/* <Card
          sx={{
            py: 5,
            px: 3,
            maxWidth: 520,
          }}
        >
          {children}
        </Card> */}
        <img
    src="/assets/ashCircle.svg"
    alt="Top Left Logo"
    style={{
      position: 'absolute',
      top: 6,
      left: 300,
      zIndex:-1,
      width: '150px', // Adjust the width as needed
      // height: '50px', // Adjust the height as needed
    }}
  />

<Card
  sx={{
    // py: 5,
    // px: 3,
    background: 'rgba(220, 220, 220, 0.8)', // DCDCDC with 0.8 opacity
    position: 'relative',
    maxWidth: 720,
    minHeight: 620,
    display: 'flex',
    width: '100%', // Make the Card full width
    zIndex:10,
  }}
>



  

  {/* Left Half (Logo) */}
  <div
    style={{
      background: 'linear-gradient(-45deg, #DCDCDC , #FFFFFF 20%, #DCDCDC )', // Slanting gradient
      flex: 1,
      padding: '20px', // Adjust padding as needed
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
     <img
      src="/assets/edms_logo_1.png"
      alt="Left Logo"
      style={{
        width: '80%', // Adjust the width as needed
        height: 'auto', // Maintain aspect ratio
      }} />
      {/* <Logo /> */}
  </div>

  {/* Right Half (Children) */}
  <div
    style={{
      flex: 1,
      padding: '20px', // Adjust padding as needed
    }}
  >
    {children}
  </div>
</Card>
<img
    src="/assets/brownCircle.svg"
    alt="Bottom Left Logo"
    style={{
      position: 'absolute',
      bottom: -1,
      left: 280,
      zIndex:-1,
      width: '200px', // Adjust the width as needed
      // height: '50px', // Adjust the height as needed
    }}
  />

      </Box>
    </>
  );
}

AuthNewLayout.propTypes = {
  children: PropTypes.node,
};
// import PropTypes from 'prop-types';
// // @mui
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Logo from 'src/components/logo';
// import { HeaderSimple as Header } from '../_common';

// export default function AuthNewLayout({ children }) {
//   return (
//     <>
//       {/* <Header /> */}

//       <Box
//         component="main"
//         sx={{
//           py: 12,
//           display: 'flex',
//           minHeight: '100vh',
//           textAlign: 'center',
//           px: { xs: 2, md: 0 },
//           position: 'relative',
//           alignItems: 'center',
//           justifyContent: 'center',
//           '&:before': {
//             width: 1,
//             height: 1,
//             zIndex: -1,
//             content: "''",
//             opacity: 0.24,
//             position: 'absolute',
//             backgroundSize: 'cover',
//             backgroundRepeat: 'no-repeat',
//             backgroundPosition: 'center center',
//             backgroundImage: 'url(/assets/background/overlay_4.jpg)',
//           },
//         }}
//       >
//         <Card
//           sx={{
//             background: 'rgba(220, 220, 220, 0.8)',
//             position: 'relative',
//             maxWidth: 720,
//             minHeight: 620,
//             display: 'flex',
//             width: '100%',
//             flexDirection: 'column', // Stack divs on small screens
//             zIndex: 10,
//           }}
//         >
//           {/* Logo Section */}
//           <div
//             style={{
//               background: 'linear-gradient(-45deg, #DCDCDC , #FFFFFF , #DCDCDC )',
//               padding: '20px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//           >
//             <img
//               src="/assets/edms_logo_1.png"
//               alt="Left Logo"
//               style={{
//                 width: '80%',
//                 height: 'auto',
//               }}
//             />
//           </div>

//           {/* Children Section */}
//           <div
//             style={{
//               flex: 1,
//               padding: '20px',
//             }}
//           >
//             {children}
//           </div>
//         </Card>

//         {/* Additional SVGs */}
//         <img
//           src="/assets/ashCircle.svg"
//           alt="Top Left Logo"
//           style={{
//             position: 'absolute',
//             top: 6,
//             left: 300,
//             zIndex: -1,
//             width: '150px',
//           }}
//         />
//         <img
//           src="/assets/brownCircle.svg"
//           alt="Bottom Left Logo"
//           style={{
//             position: 'absolute',
//             bottom: -1,
//             left: 280,
//             zIndex: -1,
//             width: '200px',
//           }}
//         />
//       </Box>
//     </>
//   );
// }

// AuthNewLayout.propTypes = {
//   children: PropTypes.node,
// };
