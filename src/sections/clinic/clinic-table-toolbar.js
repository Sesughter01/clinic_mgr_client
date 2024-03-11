import PropTypes from 'prop-types';
import { useCallback } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
// components
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function ClinicTableToolbar({
  filters,
  onFilters,
  //
  corpOptions,
  pmsOptions,
}) {
  const popover = usePopover();

  const handleFilterName = useCallback(
    (event) => {
      // onFilters('name', event.target.value);
      onFilters('clinic_name', event.target.value);
    },
    [onFilters]
  );

  // const handleFilterRole = useCallback(
  //   (event) => {
  //     onFilters(
  //       'role',
  //       typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
  //     );
  //   },
  //   [onFilters]
  // );
  const handleFilterRole = useCallback(
    (event) => {
      onFilters(
        'corpName',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );
  const handleFilterPms = useCallback(
    (event) => {
      onFilters(
        'pmsName',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.5,
          pr: { xs: 2.5, md: 1 },
        }}
      >
        {/* <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Role</InputLabel>

          <Select
            multiple
            value={filters.role}
            onChange={handleFilterRole}
            input={<OutlinedInput label="Role" />}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {corpOptions.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox disableRipple size="small" checked={filters.role.includes(option)} />
                {option}
              </MenuItem>
            ))}
          </Select>

          
        </FormControl> */}

        { <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Corp Names</InputLabel>

          <Select
            // multiple
            value={filters.corpName}
            onChange={handleFilterRole}
            input={<OutlinedInput label="Corp Name" />}
            // renderValue={(selected) => selected.map((value) => value).join(', ')}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {corpOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {/* <Checkbox disableRipple size="small" checked={filters.corpName.includes(option)} /> */}
                {option}
              </MenuItem>
            ))}
          </Select>

          
        </FormControl> }

        <FormControl
          sx={{
            flexShrink: 0,
            width: { xs: 1, md: 200 },
          }}
        >
          <InputLabel>Pms</InputLabel>

          <Select
            // multiple
            value={filters.pmsName}
            onChange={handleFilterPms}
            input={<OutlinedInput label="Pms" />}
            // renderValue={(selected) => selected.map((value) => value).join(', ')}
            MenuProps={{
              PaperProps: {
                sx: { maxHeight: 240 },
              },
            }}
          >
            {pmsOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {/* <Checkbox disableRipple size="small" checked={filters.pms.includes(option)} /> */}
                {option}
              </MenuItem>
            ))}
          </Select>

          
        </FormControl>

        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <TextField
            fullWidth
            // value={filters.name}
            value={filters.clinic_name}
            onChange={handleFilterName}
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />

          <IconButton onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </CustomPopover>
    </>
  );
}

ClinicTableToolbar.propTypes = {
  filters: PropTypes.object,
  onFilters: PropTypes.func,
  corpOptions: PropTypes.array,
  pmsOptions: PropTypes.array,
};
