'use client';
import { useCallback, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// Added by Charles
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel';;

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
export default function RegisterNewUser() {
  const RegisterNewUserSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    password: Yup.string().required('Password is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

//   const [role, setRole] = useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
  };


  const defaultValues = {
    firstname: '',
    lastname: '',
    password: '',
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterNewUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });


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
    <Stack spacing={2} alignItems="left" >
      <RHFTextField name="firstname" label="First Name" />
      <RHFTextField name="lastname" label="Last Name" />
      <RHFTextField name="password" label="Password" />
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

{/* <InputLabel  id="demo-simple-select-label"  style={{ textAlign: 'left', paddingLeft:"16px" }} >Role</InputLabel> */}
  {/* <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    variant="outlined"
    name="role"
    value=""
    label="Role"
    style={{ width: '370px', height: '58px' }}
    MenuProps={MenuProps}
    onChange={handleChange}
    // placeholder="Select a Role"
  >
    <MenuItem value={"Role1"}>Role1</MenuItem>
    <MenuItem value={"Role2"}>Role2</MenuItem>
    <MenuItem value={"Role3"}>Role3</MenuItem>
  </Select> */}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        sx={{ justifyContent: 'space-between', pl: 2, pr: 1.5 }}
      >
       Register
      </LoadingButton>

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
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      <PasswordIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5,width:'350px' }}>
        <Typography variant="h3">Register </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Please fill in the details below to register.
        </Typography>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}