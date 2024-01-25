"use client";

import isEqual from 'lodash/isEqual';
import { useState, useCallback } from "react";
import { useEffect } from "react";

// @mui
import { alpha } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
// routes
import { paths } from "src/routes/paths";
// api
import { useGetPmss } from "src/api/pms";
import { useRouter } from "src/routes/hooks";
// endpoints
import useSWR from 'swr';
import { $get, endpoints} from 'src/utils/axios';
// _mock
import { _orders, ORDER_STATUS_OPTIONS } from "src/_mock";
// utils
import { fTimestamp } from "src/utils/format-time";
// routes
import { RouterLink } from 'src/routes/components';
// hooks
import { useBoolean } from "src/hooks/use-boolean";
// components
import Label from "src/components/label";
import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import { ConfirmDialog } from "src/components/custom-dialog";
import { useSettingsContext } from "src/components/settings";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from "src/components/table";
//
import OrderTableRow from "../order-table-row";
import OrderTableToolbar from "../order-table-toolbar";
import OrderTableFiltersResult from "../order-table-filters-result";

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [...ORDER_STATUS_OPTIONS];

const TABLE_HEAD = [
  // { id: 'orderNumber', label: 'PMS', width: 116 },
  // { id: 'name', label: 'Description' },
  // { id: 'createdAt', label: 'Script Folder', width: 140 },
  // { id: 'totalQuantity', label: 'Wiki page', width: 120, align: 'center' },
  // { id: 'totalAmount', label: 'Clinics', width: 140 },
  // { id: 'status', label: 'Status', width: 110 },
  { id: '', width: 88 },
  { id: "pms", label: "PMS", width: 126 },
  { id: "description", label: "Description" },
  { id: "script_Folder", label: "Script Folder", width: 160 },
  { id: "wiki_page", label: "Wiki page", width: 140, align: "center" },
  { id: "totalAmount", label: "#Clinics", width: 160 },
  // { id: 'status', label: 'Status', width: 110 },
  { id: "", width: 88 },
];

const defaultFilters = {
  // name: "",
  // status: "all",
  // startDate: null,
  // endDate: null,
  //Added by Shakirat
  pms_status: "all",
  pms: '',
  pmsid: [],
};

// ----------------------------------------------------------------------

