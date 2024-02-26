
// import PropTypes from 'prop-types';
// // _mock
// import { _userList } from 'src/_mock/_user';
// // sections
// // import { ClinicEditView } from 'src/sections/user/view';
// import { ClinicPmsreporttView } from 'src/sections/user/view';

// // ----------------------------------------------------------------------

// export const metadata = {
//   title: 'Clinic manager: Pms',
// };

// export default function ClinicPmsreportPage({ params }) {
//   const { id } = params;

//   return <ClinicPmsreporttView id={id} />;
// }

// export async function generateStaticParams() {
//   return _userList.map((user) => ({
//     id: user.id,
//   }));
// }

// ClinicPmsreportPage.propTypes = {
//   params: PropTypes.shape({
//     id: PropTypes.string,
//   }),
// };


"use client"
//Added by Blessing
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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

 const metadata = {
  title: 'Clinic manager: Clinic Edit',
};

export default function ClinicPmsreportForm({ currentClinic }) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const NewClinicSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    company: Yup.string().required('Company is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role is required'),
    zipCode: Yup.string().required('Zip code is required'),
    avatarUrl: Yup.mixed().nullable().required('Avatar is required'),
    // not required
    status: Yup.string(),
    isVerified: Yup.boolean(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentClinic?.name || '',
      city: currentClinic?.city || '',
      role: currentClinic?.role || '',
      email: currentClinic?.email || '',
      state: currentClinic?.state || '',
      status: currentClinic?.status || '',
      address: currentClinic?.address || '',
      country: currentClinic?.country || '',
      zipCode: currentClinic?.zipCode || '',
      company: currentClinic?.company || '',
      avatarUrl: currentClinic?.avatarUrl || null,
      phoneNumber: currentClinic?.phoneNumber || '',
      isVerified: currentClinic?.isVerified || true,
    }),
    [currentClinic]
  );

  const methods = useForm({
    resolver: yupResolver(NewClinicSchema),
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
      enqueueSnackbar(currentClinic ? 'Update success!' : 'Create success!');
      // router.push(paths.dashboard.user.list);
      router.push(paths.clinicmanager.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const metadata = {
      title: 'Clinic manager: Pms',
    };

  //For PMS REPORT (starts)
  function createEmData(date, fileName, type) {
    return { date, fileName, type };
  }
  
  const emRows = [
    createEmData()
    // createData(2, 237, 9.0),
    // createData(3, 262, 16.0),
    // createData(4, 305, 3.7),
    // createData(5, 356, 16.0),
  ];
  //For employee maping (ends)
  return (

    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentClinic && (
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
                // onDrop={handleDrop}
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

            {/* {currentClinic && (
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
            )} */}

            {/* <RHFSwitch
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
            /> */}

            {currentClinic && (
              <Stack justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                <Button variant="soft" color="error">
                  Delete Clinic
                </Button>
              </Stack>
            )}
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
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
            <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell align="center">File Name</TableCell>
                      <TableCell align="center">Type</TableCell>
                      {/* <TableCell align="center">Designation</TableCell>
                      <TableCell align="center">Practice</TableCell>
                      <TableCell align="center">Primary Chair</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {emRows.map((emRows) => (
                      <TableRow
                        key={emRows.providerCode}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row" >
                          {emRows.date}
                        </TableCell>
                        <TableCell align="center">{emRows.fileName}</TableCell>
                        <TableCell align="center">{emRows.type}</TableCell>
                        {/* <TableCell align="center">{emRows.practice}</TableCell>
                        <TableCell align="center">{emRows.primaryChair}</TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
             </Box>

          </Card>
         </Grid>
        {/* <Grid xs={12} md={8}>
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
              <RHFTextField name="name" label="Full Name" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="phoneNumber" label="Phone Number" />

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

              <RHFTextField name="state" label="State/Region" />
              <RHFTextField name="city" label="City" />
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="zipCode" label="Zip/Code" />
              <RHFTextField name="company" label="Company" />
              <RHFTextField name="role" label="Role" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentClinic ? 'Create Clinic' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid> */}
      </Grid>
    </FormProvider>
   
  );
}

ClinicPmsreportForm.propTypes = {
  currentClinic: PropTypes.object,
};
