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
import UserNewEditForm from "../user-new-edit-form";

import useSWR from 'swr';
import { $post, $get, endpoints} from 'src/utils/axios';

// ----------------------------------------------------------------------

export default function UserEditView({ id }) {
  const settings = useSettingsContext();

  // console.log("RES: ", (id));
  // const { clinic, clinicLoading, clinicEmpty } = useGetClinic(id);

  // const URL = `${endpoints.clinic_manager.clinic_data}?pageNumber=${pageIndex}`;
  const URL = `${endpoints.clinic_manager.clinic}${id}`;
  const { data:clinic, error, isLoading } = useSWR(URL,$get,{onSuccess: ()=>{}});
  if (error) return console.log(error);

  console.log("CLINIC: ", clinic);

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading={clinic?.clinic_name}
        links={[
          // {
          //   name: 'Dashboard',
          //   href: paths.dashboard.root,
          // },
          {
            name: "Clinic Manager",
            // href: paths.dashboard.user.root,
          },
          // { name: currentUser?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserNewEditForm clinic={clinic} />
    </Container>
  );
}

UserEditView.propTypes = {
  id: PropTypes.string,
};
