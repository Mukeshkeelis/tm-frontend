import React, { useEffect, useState } from "react";
import { Card, CardContent, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid2, Stack } from "@mui/material";
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import MaterialTypography from "../../../components/MaterialTypography";
import MaterialDataGrid from "../../../components/MaterialDataGrid";
import DashboardLayout from "../../../layoutcontainers/DashboardLayout";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmployeeDashboard = () => {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            projectName: 'HRMS',
            taskName: "Fix UI Bugs",
            assignedDate: "2025-02-25",
            startDate: "2025-02-26",
            endDate: "2025-03-05",
            priority: "High",
            status: "Pending",
            assignedHours: 5,
            timeSpent: 0,
            timerRunning: false,
            elapsedTime: 0,
        },
        {
            id: 2,
            projectName: 'TaskCreation',
            taskName: "Database Optimization",
            assignedDate: "2025-02-20",
            startDate: "2025-02-22",
            endDate: "2025-03-02",
            priority: "Medium",
            status: "In Progress",
            assignedHours: 10,
            timeSpent: 6,
            timerRunning: false,
            elapsedTime: 0,
        },
        {
            id: 3,
            projectName: 'Vizza',
            taskName: "Write API Documentation",
            assignedDate: "2025-02-15",
            startDate: "2025-02-18",
            endDate: "2025-02-28",
            priority: "Low",
            status: "Completed",
            assignedHours: 4,
            timeSpent: 2,
            timerRunning: false,
            elapsedTime: 0,
        },
    ]);
    const [activeTimer, setActiveTimer] = useState(null);
    const [timeInterval, setTimeInterval] = useState({});

    useEffect(() => {
        return () => {
            if (activeTimer) {
                clearInterval(activeTimer);
            }
        }
    }, [activeTimer]);

    const taskStatusCount = {
        Completed: tasks.filter((task) => task.status === "Completed").length,
        InProgress: tasks.filter((task) => task.status === "In Progress").length,
        Overdue: tasks.filter((task) => new Date(task.endDate) < new Date() && task.status !== "Completed").length,
    };

    const chartData = {
        labels: ["Completed", "In Progress", "Overdue"],
        datasets: [
            {
                label: "Task Progress",
                data: [taskStatusCount.Completed, taskStatusCount.InProgress, taskStatusCount.Overdue],
                backgroundColor: ["green", "orange", "red"],
            },
        ],
    };

    //   allTaskAssignedTable
    const allTaskAssignedTable = {
        columns: [
            {
                field: "project_name",
                headerName: "Project Name",
                flex: 1,
                disableColumnMenu: true,
                editable: false,
            },
            {
                field: "task_name",
                headerName: "Task Name",
                flex: 1,
                disableColumnMenu: true,
                editable: false,
            },
            {
                field: "assigned_date",
                headerName: "Assigned Deadline",
                flex: 1,
                disableColumnMenu: true,
                editable: false,
            },
            {
                field: "start_date",
                headerName: "Start Date",
                flex: 1,
                disableColumnMenu: true,
                editable: false,
            },

            {
                field: "end_date",
                headerName: "End Date",
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
                field: "status",
                headerName: "Status",
                flex: 1,
                disableColumnMenu: true,
                editable: false,
            },
            {
                field: "startAction",
                headerName: "Actions",
                flex: 1,
                disableColumnMenu: true,
                editable: false,
            },

        ],

        row: tasks.map((data, index) => {
            return (
                {
                    id: data.id,
                    project_name: data.projectName,
                    task_name: data.taskName,
                    assigned_date: data.assignedDate,
                    start_date: data.startDate,
                    end_date: data.endDate,
                    priority: data.priority,
                    status: data.status,

                }
            )
        })
    };

    //overDueTask
    const overDueTaskTable = {
        columns: [
            {
                field: "project_name",
                headerName: "Project Name",
                flex: 1,
                disableColumnMenu: true,
                editable: false,
            },
            {
                field: "task_name",
                headerName: "Task Name",
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
                field: "start_date",
                headerName: "Start Date",
                flex: 1,
                disableColumnMenu: true,
                editable: false,
            },
            {
                field: "due_date",
                headerName: "Due Date",
                flex: 1,
                disableColumnMenu: true,
                editable: false,
            },

            {
                field: "assigned_hours",
                headerName: "Assigned Hours",
                flex: 1,
                editable: false,
                disableColumnMenu: true,
            },
            {
                field: "time_spent(hrs)",
                headerName: "Time Spent",
                flex: 1,
                disableColumnMenu: true,
                editable: false,
            },

        ],
        row: tasks.map((data, index) => {
            return (
                {
                    id: data.id,
                    project_name: data.projectName,
                    task_name: data.taskName,
                    priority: data.priority,
                    start_date: data.startDate,
                    due_date: data.endDate,
                    assigned_hours: data.assignedHours,
                    // Time_spent:data.timeSpent
                }
            )
        })
    };

    
    //start and stop function

    const onStart = (id) => {
        console.log(id, 'onstartid')
        setTasks((prevtask) => {
            prevtask.map((task) => (
                tasks.id === id && tasks.timerRunning ? {
                    ...tasks,
                    timerRunning: true,
                    timeSpent: task.timeSpent + Math.floor((Date.now() - task.startTime) / 1000),
                    elapsedTime: task.elapsedTime + Math.floor((Date.now() - task.startTime) / 1000),
                } : tasks
            ))
        })

        //set interval
        const timerInterval = setInterval(() => {
            setTasks((prevTasks) => {
                return prevTasks.map((task) =>
                    tasks.id === task.id && task.timerRunning
                        ? {
                              ...tasks,
                              elapsedTime: Math.floor((Date.now() - task.startTime) / 1000), 
                          }
                        : task
                );
            });
        }, 1000); 
    
        setActiveTimer(timerInterval);
        
    }

    const onStop = (id) => {
        clearInterval(activeTimer); 
        setTasks((prevTasks) => {
            return prevTasks.map((task) =>
                task.id === id
                    ? {
                          ...task,
                          timerRunning: false,
                          timeSpent: task.elapsedTime, 
                      }
                    : task
            );
        });
        setActiveTimer(null); 
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const econds = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    };
    

    return (
        <>
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 2, sm: 4 }}>
                    <Card>
                        <CardContent>
                            <MaterialTypography gutterBottom sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                                Task Completion Analytics
                            </MaterialTypography>
                            <div style={{ width: "100%" }}>
                                <Bar data={chartData} />
                            </div>
                        </CardContent>
                    </Card>
                    <Grid2 size={{ xs: 2, sm: 4 }} sx={{ padding: '10px' }}>
                        <Card sx={{ padding: '10px', minWidth: '200px' }}>

                            <MaterialTypography sx={{ fontSize: '14px', fontWeight: 'bold' }}>Timmer</MaterialTypography>
                            <MaterialTypography variant='h4' sx={{ color: '#116D6E' }}>00 : 00 : 00</MaterialTypography>    

                        </Card>
                    </Grid2>
                </Grid2>

                <Grid2 size={{ xs: 10, sm: 8 }}>
                    <Card>
                        <CardContent>
                            <MaterialTypography gutterBottom sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                                Pending and Overdue Tasks
                            </MaterialTypography>
                            <MaterialDataGrid
                                customHeight={200}
                                rows={overDueTaskTable.row}
                                columns={overDueTaskTable.columns}
                                checkboxSelection={false}
                                isSelectable={true}
                                // loading={allTaskAssignedTable.length === 0}
                                localeText={{
                                    noRowsLabel: (
                                        <Stack
                                            direction="column"
                                            alignItems="center"
                                            justifyContent="center"
                                            spacing={1}
                                        >
                                            <MaterialTypography variant="body2" fontWeight="medium" color="text">
                                                No task found
                                            </MaterialTypography>
                                            <MaterialTypography variant="caption" color="text">
                                                You have not yet create any task details.
                                            </MaterialTypography>
                                        </Stack>
                                    ),
                                }}
                            />

                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>

            <Card style={{ marginTop: "20px" }}>
                <CardContent>
                    <MaterialTypography gutterBottom sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                        All Tasks Assigned
                    </MaterialTypography>

                    <MaterialDataGrid
                        rows={allTaskAssignedTable.row}
                        columns={allTaskAssignedTable.columns}
                        checkboxSelection={false}
                        isSelectable={true}
                        onStart={onStart}
                        onStop={onStop}
                        // loading={allTaskAssignedTable.length === 0}  
                        localeText={{
                            noRowsLabel: (
                                <Stack
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    spacing={1}
                                >
                                    <MaterialTypography variant="body2" fontWeight="medium" color="text">
                                        No task found
                                    </MaterialTypography>
                                    <MaterialTypography variant="caption" color="text">
                                        You have not yet create any task details.
                                    </MaterialTypography>
                                </Stack>
                            ),
                        }}
                    />
                </CardContent>
            </Card>
        </>
    );
};

export default EmployeeDashboard;


// {task.status === "Pending" && <Button variant="contained">Start Task</Button>}
// {task.status === "In Progress" && <Button variant="contained">Update Status</Button>}

