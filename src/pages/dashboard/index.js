import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../layoutcontainers/DashboardLayout'
import MaterialTypography from '../../components/MaterialTypography';
import { Box, Card, Grid2, Stack, Typography } from '@mui/material';
import MaterialBox from '../../components/MaterialBox';
import MaterialDataGrid from '../../components/MaterialDataGrid'
import BASE_URL from '../Utils/Baseurl';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Legend, Tooltip, plugins } from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import AdminDashboard from './adminDashboard';
import ManagerDashboard from './managerDashboard';
import EmployeeDashboard from './employeeDashboard';
ChartJS.register(CategoryScale, LinearScale, ArcElement, BarElement, Tooltip, Legend);
 
const Dashboard = () => {
  //states
  // const [projectDetails, setprojectDetails] = useState({
  //   projectName: " ",
  //   asignedhours: " ",
  //   priority: " "
  // })

  let permission = sessionStorage.getItem('permission')
 
 
  return (
    <DashboardLayout>
      <Card sx={{ padding: '5px' }}>
        <Typography variant='h3' sx={{padding: '1rem 0.5rem'}}>{permission}</Typography>
        {
          permission === 'Admin' ? <AdminDashboard/> : permission === 'Manager' ? <ManagerDashboard/> :
          permission === 'Employee' ? <EmployeeDashboard/> : ''
        }
      </Card>
    </DashboardLayout>
  )
}

export default Dashboard