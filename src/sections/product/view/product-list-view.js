"use client";

import isEqual from "lodash/isEqual";
import { useState, useEffect, useCallback } from "react";
// @mui
import Card from "@mui/material/Card";
import { alpha } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Label from "src/components/label";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
// routes
import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";
import { RouterLink } from "src/routes/components";
// hooks
import { useBoolean } from "src/hooks/use-boolean";
// _mock
import { PRODUCT_STOCK_OPTIONS } from "src/_mock";
// _mock
import { _products, PRODUCT_STATUS_OPTIONS } from "src/_mock";
// api
import { useGetProducts } from "src/api/product";
import useSWR from 'swr';
import { $get, endpoints} from 'src/utils/axios';
// components
import { useSettingsContext } from "src/components/settings";
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from "src/components/table";
import Iconify from "src/components/iconify";
import Scrollbar from "src/components/scrollbar";
import { ConfirmDialog } from "src/components/custom-dialog";
import CustomBreadcrumbs from "src/components/custom-breadcrumbs";
//
import ProductTableRow from "../product-table-row";
import ProductTableToolbar from "../product-table-toolbar";
import ProductTableFiltersResult from "../product-table-filters-result";
import {
  _userList,
  _roles,
  _corpNames,
  _pmss,
  _status,
  PUBLISH_STATUS_OPTIONS,
} from "src/_mock";

// ----------------------------------------------------------------------
//Shakirat
// const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];
const STATUS_OPTIONS = [
  ...PRODUCT_STATUS_OPTIONS,
];

const TABLE_HEAD = [
  { id: "corp_name", label: "Corps Name" },
  { id: "corp_id", label: "Corps ID", width: 180 },
  { id: "corp_scr_name", label: "Base Scripts", width: 180 },
  { id: "corp_num", label: "#Clinics", width: 160 },
  { id: "status", label: "Status", width: 130 },
  { id: "", width: 88 },
];

// const PUBLISH_OPTIONS = [
//   { value: 'published', label: 'Published' },
//   { value: 'draft', label: 'Draft' },
// ];

export const PUBLISH_OPTIONS = [
  {
    value: "Text",
    label: "Text",
  },
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Retired",
    label: "Retired",
  },
];
//Addedby Shakirat
export const STOCK_OPTIONS = [
  {
    value: "US",
    label: "US",
  },
  {
    value: "Canada",
    label: "Canada",
  },
];

const defaultFilters = {
  // name: '',
  corp_name: "",
  // publish: [],
  status: [],
  // stock: [],
  corp_id: [],
  corp_status: "all",

};
// console.log("Corp_id: " + corp_id)

// ----------------------------------------------------------------------

