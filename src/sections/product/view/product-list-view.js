'use client';

import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';
// @mui
import Card from '@mui/material/Card';
import { alpha } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Label from 'src/components/label';
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
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// _mock
import { PRODUCT_STOCK_OPTIONS } from 'src/_mock';
// api
import { useGetProducts } from 'src/api/product';
// components
import { useSettingsContext } from 'src/components/settings';
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
} from 'src/components/table';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
//
import ProductTableRow from '../product-table-row';
import ProductTableToolbar from '../product-table-toolbar';
import ProductTableFiltersResult from '../product-table-filters-result';
import { _userList, _roles, _corpNames, _pmss, USER_STATUS_OPTIONS, _status ,PUBLISH_STATUS_OPTIONS } from 'src/_mock';

// ----------------------------------------------------------------------
//Shakirat
// const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];
const STATUS_OPTIONS = [{ value: 'text', label: 'Text' }, ...PUBLISH_STATUS_OPTIONS];



const TABLE_HEAD = [
  { id: 'name', label: 'Corp Name' },
  { id: 'createdAt', label: 'Corp Id', width: 160 },
  { id: 'inventoryType', label: 'Base Scripts', width: 160 },
  { id: 'price', label: '#Clinics', width: 140 },
  { id: 'Status', label: 'Status', width: 110 },
  { id: '', width: 88 },
];

// const PUBLISH_OPTIONS = [
//   { value: 'published', label: 'Published' },
//   { value: 'draft', label: 'Draft' },
// ];
const PUBLISH_OPTIONS = [
  { value: 'Text', label: 'Text' },
  { value: 'Active', label: 'Active' },
  { value: 'Retired', label: 'Retired' },
];

const defaultFilters = {
  // name: '',
  corp_Name: '',
  publish: [],
  stock: [],
  corpStatus: [],
};

// ----------------------------------------------------------------------

export default function ProductListView() {
  const router = useRouter();

  const table = useTable();

  const settings = useSettingsContext();

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const { products, productsLoading, productsEmpty } = useGetProducts();

  const confirm = useBoolean();

  useEffect(() => {
    if (products.length) {
      setTableData(products);
    }
  }, [products]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = table.dense ? 60 : 80;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || productsEmpty;

  const handleFilters = useCallback(
    // (name, value) => {
    (corp_Name, value) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        // [name]: value,
        [corp_Name]: value,

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
      router.push(paths.dashboard.product.edit(id));
    },
    [router]
  );
//Shakirat
  const handleFilterStatus = useCallback(
    (event, newValue) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.product.details(id));
    },
    [router]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Corporations"
          links={[
            // { name: 'Dashboard', href: paths.dashboard.root },
            {
              name: 'Corps',
              href: paths.dashboard.product.root,
            },
            // { name: 'List of Corps' },
          ]}
          action={
            <Button
              component={RouterLink}
              // href={paths.dashboard.product.new}
              href={paths.corporations.new}
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
                    {tab.value === 'all' && _userList.length}
                    {tab.value === 'text' &&
                      _userList.filter((user) => user.status === 'text').length}
                    {tab.value === 'active' &&
                      _userList.filter((user) => user.status === 'active').length}
                    {tab.value === 'retired' &&
                      _userList.filter((user) => user.status === 'retired').length}

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
          <ProductTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            stockOptions={PRODUCT_STOCK_OPTIONS}
            // publishOptions={PUBLISH_OPTIONS}
            statusOptions={_status}
          />

          {canReset && (
            <ProductTableFiltersResult
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
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
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
                  {productsLoading ? (
                    [...Array(table.rowsPerPage)].map((i, index) => (
                      <TableSkeleton key={index} sx={{ height: denseHeight }} />
                    ))
                  ) : (
                    <>
                      {dataFiltered
                        .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        .map((row) => (
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
                    </>
                  )}

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
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
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
            Are you sure want to delete <strong> {table.selected.length} </strong> corps?
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
  // const { name, stock, publish } = filters;
  const { corp_Name, stock, publish, corpStatus } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  // if (name) {
  //   inputData = inputData.filter(
  //     (product) => product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
  //   );
  // }

  if (corp_Name) {
    inputData = inputData.filter(
      (product) => product.corp_Name.toLowerCase().indexOf(corp_Name.toLowerCase()) !== -1
    );
  }

  if (stock.length) {
    inputData = inputData.filter((product) => stock.includes(product.inventoryType));
  }
  // if (publish.length) {
  //   inputData = inputData.filter((product) => publish.includes(product.publish));
  // }

  if (corpStatus) {
    inputData = inputData.filter(
      (product) => product.corpStatus
    );
  }
  return inputData;
}
