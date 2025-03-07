import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {Box,  Grid2, Card, CardContent, Stack } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import MaterialTypography from "../../../components/MaterialTypography";
import DashboardLayout from "../../../layoutcontainers/DashboardLayout";
import MaterialDataGrid from "../../../components/MaterialDataGrid";
import { fetchData } from "../../Utils/Baseurl";
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
    const [deadlineEvent, setDeadlineEvent] = useState(false);
 
    const projectDetails = [
      { id: 1, name: 'HRMS', priority: 'High', asignedHours: '55', employeeCount: '4' },
      { id: 2, name: 'StoryBuzz', priority: 'Medium', asignedHours: '60', employeeCount: '5' },
      { id: 3, name: 'Task creation', priority: 'Low', asignedHours: '40', employeeCount: '3' }
    ];
    //Bar chart dataset
    const data = {
      labels: [
        'HRMS',
        'storyBuzz',
        'Task cretaion'
      ],
      datasets: [{
        label: 'Task progress',
        data: [75, 10, 25],
        backgroundColor: [
          '#B7B1F2',
          '#FDB7EA',
          '#FBF3B9'
        ],
        hoverOffset: 4
      }]
    };
    const options = {
      plugins: {
        legend: { display: true }
      },
      // scales: {
      //   y: {
      //     beginAtZero: true
      //   },
      labels: {
        fontSize: '14'
      },
      tooltip: {
        enabled: true
      }
    }
    //----*------//
    //Doughnut chart dataset
   
    const doughnutChartData = {
      taskCompletion: {
        completed: 75,
        pending: 15,
        overdue: 10
      },
      overdueTasks: [
        {
          taskId: '101',
          taskName: "Fix login issue",
          dueDate: "03-03-2025",
          assignedTo: "Raiyan",
          daysOverdue: 6
        },
        {
          taskId: '103',
          taskName: "Update dashboard UI",
          dueDate: "02-03-2025",
          assignedTo: "Chandrunath",
          daysOverdue: 8
        }
      ],
      averageCompletionTime: {
        daily: "4 hours",
        weekly: "28 hours",
        monthly: "120 hours"
      },
      taskPerformance: {
        weekly: [
          {
            week: "2025-W05",
            tasksCompleted: 20,
            tasksAssigned: 25
          },
          {
            week: "2025-W06",
            tasksCompleted: 18,
            tasksAssigned: 22
          }
        ],
        monthly: [
          {
            month: "January 2025",
            tasksCompleted: 80,
            tasksAssigned: 100
          },
          {
            month: "February 2025",
            tasksCompleted: 65,
            tasksAssigned: 90
          }
        ]
      }
    };
    const doughnutData = {
      labels: [
        "Completed Tasks",
        "Pending Tasks",
        "Overdue Tasks",
        "Weekly Completed",
        "Weekly Assigned",
        "Monthly Completed",
        "Monthly Assigned"
      ],
      datasets: [
        {
          label: "Task Metrics",
          data: [
            doughnutChartData.taskCompletion.completed,
            doughnutChartData.taskCompletion.pending,
            doughnutChartData.taskCompletion.overdue,
            doughnutChartData.taskPerformance.weekly.reduce((sum, week) => sum + week.tasksCompleted, 0) / doughnutChartData.taskPerformance.weekly.length,
            doughnutChartData.taskPerformance.weekly.reduce((sum, week) => sum + week.tasksAssigned, 0) / doughnutChartData.taskPerformance.weekly.length,
            doughnutChartData.taskPerformance.monthly.reduce((sum, month) => sum + month.tasksCompleted, 0) / doughnutChartData.taskPerformance.monthly.length,
            doughnutChartData.taskPerformance.monthly.reduce((sum, month) => sum + month.tasksAssigned, 0) / doughnutChartData.taskPerformance.monthly.length
          ],
          backgroundColor: [
            "#36A2EB", // Completed
            "#FFCE56", // Pending
            "#FF6384", // Overdue
            "#4BC0C0", // Weekly Completed
            "#9966FF", // Weekly Assigned
            "#FF9F40", // Monthly Completed
            "#C9CBCF"  // Monthly Assigned
          ],
          hoverBackgroundColor: [
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
            "#C9CBCF"
          ]
        }
      ]
    };
   
    //-----*------//
   
    // useEffect(() => {
    //   const token = sessionStorage.getItem('access');
    //   getProjectDetails(token);
    // }, [])
   
    //Api
    //---get Api
    // const getProjectDetails = async (token) => {
    //   try {
    //     const response = await axios.get(`${BASE_URL}createTask/`, {
    //       headers: {
    //         'Authorization': `Bearer ${token}`,
    //         'Content-Type': 'application/json'
    //       },
    //     })
    //     if (response) {
    //       let value = response?.data;
    //       console.log(value.task.p, 'value')
    //       setprojectDetails(value);
    //     }
    //   } catch (error) { console.log(error.message) }
    // }
   
    const projectDetailsListTable = {
      columns: [
   
        {
          field: "project_name",
          headerName: "Project name",
          flex: 1,
          editable: false,
          disableColumnMenu: true,
   
        },
        {
          field: "hours",
          headerName: "Assigned Hours",
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
          field: "employee_count",
          headerName: "Employee Count",
          flex: 1,
          disableColumnMenu: true,
          editable: false,
        }
      ],
      row: projectDetails.map((data, index) => {
        return (
          {
            id: data.id,
            project_name: data.name,
            hours: data.asignedHours,
            priority: data.priority,
            employee_count: data.employeeCount
   
          }
        )
      })
    }
    const upcomingDeadlineEvent = () => {
      setDeadlineEvent(!deadlineEvent);
    }
  
  //fetch data

  // const getManagerData = async () => {
  //   try {
  //     const response = await fetchData('/managerDashboard/')
  //     console.log(response, 'qwerty')
  //   } catch (error) {
  //     console.log("error message:", error);
  //   }

  // }

  // useEffect(() => {
  //   getManagerData();
  // }, []);


  return (
     <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Card sx={{ padding: '8px' }}>
              <Stack>
                <MaterialTypography sx={{ fontSize: '15px', fontWeight: 'bold' }}>Projects Overview</MaterialTypography>
              </Stack>
              <Bar
                data={data}
                options={options}
              />
            </Card>
            <div style={{ position: "relative" }}>
              <Card sx={{
                padding: '8px',
                marginTop: '10px',
                bgcolor: '#CCD6A6'
              }}>
                <Stack sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <MaterialTypography sx={{
                    fontSize: '15px',
                    fontWeight: 'bold',
                    color: '#fff'
                  }} >
                    Upcoming Task Deadlines
                  </MaterialTypography>
                  <ArrowRightIcon sx={{
                    color: '#fff',
                    fontSize: 'large',
                    cursor:'pointer'
                  }}
                    onClick={upcomingDeadlineEvent} />
                </Stack>
              </Card>
              <Box sx={{
                border: '1px solid',
                border:'none',
                borderRadius: '20px',
                width: '100%',
                minHeight: '100px',
                right: 0, bgcolor: ' #DAE2B6',
                display: deadlineEvent ? 'block' : 'none',
                zIndex: 99999999, position: "absolute",
                padding: '10px'
              }}>
                {doughnutChartData.overdueTasks.map((tasks, index) => {
                  return (
 
                    <Stack sx={{ display: 'flex', justifycontent: 'start', width: '100%' }}>
                      <MaterialTypography sx={{
                        fontSize: '15px',
                        fontWeight: 'bold',
                        color:'#fff'
                      }}>
                        {tasks.taskName} : {tasks.dueDate}
                      </MaterialTypography>
                    </Stack>
                  )
                })}
              </Box>
            </div>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Card>
              <Box sx={{ width: '100%', height: '300px', display: 'flex', justifyContent: 'center' }}>
 
                <Doughnut data={doughnutData} options={options} />
              </Box>
              <MaterialTypography textAlign='center' fontSize="14px" fontWeight="bold">Task Overview</MaterialTypography>
            </Card>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 12 }}>
            <Card sx={{ padding: '10px' }}>
              <Stack>
                <MaterialTypography sx={{ fontSize: '15px', fontWeight: 'bold', color: '#A0D683' }}>Active Projects </MaterialTypography>
              </Stack>
              <MaterialDataGrid
                // customHeight={550}
                rows={projectDetailsListTable.row}
                columns={projectDetailsListTable.columns}
                localeText={{
                  noRowsLabel: (
                    <Stack direction="column" alignItems="center" justifyContent="center" spacing={1}>
                      <MaterialTypography variant="body2" fontWeight="medium" color="text">
                        No Project found
                      </MaterialTypography>
                      <MaterialTypography variant="caption" color="text">
                        You have not yet add any projects.
                      </MaterialTypography>
                    </Stack>
                  )
                }}
              />
            </Card>
          </Grid2>
        </Grid2>
  );
};

export default AdminDashboard;