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

// ----------------------------------------------------------------------

export default function UserEditView({ id }) {
  const settings = useSettingsContext();

  // console.log("RES: ", (id));
  const { clinic: currentUser, clinicLoading, clinicEmpty } = useGetClinic(id);
  // console.log("CLINIC: ", clinic);
  // const clinic3 = {
  //   status: true,
  //   message: "success",
  //   data: {
  //     id: 25,
  //     office_number: "9991",
  //     data_Path: "watermark_alberni",
  //     clinic_code: "2112",
  //     corp_id: "WATERMARK",
  //     clinic_name: "Port Dental Health Centre",
  //     clinic_address: "3633 3rd Ave.",
  //     clinic_address1: "Port Alberni",
  //     clinic_postal: "V9Y4E7",
  //     clinic_city: "city",
  //     clinic_province: "BC",
  //     country: "CA",
  //     clinic_phone: "1234567890",
  //     clinic_fax: "",
  //     clinic_email: "email",
  //     clinic_appointmentunit: 10,
  //     current_app: "Cleardent",
  //     runLedgerBalance: true,
  //     idclinics: 2,
  //     dest_db: "watermarkalberni",
  //     cutoff_date: "2014-01-01T00:00:00",
  //     acquistionDate: "2012-06-23T00:00:00",
  //     firstTransId: "0",
  //     prodDate: "EntryDate",
  //     colDate: "EntryDate",
  //     dateFormat: "dmy",
  //     stage: "5-Moved to Production",
  //     todo: "none",
  //     actioBy: "None <>",
  //     asana_url: "",
  //     multiClinicJail: false,
  //     jailDataDir: "",
  //     locationId: "",
  //     comments: "",
  //     separateMultiClinicJail: false,
  //     swellcx_locId: "0",
  //     swellcx_teamId: "0",
  //     swellcx_campaign: "0",
  //     timezone: "6",
  //     setup_Date: "2020-09-27T00:00:00",
  //     goLive_Date: null,
  //     active: true,
  //     status: "active",
  //     staff: "ahmad.mando@edmsdental.com",
  //     data_path_source: null,
  //     chargeAdj: "",
  //     collectionAdj: "",
  //   },
  // };

  // const clinic2 = {
  //   id: 25,
  //   office_number: "9991",
  //   data_Path: "watermark_alberni",
  //   clinic_code: "2112",
  //   corp_id: "WATERMARK",
  //   clinic_name: "Port Dental Health Centre",
  //   clinic_address: "3633 3rd Ave.",
  //   clinic_address1: "Port Alberni",
  //   clinic_postal: "V9Y4E7",
  //   clinic_city: "city",
  //   clinic_province: "BC",
  //   country: "CA",
  //   clinic_phone: "1234567890",
  //   clinic_fax: "",
  //   clinic_email: "email",
  //   clinic_appointmentunit: 10,
  //   current_app: "Cleardent",
  //   runLedgerBalance: true,

  //   idclinics: 2,
  //   dest_db: "watermarkalberni",
  //   cutoff_date: "2014-01-01T00:00:00",
  //   acquistionDate: "2012-06-23T00:00:00",
  //   firstTransId: "0",
  //   prodDate: "EntryDate",
  //   colDate: "EntryDate",
  //   dateFormat: "dmy",
  //   stage: "5-Moved to Production",
  //   todo: "none",
  //   actioBy: "None <>",
  //   asana_url: "",
  //   multiClinicJail: false,
  //   jailDataDir: "",
  //   locationId: "",
  //   comments: "",
  //   separateMultiClinicJail: false,
  //   swellcx_locId: "0",
  //   swellcx_teamId: "0",
  //   swellcx_campaign: "0",
  //   timezone: "6",
  //   setup_Date: "2020-09-27T00:00:00",
  //   goLive_Date: null,
  //   active: true,
  //   staff: "ahmad.mando@edmsdental.com",
  //   data_path_source: null,
  //   chargeAdj: "",
  //   collectionAdj: "",
  // };
  //   useEffect(() => {

  //     console.log("message" + typeof clinic);
  //   });

  //   useEffect(() => {
  //     if (clinic) {
  //       console.log(" The clinic details: " + JSON.stringify(clinic));
  //       // setTableData(clinics);
  //     }
  //   }, [clinic]);

  // let jsonClinic = JSON.stringify(clinic);
  // console.log("Json clinic" + jsonClinic)
  // console.log("New CLicnic", clinic);
  //   const jsonParseVar = JSON.parse(jsonClinic);
  //   console.log(jsonParseVar);

  //   let clinicArray = Object.values(jsonParseVar);
  //  console.log("The new clinic array" + clinicArray);

  // const currentUser =_userList.find((user) => user.id === id);
  // const currentUser =  clinicArray.find((user) => user.idclinics === id);

  // const currentUser = data;

  // console.log("CURRENTUSER", currentUser);

  useEffect(() => {
    // console.log(currentUser);
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : "lg"}>
      <CustomBreadcrumbs
        heading="Edit"
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

      <UserNewEditForm currentUser={currentUser} />
    </Container>
  );
}

UserEditView.propTypes = {
  id: PropTypes.string,
};
