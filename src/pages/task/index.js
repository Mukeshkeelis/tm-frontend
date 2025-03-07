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
import { deleteData, fetchData } from "../Utils/Baseurl";
import { useMaterialUIController, setLoader, setPopup } from "../../context";
import ConfirmationDialog from "../../components/Dialog/ConfirmationDialog";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add'
import FilterListIcon from '@mui/icons-material/FilterAlt'

const TaskAssigned = () => {

    const [controller, dispatch] = useMaterialUIController()

    // const [employeeList, setEmployeeList] = useState([]);
    const [tasks, setTasks] = useState([])

    const [filteredTasks, setFilteredTasks] = useState([])

    const [filterObj, setFilterObj] = useState({})

    // const [projectNames, setProjectNames] = useState([]);

    const [deleteProp, setDeleteProp] = useState({ isOpen: false, id: null })

    const navigate = useNavigate()

    const [state, setState] = useState({
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
        project_name: { label: '', value: 0 },
        priority: { value: 0, label: '' },
        progress: { value: 0, label: '' },
        assigned_employee_name: { value: 0, label: '' }
    });

    const [filterToggle, setFilterToggle] = useState(false)

    // const employees = [
    //     { id: 1, name: "Balachandar" },
    //     { id: 2, name: "Vijay" },
    //     { id: 3, name: "Mani" },
    //     { id: 4, name: "Dhanasekar" }
    // ];

    const taskList = {
        columns: [
            // {
            //     field: "no",
            //     headerName: "No",
            //     flex: 1,
            //     disableColumnMenu: true,
            //     editable: false,
            // },
            {
                field: "assigned_employee_name",
                headerName: "Employee Name",
                flex: 1,
                disableColumnMenu: true,
                editable: false,
            },
            {
                field: "project_name",
                headerName: "Project Name",
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
            {
                field: "actions",
                headerName: "Actions",
                flex: 1,
                disableColumnMenu: true,
                editable: false,
            },

        ],
    };

    const handleFilterToggle = () => {
        if (filterToggle) {
            setFilteredTasks(tasks)
            setFilterToggle(false)
            setFilterObj({})
            setState({...state, 
                project_name: {value: 0, label: ''},
                priority: {value: 0, label: ''},
                progress: {value: 0, label: ''},
                assigned_employee_name: {value: 0, label: ''}
            })
        }
        else {
            setFilterToggle(true)
        }
    }

    const getTasks = async () => {
        setLoader(dispatch, true)
        try {
            let response = await fetchData('/createTask/')
            setTasks(response.data)
            setFilteredTasks(response.data)
            setLoader(dispatch, false)
        }
        catch (err) {
            setLoader(dispatch, false)
            setPopup(dispatch, { message: 'Failed to get tasks', mode: 'error' })
        }
    }

    const handleTasksChange = (event, selectEvent) => {
        let newObj = filterObj
        newObj = {...newObj, [selectEvent.name]: event.label}
        setFilterObj(newObj)

        const newFilteredTasks = tasks.filter(task =>{
            for(let key in newObj){
                if(newObj[key] !== task[key]){
                    return false
                }
            }
            return true
        })

        setFilteredTasks(newFilteredTasks)
        setState({ ...state, [selectEvent.name]: event })
    };

    // const handleEmployeeChange = (event, selectEvent) => {
    //     const selectedEmployee = event;
    //     console.log("event.target", selectedEmployee)
    //     setState((prevState) => ({
    //         ...prevState,
    //         employeeName: selectedEmployee,
    //         employeeNameStatus: selectedEmployee ? "success" : "error",
    //     }))
    // };

    const handleAddTask = () => {
        navigate('/task/task-action')
    }

    const handleEditTask = (id) => {
        navigate('/task/task-action', {
            state: { id }
        })
    }

    const handleOpenDeleteProp = (id) => {
        setDeleteProp({ isOpen: true, id })
    }

    const handleCloseDeleteProp = () => {
        setDeleteProp({ isOpen: false, id: null })
    }

    const handleDeleteTask = async () => {
        setLoader(dispatch, true)
        try {
            let response = await deleteData(`/createTask/${deleteProp.id}/`)
            setPopup(dispatch, { message: 'Task deleted successfully', mode: 'success' })

            let newFilteredTasks = filteredTasks.filter(task => task.id !== deleteProp.id)
            setFilteredTasks(newFilteredTasks)

            setDeleteProp({ isOpen: false, id: null })
            setLoader(dispatch, false)
        }
        catch (err) {
            setLoader(dispatch, false)
            setPopup(dispatch, { message: 'Failed to delete task', mode: 'error' })
        }
    }

    // const exportToExcel = () => {
    //     // const worksheet = XLSX.utils.json_to_sheet(filteredEmployeeList);
    //     // const workbook = XLSX.utils.book_new();
    //     // XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Tasks");
    //     // XLSX.writeFile(workbook, "Employee_Tasks.xlsx");
    //     // console.log(worksheet, "worksheet")
    // };

    useEffect(() => {
        getTasks()
    }, []);

    return (
        <DashboardLayout>
            <Card>
                <CardContent>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <Stack direction="column" pt={3} pb={0} spacing={0}>
                            <MaterialTypography variant="h4" fontWeight="medium">
                                Task
                            </MaterialTypography>
                            <MaterialTypography variant="caption" color="text">
                                List of tasks
                            </MaterialTypography>

                        </Stack>
                        {/* <MaterialTypography variant="caption" color="text">
                    List of employee that you can get details of employees.
                </MaterialTypography> */}
                        <Stack display={'flex'} flexDirection={'row'}>
                            <IconButton onClick={handleFilterToggle} sx={{
                                marginRight: '0.5rem',
                                bgcolor: filterToggle ? '#f1c760 !important' : 'white !important',
                                color: filterToggle ? 'white !important' : '#f1c760 !important',
                                boxShadow: 2
                            }}
                            >
                                <FilterListIcon />
                            </IconButton>
                            <MaterialButton
                                variant="gradient"
                                color="dark"
                                size="small"
                                startIcon={<AddIcon />}
                                onClick={handleAddTask}
                            >
                                Add Task
                            </MaterialButton>
                        </Stack>
                    </Stack>

                    {filterToggle ? <Grid2 container spacing={1} mt={2}>
                        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                            <Stack direction='column' spacing={1}>
                                <MaterialTypography variant='caption' color='text'>Project Name</MaterialTypography>
                                <MaterialSelect
                                    name="project_name"
                                    value={state.project_name}
                                    onChange={handleTasksChange}
                                    options={tasks.filter((task, index, self) => index === self.findIndex(t => t.project_name === task.project_name)).map((task) => {
                                        return {
                                            value: task.project_name,
                                            label: task.project_name,
                                        };
                                    })}
                                />
                            </Stack>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                            <Stack direction='column' spacing={1}>
                                <MaterialTypography variant='caption' color='text'>Employee Name</MaterialTypography>
                                <MaterialSelect
                                    name="assigned_employee_name"
                                    value={state.assigned_employee_name}
                                    onChange={handleTasksChange}
                                    options={tasks.filter((task, index, self) => index === self.findIndex(t => t.assigned_employee_name === task.assigned_employee_name)).map((task) => {
                                        return {
                                            value: task.assigned_employee_name,
                                            label: task.assigned_employee_name,
                                        };
                                    })}
                                />
                            </Stack>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                            <Stack direction='column' spacing={1}>
                                <MaterialTypography variant='caption' color='text'>Priority</MaterialTypography>
                                <MaterialSelect
                                    name="priority"
                                    value={state.priority}
                                    onChange={handleTasksChange}
                                    options={tasks.filter((task, index, self) => index === self.findIndex(t => t.priority === task.priority)).map((task) => {
                                        return {
                                            value: task.priority,
                                            label: task.priority,
                                        };
                                    })}
                                />
                            </Stack>
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
                            <Stack direction='column' spacing={1}>
                                <MaterialTypography variant='caption' color='text'>Progress</MaterialTypography>
                                <MaterialSelect
                                    name="progress"
                                    value={state.progress}
                                    onChange={handleTasksChange}
                                    options={tasks.filter((task, index, self) => index === self.findIndex(t => t.progress === task.progress)).map((task) => {
                                        return {
                                            value: task.progress,
                                            label: task.progress,
                                        };
                                    })}
                                />
                            </Stack>
                        </Grid2>
                        {/* <Grid2 size={{ xs: 12, sm: 6, md: 2 }} ml={'auto'}>
                            <MaterialBox display="flex" justifyContent={{ md: "flex-end" }} mt={2}>
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
                    </Grid2> : ''}

                    <Grid2 container spacing={1} mt={1}>
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
                        rows={filteredTasks.map((task, index) => {
                            return { no: index + 1, ...task }
                        })}
                        columns={taskList.columns}
                        checkboxSelection={false}
                        isSelectable={true}
                        loading={taskList.length === 0}
                        onEdit={handleEditTask}
                        onDelete={handleOpenDeleteProp}
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
            <ConfirmationDialog
                open={deleteProp.isOpen}
                showCancel={true}
                showConfirm={true}
                title="Confirm Deletion"
                message="Are you sure you want to delete this record?"
                onConfirm={handleDeleteTask}
                onCancel={handleCloseDeleteProp}
            />
        </DashboardLayout>
    );
};

export default TaskAssigned;