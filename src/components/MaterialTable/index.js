import { useMemo, useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-table components
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";

// @mui material components
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";

import MaterialBox from "../MaterialBox";
import MaterialTypography from "../MaterialTypography";
import MaterialInput from "../MaterialInput";
import MaterialPagination from "../MaterialPagination";
import MaterialButton from "../MaterialButton";
import DataTableHeadCell from "./MaterialTableHeadCell";
import DataTableBodyCell from "./MaterialTableBodyCell";
import MaterialSelect from "../MasterSelect";

/**
 * Material Table is a component that renders a table with features like
 * filtering, sorting, and pagination. It uses the `react-table` library
 * under the hood.
 *
 * @param {object} props Component props
 * @param {string} [props.title] Title of the table
 * @param {object} [props.entriesPerPage] Entries per page options
 * @param {boolean} [props.entriesPerPage.defaultValue] Default value for the entries per page
 * @param {array} [props.entriesPerPage.entries] Entries per page options
 * @param {boolean} [props.canSearch] Whether to show the search input
 * @param {boolean} [props.showTotalEntries] Whether to show the total number of entries
 * @param {object} props.table Table configuration
 * @param {array} props.table.columns Table columns configuration
 * @param {array} props.table.rows Table rows data
 * @param {boolean} [props.pagination] Whether to show the pagination
 * @param {string} [props.pagination.variant] Pagination variant
 * @param {string} [props.pagination.color] Pagination color
 * @param {boolean} [props.isSorted] Whether the table is sorted
 * @param {boolean} [props.noEndBorder] Whether to remove the border from the last row
 *
 * @returns A component that renders a table with features like filtering, sorting, and pagination
 */

function MaterialTable({
  title,
  entriesPerPage,
  canSearch,
  showTotalEntries,
  table,
  pagination,
  isSorted,
  noEndBorder
}) {
  const defaultValue = entriesPerPage.defaultValue ? entriesPerPage.defaultValue : 10;
  const entries = entriesPerPage.entries ? entriesPerPage.entries : [5, 10, 15, 20, 25];
  const columns = useMemo(() => table.columns, []);
  const data = useMemo(() => table.rows, []);

  const tableInstance = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  // Set the entries per page value based on the select value
  const setEntriesPerPage = ({ value }) => setPageSize(value);

  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <MaterialPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {option + 1}
    </MaterialPagination>
  ));


  /**
   * Handles the input change for the pagination input
   * @param {{ target: { value: string } }} event - The event object from the input change
   * @returns {void} - Nothing
   */
  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0 ? gotoPage(0) : gotoPage(Number(value));

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);

  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) => gotoPage(Number(value.value - 1));

  // Search input value state
  const [search, setSearch] = useState(globalFilter);
  const [alertDialog, setAlertDialog] = useState({
    show: false,
    title: "",
    message: ""
  });

  // Search input state handle
  const onSearchChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 100);

  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue;

    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }

    return sortedValue;
  };

  // Setting the entries starting point
  const entriesStart = pageIndex === 0 ? pageIndex + 1 : pageIndex * pageSize + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (pageIndex === 0) {
    entriesEnd = pageSize;
  } else if (pageIndex === pageOptions.length - 1) {
    entriesEnd = rows.length;
  } else {
    entriesEnd = pageSize * (pageIndex + 1);
  }

  return (
    <>
      {
        alertDialog && alertDialog.show ?
          <>
            <Dialog open={alertDialog.show} maxWidth="sm" fullWidth >
              <DialogTitle>
                <MaterialTypography variant="body1" >
                  {alertDialog.title}
                </MaterialTypography>
              </DialogTitle>
              <DialogContent>
                <MaterialTypography variant="body2" >
                  {alertDialog.message}
                </MaterialTypography>
              </DialogContent>
              <DialogActions>
                <MaterialButton
                  color='success'
                  variant='text'
                  onClick={() =>
                    setAlertDialog({
                      show: false,
                      title: "",
                      message: ""
                    })
                  }>
                  Close
                </MaterialButton>
              </DialogActions>
            </Dialog>
          </>
          :
          null
      }
      <TableContainer sx={{ boxShadow: "none" }}>
        <MaterialBox p={2}>
          <MaterialTypography color='dark' variant="subTitle2" fontWeight='bold'>{title}</MaterialTypography>
        </MaterialBox>
        {entriesPerPage || canSearch ? (
          <MaterialBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            {entriesPerPage && (
              <MaterialBox display="flex" alignItems="center">
                <MaterialSelect
                  defaultValue={{ value: defaultValue, label: defaultValue }}
                  options={entries.map((entry) => ({ value: entry, label: entry }))}
                  onChange={setEntriesPerPage}
                  size="small"
                />
                <MaterialTypography variant="caption" color="secondary">
                  &nbsp;&nbsp;entries per page
                </MaterialTypography>
              </MaterialBox>
            )}
            {canSearch && (
              <MaterialBox width="12rem" ml="auto">
                <MaterialInput
                  placeholder="Search..."
                  value={search}
                  onChange={({ currentTarget }) => {
                    // setSearch(search);
                    onSearchChange(currentTarget.value);
                  }}
                />
              </MaterialBox>
            )}
          </MaterialBox>
        ) : null}
        <Table {...getTableProps()}>
          <MaterialBox component="thead">
            {headerGroups.map((headerGroup, key) => (
              <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, key) => (
                  <DataTableHeadCell
                    key={key}
                    {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
                    width={column.width ? column.width : "auto"}
                    align={column.align ? column.align : "left"}
                    sorted={setSortedValue(column)}
                  >
                    {column.render("Header")}
                  </DataTableHeadCell>
                ))}
              </TableRow>
            ))}
          </MaterialBox>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, key) => {
              prepareRow(row);
              return (
                <TableRow
                  // here we calling the function
                  // sx={{ cursor: "pointer" }}
                  // onClick={(e) => {
                   
                  // }}
                  key={key} {...row.getRowProps()}
                >
                  {row.cells.map((cell, key) => (
                    <DataTableBodyCell
                      key={key}
                      noBorder={noEndBorder && rows.length - 1 === key}
                      align={cell.column.align ? cell.column.align : "left"}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </DataTableBodyCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <MaterialBox
          display="flex"
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
        >
          {showTotalEntries && (
            <MaterialBox mb={{ xs: 3, sm: 0 }}>
              <MaterialTypography variant="button" color="secondary" fontWeight="regular">
                Showing {entriesStart} to {entriesEnd} of {rows.length} entries
              </MaterialTypography>
            </MaterialBox>
          )}
          {pageOptions.length > 1 && (
            <MaterialPagination
              variant={pagination.variant ? pagination.variant : "gradient"}
              // color={pagination.color ? pagination.color : "info"}
              color="dark"
            >
              {canPreviousPage && (
                <MaterialPagination item onClick={() => previousPage()}>
                  <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
                </MaterialPagination>
              )}
              {renderPagination.length > 6 ? (
                <MaterialBox width="5rem" mx={1}>
                  <MaterialInput
                    inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                    value={customizedPageOptions[pageIndex]}
                    onChange={(handleInputPagination, handleInputPaginationValue)}
                  />
                </MaterialBox>
              ) : (
                renderPagination
              )}
              {canNextPage && (
                <MaterialPagination item onClick={() => nextPage()}>
                  <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
                </MaterialPagination>
              )}
            </MaterialPagination>
          )}
        </MaterialBox>
      </TableContainer>
    </>
  );
}

// Typechecking props for the MaterialTable
MaterialTable.propTypes = {
  title: PropTypes.string,
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      defaultValue: PropTypes.number,
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
};

export default MaterialTable;