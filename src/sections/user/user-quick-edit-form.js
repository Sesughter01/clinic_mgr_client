import PropTypes from 'prop-types';
import * as Yup from 'yup';
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
    clinicAddress: Yup.string().required('Clinic Address is required'),
    clinicId: Yup.string().required('Clinic Id is required'),
    city: Yup.string().required('City is required'),
    clinicCode: Yup.string().required('Clinic code is required'),
    province: Yup.string().required('Province is required'),
    dataPath: Yup.string().required('Data path is required'),
    postalCode: Yup.string().required('Postal code is required'),
    clinicName: Yup.string().required('Clinic name is required'),
    country: Yup.string().required('Country is required'),
    currentApplication: Yup.string().required('Current application is required'),
    phone: Yup.string().required('Phone is required'),
    destDb: Yup.string().required('Dest. db code is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    appointmentUnit: Yup.string().required('Appointemnt unit is required'),
    acquisitionDate: Yup.string().required('Acquisition date is required'),
    productionBy: Yup.string().required('Production By is required'),
    cuttOffDate: Yup.string().required('Cutt off datee is required'),
    chrgAdjBy: Yup.string().required('Chrg adj by is required'),
    statingTransId: Yup.string().required('Stating trans id is required'),
    collectionBy: Yup.string().required('Collection by is required'),
    responsiblePerson: Yup.string().required('Responsible person is required'),
    collAdjBy: Yup.string().required('Collection adj by is required'),
  
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
      clinicAddress: currentUser?.clinicAddress || '',
      clinicId: currentUser?.clinicId || '',
      city: currentUser?.city || '',
      clinicCode: currentUser?.clinicCode || '',
      province: currentUser?.province || '',
      dataPath: currentUser?.dataPath || '',
      postalCode: currentUser?.postalCode || '',
      clinicName: currentUser?.clinicName || '',
      country: currentUser?.country || '',
      avatarUrl: currentUser?.avatarUrl || null,
      currentApplication: currentUser?.currentApplication || '',
      phone: currentUser?.phone || '',
      destDb: currentUser?.destDb || '',
      email: currentUser?.email || '',
      appointmentUnit: currentUser?.appointmentUnit || '',
      acquisitionDate: currentUser?.acquisitionDate || '',
      productionBy: currentUser?.productionBy || '',
      cutOffDate: currentUser?.cutOffDate || '',
      chrgAdjBy: currentUser?.chrgAdjBy || '',
      statingTransId: currentUser?.statingTransId || '',
      collectionBy: currentUser?. collectionBy || '',
      responsiblePerson: currentUser?.responsiblePerson || '',
      collAdjBy: currentUser?.collAdjBy || '',
      
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

            <RHFAutocomplete
                name="corpPractice"
                label="Corp Practice"
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

              <RHFTextField name="clinicAddress" label="Clinic Address" />
              <RHFTextField name="clinicId" label="Clinic Id" />
              <RHFTextField name="city" label="City" />
              <RHFTextField name="clinicCode" label="Clinic Code" />
              <RHFTextField name="province" label="Province" />
              <RHFTextField name="dataPath" label="Data Path" />
              <RHFTextField name="postalCode" label="Postal Code" />
              <RHFTextField name="clinicName" label="Clinic Name" />

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

              <RHFAutocomplete
                name="currentApplication"
                label="Current Application"
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
              
              <RHFTextField name="phone" label="Phone" />
              <RHFTextField name="destDb" label="Dest. DB" />
              <RHFTextField name="email" label="Email" />

              <RHFAutocomplete
                name="appointmentUnit"
                label="Appointment Unit"
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

              <RHFTextField name="acquisitionData" label="Acquisition Data" />

              <RHFAutocomplete
                name="productionBy"
                label="Production By"
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

              <RHFAutocomplete
                name="chrgAdjBy"
                label="Chrg Adj By"
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

              <RHFAutocomplete
                name="collectionBy"
                label="Collection By"
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
               
               <RHFAutocomplete
                name="collAdjBy"
                label="Coll Adj By"
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
