//Added by Blessing (for the toggle)
import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PropTypes from 'prop-types';
// @mui
import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
//
import UserQuickEditForm from './user-quick-edit-form';

// ----------------------------------------------------------------------

export default function UserTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, onPmsreportRow }) {
  // const { name, avatarUrl, company, role, status, email, phoneNumber } = row;
  const { clinic_name, avatarUrl, corp_Name, pmsName, actioBy, stage, status, todo, } = row;

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  //added by blessing
  const [marked, setMarked] = React.useState(false);

  const handleToggle = () => {
    setMarked(!marked);
  };

  return (
    <>

    
      <TableRow hover selected={selected}>
        <TableCell>
          {/* <Checkbox checked={selected} onClick={onSelectRow} /> */}
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {/* <Avatar alt={clinic_name} src={avatarUrl} sx={{ mr: 2 }} /> */}

          <ListItemText
            primary={clinic_name}
            secondary=" "
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{corp_Name}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{pmsName}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{stage}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{todo}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{actioBy}</TableCell>

        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>{asana_url}</TableCell> */}
        {/* <TableCell align="center">{asana_url === '' ? ' - ' : asana_url}</TableCell> */}

        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'active' && 'success') ||
              (status === 'inactive' && 'warning') ||
              // (status === 'pending' && 'warning') ||
              // (status === 'banned' && 'error') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell>

        <TableCell>
          <ToggleButtonGroup
            value={marked}
            exclusive
            onChange={handleToggle}
            aria-label="custom-toggle-button"
          >
            <ToggleButton sx={{ p: 0}}
              value={true}
              aria-label="marked"
              style={{ backgroundColor: marked ? '#118D57' : 'white' }}
            >
              GoLive
            </ToggleButton>
            <ToggleButton sx={{ p: 0}}
              value={false}
              aria-label="not-marked"
              style={{ backgroundColor: !marked ? '#118D57' : 'white' }}
            >
              Retired
            </ToggleButton>
          </ToggleButtonGroup>
         
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Quick Edit" placement="top" arrow>
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>

          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <UserQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
         
         {/* Added by Blessing */}
        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />

          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            onPmsreportRow();
            popover.onClose();
          }}
        >
          
          <Iconify icon="solar:file-linear" />

          PMS Report
        </MenuItem>

        <MenuItem
          onClick={() => {
            // onPmsreportRow();
            popover.onClose();
          }}
        >
          {/* <Iconify icon="solar:eye-bold" /> */}
          <Iconify icon="solar:notification-unread-bold" color="blue" />

          Jira Issues
        </MenuItem>

      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}

UserTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onPmsreportRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
