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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
// _mock
import { USER_STATUS_OPTIONS } from 'src/_mock';
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
// utils
import { fData } from 'src/utils/format-number';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// assets
import { countries } from 'src/assets/data';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
} from 'src/components/hook-form';
import Radio, { RadioProps } from '@mui/material/Radio';
import InputLabel from '@mui/material/InputLabel';



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

export default function OrderNewEditForm({ currentUser, open, onClose }) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  // const createHandleMenuClick = (menuItem= string) => {
  //   return () => {
  //     console.log(`Clicked on ${menuItem}`);
  //   };
  // }  
  //Added By Blessing
  const NewUserSchema = Yup.object().shape({
    //details
    pmsid: Yup.string(),
    pms: Yup.string(),
    script_Folder: Yup.string(),
    testClinic: Yup.string(),
    pms_company_name: Yup.string(),
    staff: Yup.string(),
    pms_status: Yup.string(),
    pms_testing_jail: Yup.string(),
    pms_contact: Yup.string(),
    pms_tables: Yup.string(),
    pms_reports: Yup.string(),
    pms_database: Yup.string(),
    pms_export: Yup.string(),
    pms_os: Yup.string(),
    dL_Version: Yup.string(),
  }); 

  const defaultValues = useMemo(
    () => ({
      //details
      // corpPractice: currentUser?.corpPractice|| '',
      pmsid: currentUser?.pmsid || '',
      pms: currentUser?.pms || '',
      script_Folder: currentUser?.script_Folder || '',
      testClinic: currentUser?.testClinic || '',
      pms_company_name: currentUser?.pms_company_name || '',
      staff: currentUser?.staff || '',
      pms_status: currentUser?.pms_status || '',
      pms_testing_jail: currentUser?.pms_testing_jail|| '',
      pms_contact: currentUser?.pms_contact || '',
      pms_tables: currentUser?.pms_tables || null,
      pms_reports: currentUser?.pms_reports || '',
      pms_database: currentUser?.pms_database || '',
      pms_export: currentUser?.pms_export || '',
      pms_os: currentUser?.pms_os || '',
      dL_Version: currentUser?.dL_Version || '',
    }),
    [currentUser],
    
  );
  useEffect(() =>{
    console.log("CLINIC_ADDRESS:", currentUser?.clinic_address)
  }, [currentUser]);

  
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
    if (currentUser) {
      reset(defaultValues);
    }
  }, [currentUser, defaultValues, reset]);
  
  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentUser ? 'Update success!' : 'Create success!');
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
  ];
  //For employee maping (ends)


 const handleCheckboxChange = (index, field) => {
  const updatedTableData = [...tableData];
  updatedTableData[index][field] = !updatedTableData[index][field];
  setTableData(updatedTableData);
 }; 

  //
  //For date
  const [date, setDate] = useState("none");
  const onDateChange = (event) => {
     setDate(event.target.value);
  };
  
  const [staff, setStaff] = React.useState('');
  // const handleChange = (event) => {
  //   setStaff(event.target.value);
  // };
  
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

  function BpRadio(props) {
    return (
      <Radio
        disableRipple
        color="default"
        
        {...props}
      />
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Details" {...a11yProps(0)} />
          <Tab label="Reports" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
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
                    {!currentUser ? 'Update changes' : ''}
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
                name="pmsid"
                label="Pms Id"
              />
            

              <RHFTextField name="script_Folder" label="Script Folder" />
              <RHFTextField name="testClinic" label="Test Clinic" />
              <RHFTextField name="pms_company_name" label="Company Name" />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Staff</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={staff}
                  label="Staff"
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Alexander MORDI</MenuItem>
                  <MenuItem value={20}>Alexander MORDI</MenuItem>
                  <MenuItem value={30}>Alexander MORDI</MenuItem>
                </Select>
              </FormControl>
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
              <ListItem disablePadding>
                <ListItemText primary="Status" />
              </ListItem>

              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="production"
                      name="radio-buttons-group"
                    >
                      <FormGroup sx={{ mb: 3 }}>
                         <FormControlLabel value="noData" control={<BpRadio />} label="No Data" />
                      </FormGroup>

                      <FormGroup sx={{ mb: 3 }}>
                         <FormControlLabel value="development" control={<BpRadio />} label="Development" />
                      </FormGroup>

                      <FormGroup sx={{ mb: 3 }}>
                         <FormControlLabel value="production" control={<BpRadio />} label="Production" />
                      </FormGroup>

                      <FormGroup sx={{ mb: 3 }}>
                         <FormControlLabel value="issues" control={<BpRadio />} label="Issues" />  
                      </FormGroup>
                    </RadioGroup>
              </FormControl>

            </Box>
          </Card>
        </Grid>
      </Grid> 
      <Grid container spacing={3}>
        <List
          sx={{ mt: 4, mb:0 }}
        >
                <ListItem >
                  <ListItemText primary="PMS Meta Data" />
                </ListItem>
       </List>
       <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(4, 1fr)',
              }}
            >  
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">OS</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={pms_os}
                  label="OS"
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Windows</MenuItem>
                  <MenuItem value={20}>macOS</MenuItem>
                  <MenuItem value={30}>Linus</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Database</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={staff}
                  label="Database"
                  // onChange={handleChange}
                >
                  <MenuItem value={1}>MSSQL</MenuItem>
                  <MenuItem value={2}>MSSQL</MenuItem>
                  <MenuItem value={3}>MSSQL</MenuItem>
                  
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Export fmt</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={staff}
                  label="Export fmt"
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>XML 1</MenuItem>
                  <MenuItem value={20}>XML 2</MenuItem>
                  <MenuItem value={30}>XML 3</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">DL Version</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={staff}
                  label="DL Version"
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Base 1</MenuItem>
                  <MenuItem value={20}>Base 2</MenuItem>
                  <MenuItem value={30}>Base 3</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Card>
        </Grid>
      </Grid> 
      <Grid container spacing={3}>
        <List
          sx={{ mt: 4, mb:0 }}
        >
                <ListItem >
                  <ListItemText primary="Contact Details" />
                </ListItem>
       </List>
       <Grid xs={12} md={12}>
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
              <Textarea aria-label="minimum height" minRows={5} placeholder="Contact Details" />
            </Box>
          </Card>
        </Grid>
      </Grid> 
      <Grid container spacing={3}>
      <List
          sx={{ mt: 4, mb:0 }}
        >
                <ListItem >
                  <ListItemText primary="Wki Page" />
                </ListItem>
       </List>
       <Grid xs={12} md={12}>
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
              <Textarea aria-label="minimum height" minRows={5} placeholder="Wiki Page" />
            </Box>
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

              <RHFTextField name="data_path_source" label="Data Path Source" />

              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">EDMS Report</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="EDMS Report"
                  
                >
                  <MenuItem value={10}>Reconcilation Report</MenuItem>
                  <MenuItem value={20}>Reconcilation Report</MenuItem>
                  <MenuItem value={30}>Reconcilation Report</MenuItem>
                </Select>
              </FormControl>

              <Textarea aria-label="minimum height" minRows={5} placeholder="Description" />


            </Box>
          </Card>
        </Grid>
      </Grid>
      </FormProvider>
      </CustomTabPanel>
    </Box>
  );
}

OrderNewEditForm.propTypes = {
  currentUser: PropTypes.object,
};
