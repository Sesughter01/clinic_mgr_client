import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ClinicTableFiltersResult({
  filters,
  onFilters,
  //
  onResetFilters,
  //
  results,
  ...other
}) {
  const handleRemoveStatus = () => {
    onFilters('status', 'all');
  };

  // const handleRemoveCorp = (inputValue) => {
  //   const newValue = filters.role.filter((item) => item !== inputValue);
  //   onFilters('role', newValue);
  // };
  const handleRemoveCorp = (inputValue) => {
    const newValue = filters.corpName.filter((item) => item !== inputValue);
    onFilters('corpName', newValue);
  };

  const handleRemovePms = (inputValue) => {
    const newValue = filters.pmsName.filter((item) => item !== inputValue);
    onFilters('pmsName', newValue);
  };

  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{results}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          results found
        </Box>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {filters.status !== 'all' && (
          <Block label="Status:">
            <Chip size="small" label={filters.status} onDelete={handleRemoveStatus} />
          </Block>
        )}

        {!!filters.corpName.length && (
          <Block label="Corp Name:">
            {filters.corpName.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => handleRemoveCorp(item)} />
            ))}
          </Block>
        )}

        {!!filters.pmsName.length && (
          <Block label="Pms:">
            {filters.pmsName.map((item) => (
              <Chip key={item} label={item} size="small" onDelete={() => handleRemovePms(item)} />
            ))}
          </Block>
        )}


        <Button
          color="error"
          onClick={onResetFilters}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          Clear
        </Button>
      </Stack>
    </Stack>
  );
}

ClinicTableFiltersResult.propTypes = {
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  onResetFilters: PropTypes.func,
  results: PropTypes.number,
};

// ----------------------------------------------------------------------

function Block({ label, children, sx, ...other }) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}

Block.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  sx: PropTypes.object,
};
