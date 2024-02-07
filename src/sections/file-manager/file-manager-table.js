import PropTypes from 'prop-types';
// import { useEffect, useState, useCallback } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import { tableCellClasses } from '@mui/material/TableCell';
import { tablePaginationClasses } from '@mui/material/TablePagination';
// components
import Iconify from 'src/components/iconify';
import {
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
//
import FileManagerTableRow from './file-manager-table-row';

// ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'name', label: 'Name' },
//   { id: 'size', label: 'Size', width: 120 },
//   { id: 'type', label: 'Type', width: 120 },
//   { id: 'modifiedAt', label: 'Modified', width: 140 },
//   { id: 'shared', label: 'Shared', align: 'right', width: 140 },
//   { id: '', width: 88 },
// ];
const TABLE_HEAD = [
  { id: 'id', label: 'Jail Name' },
  { id: 'id', label: 'Clinic' },
  { id: 'id', label: 'Last Modified', width: 120 },
  // { id: 'id', label: 'PMS', width: 120 },
  // { id: 'id', label: 'Active', width: 120 },
  // { id: 'id', label: 'Status', width: 140 },
  // { id: 'id', label: 'Stage', align: 'right', width: 140 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export default function FileManagerTable({
  dta,
  table,
  tableData,
  notFound,
  onDeleteRow,
  dataFiltered,
  onOpenConfirm,
  ftype,
}) {
  const theme = useTheme();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = table;

  const denseHeight = dense ? 58 : 78;

  return (
    
    <>
      <Box
        sx={{
          position: 'relative',
          m: theme.spacing(-2, -3, -3, -3),
        }}
      >
        <TableSelectedAction
          dense={dense}
          numSelected={selected.length}
          rowCount={tableData.length}
          onSelectAllRows={(checked) =>
            onSelectAllRows(
              checked,
              tableData.map((row) => row.id)
            )
          }
          action={
            <>
              <Tooltip title="Share">
                <IconButton color="primary">
                  <Iconify icon="solar:share-bold" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton color="primary" onClick={onOpenConfirm}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            </>
          }
          sx={{
            pl: 1,
            pr: 2,
            top: 16,
            left: 24,
            right: 24,
            width: 'auto',
            borderRadius: 1.5,
          }}
        />

        <TableContainer
          // sx={{
          //   p: theme.spacing(0, 3, 3, 3),
          // }}
          sx={{ position: 'relative', overflow: 'unset' }}
        >
          <Table
            size={dense ? 'small' : 'medium'}
            sx={{
              minWidth: 960,
              borderCollapse: 'separate',
              borderSpacing: '0 16px',
            }}
          >
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={tableData.length}
              numSelected={selected.length}
              onSort={onSort}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              sx={{
                [`& .${tableCellClasses.head}`]: {
                  '&:first-of-type': {
                    borderTopLeftRadius: 12,
                    borderBottomLeftRadius: 12,
                  },
                  '&:last-of-type': {
                    borderTopRightRadius: 12,
                    borderBottomRightRadius: 12,
                  },
                },
              }}
            />

            <TableBody>
              {dataFiltered
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  
                  <FileManagerTableRow
                    key={row.id}
                    row={row}
                    file_type={ftype}
                    selected={selected.includes(row.id)}
                    onSelectRow={() => onSelectRow(row.id)}
                    onDeleteRow={() => onDeleteRow(row.id)}
                  />
                ))}

              {/* <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
              /> */}

              <TableNoData
                notFound={notFound}
                sx={{
                  m: -2,
                  borderRadius: 1.5,
                  border: `dashed 1px ${theme.palette.divider}`,
                }}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <TablePaginationCustom
        // count={dataFiltered.length}
      
        count={dta?.totalCount}
        // page={page}
        page={dta?.currentPage - 1}
        // rowsPerPage={rowsPerPage}
        rowsPerPage={dta?.pageSize}

        // onPageChange={onChangePage}
        onPageChange={onChangePage}

        // onRowsPerPageChange={onChangeRowsPerPage}
        onRowsPerPageChange={onChangeRowsPerPage}
        //
        dense={dense}
        onChangeDense={onChangeDense}
        sx={{
          [`& .${tablePaginationClasses.toolbar}`]: {
            borderTopColor: 'transparent',
          },
        }}
      />
    </>
  );
}

FileManagerTable.propTypes = {
  dataFiltered: PropTypes.array,
  notFound: PropTypes.bool,
  onDeleteRow: PropTypes.func,
  onOpenConfirm: PropTypes.func,
  table: PropTypes.object,
  tableData: PropTypes.array,
};
