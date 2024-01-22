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

const URL = `${endpoints.clinic_manager.clinic_data}`

export default function UserQuickEditForm({ open, onClose }) {
  const { enqueueSnackbar } = useSnackbar();
  const [pmsNames, setPmsNames] = useState([]);
  const [corpNames, setCorpNames] = useState([]);

  const NewUserSchema = Yup.object().shape({
    //details
    corp_id: Yup.string().required('Corp practice is required'),
    clinic_name: Yup.string().required('Clinic name is required'),
    current_app: Yup.string().required('Current Application is required'),
    locationId: Yup.string().required('Please select a location'),
    Data_Path: Yup.string().required('Data Path is required'),
  }); 
   
  const defaultValues = useMemo(
    () => ({
      corp_id: '',
      locationId: '',
      clinic_name: '',
      current_app: '',
      Data_Path: ''
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

    try {
      const body = data;
      $post(URL, body)
      .then(res => window.location.reload())
      // await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      onClose();
      enqueueSnackbar('Clinic record created successfully!');
    } catch (error) {
      console.error(error);
    }
  });

  const getPMS_Corps = ()=>{
    $get(endpoints.pms.names)
    .then(res =>{
      res.sort()
      setPmsNames(res)
    })

    $get(endpoints.corps.names)
    .then(res =>{
      res.sort()
      setCorpNames(res)
    })
  }

  useEffect(()=>{
    getPMS_Corps()
  }, [])

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
        <DialogTitle>Create New Clinic</DialogTitle>

        <DialogContent>
          <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Enter clinic details
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
            <RHFTextField name="Data_Path" label="Data Path" />

            <Box sx={{ display: { xs: 'none', sm: 'block' } }} />

            {/* <RHFTextField name="name" label="Full Name" />
            <RHFTextField name="email" label="Email Address" />
            <RHFTextField name="phoneNumber" label="Phone Number" />

            <RHFAutocomplete
              name="country"
              label="Country"
              options={edms_countries.map((country) => country.label)}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => {
                const { code, label, phone } = edms_countries.filter(
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

            {/* <RHFSelect name="status" label="Status">
              {USER_STATUS_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </RHFSelect> */}
              
              {/* <RHFTextField name="data_Path" label="Data Path" /> */}
              {/* <RHFTextField name="clinic_email" label="Clinic Email" /> */}

              {/* <RHFTextField name="clinic_address" label="Clinic Address" /> */}
              {/* <RHFTextField name="clinic_city" label="Clinic city" /> */}
              {/* <RHFTextField name="clinic_code" label="Clinic Code" /> */}
              {/* <RHFTextField name="clinic_province" label="Clinic Province" /> */}

              {/* <RHFTextField name="clinic_postal" label="Clinic postal" /> */}

              <RHFTextField name="clinic_name" label="Clinic Name" />

              <RHFSelect name="corp_id" label="Corp Practice">
                {corpNames.map((corp) => (
                  <MenuItem key={corp} value={corp}>
                    {corp}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFSelect name="current_app" label="Current Application">
                {pmsNames.map((pms) => (
                  <MenuItem key={pms} value={pms}>
                    {pms}
                  </MenuItem>
                ))}
              </RHFSelect>

              {/* <RHFTextField
                name="current_app"
                label="Current Application"
              /> */}
              
              <RHFAutocomplete
                name="locationId"
                label="Location"
                options={edms_countries.map((country) => country.label)}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                renderOption={(props, option) => {
                  const { code, label, phone } = edms_countries.filter(
                    (country) => country.label === option
                  )[0];

                  if (!label) {
                    return null;
                  }

                  return (
                    <li {...props} key={code}>
                      <Iconify
                        key={label}
                        icon={`circle-flags:${code.toLowerCase()}`}
                        width={28}
                        sx={{ mr: 1 }}
                      />
                      {label} ({code})
                    </li>
                  );
                }}
              />
              
              {/* <RHFTextField name="clinic_phone" label="Clinic Phone" /> */}
              {/* <RHFTextField name="dest_db" label="Dest. DB" /> */}

              {/* <RHFTextField
                name="clinic_appointmentunit"
                label="Clinic Appointment Unit"
              /> */}

              {/* <RHFTextField name="acquistionDate" 
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
              />   */}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Submit
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
