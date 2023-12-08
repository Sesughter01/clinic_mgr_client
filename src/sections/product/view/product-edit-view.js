'use client';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from 'src/routes/paths';
// api
import { useGetProduct } from 'src/api/product';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ProductNewEditForm from '../product-new-edit-form';

// ----------------------------------------------------------------------

export default function ProductEditView({ id }) {
  const settings = useSettingsContext();
  const corp = {
    "status": true,
    "message": "success",
    "data": {
      "corp_name": "Gozar-16001",
      "corp_id": "Gozar",
      "corp_users": "[]",
      "notes": "",
      "corp_num": 11,
      "corp_scr_name": "gozar",
      "archive": false,
      "swellCX": false,
      "swellCX_API": "",
      "corp_status": "2",
      "status": "Active"
    }
  }
  // const { product: currentProduct } = useGetProduct(corp_id);
  useEffect(() => {
    console.log("message" + typeof corp);
  });
  useEffect(() => {
    if (corp) {
      console.log(" The corp details: " + JSON.stringify(corp));
      // setTableData(clinics);
    }
  }, [corp]);
  let jsonCorp = JSON.stringify(corp);
  console.log("Json corp" + jsonCorp)
  const jsonParseVar = JSON.parse(jsonCorp);
  console.log(jsonParseVar);
  let corpArray = Object.values(jsonParseVar);
 console.log("The new corp array" + corpArray);
  // const currentUser =_userList.find((user) => user.id === id);
  // const currentUser =  clinicArray.find((user) => user.idclinics === id);
  const currentProduct =  jsonParseVar;
  useEffect(() => {
    // console.log(currentUser);
  });
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          // { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Corps',
            // href: paths.dashboard.product.root,
          },
          // { name: currentProduct?.corp_name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ProductNewEditForm currentProduct={currentProduct} />
    </Container>
  );
}

ProductEditView.propTypes = {
  corp_id: PropTypes.string,
};
