//Added By Blessing
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import FormGroup from '@mui/material/FormGroup';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// _mock
//
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs, { Dayjs } from 'dayjs';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// utils
import { fData } from 'src/utils/format-number';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// assets
import { edms_countries } from 'src/assets/data';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
  RHFSelect
} from 'src/components/hook-form';


// ----------------------------------------------------------------------

import { $post, $get, endpoints} from 'src/utils/axios';
import { CLINIC_DATEFORMAT_OPTIONS, CLINIC_DATE_OPTIONS, CLINIC_UNITAPPOINTMENTS_OPTIONS, CLINIC_TIMEZONE_OPTIONS, CLINIC_PERSONS_OPTIONS } from 'src/_mock';

// ----------------------------------------------------------------------


//Added by Blessing
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

export default function UserNewEditForm({ clinic, open, onClose }) {
  
  const [pmsNames, setPmsNames] = useState([]);
  const [corpNames, setCorpNames] = useState([]);

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  //Added By Blessing
  const NewUserSchema = Yup.object().shape({
    //details
    id: Yup.string(),
    clinic_address: Yup.string().required('Clinic Address is required'),
    corp_id: Yup.string().required('Corp practice is required'),
    idclinics: Yup.string().required('Clinic Id is required'),
    clinic_city: Yup.string().required('Clinic city is required'),
    clinic_code: Yup.string().required('Clinic code is required'),
    clinic_province: Yup.string().required('Clinic Province is required'),
    data_Path: Yup.string().required('Data path is required'),
    clinic_postal: Yup.string().required('Clinic postal is required'),
    clinic_name: Yup.string().required('Clinic name is required'),
    country: Yup.string().required('Country is required'),
    current_app: Yup.string().required('Current Application is required'),
    clinic_phone: Yup.string().required('Clinc Phone is required'),
    dest_db: Yup.string().required('Dest. db code is required'),
    clinic_email: Yup.string().required('Clinic Email is required').email('Clinic Email must be a valid email address'),
    clinic_appointmentunit: Yup.string().required('Clinic Appointemnt Unit is required'),
    acquistionDate: Yup.string().required('Acquisition date is required'),
    prodDate: Yup.string().required('Production By is required'),
    cutoff_date: Yup.string().required('Cut off date is required'),
    chargeAdj: Yup.string().required('Chrg adj by is required'),
    firstTransId: Yup.string().required('Stating trans id is required'),
    colDate: Yup.string().required('Collection by is required'),
    responsiblePerson: Yup.string().required('Responsible person is required'),
    collectionAdj: Yup.string().required('Collection adj by is required'),
    scriptConvUnit: Yup.string().required('Script conversion unit is required'),
    dateFormat: Yup.string().required('Date format is required'),
    timezone: Yup.string().required('Time zone is required'),
    avatarUrl: Yup.mixed().nullable().required('Avatar is required'),
    // not required
    status: Yup.string(),
    isVerified: Yup.boolean(),
    //jail
    data_path_source: Yup.string().required('Data path source is required'),
    simpleJail: Yup.string().required('Simple jail  is required'),
    jailDataDir: Yup.string().required('Jail Data Directory is required'),
    multiClinicJail: Yup.string().required('Combined multi clinic jail is required'),
    locationId: Yup.string().required('Location id  is required'),
    separateMultiClinicJail: Yup.string().required('Separate multi clinic jail is required'),
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
    todo: Yup.string(),
    actioBy: Yup.string(),
    asana_url: Yup.string(),
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

  const defaultValues = useMemo(
    () => ({
      //details
      corp_id: clinic?.corp_id|| '',
      clinic_address: clinic?.clinic_address || '',
      idclinics: clinic?.idclinics || '',
      clinic_city: clinic?.clinic_city || '',
      clinic_code: clinic?.clinic_code || '',
      clinic_province: clinic?.clinic_province || '',
      data_Path: clinic?.data_Path || '',
      clinic_postal: clinic?.clinic_postal || '',
      clinic_name: clinic?.clinic_name|| '',
      country: clinic?.country || '',
      avatarUrl: clinic?.avatarUrl || null,
      current_app: clinic?.current_app || '',
      clinic_phone: clinic?.clinic_phone || '',
      dest_db: clinic?.dest_db || '',
      clinic_email: clinic?.clinic_email || '',
      clinic_appointmentunit: clinic?.clinic_appointmentunit || '',
      acquistionDate: clinic?.acquistionDate || '',
      prodDate: clinic?.prodDate || '',
      cutoff_date: clinic?.cutoff_date || '',
      chargeAdj: clinic?.chargeAdj || '',
      firstTransId: clinic?.firstTransId || '',
      colDate: clinic?. colDate || '',
      responsiblePerson: clinic?.responsiblePerson || '',
      collectionAdj: clinic?.collectionAdj || '',
      scriptConvUnit: clinic?.scriptConvUnit || '',
      collectionAdj: clinic?.collectionAdj || '',
      dateFormat: clinic?.dateFormat || '',
      timezone: clinic?.timezone || '',
      isVerified: clinic?.isVerified || true,
      //Jail
      data_path_source: clinic?.data_path_source || '',
      simpleJail: clinic?.simpleJail || '',
      jailDataDir: clinic?.jailDataDir || '',
      multiClinicJail: clinic?.multiClinicJail || '',
      locationId: clinic?.locationId || '',
      separateMultiClinicJail: clinic?.separateMultiClinicJail || '',
      //Payment method
      creditCard: clinic?.creditCard || '',
      writeOff: clinic?.writeOff || '',
      visa: clinic?.visa || '',
      finance: clinic?.finance || '',
      masterCard: clinic?.masterCard || '',
      directDeposit: clinic?.directDeposit || '',
      debit: clinic?.debit || '',
      giftCertificate: clinic?.giftCertificate || '',
      cash: clinic?.cash || '',
      webCoupon: clinic?.webCoupon || '',
      personalCheque: clinic?.personalCheque || '',
      insuranceEfts: clinic?.insuranceEfts || '',
      insuranceCheque: clinic?.insuranceCheque || '',
      insuranceOthers: clinic?.insuranceOthers || '',
      cashBalance: clinic?.cashBalance || '',
      batchCollection: clinic?.batchCollection || '',
      eTransfer: clinic?.eTransfer || '',
      others: clinic?.others || '',
      americanExp: clinic?.americanExp || '',
      refund: clinic?.refund || '',
      assignment: clinic?.assignment || '',
      paymentPlan: clinic?.paymentPlan || '',
      //Script
      table: clinic?.table || '',
      scriptType: clinic?.scriptType || '',
      edmsPrefix: clinic?.edmsPrefix || '',
      //Workflow
      stage: clinic?.stage || '',
      todo: clinic?.todo || '',
      actioBy: clinic?.actioBy || '',
      asana_url: clinic?.asana_url || '',
      //Appt status values
      defId: clinic?.defId || '',
      edmsStatus: clinic?.edmsStatus || '',
      pmsStatus: clinic?.pmsStatus || '',
      //Employee mapping
      providerCode: clinic?.providerCode || '',
      employee: clinic?.employee || '',
      mapEmployeeTo: clinic?.mapEmployeeTo || '',
      designation: clinic?.designation || '',
      practice: clinic?.practice || '',
      primaryChar: clinic?.primaryChar || '',
    }),
    [clinic],
    
  );
  useEffect(() =>{
    // console.log("CLINIC_ADDRESS:", clinic?.clinic_address)
  }, [clinic]);

  
  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    // watch,
    // control,
    // setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const values = watch();
  useEffect(() => {
    if (clinic) {
      reset(defaultValues);
    }
  }, [clinic, defaultValues, reset]);
  
  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(clinic ? 'Update success!' : 'Create success!');
      // router.push(paths.dashboard.user.list);
      router.push(paths.clinicmanager.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

   //Added by blessing
   const [value, setValue] = useState(0);

   const handleChange = (event, newValue) => {
     setValue(newValue);
   };
   //

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

  const getPMS_Corps = ()=>{
    $get(endpoints.pms.names)
    .then(res =>{
      res.sort()
      res.splice(0, 0, "All")
      setPmsNames(res)
    })

    $get(endpoints.corps.names)
    .then(res =>{
      res.sort()
      res.splice(0, 0, "All")
      setCorpNames(res)
    })
  }

  useEffect(()=>{
    getPMS_Corps()
  }, [])
  
  //Added by Blessing
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
  ];
  //For appt status value (ends)

   //For Employee mapping (starts)
   function createEmData(providerCode, employee, mapEmployeeTo, designation, practice, primaryChair) {
    return { providerCode, employee, mapEmployeeTo, designation, practice, primaryChair };
  }
  
  const emRows = [
    createEmData(1, 159, 6.0, 7.0, 9.0, 8.0)
  ];
  //For employee maping (ends)

// For adjustment 
const [tableData, setTableData] = useState([
  {
    defid: 1,
    adjustmentDescription: 'Adjustment 1',
    impact: 'Some Impact',
    chargeAdj: false,
    paymentAdj: false,
    providerAdj: false,
    hygienistAdj: false,
    entryMap: 0,
  },
  // Add more data as needed
 ]);

 const handleCheckboxChange = (index, field) => {
  const updatedTableData = [...tableData];
  updatedTableData[index][field] = !updatedTableData[index][field];
  setTableData(updatedTableData);
 }; 

  //
  //For date

  const [date, setDate] = useState(null);
  
  const onDateChange = (event) => {
     setDate(event.target.value);
  };

  return (
    // TABS
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

      {/* TABS ENDS */}
      <CustomTabPanel value={value} index={0}>

      {/* CLINIC DETAILS */}
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} 
          md={4}
          display="flex"
          flexDirection="row">
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
                    {!clinic ? 'Create User' : 'Go live'}
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
                    {!clinic ? 'Create User' : 'Save Changes'}
                  </LoadingButton>
                </Stack>
             </Box>
            </Card>
          </Grid>
        </Grid>
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
              <RHFTextField name="clinic_name" label="Name" />
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

              <RHFTextField name="clinic_address" label="Address" />
              <RHFTextField name="clinic_city" label="City" />

              <RHFAutocomplete
                name="country"
                label="Country"
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
              
              <RHFTextField name="clinic_code" label="Clinic Code" />
              <RHFTextField name="clinic_province" label="Province" />
              <RHFTextField name="data_Path" label="Data Path" />
              <RHFTextField name="clinic_postal" label="Postal" />
              
              <RHFTextField name="clinic_phone" label="Phone" />
              <RHFTextField name="dest_db" label="Dest. DB" />
              <RHFTextField name="email" label="Email" />
              
              <RHFSelect name="responsiblePerson" label="Responsible Person">
              {CLINIC_PERSONS_OPTIONS.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.value}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFSelect name="clinic_appointmentunit" label="Clinic Appointment Unit">
              {CLINIC_UNITAPPOINTMENTS_OPTIONS.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.value}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFTextField name="firstTransId" label="Stating Trans Id" />

              <DatePicker
                name="acquistionDate"
                label="Acquisition Date"
                value={date}
                onChange={onDateChange}
              />

              

              <DatePicker
                name="cutoff_date"
                label="Cut Off Date"
                value={date}
                onChange={onDateChange}
              />


              {/* <DatePicker defaultValue={'2022-04-17'} /> */}

              <RHFSelect name="prodDate" label="Production By">
              {CLINIC_DATE_OPTIONS.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.value}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFSelect name="chargeAdj" label="Chrg Adj By">
                {CLINIC_DATE_OPTIONS.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.value}
                  </MenuItem>
                ))}
              </RHFSelect>


              <RHFSelect name="colDate" label="Collection By">
              {CLINIC_DATE_OPTIONS.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.value}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFSelect name="collectionAdj" label="Coll Adj By">
              {CLINIC_DATE_OPTIONS.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.value}
                  </MenuItem>
                ))}
              </RHFSelect>


              <RHFSelect name="dateFormat" label="Date Format" >
              {CLINIC_DATEFORMAT_OPTIONS.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.value}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFTextField name="scriptConvUnit" label="Script Coversion Unit" />

              <RHFSelect name="timezone" label="Time Zone">
              {CLINIC_TIMEZONE_OPTIONS.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.value}
                  </MenuItem>
                ))}
              </RHFSelect>

              <Box sx={{ display: { xs: 'none', sm: 'block' } }} />

              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Is Active" />
                {/* <FormControlLabel required control={<Checkbox />} label="Required" /> */}
             </FormGroup>
            </Box>


            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!clinic ? 'Create User' : 'Go live'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      </FormProvider>
      {/* </LocalizationProvider>           */}







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

              <RHFTextField name="data_path_source" label="Data Path Source" />

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
                {!clinic ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      </FormProvider>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
       <FormProvider methods={methods} onSubmit={onSubmit}>
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
                    {!clinic ? 'Create User' : 'Save Changes'}
                  </LoadingButton>
                </Stack>
             </Box>
            </Card>  
          </Grid>
        </Grid>  
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
                  {/* <RHFTextField name="insuranceEft" label="Insurance EFTs" /> */}
                  {/* <RHFTextField name="insuranceCheque" label="insurance Cheque" /> */}
                  {/* <RHFTextField name="insuranceOthers" label="Insurance Others" /> */}
                  <RHFTextField name="cashBalance" label="Cash Balance" />
                  {/* <RHFTextField name="batchCollection" label="Batch Collection" /> */}
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
                    {!clinic ? 'Create User' : 'Save Changes'}
                  </LoadingButton>
                </Stack> */}
              </Card>
            </Grid>
            <Grid xs={12} md={4}>
              {/* <Card sx={{ pt: 10, pb: 5, px: 3 }}> */}
                {/* {clinic && (
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
                <RHFTextField name="insuranceCheque" label="Insurance Cheque" />

                <RHFTextField name="insuranceEft" label="Insurance Efts" />
                <RHFTextField name="insuranceOthers" label="Insurance Others" />
                <RHFTextField name="batchCollection" label="Batch Collection" />
                </Box>
              </Card>
            </Grid>
         </Grid>
      </FormProvider>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
      <Grid container spacing={3} >
          <Grid 
          xs={12} 
          md={8}
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
                    {!clinic ? 'Create User' : 'purge record'}
                  </LoadingButton>
                </Stack>
             </Box>
            </Card>  
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
                <Stack alignItems="center" >
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!clinic ? 'Create User' : 'Add new'}
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
                    {!clinic ? 'Create User' : 'Save Changes'}
                  </LoadingButton>
                </Stack>
              </Box>
            </Card>  
          </Grid>
        </Grid>

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
                <table>
                      <thead>
                        <tr>
                          <th>Id</th>
                          <th>Description</th>
                          <th>Impact</th>
                          <th>Charge </th>
                          <th>Payment </th>
                          <th>Provider </th>
                          <th>Hygienist </th>
                          {/* <th>Entry Map</th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((rowData, index) => (
                          <tr key={index}>
                            <td align="center">{rowData.defid}</td>
                            <td align="center">{rowData.adjustmentDescription}</td>
                            <td align="center">
                              {/* {rowData.impact} */}
                              <div>
                                {/* <FormControl sx={{ m: 1, minWidth: 80 }}> */}
                                  {/* <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel> */}
                                  <Select sx={{ m: 1, minWidth: 120 }}
                                    // labelId="demo-simple-select-autowidth-label"
                                    // id="demo-simple-select-autowidth"
                                    // value={age}
                                    // onChange={handleChange}
                                    // autoWidth
                                    // label="Age"
                                  >
                                    {/* <MenuItem value="">
                                      <em>None</em>
                                    </MenuItem> */}
                                    <MenuItem value={10}>Positive</MenuItem>
                                    <MenuItem value={21}>Negative</MenuItem>
                                  </Select>
                                {/* </FormControl> */}
                              </div>
                            </td>
                            <td align="center">
                              <input
                                type="checkbox"
                                checked={rowData.chargeAdj}
                                onChange={() => handleCheckboxChange(index, 'chargeAdj')}
                              />
                            </td>
                            <td align="center">
                              <input
                                type="checkbox"
                                checked={rowData.paymentAdj}
                                onChange={() => handleCheckboxChange(index, 'paymentAdj')}
                              />
                            </td>
                            <td align="center">
                              <input
                                type="checkbox"
                                checked={rowData.providerAdj}
                                onChange={() => handleCheckboxChange(index, 'providerAdj')}
                              />
                            </td>
                            <td align="center">
                              <input
                                type="checkbox"
                                checked={rowData.hygienistAdj}
                                onChange={() => handleCheckboxChange(index, 'hygienistAdj')}
                              />
                            </td>
                            {/* <td>{rowData.entryMap}</td> */}
                          </tr>
                        ))}
                      </tbody>
                   </table>
              </Box>
              </Card>  
            </Grid>
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
      { <Grid container spacing={3} >
          <Grid 
          xs={12} 
          md={8}
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
                    {!clinic ? 'Create User' : 'purge record'}
                  </LoadingButton>
                </Stack>
             </Box>
            </Card>  
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
                <Stack alignItems="center" >
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!clinic ? 'Create User' : 'Add new'}
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
                    {!clinic ? 'Create User' : 'Save Changes'}
                  </LoadingButton>
                </Stack>
              </Box>
            </Card>  
          </Grid>
        </Grid>  }
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
          md={8}
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
                    {!clinic ? 'Create User' : 'purge record'}
                  </LoadingButton>
                </Stack>
             </Box>
            </Card>  
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
                <Stack alignItems="center" >
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!clinic ? 'Create User' : 'Add new'}
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
                    {!clinic ? 'Create User' : 'Save Changes'}
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
                    {!clinic ? 'Create User' : 'Post >>>'}
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
                    {!clinic ? 'Create User' : 'Save Changes'}
                  </LoadingButton>
                </Stack>
             </Box>
            </Card>  
          </Grid>
         </Grid> 
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
                    
                    <RHFTextField
                      name="stage"
                      label="Stage"
                    />
                 
                    <RHFTextField
                      name="todo"
                      label="To Do"
                    />
                    
                    <RHFTextField
                      name="actioBy"
                      label=" Action By"
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
        </FormProvider>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={7}>
        <Grid container spacing={3} >
          <Grid 
          xs={12} 
          md={8}
          display="flex"
          flexDirection="row"
          >

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
                    {!clinic ? 'Create User' : 'Save Changes'}
                  </LoadingButton>
                </Stack>
              </Box>
            </Card>  

          </Grid>
        </Grid> 
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
                      {/* {!clinic ? 'Create User' : 'Save Changes'} */}
                      {!clinic ? 'Create User' : 'Generate'}
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
                      {!clinic ? 'Create User' : 'Pull corp\'s adjustments'}
                    </LoadingButton>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting} >
                      {!clinic ? 'Create User' : 'Add clinic script'}
                    </LoadingButton>
                  </Stack>
                  
                  {/* <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                      {!clinic ? 'Create User' : 'Save Changes'}
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

UserNewEditForm.propTypes = {
  clinic: PropTypes.object,
};
