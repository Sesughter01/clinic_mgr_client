'use client';
import { useCallback, useEffect, useState , useMemo} from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// Added by Charles
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import MenuItem from '@mui/material/MenuItem';

import Divider from '@mui/material/Divider';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// assets
import { PasswordIcon } from 'src/assets/icons';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField , RHFSelect} from 'src/components/hook-form';
import Select from '@mui/material/Select';

import { INVOICE_SERVICE_OPTIONS } from 'src/_mock';

import { $post, $get, endpoints} from 'src/utils/axios';

// ----------------------------------------------------------------------



// Added By Charles Avul

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const roles = [
  'Role1',
  'Role2',
  'Role3',
  
];

function getStyles(name, role, theme) {
    return {
      fontWeight:
        role.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
export default function InvoiceQuickCreateForm({open, onClose}) {
  const AddNewUserSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    role: Yup.string().required('Role is required'),
  });

  const [role, setRole] = useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
  };


  // const defaultValues = {
  //   email: '',
  //   role: '',
  // };

  const defaultValues = useMemo(
    () => ({
      email: '',
      role: '',
     
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(AddNewUserSchema),
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
  // useEffect(() => {
  //   if (clinic) {
  //     reset(defaultValues);
  //   }
  // }, [clinic, defaultValues, reset]);
  
//   const onSubmit = handleSubmit(async (data) => {
//     try {
//       const res = await $put(`${endpoints.clinics.clinic}${id}`, data);
//       console.info('RES', res);
//       // reset();
//       enqueueSnackbar('Update success!');
//       // // router.push(paths.dashboard.user.list);
//       // router.push(paths.clinicmanager.root);
//     } catch (error) {
//       console.error(error);
//     }
//   });
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

  const getRoles = ()=>{
    $get(endpoints.pms.names)
    .then(res =>{
      res.sort()
      setPmsNames(res)
    })

    // $get(endpoints.corps.names)
    // .then(res =>{
    //   res.sort()
    //   setCorpNames(res)
    // })
  }



  const handleClearService = useCallback(
    (index) => {
    //   resetField(`items[${index}].quantity`);
    //   resetField(`items[${index}].price`);
    //   resetField(`items[${index}].total`);
    },
    // [resetField]
  );

  const handleSelectService = useCallback(
    (index, option) => {
    //   setValue(
    //     `items[${index}].price`,
    //     INVOICE_SERVICE_OPTIONS.find((service) => service.name === option)?.price
    //   );
    //   setValue(
    //     `items[${index}].total`,
    //     values.items.map((item) => item.quantity * item.price)[index]
    //   );
    },
    // [setValue, values.items]
  );


  const renderForm = (
    <Stack spacing={3} alignItems="left" >
      <RHFTextField name="email" label="Email address" />
      {/* <RHFSelect
                name="role"
                size="small"
                label="Role"
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: { md: 350 }}}
              >
                <MenuItem
                  value=""
                  onClick={() => handleClearService(index)}
                  sx={{ fontStyle: 'italic', color: 'text.secondary' }}
                >
                  None
                </MenuItem>

                <Divider sx={{ borderStyle: 'dashed' }} />

                {INVOICE_SERVICE_OPTIONS.map((service) => (
                  <MenuItem
                    key={service.id}
                    value={service.name}
                    onClick={() => handleSelectService(index, service.name)}
                  >
                    {service.name}
                  </MenuItem>
                ))}
      </RHFSelect> */}

<InputLabel  id="demo-simple-select-label"  style={{ textAlign: 'left', paddingLeft:"12px" }} >Role</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    variant="outlined"
    name="role"
    value=""
    label="Role"
    style={{ width: '300px', height: '58px' }}
    MenuProps={MenuProps}
    onChange={handleChange}
    // placeholder="Select a Role"
  >
    <MenuItem value={"Role1"}>Role1</MenuItem>
    <MenuItem value={"Role2"}>Role2</MenuItem>
    <MenuItem value={"Role3"}>Role3</MenuItem>
  </Select>

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
{/* 
      <Link
        component={RouterLink}
        href={paths.settings.root}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Return to settings
      </Link> */}
    </Stack>
  );

  const renderHead = (
    <>
      <PasswordIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">Invite A User?</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Please enter an email address and We will email a link
          to the new user.
        </Typography>
      </Stack>
    </>
  );

  return (
    <Dialog
    fullWidth
    maxWidth={false}
    open={open}
    onClose={onClose}
    PaperProps={{
      sx: { maxWidth: 540 },
    }}
  >
    <Box
        component="main"
        sx={{
          py: 8,
          display: 'flex',
        //   minHeight: '100vh',
          textAlign: 'center',
          px: { xs: 2, md: 0 },
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          '&:before': {
            width: 1,
            height: 1,
            zIndex: -1,
            content: "''",
            opacity: 0.24,
            position: 'absolute',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundImage: 'url(/assets/background/overlay_4.jpg)',
          },
        }}
      >
        <Card
          sx={{
            py: 5,
            px: 3,
            maxWidth: 420,
          }}
        >
          <FormProvider methods={methods} onSubmit={onSubmit}>
                {/* {renderHead} */}
                <DialogTitle>Create New User</DialogTitle>
                <DialogContent >

                  {renderForm}
                </DialogContent >
            <DialogActions>
            <Button variant="outlined" onClick={onClose}>
                Cancel
            </Button>

            {/* <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Submit
            </LoadingButton> */}
            </DialogActions>
        </FormProvider>
        </Card>
      </Box>
    
    

    </Dialog>
  );
}

InvoiceQuickCreateForm.propTypes = {
    currentUser: PropTypes.object,
    onClose: PropTypes.func,
    open: PropTypes.bool,
  };
  
