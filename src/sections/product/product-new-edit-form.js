import PropTypes from "prop-types";
import * as Yup from "yup";
import { useCallback, useMemo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import FormControlLabel from "@mui/material/FormControlLabel";
// routes
import { paths } from "src/routes/paths";
//Shakirat
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { countries } from "src/assets/data";
import Iconify from "src/components/iconify";

// hooks
import { useResponsive } from "src/hooks/use-responsive";
// _mock
import {
  _tags,
  PRODUCT_SIZE_OPTIONS,
  PRODUCT_GENDER_OPTIONS,
  PRODUCT_COLOR_NAME_OPTIONS,
  PRODUCT_CATEGORY_GROUP_OPTIONS,
} from "src/_mock";

//mock from Shakirat
import {
  corp_name,
  corp_id,
  status
} from "src/_mock/_coorperation";

// components
import { useSnackbar } from "src/components/snackbar";
import { useRouter } from "src/routes/hooks";
import FormProvider, {
  RHFSelect,
  RHFEditor,
  RHFUpload,
  RHFSwitch,
  RHFTextField,
  RHFMultiSelect,
  RHFAutocomplete,
  RHFMultiCheckbox,
} from "src/components/hook-form";

// ----------------------------------------------------------------------
//Shakirat

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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ProductNewEditForm({ currentProduct }) {
  const router = useRouter();

  const mdUp = useResponsive("up", "md");

  const { enqueueSnackbar } = useSnackbar();

  const [includeTaxes, setIncludeTaxes] = useState(false);

  const NewProductSchema = Yup.object().shape({
    corp_name: Yup.string().required('Corp Name is required'),
    corp_id: Yup.string().required('Corp Id is required'),
    status: Yup.string().required('Status is required'),
    corp_scr_name: Yup.string().required('corp Script Name is required'),
    
    // not required
    taxes: Yup.number(),
    newLabel: Yup.object().shape({
      enabled: Yup.boolean(),
      content: Yup.string(),
    }),
    saleLabel: Yup.object().shape({
      enabled: Yup.boolean(),
      content: Yup.string(),
    }),
  });

  // const defaultValues = useMemo(
  //   () => ({
  //     name: currentProduct?.name || "",
  //     description: currentProduct?.description || "",
  //     subDescription: currentProduct?.subDescription || "",
  //     images: currentProduct?.images || [],
  //     //
  //     code: currentProduct?.code || "",
  //     sku: currentProduct?.sku || "",
  //     price: currentProduct?.price || 0,
  //     quantity: currentProduct?.quantity || 0,
  //     priceSale: currentProduct?.priceSale || 0,
  //     tags: currentProduct?.tags || [],
  //     taxes: currentProduct?.taxes || 0,
  //     gender: currentProduct?.gender || "",
  //     category: currentProduct?.category || "",
  //     colors: currentProduct?.colors || [],
  //     sizes: currentProduct?.sizes || [],
  //     newLabel: currentProduct?.newLabel || { enabled: false, content: "" },
  //     saleLabel: currentProduct?.saleLabel || { enabled: false, content: "" },
  //     //Shakirat
  //     corp_Name: currentProduct?.corp_Name || "",
  //   }),
  //   [currentProduct]
  // );
//Added by Shakirat
  const defaultValues = useMemo(
    () => ({
      corp_name: currentProduct?.corp_name || "",
      corp_id: currentProduct?.corp_id || "",
      corp_scr_name: currentProduct?.corp_scr_name || "",
      status: currentProduct?.status || "",
      //
    }),
    [currentProduct]
  );


  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
    }
  }, [currentProduct, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue("taxes", 0);
    } else {
      setValue("taxes", currentProduct?.taxes || 0);
    }
  }, [currentProduct?.taxes, includeTaxes, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentProduct ? "Update success!" : "Create success!");
      router.push(paths.dashboard.product.root);
      console.info("DATA", data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue("images", [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered =
        values.images && values.images?.filter((file) => file !== inputFile);
      setValue("images", filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue("images", []);
  }, [setValue]);

  const handleChangeIncludeTaxes = useCallback((event) => {
    setIncludeTaxes(event.target.checked);
  }, []);

  const renderDetails = (
    <>
      {/* {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Title, short description, image...
          </Typography>
        </Grid>
      )} */}

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={values}
            // onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Detail" {...a11yProps(0)} />
            {/* <Tab label="Summary" {...a11yProps(1)} /> */}
            {/* <Tab label="3rd Party" {...a11yProps(2)} /> */}
          </Tabs>
        </Box>
      </Box>

      <Grid xs={12} md={12}>
        <Card>
          {/* {!mdUp && <CardHeader title="Details" />} */}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              sx={{ width: "100%" }}
              columnGap={2}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
              }}
            >
              <Box
                columnGap={2}
                rowGap={3}
                display="grid"
                // gridTemplateColumns={{
                //   xs: 'repeat(1, 1fr)',
                //   md: 'repeat(2, 1fr)',
                // }}
              >
                {/* <RHFTextField name="name" label="Product Name" /> */}
                <RHFTextField name="name" label="Corp Id" />
                <RHFTextField name="corp_name" label="Corp Name" />
                <RHFTextField name="name" label="script folder" />
                {/* <RHFTextField name="subDescription" label="Sub Description" multiline rows={4} /> */}
              </Box>
              <Box>
                <RHFTextField
                  name="subDescription"
                  label="Status"
                  multiline
                  rows={10}
                />
              </Box>
            </Box>

            {/* <Stack spacing={1.5}>
              <Typography variant="subtitle2">Content</Typography>
              <RHFEditor simple name="description" />
            </Stack> */}

            {/* <Stack spacing={1.5}>
              <Typography variant="subtitle2">Images</Typography>
              <RHFUpload
                multiple
                thumbnail
                name="images"
                maxSize={3145728}
                onDrop={handleDrop}
                onRemove={handleRemoveFile}
                onRemoveAll={handleRemoveAllFiles}
                onUpload={() => console.info('ON UPLOAD')}
              />
            </Stack> */}
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderProperties = (
    <>
      {/* {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Properties
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Additional functions and attributes...
          </Typography>
        </Grid>
      )} */}

      {/* <Grid xs={12} md={8}> */}
      <Grid xs={12} md={12}>
        <Card>
          {!mdUp && <CardHeader title="Properties" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <Box
              columnGap={2}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{
                xs: "repeat(1, 1fr)",
                // md: 'repeat(2, 1fr)',
                md: "repeat(3, 1fr)",
              }}
            >
              {/* <RHFTextField name="code" label="Product Code" />

              <RHFTextField name="sku" label="Product SKU" />
              <RHFTextField name="sku" label="Product SKU" /> */}
              <RHFTextField name="code" label="default db" />

              <RHFTextField name="sku" label="copy script from *" />
              <RHFTextField name="sku" label="sql" />
              {/* <RHFTextField
                name="quantity"
                label="Quantity"
                placeholder="0"
                type="number"
                InputLabelProps={{ shrink: true }}
              /> */}

              {/* <RHFSelect native name="category" label="Category" InputLabelProps={{ shrink: true }}>
                {PRODUCT_CATEGORY_GROUP_OPTIONS.map((category) => (
                  <optgroup key={category.group} label={category.group}>
                    {category.classify.map((classify) => (
                      <option key={classify} value={classify}>
                        {classify}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </RHFSelect> */}

              {/* <RHFMultiSelect
                checkbox
                name="colors"
                label="Colors"
                options={PRODUCT_COLOR_NAME_OPTIONS}
              /> */}

              {/* <RHFMultiSelect checkbox name="sizes" label="Sizes" options={PRODUCT_SIZE_OPTIONS} /> */}
            </Box>

            {/* <RHFAutocomplete
              name="tags"
              label="Tags"
              placeholder="+ Tags"
              multiple
              freeSolo
              options={_tags.map((option) => option)}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option}
                    label={option}
                    size="small"
                    color="info"
                    variant="soft"
                  />
                ))
              }
            /> */}

            {/* <Stack spacing={1}>
              <Typography variant="subtitle2">Gender</Typography>
              <RHFMultiCheckbox
                row
                name="gender"
                spacing={2}
                options={PRODUCT_GENDER_OPTIONS}
              />
            </Stack> */}

            {/* <Divider sx={{ borderStyle: "dashed" }} />

            <Stack direction="row" alignItems="center" spacing={3}>
              <RHFSwitch name="saleLabel.enabled" label={null} sx={{ m: 0 }} />
              <RHFTextField
                name="saleLabel.content"
                label="Sale Label"
                fullWidth
                disabled={!values.saleLabel.enabled}
              />
            </Stack>

            <Stack direction="row" alignItems="center" spacing={3}>
              <RHFSwitch name="newLabel.enabled" label={null} sx={{ m: 0 }} />
              <RHFTextField
                name="newLabel.content"
                label="New Label"
                fullWidth
                disabled={!values.newLabel.enabled}
              />
            </Stack> */}
          </Stack>
        </Card>
      </Grid>
    </>
  );

  // const renderPricing = (
  //   <>
  //     {mdUp && (
  //       <Grid md={4}>
  //         <Typography variant="h6" sx={{ mb: 0.5 }}>
  //           Pricing
  //         </Typography>
  //         <Typography variant="body2" sx={{ color: "text.secondary" }}>
  //           Price related inputs
  //         </Typography>
  //       </Grid>
  //     )}

  //     <Grid xs={12} md={8}>
  //       <Card>
  //         {!mdUp && <CardHeader title="Pricing" />}

  //         <Stack spacing={3} sx={{ p: 3 }}>
  //           <RHFTextField
  //             name="price"
  //             label="Regular Price"
  //             placeholder="0.00"
  //             type="number"
  //             InputLabelProps={{ shrink: true }}
  //             InputProps={{
  //               startAdornment: (
  //                 <InputAdornment position="start">
  //                   <Box component="span" sx={{ color: "text.disabled" }}>
  //                     $
  //                   </Box>
  //                 </InputAdornment>
  //               ),
  //             }}
  //           />

  //           <RHFTextField
  //             name="priceSale"
  //             label="Sale Price"
  //             placeholder="0.00"
  //             type="number"
  //             InputLabelProps={{ shrink: true }}
  //             InputProps={{
  //               startAdornment: (
  //                 <InputAdornment position="start">
  //                   <Box component="span" sx={{ color: "text.disabled" }}>
  //                     $
  //                   </Box>
  //                 </InputAdornment>
  //               ),
  //             }}
  //           />

  //           <FormControlLabel
  //             control={
  //               <Switch
  //                 checked={includeTaxes}
  //                 onChange={handleChangeIncludeTaxes}
  //               />
  //             }
  //             label="Price includes taxes"
  //           />

  //           {!includeTaxes && (
  //             <RHFTextField
  //               name="taxes"
  //               label="Tax (%)"
  //               placeholder="0.00"
  //               type="number"
  //               InputLabelProps={{ shrink: true }}
  //               InputProps={{
  //                 startAdornment: (
  //                   <InputAdornment position="start">
  //                     <Box component="span" sx={{ color: "text.disabled" }}>
  //                       %
  //                     </Box>
  //                   </InputAdornment>
  //                 ),
  //               }}
  //             />
  //           )}
  //         </Stack>
  //       </Card>
  //     </Grid>
  //   </>
  // );

  const renderActions = (
    <>
      {/* {mdUp && <Grid md={4} />} */}
      <Grid xs={12} md={8}>
        <Card>
          <Stack spacing={3} sx={{ p: 3 }}>
            <Box rowGap={3} columnGap={2} display="grid">
              <RHFTextField name="contact" label="Contact" multiline rows={8} />
              <RHFAutocomplete
                name="location"
                label="Location"
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
          </Stack>
        </Card>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {renderProperties}

        {/* {renderPricing} */}

        {renderActions}
      </Grid>
    </FormProvider>
  );
}

ProductNewEditForm.propTypes = {
  currentProduct: PropTypes.object,
};