export default function OrderListView() {
  // const [tableData, setTableData] = useState(_orders);

  const [pageIndex, setPageIndex] = useState(1);
  const [pms, setPms] = useState(null);

  const [tableData, setTableData] = useState([]);

  // const URL = `${endpoints.clinic_manager.clinic_data}?pageNumber=${pageIndex}`;
  const URL = `${endpoints.pms.pms_data}?${ pms != null ? `search=${pms}&` : ''}pageNumber=${pageIndex}`;
  const { data, error, isLoading } = useSWR(URL,$get,{onSuccess: ()=>{
    console.log("-------------------")
    console.log("PMS PAGE DATA: ", data || [])
    console.log("PMS", data?.result || 0)
    console.log("totalCount", data?.totalCount || 0)
    console.log("currentPage", data?.currentPage || 0)
    console.log("-------------------")

    // setTableData(data?.result)

  }});
  // The API URL includes the page index, which is a React state.
  // const { data, isLoading, error} = useSWR(`${URL}?pageNumber=${pageIndex + 1}`, fetcher);
  if (error) return console.log(error);
  // if (isLoading) return <h6>Loading...</h6>;

  // const table = useTable({ defaultOrderBy: "orderNumber" });
  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const confirm = useBoolean();

  const [filters, setFilters] = useState(defaultFilters);
  // Added by Shakirat
  // const { pmss, pmssLoading, pmssEmpty } = useGetPmss();
  useEffect(()=>{
    setTableData(data?.result || [])
  }, [data])

  useEffect(()=>{
    setPageIndex(table.page + 1)
  }, [table.page])
  
  // useEffect(() => {
  //   if (pmss.length) {
  //     setTableData(pmss);
  //   }
  //   console.log(pmss);
  // }, [pmss]);

  // const dateError =
  //   filters.startDate && filters.endDate
  //     ? filters.startDate.getTime() > filters.endDate.getTime()
  //     : false;

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
  // const canReset =
  //   !!filters.name ||
  //   filters.status !== "all" ||
  //   (!!filters.startDate && !!filters.endDate);

  const handleFilters = useCallback(
    (name, value) => {
      console.log("nameval------------: ",name, value)
       
      if (name == 'pms') {
        if (value.length >= 3) {
            setPms(value);
        } else {
            setPms(null);
        }
     }

      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );
  
  const handleRemoveFilter = useCallback(
    (name, value) => {
    //  console.log("removeval: ",name, value)
    if (name == 'pms') {
      setPms(null)
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
    const deleteRows = tableData.filter(
      (row) => !table.selected.includes(row.id)
    );
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
      router.push(paths.pms.pmss.edit(id));
      console.log("ID", id)
    },
    [router]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
    setPms(null)
  }, []);

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.order.details(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters("pms_status", newValue);
    },
    [handleFilters]
  );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : "lg"}>

        <CustomBreadcrumbs
          heading="List of PMS"
          links={[
            // {
            //   name: 'Dashboard',
            //   href: paths.dashboard.root,
            // },
            {
              name: "PMS",
              href: paths.pms.root,
            },
            { name: "List" },
          ]}
          action={
            <Button
              // component={RouterLink}
              // href={paths.dashboard.user.new}
              href={paths.pms.pmss.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Pms
            </Button>
          }
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          <Tabs
            value={filters.pms_status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) =>
                `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
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
                      ((tab.value === "all" ||
                        tab.value === filters.pms_status) &&
                        "filled") ||
                      "soft"
                    }
                    // color={
                    //   (tab.value === "completed" && "success") ||
                    //   (tab.value === "pending" && "warning") ||
                    //   (tab.value === "cancelled" && "error") ||
                    //   "default"
                    // }
                    color={
                      (tab.value === "development" && "success") ||
                      (tab.value === "production" && "warning") ||
                      (tab.value === "issue" && "error") ||
                      (tab.value === "no data" && "none") ||
                      'default'
                    }
                  >
                    {/* {tab.value === 'all' && _orders.length}
                    {tab.value === 'completed' &&
                      _orders.filter((order) => order.pms_status === 'completed').length} */}

                    {/* {tab.value === 'pending' &&
                      _orders.filter((order) => order.pms_status === 'pending').length}
                    {tab.value === 'cancelled' &&
                      _orders.filter((order) => order.pms_status === 'cancelled').length}
                    {tab.value === 'refunded' &&
                      _orders.filter((order) => order.pms_status === 'refunded').length}
                    {tab.value === 'all' && _orders.length}
                    {tab.value === 'completed' &&
                      _orders.filter((order) => order.pms_status === 'completed').length} */}
                    {/* {tab.value === "all" && _orders.length} */}
                    {tab.value === 'production' && 
                     _orders.filter(
                      (order) =>order.pms_status === "production"
                     ).length}
                    {tab.value === 'development' && 
                     _orders.filter(
                      (order) =>order.pms_status === "development"
                     ).length}
                    {tab.value === 'issue'&& 
                    _orders.filter(
                      (order) =>order.pms_status === "issue"
                     ).length}
                    {tab.value === "nodata" && 
                    _orders.filter(
                      (order) =>order.pms_status === "nodata"
                     ).length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <OrderTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            canReset={canReset}
            onResetFilters={handleResetFilters}
          />

          {canReset && (
            <OrderTableFiltersResult
              filters={filters}
              // onFilters={handleFilters}
              onFilters={handleRemoveFilter}
              //
              onResetFilters={handleResetFilters}
              //
              // results={dataFiltered.length}
              results={data?.totalCount}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <TableContainer sx={{ position: "relative", overflow: "unset" }}>
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
              <Table
                size={table.dense ? "small" : "medium"}
                sx={{ minWidth: 960 }}
              >
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
                      <OrderTableRow
                        key={row.pmsid}
                        row={row}
                        selected={table.selected.includes(row.pmsid)}
                        onSelectRow={() => table.onSelectRow(row.pmsid)}
                        onDeleteRow={() => handleDeleteRow(row.pmsid)}
                        onEditRow={() => handleEditRow(row.pmsid)}
                        onViewRow={() => handleViewRow(row.pmsid)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(
                      table.page,
                      table.rowsPerPage,
                      tableData.length
                    )}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          {/* <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          /> */}
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
            Are you sure want to delete{" "}
            <strong> {table.selected.length} </strong> pms?
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

function applyFilter({ inputData, comparator, filters, dateError }) {
  // const { pms, status, name, startDate, endDate } = filters;

  // const stabilizedThis = inputData.map((el, index) => [el, index]);

  // stabilizedThis.sort((a, b) => {
  //   const order = comparator(a[0], b[0]);
  //   if (order !== 0) return order;
  //   return a[1] - b[1];
  // });

  // inputData = stabilizedThis.map((el) => el[0]);

  // if (pms) {
  //   inputData = inputData.filter(
  //     (order) => order.pms.toLowerCase().indexOf(pms.toLowerCase()) !== -1
  //   );
  // }

  // if (status !== "all") {
  //   inputData = inputData.filter((order) => order.status === status);
  // }

  // if (!dateError) {
  //   if (startDate && endDate) {
  //     inputData = inputData.filter(
  //       (order) =>
  //         fTimestamp(order.createdAt) >= fTimestamp(startDate) &&
  //         fTimestamp(order.createdAt) <= fTimestamp(endDate)
  //     );
  //   }
  // }

  return inputData;
}
