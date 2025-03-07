import { DataGrid, GridPagination } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Chip, CircularProgress, IconButton, LinearProgress, Stack } from "@mui/material";
import MaterialBox from "../MaterialBox";
import MaterialInput from "../MaterialInput";
import SearchIcon from "@mui/icons-material/Search";
import CustomizedPagination from "./components/CustomPagination";
import MaterialTypography from "../MaterialTypography";
import { Info } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';

function CustomPagination(props) {
  return <GridPagination ActionsComponent={CustomizedPagination} {...props} />;
}

const MaterialDataGrid = ({
  rows,
  columns,
  isSearch,
  checkboxSelection,
  onRowClick,
  customHeight,
  loading,
  localeText,
  isSelectable,
  noSearch,
  noPagination,
  subTab,
  view,
  onView, // Receive the onView function
  onEdit, // Receive the onEdit function
  onDelete, // Receive the onDelete function
  onStart,
  onStop
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchText && searchText.length > 1) {
      const timeoutId = setTimeout(() => {
        getSearchDetails(searchText);
      });
      return () => clearTimeout(timeoutId);
    } else {
      return;
    }
  }, [searchText]);

  const scrolltoId = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView();
  };

  const getSearchDetails = async (searchText, page) => {
    setSearchResults([]);
    setIsLoading(true);
    scrolltoId("search");
    if (!hasSearched) setHasSearched(true);
  };

  const columnsData = columns.map((column) => {
    return {
      field: column.field,
      headerName: (
        <MaterialTypography
          variant="caption"
          color="black"
          fontWeight="mediumn"
          sx={({ typography: { size } }) => ({
            fontSize: size.sm,
          })}
        >
          {column.headerName}
        </MaterialTypography>
      ),
      flex: column.flex,
      width: column.width,
      disableColumnMenu: true,
      sortable: column.sortable ? column.sortable : false,
      renderCell: (params) =>
        column.type === "status" ? (
          <Stack direction="row" alignItems="center" textAlign="center" gap={1} mt={1.5}>
            <Chip
              label={params.row.status?.label}
              size="small"
              icon={params.row.status?.icon || <Info />}
              color={params.row.status?.color}
            />
          </Stack>
        ) : column.type === "images" ? (
          <img
            src={params.row.logo_url}
            alt="Logo"
            style={{ width: 50, height: 50, objectFit: 'cover' }}
          />
        ) : column.field === "actions" ? (
          <Stack direction="row" spacing={1}>
            {view === true && <IconButton onClick={() => onView(params.row.id)}>
              <VisibilityIcon />
            </IconButton>}
            <IconButton onClick={() => onEdit(params.row.id)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        ) : column.field === "startAction" ? (
          <Stack direction="row" spacing={1}>
            {view === true && <IconButton onClick={() => onView(params.row.id)}>
              <VisibilityIcon />
            </IconButton>}
            <IconButton onClick={() => onStart(params.row.id)}>
              <PlayCircleFilledWhiteOutlinedIcon />
            </IconButton>
            <IconButton onClick={() => onStop(params.row.id)}>
              <StopCircleOutlinedIcon />
            </IconButton>
          </Stack>
        ) : (
          <MaterialTypography
            variant="caption"
            color="dark"
            sx={({ typography: { size } }) => ({
              fontSize: size.sm,
            })}
          >
            {params.row[column.field]}
          </MaterialTypography>
        ),
    };
  });


  return (
    <MaterialBox >
      <Grid container spacing={2} p={1}>
        <Grid size={{ xs: 12, sm: 9 }}>
          {subTab && <MaterialBox>{subTab}</MaterialBox>}
        </Grid>
        {isSearch && <Grid size={{ xs: 12, sm: 3 }}>
          <MaterialBox >
            {noSearch ? null : (
              <MaterialInput
                autoFocus
                label="Search"
                placeholder="Search..."
                fullWidth
                variant="outlined"
                size="medium"
                icon={
                  isLoading
                    ? {
                      direction: "right",
                      component: <CircularProgress color="success" size={18} />,
                    }
                    : {
                      direction: "right",
                      component: <SearchIcon color="action" fontSize="small" />,
                    }
                }
              />
            )}
          </MaterialBox>
        </Grid>}
      </Grid>
      <MaterialBox style={{ height: customHeight || 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columnsData}
          style={{ border: 0, cursor: onRowClick && "pointer", }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          slots={{
            pagination: noPagination ? null : CustomPagination,
            loadingOverlay: (props) => <LinearProgress color="dark" {...props} />,
          }}
          loading={loading}
          checkboxSelection={checkboxSelection}
          disableRowSelectionOnClick
          rowsPerPageOptions={[25, 50, 100]}
          onRowClick={onRowClick}
          isSelectable={isSelectable}
          density="standard"
          disableColumnMenu
          localeText={localeText}
        />
      </MaterialBox>
    </MaterialBox>
  );
};

MaterialDataGrid.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  checkboxSelection: PropTypes.bool,
  isSelectable: PropTypes.bool,
  loading: PropTypes.bool,
  noSearch: PropTypes.bool,
  noPagination: PropTypes.bool,
  onRowClick: PropTypes.func,
  localeText: PropTypes.object,
  subTab: PropTypes.node,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default MaterialDataGrid;
