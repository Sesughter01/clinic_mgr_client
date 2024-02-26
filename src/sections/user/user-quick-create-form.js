import PropTypes from 'prop-types';
import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';

// _mock
import { USER_STATUS_OPTIONS } from 'src/_mock';
// assets
import { edms_countries } from 'src/assets/data';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------
import { $post, $get, endpoints} from 'src/utils/axios';
// ----------------------------------------------------------------------

export default function UserQuickEditForm({ open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const [roles, setRoles] = useState([]);

  const NewUserSchema = Yup.object().shape({
    //details
    email: Yup.string().required('email is required'),
    role: Yup.string().required('Role is required'),
  }); 
   
  const defaultValues = useMemo(
    () => ({
      email: '',
      role: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.info('FORM DATA: ', data);
    const body = data;
      $post(endpoints.manage.invite, body)
      .then(res => {
        reset();
        onClose();
        enqueueSnackbar('Setup link sent sent successfully!');
        // window.location.reload()
      })
      .catch((err) => {
        enqueueSnackbar(err.message, {variant: 'error'});
      })
  });

  const getRoles = ()=>{
    $get(endpoints.manage.roles)
    .then(res =>{
      res.sort()
      res.shift("")
      setRoles(res)
      console.log("ROLES: ", res)
    })
  }

  useEffect(()=>{
    getRoles()
  }, [])

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 430 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Invite a new user</DialogTitle>

        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
          Enter user email and select role. 
          <br/>A setup link will be sent to the new user email.
          </Alert>
          
          <Stack spacing={3} alignItems="left" >

              <RHFTextField name="email" label="Email address" />

              <RHFSelect name="role" label="Role">
                {roles.map((role) => (
                  <MenuItem key={role.name} value={role.name}>
                    {role.name}
                  </MenuItem>
                ))}
              </RHFSelect>
              
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
                sx={{ justifyContent: 'space-between', pl: 2, pr: 1.5 }}
              >
                Send Invite
              </LoadingButton>
          </Stack>

        </DialogContent>

        <DialogActions>
          <Button sx={{width:1, py:1}} variant="outlined" onClick={onClose}>
              Cancel
          </Button>

          {/* <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Submit
          </LoadingButton> */}
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

UserQuickEditForm.propTypes = {
  currentUser: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
