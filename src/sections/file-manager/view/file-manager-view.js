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
import { useTable, getComparator } from 'src/components/table';
//
import FileManagerTable from '../file-manager-table';
import FileManagerFilters from '../file-manager-filters';
import FileManagerGridView from '../file-manager-grid-view';
import FileManagerFiltersResult from '../file-manager-filters-result';
import FileManagerNewFolderDialog from '../file-manager-new-folder-dialog';

// ----------------------------------------------------------------------

const defaultFilters = {
  name: '',
  type: [],
  startDate: null,
  endDate: null,
};

// ----------------------------------------------------------------------

export default function FileManagerView() {
  const table = useTable({ defaultRowsPerPage: 10 });

  const settings = useSettingsContext();

  const openDateRange = useBoolean();

  const confirm = useBoolean();

  const upload = useBoolean();

  const [view, setView] = useState('list');

  // const [tableData, setTableData] = useState(_allFiles);

  const [filters, setFilters] = useState(defaultFilters);

  // Custom Variables By Charles


  
  const [pageIndex, setPageIndex] = useState(1);
  const [selectedPms, setSelectedPms] = useState(null);
  const [selectedCorp, setSelectedCorp] = useState(null);
  const [clinicName, setClinicName] = useState(null);
  const [isActive, setIsActive] = useState(true);

  const [tableData, setTableData] = useState([]);
  const [pmsNames, setPmsNames] = useState([]);
  const [corpNames, setCorpNames] = useState([]);
  const quickEdit = useBoolean();

  // const URL = `${endpoints.clinic_manager.clinic_data}?pageNumber=${pageIndex}`;
  const URL = `${endpoints.clinic_manager.clinic_data}?${ isActive != null ? `active=${isActive}&` : ''}${ clinicName != null ? `search=${clinicName}&` : ''}${ selectedPms != null ? `pmsId=${selectedPms}&` : ''}${ selectedCorp != null ? `corpId=${selectedCorp}&` : ''}pageNumber=${pageIndex}`;
  const { data, error, isLoading } = useSWR(URL,$get,{onSuccess: ()=>{
    console.log("-------------------")
    console.log("CLINIC PAGE DATA: ", data || [])
    console.log("CLINICS", data?.result || 0)
    console.log("totalCount", data?.totalCount || 0)
    console.log("currentPage", data?.currentPage || 0)
    console.log("-------------------")

    // setTableData(data?.result)

  }});
  // The API URL includes the page index, which is a React state.
  // const { data, isLoading, error} = useSWR(`${URL}?pageNumber=${pageIndex + 1}`, fetcher);
  if (error) return console.log(error);
  // if (isLoading) return <h6>Loading...</h6>;

  // const table = useTable({defaultRowsPerPage: data?.pageSize || 0, defaultCurrentPage:data?.currentPage - 1 || 0});
  // const table = useTable();

  useEffect(()=>{
    setTableData(data?.result || [])
  }, [data])

  useEffect(()=>{
    setPageIndex(table.page + 1)
  }, [table.page])


  const getPMS_Corps = ()=>{
    $get(endpoints.pms.names)
    .then(res =>{
      res.sort()
      res.splice(0, 0, "All")
      setPmsNames(res)
    })

    $get(endpoints.corps.names)
    .then(res =>{
      res.sort()
      res.splice(0, 0, "All")
      setCorpNames(res)
    })
  }

  useEffect(()=>{
    getPMS_Corps()
  }, [])


  const dateError =
    filters.startDate && filters.endDate
      ? filters.startDate.getTime() > filters.endDate.getTime()
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
    !!filters.name || !!filters.type.length || (!!filters.startDate && !!filters.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleChangeView = useCallback((event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  }, []);

  const handleFilters = useCallback(
    (name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
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

  const handleDeleteItems = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
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
      results={dataFiltered.length}
    />
  );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h4">File Manager</Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:cloud-upload-fill" />}
            onClick={upload.onTrue}
          >
            Upload
          </Button>
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
                table={table}
                tableData={tableData}
                dataFiltered={dataFiltered}
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

      <FileManagerNewFolderDialog open={upload.value} onClose={upload.onFalse} />

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteItems();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { name, type, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (file) => file.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (type.length) {
    inputData = inputData.filter((file) => type.includes(fileFormat(file.type)));
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter(
        (file) =>
          fTimestamp(file.createdAt) >= fTimestamp(startDate) &&
          fTimestamp(file.createdAt) <= fTimestamp(endDate)
      );
    }
  }

  return inputData;
}
