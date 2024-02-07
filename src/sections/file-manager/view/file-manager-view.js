'use client';

import { useEffect, useState, useCallback } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// utils
import { fTimestamp } from 'src/utils/format-time';
import isEqual from 'lodash/isEqual';
// _mock
import { _allFiles, FILE_TYPE_OPTIONS } from 'src/_mock';

//  API hooks

import { $get, endpoints} from 'src/utils/axios';

// hooks
import { useBoolean } from 'src/hooks/use-boolean';


import useSWR from 'swr';

// components
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { fileFormat } from 'src/components/file-thumbnail';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
// import { useTable, getComparator } from 'src/components/table';

import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
//
import FileManagerTable from '../file-manager-table';
import FileManagerFilters from '../file-manager-filters';
import FileManagerGridView from '../file-manager-grid-view';
import FileManagerFiltersResult from '../file-manager-filters-result';
import FileManagerNewFolderDialog from '../file-manager-new-folder-dialog';
import FileListTableRow from './file-list-view';



// ----------------------------------------------------------------------

// const defaultFilters = {
//   name: '',
//   type: [],
//   startDate: null,
//   endDate: null,
// };
const defaultFilters = {
  clinic_name: '',
  cutoff_date: null,
  prodDate: null,
};

// ----------------------------------------------------------------------

export default function FileManagerView() {
  const table = useTable({ defaultRowsPerPage: 10 });
  const settings = useSettingsContext();
  const openDateRange = useBoolean();
  const confirm = useBoolean();
  const [view, setView] = useState('list');

  // const [tableData, setTableData] = useState(_allFiles);
  const [filters, setFilters] = useState(defaultFilters);

  const [pageIndex, setPageIndex] = useState(1);
  const [clinicName, setClinicName] = useState(null);
  const [isActive, setIsActive] = useState(true);

  const [tableData, setTableData] = useState([]);

  // const URL = `${endpoints.clinic_manager.clinic_data}?pageNumber=${pageIndex}`;
  const URL = `${endpoints.clinics.clinic}?${ isActive != null ? `active=${isActive}&` : ''}${ clinicName != null ? `search=${clinicName}&` : ''}pageNumber=${pageIndex}`;
  const { data, error, isLoading } = useSWR(URL,$get,{onSuccess: ()=>{
    console.log("-------------------")
    console.log("CLINIC PAGE DATA: ", data || [])
    console.log("CLINICS", data?.result || 0)
    console.log("totalCount", data?.totalCount || 0)
    console.log("currentPage", data?.currentPage || 0)
    console.log("-------------------")
  }});
  
  // The API URL includes the page index, which is a React state.
  // const { data, isLoading, error} = useSWR(`${URL}?pageNumber=${pageIndex + 1}`, fetcher);
  if (error) return console.log(error);
  // if (isLoading) return <h6>Loading...</h6>;

  useEffect(()=>{
    setTableData(data?.result || [])
  }, [data])

  useEffect(()=>{
    setPageIndex(table.page + 1)
  }, [table.page])


  const dateError =
    filters.startDate && filters.endDate
      ? filters.setup_Date.getTime() > filters.cutoff_date.getTime()
      : false;

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
    dateError,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const canReset =
    // !!filters.name || !!filters.type.length || (!!filters.startDate && !!filters.endDate);
    !!filters.clinic_name;

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleChangeView = useCallback((event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  }, []);

  const handleFilters = useCallback(
    (clinic_name, value) => {
      console.log("clinic_name: " + value);
      if(value.length > 2){
        setClinicName(value)
      }
      // table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,[clinic_name]: value,
      }));
    },
    [table]
  );

  const handleDeleteItem = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
    setClinicName(null);
  }, []);

  const renderFilters = (
    <Stack
      spacing={2}
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'flex-end', md: 'center' }}
    >
      <FileManagerFilters
        openDateRange={openDateRange.value}
        onCloseDateRange={openDateRange.onFalse}
        onOpenDateRange={openDateRange.onTrue}
        //
        filters={filters}
        onFilters={handleFilters}
        //
        dateError={dateError}
        typeOptions={FILE_TYPE_OPTIONS}
      />

      <ToggleButtonGroup size="small" value={view} exclusive onChange={handleChangeView}>
        <ToggleButton value="list">
          <Iconify icon="solar:list-bold" />
        </ToggleButton>

        <ToggleButton value="grid">
          <Iconify icon="mingcute:dot-grid-fill" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );

  const renderResults = (
    <FileManagerFiltersResult
      filters={filters}
      onResetFilters={handleResetFilters}
      //
      canReset={canReset}
      onFilters={handleFilters}
      //
      results={data?.totalCount || 0}
    />
  );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">Clinic Reports</Typography>
          {/* <Button
            variant="contained"
            startIcon={<Iconify icon="eva:cloud-upload-fill" />}
            onClick={upload.onTrue}
          >
            Upload
          </Button> */}
        </Stack>

        <Stack
          spacing={2.5}
          sx={{
            my: { xs: 3, md: 5 },
          }}
        >
          {renderFilters}

          {canReset && renderResults}
        </Stack>

        {notFound ? (
          <EmptyContent
            filled
            title="No Data"
            sx={{
              py: 10,
            }}
          />
        ) : (
          <>
            {view === 'list' ? (
              <FileManagerTable
              dta={data}
                table={table}
                tableData={tableData}
                dataFiltered={dataFiltered}
                ftype="folder"
                onDeleteRow={handleDeleteItem}
                notFound={notFound}
                onOpenConfirm={confirm.onTrue}
              />
            ) : (
              <FileManagerGridView
                table={table}
                data={tableData}
                dataFiltered={dataFiltered}
                onDeleteItem={handleDeleteItem}
                onOpenConfirm={confirm.onTrue}
              />
            )}
          </>
        )}
      </Container>

    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters, dateError }) {
  // const {clinic_name,cutoff_date,prodDate } = filters;

  // const stabilizedThis = inputData.map((el, index) => [el, index]);

  // stabilizedThis.sort((a, b) => {
  //   const order = comparator(a[0], b[0]);
  //   if (order !== 0) return order;
  //   return a[1] - b[1];
  // });

  // inputData = stabilizedThis.map((el) => el[0]);

  // if (clinic_name) {
  //   inputData = inputData.filter(
  //     (file) => file.clinic_name.toLowerCase().indexOf(clinic_name.toLowerCase()) !== -1
  //   );
  // }

  // if (clinic_name) {
  //   inputData = inputData.filter((file) => type.includes(fileFormat(file.type)));
  // }

  // if (!dateError) {
  //   if (cutoff_date && prodDate) {
  //     inputData = inputData.filter(
  //       (file) =>
  //         fTimestamp(file.cutoff_date) >= fTimestamp(cutoff_date) &&
  //         fTimestamp(file.prodDate) <= fTimestamp(prodDate)
  //     );
  //   }
  // }

  return inputData;
}