export default function ProductListView() {
  // const [tableData, setTableData] = useState([]);

  const [pageIndex, setPageIndex] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [corpName, setCorpName] = useState([]);
  
  // const URL = `${endpoints.clinic_manager.clinic_data}?pageNumber=${pageIndex}`;
  const URL = `${endpoints.product.corp_data}?${ corpName != null ? `search=${corpName}&` : ''}$pageNumber=${pageIndex}`;
  const { data, error, isLoading } = useSWR(URL,$get,{onSuccess: ()=>{
    console.log("-------------------")
    console.log("CORPORATION PAGE DATA: ", data || [])
    console.log("CORPS", data?.items || 0)
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
    setTableData(data?.items || [])
  }, [data])
 
  useEffect(()=>{
    setPageIndex(table.page + 1)
  }, [table.page])

  const router = useRouter();

  const settings = useSettingsContext();

  const [filters, setFilters] = useState(defaultFilters);
  
  const confirm = useBoolean();
  // const { products, productsLoading, productsEmpty } = useGetProducts();

  

  // useEffect(() => {
  //   if (products.length) {
  //     setTableData(products);
  //   }
  //   console.log(products);
  // }, [products]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  // const denseHeight = table.dense ? 60 : 80;
  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  // const notFound = (!dataFiltered.length && canReset) || productsEmpty;
  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilters = useCallback(
    // (name, value) => {
    (name, value) => {
      console.log("nameval------------: ",name, value)
        
      if(name == 'corp_name'){
        if(value.length >= 3)
            setCorpName(value);
        else
            setCorpName(null);
      }

      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        // [name]: value,
        [name]: value,
      }));
    },
    [table]
  );
  
  const handleRemoveFilter = useCallback(
    (name, value) => {
    //  console.log("removeval: ",name, value)
     if(value == 'corp_name'){
      setCorpName(null)
     }
      // else if(name == 'corp_name'){
      //     setCorpName(null)
      // }

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
      router.push(paths.corporations.corp.edit(id));
    },
    [router]
  );
  //Shakirat
  const handleFilterStatus = useCallback(
    (event, newValue) => {
      // handleFilters("status", newValue);
      handleFilters("pms_status", newValue);
    },
    [handleFilters]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.corporations.corp.details(id));
    },
    [router]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
    setCorpName(null)
  }, []);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : "lg"}>
        <CustomBreadcrumbs
          heading="Corporations"
          links={[
            // { name: 'Dashboard', href: paths.dashboard.root },
            { name: "Corps", href: paths.corporations.root },
            // { name: 'List of Corps' },
          ]}
          action={
            <Button
              // href={paths.corporations.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Corps
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <Tabs
            value={filters.corp_status}
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
                        tab.value === filters.corp_status) &&
                        "filled") ||
                      "soft"
                    }
                    color={
                      (tab.value === "active" && "success") ||
                      (tab.value === "text" && "warning") ||
                      (tab.value === "retired" && "error") ||
                      "default"
                    }
                  >
                    {tab.value === "all" && _products.length}
                    {tab.value === "text" &&
                      _products.filter(
                        (product) => product.corp_status === "text"
                      ).length}
                    {tab.value === "active" &&
                      _products.filter(
                        (product) => product.corp_status === "active"
                      ).length}
                    {tab.value === "retired" &&
                      _products.filter((product) => product.corp_status === "retired")
                        .length}
                   
                  </Label>
                }
              />
            ))}
          </Tabs>
          <ProductTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            stockOptions={STOCK_OPTIONS}
            publishOptions={PUBLISH_OPTIONS}
          />

          {canReset && (
            <ProductTableFiltersResult
              filters={filters}
              onFilters={handleRemoveFilter}
              //
              onResetFilters={handleResetFilters}
              //
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
                  {/* {productsLoading ? (
                    [...Array(table.rowsPerPage)].map((i, index) => (
                      <TableSkeleton key={index} sx={{ height: denseHeight }} />
                    ))
                  ) : ( */}
                    
                      {dataFiltered
                        // .slice(
                        //   table.page * table.rowsPerPage,
                        //   table.page * table.rowsPerPage + table.rowsPerPage
                        // )
                        .map((row) => (
                          // console.log("Row Data:", row);
                          // return (
                            <ProductTableRow
                              key={row.id}
                              row={row}
                              selected={table.selected.includes(row.id)}
                              onSelectRow={() => table.onSelectRow(row.id)}
                              onDeleteRow={() => handleDeleteRow(row.id)}
                              onEditRow={() => handleEditRow(row.id)}
                              onViewRow={() => handleViewRow(row.id)}
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
            <strong> {table.selected.length} </strong> corps?
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
  // const { name, stock, publish, corp_Name } = filters;
//   const { corp_name, corp_id, status } = filters;

//   const stabilizedThis = inputData.map((el, index) => [el, index]);

//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });

//   inputData = stabilizedThis.map((el) => el[0]);

//   // if (name) {
//   //   inputData = inputData.filter(
//   //     (product) => product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
//   //   );
//   // }
// // if (corp_name) {
//   if (corp_name) {
//     inputData = inputData.filter(
//       (product) =>
//         product.corp_name.toLowerCase().indexOf(corp_name.toLowerCase()) !== -1
//     );
//   }

//   // if (stock.length) {
//   //   inputData = inputData.filter((product) => stock.includes(product.inventoryType));
//   // }
//   if (status.length) {
//     inputData = inputData.filter((product) => status.includes(product.status));
//   }

//   // if (publish.length) {
//   //   inputData = inputData.filter((product) => publish.includes(product.publish));
//   // }
//   if (status.length) {
//     inputData = inputData.filter((product) => status.includes(product.status));
//   }

//   if (status) {
//     inputData = inputData.filter((product) => product.status);
//   }
  return inputData;
}
