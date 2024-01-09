// import PropTypes from 'prop-types';
// // @mui
// import Box from '@mui/material/Box';
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import TablePagination from '@mui/material/TablePagination';

// // ----------------------------------------------------------------------

// export default function TablePaginationCustom({
//   dense,
//   onChangeDense,
//   rowsPerPageOptions = [5, 10, 15, 25],
//   sx,
//   ...other
// }) {
//   return (
//     <Box sx={{ position: 'relative', ...sx }}>
//       <TablePagination
//         rowsPerPageOptions={rowsPerPageOptions}
//         component="div"
//         {...other}
//         sx={{
//           borderTopColor: 'transparent',
//         }}
//       />

//       {onChangeDense && (
//         <FormControlLabel
//           label="Dense"
//           control={<Switch checked={dense} onChange={onChangeDense} />}
//           sx={{
//             pl: 2,
//             py: 1.5,
//             top: 0,
//             position: {
//               sm: 'absolute',
//             },
//           }}
//         />
//       )}
//     </Box>
//   );
// }

// TablePaginationCustom.propTypes = {
//   dense: PropTypes.bool,
//   onChangeDense: PropTypes.func,
//   rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
//   sx: PropTypes.object,
// };


import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TablePagination from '@mui/material/TablePagination';

// ----------------------------------------------------------------------

export default function TablePaginationCustom({
  dense,
  onChangeDense,
  sx,
  ...other
}) {
  return (
    <Box sx={{ position: 'relative', ...sx }}>
      {/* Custom pagination control without arrows */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          borderTop: '1px solid transparent',
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          py: 1,
        }}
      >
        {onChangeDense && (
          <FormControlLabel
            label="Dense"
            control={<Switch checked={dense} onChange={onChangeDense} />}
            sx={{
              pl: 2,
            }}
          />
        )}
      </Box>

      {/* Content to show page count, etc. */}
      <TablePagination
        component="div"
        {...other}
        sx={{
          display: 'none',  // Hide the default pagination control
        }}
      />
    </Box>
  );
}

TablePaginationCustom.propTypes = {
  dense: PropTypes.bool,
  onChangeDense: PropTypes.func,
  sx: PropTypes.object,
};

