import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
//
import ClinicCard from './clinic-card';

// ----------------------------------------------------------------------

export default function ClinicCardList({ users }) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
    >
      {users.map((user) => (
        <ClinicCard key={user.id} user={user} />
      ))}
    </Box>
  );
}

ClinicCardList.propTypes = {
  users: PropTypes.array,
};
