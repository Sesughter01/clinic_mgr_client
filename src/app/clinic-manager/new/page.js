'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

//For table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// assets
import { countries } from 'src/assets/data';

// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import FormControlLabel from '@mui/material/FormControlLabel';

// routes (added)
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

//component
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

//form
import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// utils
import { fData } from 'src/utils/format-number';

//List 
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import TextareaAutosize from '@mui/material/TextareaAutosize';


//added by blessing
import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
    RHFSwitch,
    RHFTextField,
    RHFUploadAvatar,
    RHFAutocomplete,
  } from 'src/components/hook-form';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(currentUser) {

  //added 

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

//   const NewUserSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
//     email: Yup.string().required('Email is required').email('Email must be a valid email address'),
//     phoneNumber: Yup.string().required('Phone number is required'),
//     address: Yup.string().required('Address is required'),
//     country: Yup.string().required('Country is required'),
//     company: Yup.string().required('Company is required'),
//     state: Yup.string().required('State is required'),
//     city: Yup.string().required('City is required'),
//     role: Yup.string().required('Role is required'),
//     zipCode: Yup.string().required('Zip code is required'),
//     avatarUrl: Yup.mixed().nullable().required('Avatar is required'),
//     // not required
//     status: Yup.string(),
//     isVerified: Yup.boolean(),
//   });

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
    scriptConvUnit: Yup.string().required('Script conversion unit is required'),
    dateFormat: Yup.string().required('Date format is required'),
    timeZone: Yup.string().required('Time zone is required'),
    avatarUrl: Yup.mixed().nullable().required('Avatar is required'),
    // not required
    status: Yup.string(),
    isVerified: Yup.boolean(),
    //jail
    dataPathSource: Yup.string().required('Data path source is required'),
    simpleJail: Yup.string().required('Simple jail  is required'),
    jailDataDir: Yup.string().required('Jail Data Directory is required'),
    combineMulClinicJail: Yup.string().required('Combined multi clinic jail is required'),
    locationId: Yup.string().required('Location id  is required'),
    sepaMulClinicJail: Yup.string().required('Separate multi clinic jail is required'),
    //payment method
    creditCard: Yup.string(),
    writeOff: Yup.string(),
    visa: Yup.string(),
    finance: Yup.string(),
    masterCard: Yup.string(),
    directDeposit: Yup.string(),
    debit: Yup.string(),
    giftCertificate: Yup.string(),
    cash: Yup.string(),
    webCoupon: Yup.string(),
    personalCheque: Yup.string(),
    insuranceEfts: Yup.string(),
    insuranceCheque: Yup.string(),
    insuranceOthers: Yup.string(),
    cashBalance: Yup.string(),
    batchCollection: Yup.string(),
    eTransfer: Yup.string(),
    others: Yup.string(),
    americanExp: Yup.string(),
    refund: Yup.string(),
    assignment: Yup.string(),
    paymentPlan: Yup.string(),
    //Script
    table: Yup.string(),
    scriptType: Yup.string(),
    edmsPrefix: Yup.string(),
    //Work flow
    stage: Yup.string(),
    toDo: Yup.string(),
    by: Yup.string(),
    asanaLink: Yup.string(),
    notes: Yup.string(),
    //Appt Status Value 
    defId: Yup.string(),
    edmsStatus: Yup.string(),
    pmsStatus: Yup.string(),
    //Employee mapping
    providerCode: Yup.string(),
    employee: Yup.string(),
    mapEmployeeTo: Yup.string(),
    designation: Yup.string(),
    practice: Yup.string(),
    primaryChar: Yup.string(),
  }); 

  // const defaultValues = useMemo(
  //   () => ({
  //     name: currentUser?.name || '',
  //     city: currentUser?.city || '',
  //     role: currentUser?.role || '',
  //     email: currentUser?.email || '',
  //     state: currentUser?.state || '',
  //     status: currentUser?.status || '',
  //     address: currentUser?.address || '',
  //     country: currentUser?.country || '',
  //     zipCode: currentUser?.zipCode || '',
  //     company: currentUser?.company || '',
  //     avatarUrl: currentUser?.avatarUrl || null,
  //     phoneNumber: currentUser?.phoneNumber || '',
  //     isVerified: currentUser?.isVerified || true,
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
      scriptConvUnit: currentUser?.scriptConvUnit || '',
      collAdjBy: currentUser?.collAdjBy || '',
      dateFormat: currentUser?.dateFormat || '',
      timeZone: currentUser?.timeZone || '',
      isVerified: currentUser?.isVerified || true,
      //Jail
      dataPathSource: currentUser?.dataPathSource || '',
      simpleJail: currentUser?.simpleJail || '',
      jailDataDir: currentUser?.jailDataDir || '',
      combineMulClinicJail: currentUser?.combineMulClinicJail || '',
      locationId: currentUser?.locationId || '',
      sepaMulClinicJail: currentUser?.sepaMulClinicJail || '',
      //Payment method
      creditCard: currentUser?.creditCard || '',
      writeOff: currentUser?.writeOff || '',
      visa: currentUser?.visa || '',
      finance: currentUser?.finance || '',
      masterCard: currentUser?.masterCard || '',
      directDeposit: currentUser?.directDeposit || '',
      debit: currentUser?.debit || '',
      giftCertificate: currentUser?.giftCertificate || '',
      cash: currentUser?.cash || '',
      webCoupon: currentUser?.webCoupon || '',
      personalCheque: currentUser?.personalCheque || '',
      insuranceEfts: currentUser?.insuranceEfts || '',
      insuranceCheque: currentUser?.insuranceCheque || '',
      insuranceOthers: currentUser?.insuranceOthers || '',
      cashBalance: currentUser?.cashBalance || '',
      batchCollection: currentUser?.batchCollection || '',
      eTransfer: currentUser?.eTransfer || '',
      others: currentUser?.others || '',
      americanExp: currentUser?.americanExp || '',
      refund: currentUser?.refund || '',
      assignment: currentUser?.assignment || '',
      paymentPlan: currentUser?.paymentPlan || '',
      //Script
      table: currentUser?.table || '',
      scriptType: currentUser?.scriptType || '',
      edmsPrefix: currentUser?.edmsPrefix || '',
      //Workflow
      stage: currentUser?.stage || '',
      toDo: currentUser?.toDo || '',
      by: currentUser?.by || '',
      asanaLink: currentUser?.asanaLink || '',
      //Appt status values
      defId: currentUser?.defId || '',
      edmsStatus: currentUser?.edmsStatus || '',
      pmsStatus: currentUser?.pmsStatus || '',
      //Employee mapping
      providerCode: currentUser?.providerCode || '',
      employee: currentUser?.employee || '',
      mapEmployeeTo: currentUser?.mapEmployeeTo || '',
      designation: currentUser?.designation || '',
      practice: currentUser?.practice || '',
      primaryChar: currentUser?.primaryChar || '',
    }),
    [currentUser]
  );
  
  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });
  

  const {
    reset,
    watch,
    control,
    // setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  
  
  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.user.list);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  //For workflow tab (starts)
  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  };
  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    width: 100%;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  `,
  );
  //For workflow tab (ends)

  //For appt status value (starts)
  function createData(defId, pmsStatus, edmsStatus,) {
    return { defId, pmsStatus, edmsStatus, };
  }
  
  const rows = [
    createData(1, 159, 6.0),
    // createData(2, 237, 9.0),
    // createData(3, 262, 16.0),
    // createData(4, 305, 3.7),
    // createData(5, 356, 16.0),
  ];
  //For appt status value (ends)

   //For Employee mapping (starts)
   function createEmData(providerCode, employee, mapEmployeeTo, designation, practice, primaryChair) {
    return { providerCode, employee, mapEmployeeTo, designation, practice, primaryChair };
  }
  
  const emRows = [
    createEmData(1, 159, 6.0, 7.0, 9.0, 8.0)
    // createData(2, 237, 9.0),
    // createData(3, 262, 16.0),
    // createData(4, 305, 3.7),
    // createData(5, 356, 16.0),
  ];
  //For employee maping (ends)



  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Details" {...a11yProps(0)} />
          <Tab label="Jail" {...a11yProps(1)} />
          <Tab label="Payment Method" {...a11yProps(2)} />
          <Tab label="Adjustments" {...a11yProps(2)} />
          <Tab label="Employee Mapping" {...a11yProps(2)} />
          <Tab label="Appt. Status Values" {...a11yProps(2)} />
          <Tab label="Work Flow" {...a11yProps(2)} />
          {/* <Tab label="Swell CX" {...a11yProps(2)} /> */}
          <Tab label="Script" {...a11yProps(2)} />
          {/* <Tab label="Process" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} md={2}>
            <Card sx={{ p: 1 }}>
              
              <Box
                // rowGap={3}
                // columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(1, 1fr)',
                }}
              >
                <Stack alignItems="center" >
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!currentUser ? 'Create User' : 'Go live'}
                  </LoadingButton>
                </Stack>
             </Box>
            </Card>  
          </Grid>
        </Grid>
      <Grid container spacing={3}>
        {/* <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentUser && (
              <Label
                color={
                  (values.status === 'active' && 'success') ||
                  (values.status === 'banned' && 'error') ||
                  'warning'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {currentUser && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'active'}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'banned' : 'active')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will automatically send the user a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />

            {currentUser && (
              <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button variant="soft" color="error">
                  Delete User
                </Button>
              </Stack>
            )}
          </Card>
        </Grid> */}

        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
             
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              
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

              <RHFTextField name="cutOffDate" label="Cut Off Date" />
              <RHFTextField name="statingTransId" label="Stating Trans Id" />
              <RHFTextField name="responsiblePerson" label="Responsible Person" />
              <RHFTextField name="dateFormat" label="Date Format" />
              <RHFTextField name="scriptConvUnit" label="Script Coversion Unit" />
              <RHFTextField name="timeZone" label="Time Zone" />

              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Is Active" />
                {/* <FormControlLabel required control={<Checkbox />} label="Required" /> */}
             </FormGroup>
            </Box>


            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'Create User' : 'Go live'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      </FormProvider>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >

              <RHFTextField name="dataPathSource" label="Data Path Source" />

              <FormGroup>
                <FormControlLabel  control={<Checkbox />} label="Simple Jail" />
              </FormGroup>

              <RHFTextField name="jailDataDir" label="Jail Data Directory" />

              <FormGroup>
                <FormControlLabel  control={<Checkbox />} label="Combined Multi Clinic Jail" />
              </FormGroup>

              <RHFTextField name="locationId" label="Location Id" />

              <FormGroup>
                <FormControlLabel  control={<Checkbox />} label="Separate Multi Clinic Jail" />
              </FormGroup>

            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      </FormProvider>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
       <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              

              <RHFTextField name="creditCard" label="Credit Card" />
              <RHFTextField name="writeOff" label="Write Off" />
              <RHFTextField name="visa" label="Visa" />
              <RHFTextField name="finance" label="Finance" />
              <RHFTextField name="masterCard" label="Master Card" />
              <RHFTextField name="directDeposit" label="Direct Deposit" />
              <RHFTextField name="debit" label="Debit" />
              <RHFTextField name="giftCerticate" label="Gift Certificate" />
              <RHFTextField name="cash" label="Cash" />
              <RHFTextField name="webCoupon" label="Web Coupon" />
              <RHFTextField name="personalCheque" label="Personal Cheque" />
              <RHFTextField name="insuranceEft" label="Insurance EFTs" />
              <RHFTextField name="insuranceCheque" label="insurance Cheque" />
              <RHFTextField name="insuranceOthers" label="Insurance Others" />
              <RHFTextField name="cashBalance" label="Cash Balance" />
              <RHFTextField name="batchCollection" label="Batch Collection" />
              <RHFTextField name="eTransfer" label="E-Transfer" />
              <RHFTextField name="others" label="Others" />
              <RHFTextField name="americanExp" label="American Exp" />

              {/* <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Is Active" />
                <FormControlLabel required control={<Checkbox />} label="Required" />
             </FormGroup> */}
            </Box>


            {/* <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack> */}
          </Card>
        </Grid>
        <Grid xs={12} md={4}>
          {/* <Card sx={{ pt: 10, pb: 5, px: 3 }}> */}
            {/* {currentUser && (
              <Label
                color={
                  (values.status === 'active' && 'success') ||
                  (values.status === 'banned' && 'error') ||
                  'warning'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )} */}
           <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
              }}
            >
            <RHFTextField name="refund" label="Refund" />

            <RHFTextField name="assignment" label="Assignment" />
            <RHFTextField name="paymentPlan" label="Payment Plan" />
            </Box>
          </Card>
        </Grid>
      </Grid>
      </FormProvider>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Grid container spacing={3}>
            <Grid xs={12} md={12}>
              <Card sx={{ p: 3 }}>
                
                <Box
                  // rowGap={3}
                  // columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(1, 1fr)',
                  }}
                >

                  
                 

                
                   
              </Box>
              </Card>  
            </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
      {/* <Grid container spacing={3} >
          <Grid 
          xs={12} 
          md={4}
          display="flex"
          flexDirection="row"
          >
            <Card sx={{ p: 1, marginRight:2 }}>
              
              <Box
                // rowGap={3}
                // columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(1, 1fr)',
                }}
              >
                <Stack alignItems="center"  >
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!currentUser ? 'Create User' : 'purge record'}
                  </LoadingButton>
                </Stack>
             </Box>
            </Card>  
            <Card sx={{ p: 1 }}>
              
              <Box
                // rowGap={3}
                // columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(1, 1fr)',
                }}
              >
                <Stack alignItems="center" >
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!currentUser ? 'Create User' : 'Add new'}
                  </LoadingButton>
                </Stack>
             </Box>
            </Card>  
          </Grid>
        </Grid>  */}
        <Grid container spacing={3}>
          <Grid xs={12} md={12}>
            <Card sx={{ p: 1 }}>
              
              <Box
                // rowGap={3}
                // columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(1, 1fr)',
                }}
              >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Provider Code</TableCell>
                      <TableCell align="center">Employee</TableCell>
                      <TableCell align="center">Map Employee To</TableCell>
                      <TableCell align="center">Designation</TableCell>
                      <TableCell align="center">Practice</TableCell>
                      <TableCell align="center">Primary Chair</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {emRows.map((emRows) => (
                      <TableRow
                        key={emRows.providerCode}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" >
                          {emRows.providerCode}
                        </TableCell>
                        <TableCell align="center">{emRows.employee}</TableCell>
                        <TableCell align="center">{emRows.mapEmployeeTo}</TableCell>
                        <TableCell align="center">{emRows.designation}</TableCell>
                        <TableCell align="center">{emRows.practice}</TableCell>
                        <TableCell align="center">{emRows.primaryChair}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
             </Box>
            </Card>  
          </Grid>

        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <Grid container spacing={3} >
          <Grid 
          xs={12} 
          md={4}
          display="flex"
          flexDirection="row"
          >
            <Card sx={{ p: 1, marginRight:2 }}>
              
              <Box
                // rowGap={3}
                // columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(1, 1fr)',
                }}
              >
                <Stack alignItems="center"  >
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!currentUser ? 'Create User' : 'purge record'}
                  </LoadingButton>
                </Stack>
             </Box>
            </Card>  
            <Card sx={{ p: 1 }}>
              
              <Box
                // rowGap={3}
                // columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(1, 1fr)',
                }}
              >
                <Stack alignItems="center" >
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!currentUser ? 'Create User' : 'Add new'}
                  </LoadingButton>
                </Stack>
             </Box>
            </Card>  
          </Grid>
        </Grid> 
        <Grid container spacing={3}>
          <Grid xs={12} md={12}>
            <Card sx={{ p: 1 }}>
              
              <Box
                // rowGap={3}
                // columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(1, 1fr)',
                }}
              >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Defid</TableCell>
                      <TableCell align="center">PMS Status</TableCell>
                      <TableCell align="center">EDMS Status</TableCell>
                      {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                      <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.defId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" >
                          {row.defId}
                        </TableCell>
                        <TableCell align="center">{row.pmsStatus}</TableCell>
                        <TableCell align="center">{row.edmsStatus}</TableCell>
                        {/* <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
             </Box>
            </Card>  
          </Grid>

        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
          <Grid container spacing={3}>
              
              <Grid xs={12} md={6}>
                <Card sx={{ p: 3 }}>
                  <Box
                    rowGap={3}
                    columnGap={2}
                    display="grid"
                    gridTemplateColumns={{
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(1, 1fr)',
                    }}
                  >
                    
                    <RHFAutocomplete
                      name="stage"
                      label="Stage"
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
                      name="toDo"
                      label="To Do"
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
                      name="by"
                      label="By"
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
                    
                    <Textarea aria-label="minimum height" minRows={5} placeholder="Asana Link" />
  
                  </Box>


                  
                </Card>
              </Grid>

              <Grid xs={12} md={6}>
                <Card sx={{ p: 3 }}>
                  <Box
                    rowGap={3}
                    columnGap={2}
                    display="grid"
                    gridTemplateColumns={{
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(1, 1fr)',
                    }}
                  >

                    <Textarea aria-label="minimum height" minRows={16} placeholder="Notes" />
  
                  </Box>
                  
                </Card>
              </Grid>
          </Grid>
            <Grid container spacing={3}>
              <Grid xs={12} md={2}>
                <Card sx={{ p: 1 }}>
                  
                  <Box
                    // rowGap={3}
                    // columnGap={2}
                    display="grid"
                    gridTemplateColumns={{
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(1, 1fr)',
                    }}
                  >
                    <Stack alignItems="center" >
                      <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        {!currentUser ? 'Create User' : 'Post >>>'}
                      </LoadingButton>
                    </Stack>
                </Box>
                </Card>  
              </Grid>
            </Grid>
        </FormProvider>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={7}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <List>
            <ListItem >
              <ListItemText primary="MSSSQL Script" />
            </ListItem>
                {/* <Divider /> */}
          </List>
          <Grid container spacing={3}>
              
              <Grid xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Box
                    rowGap={3}
                    columnGap={2}
                    display="grid"
                    gridTemplateColumns={{
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(2, 1fr)',
                    }}
                  >
                    
                    <RHFAutocomplete
                      name="table"
                      label="Table"
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
                      name="scriptType"
                      label="Script Type"
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


                  <Stack alignItems="flex-end" sx={{ mt: 2 }}>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                      {/* {!currentUser ? 'Create User' : 'Save Changes'} */}
                      {!currentUser ? 'Create User' : 'Generate'}
                    </LoadingButton>
                  </Stack>
                </Card>
              </Grid>
          </Grid>

          <List>
            <ListItem >
              <ListItemText primary="MySQL Script" sx={{ mt: 5 }}/>
            </ListItem>
                {/* <Divider /> */}
          </List>
          <Grid container spacing={3}>
              
              <Grid xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Box
                    rowGap={3}
                    columnGap={2}
                    display="grid"
                    gridTemplateColumns={{
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(2, 1fr)',
                    }}
                  >
                    
                    <RHFAutocomplete
                      name="edmsPrefix"
                      label="EDMS Prefix"
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
              
                  
                  <Stack 
                  justifyContent="flex-end"
                  alignItems="flex-end" 
                  display="flex" 
                  flexDirection="row" 
                  // sx={{ mt: 0 }{ mt: 0 } }
                  >
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting} sx={{ ml: 3, marginRight: 2  }}>
                      {!currentUser ? 'Create User' : 'Pull corp\'s adjustments'}
                    </LoadingButton>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting} >
                      {!currentUser ? 'Create User' : 'Add clinic script'}
                    </LoadingButton>
                  </Stack>
                  
                  {/* <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                      {!currentUser ? 'Create User' : 'Save Changes'}
                    </LoadingButton>
                  </Stack> */}
                </Card>
              </Grid>
          </Grid>
        </FormProvider>
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={8}>
        Item Nine
      </CustomTabPanel> */}
      {/* <CustomTabPanel value={value} index={9}>
        Item Ten
      </CustomTabPanel> */}
    </Box>
  );
}


BasicTabs.propTypes = {
    currentUser: PropTypes.object,
  };