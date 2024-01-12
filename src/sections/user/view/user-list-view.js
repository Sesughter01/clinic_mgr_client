'use client';

import isEqual from 'lodash/isEqual';
import { useEffect, useState, useCallback } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
// _mock
// import { _userList, _userListTwo, _roles, _corp_Names, pmsNames, USER_STATUS_OPTIONS } from 'src/_mock';
import {CLINIC_STATUS_OPTIONS } from 'src/_mock';
import useSWR from 'swr';
import { $get, endpoints} from 'src/utils/axios';

//Added by Blessing
// import { _corpName, _pms, _clinicName  } from 'src/_mock';

// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
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
import UserTableRow from '../user-table-row';
import UserTableToolbar from '../user-table-toolbar';
import UserTableFiltersResult from '../user-table-filters-result';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [...CLINIC_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'clinic_name', label: 'Clinic Name',},
  // { id: 'corp_Name', label: 'Corp Name', width: 180 },
  { id: 'pmsName', label: 'PMS', width: 180 },
  { id: 'stage', label: 'Stage',  width: 300},
  { id: 'todo', label: 'To Do', width: 350},
  { id: 'actioBy', label: 'Action By', width: 350 },
  // { id: 'asana_url', label: 'Asana Link', width: 300 },
  // { id: 'status', label: 'Status', width: 100 },
  // { id: '', width: 88 },
];

//corpname, pms, clinicname search
const defaultFilters = {
  // name: '',
  clinic_name: '',
  corporation: '',
  pmss: '',
  corp_Name: [],
  pmsName: [],
  status: 'all',
};

// ----------------------------------------------------------------------

export default function UserListView() {
  // const [tableData, setTableData] = useState(_userList);


  const [pageIndex, setPageIndex] = useState(1);
  const [selectedPms, setselectedPms] = useState(null);
  const [selectedCorp, setselectedCorp] = useState(null);

  const [tableData, setTableData] = useState([]);
  const [pmsNames, setPmsNames] = useState([]);
  const [corpNames, setCorpNames] = useState([]);

  // const URL = `${endpoints.clinic_manager.clinic_data}?pageNumber=${pageIndex}`;
  const URL = `${endpoints.clinic_manager.clinic_data}?${ selectedPms != null ? `pmsId=${selectedPms}&` : ''}${ selectedCorp != null ? `corpId=${selectedCorp}&` : ''}pageNumber=${pageIndex}`;
  console.log("URL", URL);
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
  const table = useTable();

  useEffect(()=>{
    if(data) setTableData(data.result)
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

  const settings = useSettingsContext();

  const router = useRouter();

  const [filters, setFilters] = useState(defaultFilters);

  const confirm = useBoolean();

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
     (name, value) => {
      console.log("nameval: ",name, value)

      if(name == 'pmsName'){
        if(value == 'All')
          setselectedPms(null)
        else
          setselectedPms(value)

      }
      else if(name == 'corpName'){
        if(value == 'All')
          setselectedCorp(null)
        else
          setselectedCorp(value)
      }
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleEditRow = useCallback(
    (id) => {
      // router.push(paths.dashboard.user.edit(id));
      router.push(paths.clinicmanager.clinic.edit(id));
      console.log(id)
    },
    [router]
  );

  const handlePmsreportRow = useCallback(
    (id) => {
      // router.push(paths.dashboard.user.edit(id));
      router.push(paths.clinicmanager.clinic.pmsreport(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const greet = () =>{
    alert(5)
  }

  return (
    // <h1>Welcome {data?.totalCount}</h1>

    <>
    <h1>Welcome {selectedPms} - {selectedCorp}</h1>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Clinic Manager"
          links={[
            // { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Clinics', href: paths.clinicmanager.root },
            { name: 'List' }, 
          ]}
          action={
            <Button
              component={RouterLink}
              // href={paths.dashboard.user.new}
              href={paths.clinicmanager.clinic.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Clinic
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          <Tabs
            value={filters.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
                    }
                    color={
                      (tab.value === 'active' && 'success') ||
                      (tab.value === 'inactive' && 'warning') ||
                      // (tab.value === 'pending' && 'warning') ||
                      // (tab.value === 'banned' && 'error') ||
                      'default'
                    }
                  >
                    {/* {tab.value === 'all' && _userList.length} */}
                    {tab.value === 'active' && data?.totalCount}
                    {tab.value === 'inactive' && data?.totalCount}

                    {/* {tab.value === 'pending' &&
                      _userList.filter((user) => user.status === 'pending').length}
                    {tab.value === 'banned' &&
                      _userList.filter((user) => user.status === 'banned').length}
                    {tab.value === 'rejected' &&
                      _userList.filter((user) => user.status === 'rejected').length} */}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <UserTableToolbar
            filters={filters}
            onFilters={handleFilters}
            pmsOptions={pmsNames}
            corpOptions={corpNames}
          />

          {canReset && (
            <UserTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}


          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table onChangePage={greet} size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .map((row) => (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        //Added by blessing
                        onPmsreportRow={() => handlePmsreportRow(row.id)}
                        
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={data?.totalCount}
            page={data?.currentPage - 1}
            rowsPerPage={data?.pageSize}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> clinics?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
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

function applyFilter({ inputData, comparator, filters }) {
  console.log("applyFilter START: ", inputData)
  // const { name, status, role } = filters;
  const { clinic_name, status, corp_Name, pmsName } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);
  

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);
 

  // if (name) {
  //   inputData = inputData.filter(
  //     (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
  //   );
  // }
  if (clinic_name) {
    inputData = inputData.filter(
      (user) => user.clinic_name.toLowerCase().indexOf(clinic_name.toLowerCase()) !== -1
    );
  }
  
  

  if (status !== 'all') {
    inputData = inputData.filter((user) => user.status === status);
  }

  // if (role.length) {
  //   inputData = inputData.filter((user) => role.includes(user.role));
  // }
  if (corp_Name.length) {
    inputData = inputData.filter((user) => corp_Name.includes(user.corp_Name));
  }
  if (pmsName.length) {
    inputData = inputData.filter((user) => pmsName.includes(user.pmsName));
  }
  console.log("applyFilter END: ", inputData)

  return inputData;
}
