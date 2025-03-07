import React, { useState, useEffect } from "react";
import DashboardLayout from "../../layoutcontainers/DashboardLayout";
import {
  Card,
  CardContent,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import MaterialDataGrid from "../../components/MaterialDataGrid";
import MaterialSelect from "../../components/MasterSelect";
import MaterialTypography from "../../components/MaterialTypography";
import MaterialBox from "../../components/MaterialBox";
import MaterialButton from "../../components/MaterialButton";
import * as XLSX from "xlsx";
import MaterialInput from "../../components/MaterialInput";
import { StarRateSharp } from "@mui/icons-material";
import { fetchData } from "../Utils/Baseurl";
import { useMaterialUIController, setLoader, setPopup } from "../../context";

const TaskAssigned = () => {

  const [controller, dispatch]  = useMaterialUIController()
  
  const [filteredTasks, setFilteredTasks] = useState([])

  const [state, setState] = useState({
    projectName: {label: '', value: 0},
    employeeName: '',
    department: '',
    fromDate: '',
    toDate: '',
    //status 
    projectNameStatus: 'unchecked',
    employeeNameStatus: 'unchecked',
    departmentStatus: 'unchecked',
    fromDateStatus: 'unchecked',
    toDateStatus: 'unchecked',
  });

  const [tasks, setTasks] = useState([])

  const taskList = {
    columns: [
      {
        field: "project_name",
        headerName: "Project Name",
        flex: 1,
        disableColumnMenu: true,
        editable: false,
      },
      {
        field: "module_name",
        headerName: "Module",
        flex: 1,
        disableColumnMenu: true,
        editable: false,
      },
      {
        field: "deadline_date",
        headerName: "Deadline",
        flex: 1,
        disableColumnMenu: true,
        editable: false,
      },
      {
        field: "work_item",
        headerName: "Work Item",
        flex: 1,
        editable: false,
        disableColumnMenu: true,
      },
      {
        field: "priority",
        headerName: "Priority",
        flex: 1,
        disableColumnMenu: true,
        editable: false,
      },
      {
        field: "progress",
        headerName: "Progress",
        flex: 1,
        disableColumnMenu: true,
        editable: false,
      },

    ],
  };

  const getTasks = async ( ) =>{
    const id = parseInt(sessionStorage.getItem('id'))
    setLoader(dispatch, true)
    try{
      let response = await fetchData(`/userTaskList/${id}/`)
      setTasks(response.data)
      setLoader(dispatch, false)
    }
    catch(err){
      setLoader(dispatch, false)
      setPopup(dispatch, {message: 'Failed to get tasks', mode: 'error'})
    }
  }

  useEffect(() => {
    getTasks()
  }, []);

  return (
    <DashboardLayout>
      <Card>
        <CardContent>
          <Stack direction='column' spacing={0}>
            <MaterialTypography variant='h5' sx={{ fontWeight: 'bold', mt: 3 }}>Task List</MaterialTypography>
            {/* <MaterialTypography variant='caption' color='text'>You can {location.state ? 'Update' : 'Add'} employee here</MaterialTypography> */}
          </Stack>
    
          <Grid2 container spacing={1} mt={2}>
            {/* <Grid2 size={{ xs: 6, md: 3, sm: 3 }}>
              <MaterialInput
                name="date"
                type="date"
                placeholder="eg 01-01-2025"
                value={state.fromDate}
                // onChange={handleempdetails}
                error={state.fromDateStatus === "error"}
                success={state.toDateStatus === "success"}
              />
            </Grid2>
            <Grid2 size={{ xs: 6, md: 3, sm: 3 }}>
              <MaterialInput
                name="date"
                type="date"
                placeholder="eg 01-01-2025"
                value={state.toDate}
                // onChange={handleempdetails}
                error={state.toDateStatus === "error"}
                success={state.toDateStatus === "success"}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3, md: 3 }}>
              <MaterialButton
                variant="gradient"
                color="dark"
                style={{ maxWidth: '100px', minWidth: '100px' }}
              // onClick={exportToExcel}
              >
                Filter
              </MaterialButton>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 3, md: 3 }}>
              <MaterialBox display="flex" justifyContent={{ md: "flex-end" }}>
                <MaterialButton
                  variant="gradient"
                  color="dark"
                  style={{ maxWidth: '100px', minWidth: '100px' }}
                  onClick={exportToExcel}
                >
                  Excel
                </MaterialButton>
              </MaterialBox>
            </Grid2> */}
          </Grid2>
          <MaterialDataGrid
            rows={tasks}
            columns={taskList.columns}
            checkboxSelection={false}
            isSelectable={true}
            loading={taskList.length === 0}
            localeText={{
              noRowsLabel: (
                <Stack
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  spacing={1}
                >
                  <Typography variant="body2" fontWeight="medium" color="text">
                    No task found
                  </Typography>
                  <Typography variant="caption" color="text">
                    You have not yet added any task details. Select a project to
                    view details.
                  </Typography>
                </Stack>
              ),
            }}
          />
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default TaskAssigned;
