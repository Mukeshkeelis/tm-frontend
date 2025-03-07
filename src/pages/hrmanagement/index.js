import React, { useState } from 'react'
import DashboardLayout from '../../layoutcontainers/DashboardLayout'
import { Card, CardContent, Grid2, Stack } from '@mui/material'
import MaterialInput from '../../components/MaterialInput';
import MaterialTypography from '../../components/MaterialTypography';

const HRManagement = () => {


  const [hrState, setHrState] = useState({
    employeeName: '',
    department: '',
    //status
    employeeNameStatus: 'unchecked',
    departmentStatus: 'unchecked',
  });

  const handleNameChange = (event) => {
    const { name, value } = event.target;
    const numLengthRegex = new RegExp("^([A-Za-z ]{1,50})$");

    setHrState((prevState) => ({
      ...prevState,
      [name]: value,
      [`${name}Status`]: numLengthRegex.test(value.trim())
        ? "success"
        : value.trim() === ""
          ? "unchecked"
          : "error",
    }));
  };



  return (
    <DashboardLayout>
      <Card sx={{ padding: 2 }}>
        <Stack direction='column' spacing={0}>
          <MaterialTypography variant="h5" sx={{ fontWeight: 'bold' }}>Add Employee</MaterialTypography>
          <MaterialTypography variant="caption" color='dark'>Enter the details of the employee</MaterialTypography>
        </Stack>
        <CardContent>
          <Grid2 container spacing={2} p={2}>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <MaterialInput
                name="employeeName"
                placeholder="eg raj"
                value={hrState.employeeName}
                onChange={handleNameChange}
                error={hrState.employeeNameStatus === "error"}
                success={hrState.employeeNameStatus === "success"}
              />
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}

export default HRManagement
