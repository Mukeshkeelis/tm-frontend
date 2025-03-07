import React, { useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { Grid2, Card, CardContent, Stack } from "@mui/material";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import MaterialTypography from "../../../components/MaterialTypography";
import DashboardLayout from "../../../layoutcontainers/DashboardLayout";
import MaterialDataGrid from "../../../components/MaterialDataGrid";
import { fetchData } from "../../Utils/Baseurl";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const data = {
  projects: {
    categories: ["Active", "Completed"],
    series: [3, 2],
  },
  hoursWorked: [
    { project: "HRMS", hours: 120 },
    { project: "StoryBuzz", hours: 150 },
    { project: "Vizza", hours: 100 },
    { project: "Task Creation", hours: 180 },
    { project: "prinstin folds", hours: 115 },
  ],
  employeesPerProject: {
    categories: ["HRMS", "StoryBuzz", "Vizza", "Task Creation", "prinstin folds"],
    series: [5, 7, 4, 6, 3],
  },
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: true } },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { display: false } },
  },
  elements: {
    bar: { borderWidth: 0 },
  },
};

const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "right",
      align: "center"
    },
  },
};
// const chartStyle = { width: "300px", height: "280px" };
const colors = ["#2E86C1", "#D35400", "#1ABC9C"];
const backgroundColors = ["#2E86C1B3", "#D35400B3", "#1ABC9CB3"];

const ManagerDashboard = () => {

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
      <Grid2 container spacing={3}>
        {/* Active vs. Completed Projects */}
        <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
          <Card sx={{ backgroundColor: "#fff", borderRadius: "10px" }}>
            <CardContent>
              <MaterialTypography variant="h6" color="#333">Active vs. Completed Projects</MaterialTypography>
              <div>
                <Bar
                  data={{
                    labels: data.projects.categories,
                    datasets: [{ label: "Projects", data: data.projects.series, backgroundColor: backgroundColors.slice(0, 2) }],
                  }}
                  options={chartOptions}
                />
              </div>
            </CardContent>
          </Card>
        </Grid2>

        {/* Total Hours Worked (Doughnut Chart) */}
        <Grid2 size={{ xs: 12, sm: 4, md: 4 }} >
          <Card sx={{ backgroundColor: "#fff", borderRadius: "10px" }}>
            <CardContent>
              <MaterialTypography variant="h6" color="#333">Total Hours Worked</MaterialTypography>
              <div >
                <Doughnut
                  data={{
                    labels: data.hoursWorked.map(item => item.project),
                    datasets: [{ label: "Total Hours", data: data.hoursWorked.map(item => item.hours), backgroundColor: backgroundColors }],
                  }}
                  options={doughnutChartOptions} // Updated options for legend position
                />
              </div>
            </CardContent>
          </Card>
        </Grid2>

        {/* Employees per Project */}
        <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
          <Card sx={{ backgroundColor: "#fff", borderRadius: "10px" }}>
            <CardContent>
              <MaterialTypography variant="h6" color="#333">Employees per Project</MaterialTypography>
              <div>
                <Bar
                  data={{
                    labels: data.employeesPerProject.categories,
                    datasets: [{ label: "Employees", data: data.employeesPerProject.series, backgroundColor: backgroundColors }],
                  }}
                  options={chartOptions}
                />
              </div>
            </CardContent>
          </Card>
        </Grid2>

        {/* table */}
        <Grid2 size={{ xs: 12, sm: 12, md: 4 }}>
          <Card sx={{ padding: '10px' }}>
            {/* <MaterialDataGrid
              rows={allTaskAssignedTable.row}
              columns={allTaskAssignedTable.columns}
              checkboxSelection={false}
              isSelectable={true}
              loading={allTaskAssignedTable.length === 0}
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
            /> */}
          </Card>
        </Grid2>
      </Grid2>
  );
};

export default ManagerDashboard;
