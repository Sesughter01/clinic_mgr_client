import React, { useState, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import FormControlLabel from '@mui/material/FormControlLabel';

// components
import { useSnackbar } from 'src/components/snackbar';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

// ----------------------------------------------------------------------

import { $put, $get, endpoints} from 'src/utils/axios';
// ----------------------------------------------------------------------

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
// {
//   defId: "20",
//   clinic_Path: "wheatland_dental",
//   description: "$-Bulk Ins.Debit",
//   chrg_adj_incl: false,
//   pmt_adj_incl: false,
//   prov_comp_incl: false,
//   idlgr_entry_map: 0,
//   hyg_comp_incl: false,
//   posting_Type: "D",
//   impact: "+"
// }

export default function Employee({ id, allEmployees }) {
  const [data, setData] = useState(allEmployees);
  const [isSubmitting, setIsSubmitting] = useState(false)

  const columns = [
    // { field: 'defId', headerName: 'defId', width: 20 },
    // { field: 'Clinic_Path', headerName: 'Clinic_Path', width: 150 },
    // { field: 'EMPID_OLD', headerName: 'EMPID_OLD', width: 120, editable: true, },
    // { field: 'EMPID_NEW', headerName: 'EMPID_NEW', width: 110, editable: true, },
    { field: 'EMP', headerName: 'EMP', width: 250},
    { field: 'Chair', headerName: 'Chair', width: 100},
    { field: 'MergedEmp', headerName: 'MergedEmp', width: 220},
    { field: 'idJobtitles', headerName: 'idJobtitles', width: 150},
    { field: 'Practice', headerName: 'Practice', width: 120},

    // {field: 'age', headerName: 'Age', type: 'number', width: 110, editable: true, },
    // {field: 'fullName', headerName: 'Full name', width: 110, sortable: false,
    //   description: 'This column has a value getter and is not sortable.',
    //   valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // }
  ];

  const { enqueueSnackbar } = useSnackbar();

  const processRowUpdate = (updatedRow, originalRow) => {
    console.info('updatedRow: ', updatedRow);
    const updatedData = data.map((row) =>
      row.id === updatedRow.id ? updatedRow : row
    );
    setData(updatedData);
    return updatedRow
  };


  const handleProcessRowUpdateError = (error) => {
    console.log("handleProcessRowUpdateError: ", error);
  }

  const UpdateData = async() => {
    setIsSubmitting(true)
    try {
      const URL = `${endpoints.clinics.clinic}${id}/employees`
      console.info('URL: ', URL);
      console.log("UpdateData: ", data);

      const res = await $put(URL, data);
      // console.info('RES: ', res);
      enqueueSnackbar('Employees Updated!');
      setTimeout(()=>{
        setIsSubmitting(false)
      }, 500)
    } catch (error) {
      console.error(error);
      setIsSubmitting(false)
    }
  }

  const handleCheckBox = (data) => {
    setValue(data.name, data.value);
  };
  


  return (
    <Box sx={{ width: '100%' }}>
      {/* Employee TAB */}
      <Grid container spacing={3}>
          <Grid xs={12} 
          md={12}
          display="flex"
          flexDirection="row">
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', columnGap:2, mb:3}}>
              <LoadingButton sx={{width:120}} type="button" variant="contained" onClick={()=>{alert("Not yet implemented")}} loading={false}>
                Purge
              </LoadingButton>

              <LoadingButton sx={{width:120}} type="button" variant="contained" onClick={()=>{alert("Not yet implemented")}} loading={false}>
                New
              </LoadingButton>

              <LoadingButton sx={{width:120}} type="button" variant="contained" onClick={UpdateData} loading={isSubmitting}>
                Save Changes
              </LoadingButton>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          editMode="row"
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disabledataelectionOnClick
          onCellEditStop={(params, event) => {
            console.log("CELL_EDIT_", {params,event})
          }}
          onRowEditStop={(params) => {
            console.log("ROW_EDIT_", params)
          }}
          onRowEditCommit={(params) => {
            console.log("onRowEditCommit: ", params)
          }}
          processRowUpdate={(updatedRow, originalRow) => {
            return processRowUpdate(updatedRow, originalRow)
          }}
          onProcessRowUpdateError={handleProcessRowUpdateError}
        />
      </Box>
    </Box>
  );
}

Employee.propTypes = {
  id:PropTypes.integer,
  allEmployees:PropTypes.array

};
