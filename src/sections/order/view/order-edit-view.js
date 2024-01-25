"use client";
import { useEffect } from "react";
import PropTypes from "prop-types";
// @mui
import Container from "@mui/material/Container";
// routes
import { paths } from "src/routes/paths";
// _mock
import { _userList, _userListTwo } from "src/_mock";
import { useGetClinic } from "src/api/clinic_manager";

// components
import { useSettingsContext } from "src/components/settings";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
//
import OrderNewEditForm from "../order-new-edit-form";

import useSWR from 'swr';
import { $post, $get, endpoints} from 'src/utils/axios';
// ----------------------------------------------------------------------

export default function OrderEditView({ id }) {
  const settings = useSettingsContext();

  console.log("RES: ", (id));
  // const { clinic: currentUser, clinicLoading, clinicEmpty } = useGetClinic(id);
  const URL = `${endpoints.pms.pms_data}${id}`;
  const { data:pms_data, error, isLoading } = useSWR(URL,$get,{onSuccess: ()=>{}});
  if (error) return console.log(error);

  console.log("PMS: ", pms_data);
  // useEffect(() => {
  //   // console.log(currentUser);
  // });

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading={pms_data?.pms}
        links={[
          {
            name: "PMS",
            // href: paths.dashboard.user.root,
          },
          // { name: currentUser?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <OrderNewEditForm pms={pms_data} id={id}/>
    </Container>
  );
}

OrderEditView.propTypes = {
  id: PropTypes.string,
};
