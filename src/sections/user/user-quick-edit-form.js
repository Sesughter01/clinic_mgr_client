import PropTypes from 'prop-types';
import * as Yup from 'yup';
import React, { useState } from 'react';
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
// _mock
import { USER_STATUS_OPTIONS } from 'src/_mock';
// assets
import { countries } from 'src/assets/data';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFSelect, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function UserQuickEditForm({ currentUser, open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();

  // const NewUserSchema = Yup.object().shape({
  //   name: Yup.string().required('Name is required'),
  //   email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  //   phoneNumber: Yup.string().required('Phone number is required'),
  //   address: Yup.string().required('Address is required'),
  //   country: Yup.string().required('Country is required'),
  //   company: Yup.string().required('Company is required'),
  //   state: Yup.string().required('State is required'),
  //   city: Yup.string().required('City is required'),
  //   role: Yup.string().required('Role is required'),
  // });

  const NewUserSchema = Yup.object().shape({
    //details
    corpPractice: Yup.string().required('Corp practice is required'),
    clinic_address: Yup.string().required('Clinic Address is required'),
    idclinics: Yup.string().required('Clinic Id is required'),
    clinic_city: Yup.string().required('Clinic City is required'),
    clinic_code: Yup.string().required('Clinic Code is required'),
    clinic_province: Yup.string().required('Clinic Province is required'),
    data_Path: Yup.string().required('Data path is required'),
    clinic_postal: Yup.string().required('Clinic Postal is required'),
    clinic_name: Yup.string().required('Clinic name is required'),
    country: Yup.string().required('Country is required'),
    current_app: Yup.string().required('Current Application is required'),
    clinic_phone: Yup.string().required('Clinic Phone is required'),
    dest_db: Yup.string().required('Dest. db code is required'),
    clinic_email: Yup.string().required('Clinic Email is required').email('Clinic Email must be a valid email address'),
    clinic_appointmentunit: Yup.string().required('Clinic Appointemnt unit is required'),
    acquistionDate: Yup.string().required('Acquisition date is required'),
    prodDate: Yup.string().required('Production By is required'),
    cuttOffDate: Yup.string().required('Cutt off datee is required'),
    chargeAdj: Yup.string().required('Chrg adj by is required'),
    firstTransId: Yup.string().required('Stating trans id is required'),
    colDate: Yup.string().required('Collection by is required'),
    responsiblePerson: Yup.string().required('Responsible person is required'),
    collectionAdj: Yup.string().required('Collection adj by is required'),
  
  }); 

  // const defaultValues = useMemo(
  //   () => ({
  //     name: currentUser?.name || '',
  //     email: currentUser?.email || '',
  //     phoneNumber: currentUser?.phoneNumber || '',
  //     address: currentUser?.address || '',
  //     country: currentUser?.country || '',
  //     state: currentUser?.state || '',
  //     city: currentUser?.city || '',
  //     zipCode: currentUser?.zipCode || '',
  //     status: currentUser?.status,
  //     company: currentUser?.company || '',
  //     role: currentUser?.role || '',
  //   }),
  //   [currentUser]
  // );

   
  const defaultValues = useMemo(
    () => ({
      //details
      corpPractice: currentUser?.corpPractice|| '',
      clinic_address: currentUser?.clinic_address || '',
      idclinics: currentUser?.idclinics || '',
      clinic_city: currentUser?.clinic_city || '',
      clinic_code: currentUser?.clinic_code || '',
      clinic_province: currentUser?.clinic_province || '',
      data_Path: currentUser?.data_Path || '',
      clinic_postal: currentUser?.clinic_postal || '',
      clinic_name: currentUser?.clinic_name || '',
      country: currentUser?.country || '',
      avatarUrl: currentUser?.avatarUrl || null,
      current_app: currentUser?.current_app || '',
      clinic_phone: currentUser?.clinic_phone || '',
      dest_db: currentUser?.dest_db || '',
      clinic_email: currentUser?.clinic_email || '',
      clinic_appointmentunit: currentUser?.clinic_appointmentunit || '',
      acquistionDate: currentUser?.acquistionDate || '',
      prodDate: currentUser?.prodDate || '',
      cutoff_date: currentUser?.cutoff_date || '',
      chargeAdj: currentUser?.chargeAdj || '',
      firstTransId: currentUser?.firstTransId || '',
      colDate: currentUser?. colDate || '',
      responsiblePerson: currentUser?.responsiblePerson || '',
      collectionAdj: currentUser?.collectionAdj || '',
      
    }),
    [currentUser]
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
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      onClose();
      enqueueSnackbar('Update success!');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

   //For date
  const [date, setDate] = useState("none");
  const onDateChange = (event) => {
   setDate(event.target.value);
  };


  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Quick Update</DialogTitle>

        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Account is waiting for confirmation
          </Alert>

          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <RHFSelect name="status" label="Status">
              {USER_STATUS_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect>

            <Box sx={{ display: { xs: 'none', sm: 'block' } }} />

            {/* <RHFTextField name="name" label="Full Name" />
            <RHFTextField name="email" label="Email Address" />
            <RHFTextField name="phoneNumber" label="Phone Number" />

            <RHFAutocomplete
              name="country"
              label="Country"
              options={countries.map((country) => country.label)}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => {
                const { code, label, phone } = countries.filter(
                  (country) => country.label === option
                )[0];

                if (!label) {
                  return null;
                }

                return (
                  <li {...props} key={label}>
                    <Iconify
                      key={label}
                      icon={`circle-flags:${code.toLowerCase()}`}
                      width={28}
                      sx={{ mr: 1 }}
                    />
                    {label} ({code}) +{phone}
                  </li>
                );
              }}
            />

            <RHFTextField name="state" label="State/Region" />
            <RHFTextField name="city" label="City" />
            <RHFTextField name="address" label="Address" />
            <RHFTextField name="zipCode" label="Zip/Code" />
            <RHFTextField name="company" label="Company" />
            <RHFTextField name="role" label="Role" /> */}

            <RHFTextField
                name="corpPractice"
                label="Corp Practice"
              />

              <RHFTextField name="clinic_address" label="Clinic Address" />
              <RHFTextField name="idclinics" label="Clinic Id" />
              <RHFTextField name="clinic_city" label="Clinic city" />
              <RHFTextField name="clinic_code" label="Clinic Code" />
              <RHFTextField name="clinic_province" label="Clinic Province" />
              <RHFTextField name="data_Path" label="Data Path" />
              <RHFTextField name="clinic_postal" label="Clinic postal" />
              <RHFTextField name="clinic_name" label="Clinic Name" />

              <RHFAutocomplete
                name="country"
                label="Country"
                options={countries.map((country) => country.label)}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const { code, label, phone } = countries.filter(
                    (country) => country.label === option
                  )[0];

                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...props} key={label}>
                      <Iconify
                        key={label}
                        icon={`circle-flags:${code.toLowerCase()}`}
                        width={28}
                        sx={{ mr: 1 }}
                      />
                      {label} ({code}) +{phone}
                    </li>
                  );
                }}
              />

              <RHFTextField
                name="current_app"
                label="Current Application"
              />
              
              <RHFTextField name="clinic_phone" label="Clinic Phone" />
              <RHFTextField name="dest_db" label="Dest. DB" />
              <RHFTextField name="clinic_email" label="Clinic Email" />

              <RHFTextField
                name="clinic_appointmentunit"
                label="Clinic Appointment Unit"
              />

              <RHFTextField name="acquistionDate" 
                  label="Acquisition Date"
                  type="date"
                  value={date}
                  onChange={onDateChange} />

              <RHFTextField
                name="prodDate"
                label="Production By"

              />

              <RHFTextField
                name="chargeAdj"
                label="Chrg Adj By"
              />

              <RHFTextField
                name="colDate"
                label="Collection By"
              />
               
               <RHFTextField
                name="collectionAdj"
                label="Coll Adj By"
              />  
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Update
          </LoadingButton>
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
