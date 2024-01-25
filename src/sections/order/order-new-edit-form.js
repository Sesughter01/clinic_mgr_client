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
  RHFSelect
} from 'src/components/hook-form';
import Radio, { RadioProps } from '@mui/material/Radio';
import InputLabel from '@mui/material/InputLabel';


// ----------------------------------------------------------------------

import { $put, $get, endpoints} from 'src/utils/axios';
import { PMS_PERSONS_OPTIONS, PMS_OS_OPTIONS, PMS_DATABASE_OPTIONS, PMS_EXPORT_OPTIONS, PMS_VERSION_OPTIONS } from 'src/_mock';

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


function CustomCheck({onChange, name, label, value}) {
  const [checked, setChecked] = useState(value);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    onChange({name, value:event.target.checked})
    // onChange({name, value:event.target.checked ? "1" : "0"})
    // handleCheckBox(label, event.target.checked ? "1" : "0")
  };

  return (
    <FormGroup>
      <FormControlLabel  control={
          <Checkbox 
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
          />
        } label={label} />
      </FormGroup>
  );
}





export default function OrderNewEditForm({ pms, open, onClose, id }) {
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
    pms: Yup.string().required('pms is required'),
    script_Folder: Yup.string().required('Script Folder is required'),
    pms_company_name: Yup.string(),
    staff: Yup.string(),
    pms_status: Yup.string().required('Pms Status is required'),
    pms_testing_jail: Yup.string().required('Pms Testing Jail is required'),
    pms_contact: Yup.string(),
    pms_tables: Yup.string().required('Pms Table is required'),
    pms_reports: Yup.string().required('Pms Reports is required'),
    pms_database: Yup.string().required('Pms Database is required'),
    pms_export: Yup.string().required('Pms Export is required'),
    pms_os: Yup.string().required('Pms Os is required'),
    dL_Version: Yup.string().required('Dl Version is required'),
    description: Yup.string(),
  }); 

  const defaultValues = useMemo(
    () => ({
      //details
      // corpPractice: currentUser?.corpPractice|| '',
      pmsid: pms?.pmsid || '',
      pms: pms?.pms || '',
      script_Folder: pms?.script_Folder || '',
      pms_company_name: pms?.pms_company_name || '',
      staff: pms?.staff || '',
      pms_status: pms?.pms_status || '',
      pms_testing_jail: pms?.pms_testing_jail|| '',
      pms_contact: pms?.pms_contact || '',
      pms_tables: pms?.pms_tables || null,
      pms_reports: pms?.pms_reports || '',
      pms_database: pms?.pms_database || '',
      pms_export: pms?.pms_export || '',
      pms_os: pms?.pms_os || '',
      dL_Version: pms?.dL_Version || '',
      description: pms?.description || '',
    }),
    [pms],
    
  );
  // useEffect(() =>{
  //   console.log("CLINIC_ADDRESS:", currentUser?.clinic_address)
  // }, [currentUser]);
  
  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    // watch,
    // control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const values = watch();
  useEffect(() => {
    if (pms) {
      reset(defaultValues);
    }
  }, [pms, defaultValues, reset]);
  
  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await $put(`${endpoints.pms.pms}${id}`, data);
      console.info('RES', res);
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      enqueueSnackbar( 'Update success!');
      // router.push(paths.dashboard.user.list);
      // router.push(paths.clinicmanager.root);
      // console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

   //Added by blessing
   const [value, setValue1] = useState(0);

   const handleChange = (event, newValue) => {
     setValue1(newValue);
   };


  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue1('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue1]
  );
   
  
  // const getPMS_Data = ()=>{
  //   $get(endpoints.pms.names)
  //   .then(res =>{
  //     res.sort()
  //     res.splice(0, 0, "All")
  //     setPmsNames(res)
  //   })

  // }
  
  // useEffect(()=>{
  //   getPMS_Data()
  // }, [])


  const handleCheckBox = (data) => {
    setValue(data.name, data.value);
  };
  
  


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


      {/* TABS STARTS */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Details" {...a11yProps(0)} />
          <Tab label="Reports" {...a11yProps(1)} />
        </Tabs>
      </Box>
      {/* TABLE ENDS */}

      {/* PMS TAB STARTS */}
      <CustomTabPanel value={value} index={0}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} 
          md={4}
          display="flex"
          flexDirection="row">
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap:2 }}>
              <LoadingButton sx={{width:120}} type="submit" variant="contained" loading={isSubmitting}>
                    Save Changes
              </LoadingButton>
          </Box>  
          {/* <Card sx={{ p: 1, marginRight:2 }}>
              
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
            </Card>   */}
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
              <RHFTextField name="pms_testing_jail" label="Test Clinic" />
              <RHFTextField name="pms_company_name" label="Company Name" />
              <RHFTextField name="staff" label="Responsible Person" />

              {/* <RHFSelect name="responsiblePerson" label="Responsible Person">
                  {PMS_PERSONS_OPTIONS.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.value}
                      </MenuItem>
                    ))}
              </RHFSelect> */}
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
             <RHFSelect name="pms_os" label="OS">
                  {PMS_OS_OPTIONS.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.value}
                      </MenuItem>
                    ))}
              </RHFSelect>
              
              <RHFSelect name="pms_database" label="DATABASE">
                  {PMS_DATABASE_OPTIONS.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.value}
                      </MenuItem>
                    ))}
              </RHFSelect>

              <RHFSelect name="pms_export" label="Export Fmt">
                  {PMS_EXPORT_OPTIONS.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.value}
                      </MenuItem>
                    ))}
              </RHFSelect>

               <RHFSelect name="dL_Version" label="Dl Version">
                  {PMS_VERSION_OPTIONS.map((item) => (
                      <MenuItem key={item.value} value={item.value}>
                        {item.value}
                      </MenuItem>
                    ))}
              </RHFSelect>
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
              <Controller
                  name="pms_contact"
                  // control={control}
                  render={({ field }) => (
                    <Textarea
                      rows={5}
                      placeholder="Contact Details"
                      {...field}
                    />
                  )}
                />
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
