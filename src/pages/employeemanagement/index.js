import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../layoutcontainers/DashboardLayout'
import MaterialDataGrid from '../../components/MaterialDataGrid'
import MaterialTypography from '../../components/MaterialTypography'
import { Card, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import MaterialButton from '../../components/MaterialButton'
import AddIcon from '@mui/icons-material/Add';
import { deleteData, fetchData } from '../Utils/Baseurl'
import ConfirmationDialog from '../../components/Dialog/ConfirmationDialog'
import { setLoader, setPopup, useMaterialUIController } from '../../context'

const EmployeeManagement = () => {

    const navigate = useNavigate()

    // States 
    const [pageState, setPageState] = useState({
        loading: false,
        error: false,
        message: "",
        state: 'init'
    })

    const [ controller, dispatch ] = useMaterialUIController()

    const [employeeList, setEmployeeList] = useState([])

    const [deleteProp, setDeleteProp] = useState({ isOpen: false, id: null })
    // States 

    // GET DEPARTMENTS 
    // const getDepartmentData = async () => {
    //     let response = await fetchData('/departmentdetails/')
    //     return response.Data
    // }
    // GET DEPARTMENTS 

    // GET EMPLOYEE
    const employeeListTable = {
        columns: [
            {
                field: "username",
                headerName: "Username",
                flex: 1,
                disableColumnMenu: true,
                editable: false,
            },
            {
                field: "email",
                headerName: "Email",
                flex: 1,
                editable: false,
                disableColumnMenu: true,
            },
            {
                field: "department_name",
                headerName: "Department",
                flex: 1,
                disableColumnMenu: true,
                editable: false,
            },
            {
                field: "is_active",
                headerName: "Status",
                flex: 1,
                disableColumnMenu: true,
                editable: false,
            },
            { field: "actions", headerName: "Actions", },
        ],
    }

    const getEmployeeList = async () => {
        setLoader(dispatch, true)
        try{
            const response = await fetchData('/employeedetails/')
            setLoader(dispatch, false)
            setEmployeeList(response.data)
        }
        catch(err){
            setLoader(dispatch, false)
            setPopup(dispatch, {message: 'Failed to get the employees list', mode: 'error'})
            console.log(err)
        }

    }
    // GET EMPLOYEE

    // ADD EMPLOYEE 
    const handleNewEmployee = () => {
        navigate('/employee-management/employee-action')
    }
    // ADD EMPLOYEE 

    // EDIT EMPLOYEE 
    const onEdit = (id) => {
        navigate(`/employee-management/employee-action`, {
            state: {id}
        })

    }
    // EDIT EMPLOYEE 

    // DELETE EMPLOYEE 
    const handleCloseDeleteProp = () => {
        setDeleteProp({isOpen: false, id: null})
    }

    const onDelete = (id) => {
        setDeleteProp({ isOpen: true, id })
    }

    const handleDeleteEmployee = async () => {
        setLoader(dispatch, true)
        try{
            let response = await deleteData(`/employeedetails/${deleteProp.id}/`)
            setDeleteProp({isOpen: false, id: null})

            let newEmployees = employeeList.filter(employee=>employee.id !== deleteProp.id)
            setLoader(dispatch, false)
            setPopup(dispatch, {message: 'Employee deleted successfully', mode: 'success'})
            setEmployeeList(newEmployees)
        }
        catch(err){
            setLoader(dispatch, false)
            setPopup(dispatch, {message: 'Failed to delete employee', mode: 'error'})
            console.log(err)
        }
    }   
    // DELETE EMPLOYEE 

    useEffect(() => {
        getEmployeeList()
    }, [])


    return (
        <DashboardLayout>
            <Card sx={{ padding: 2 }}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                    py={1}
                >
                    <Stack direction="column" spacing={0}>
                        <MaterialTypography variant="h5" fontWeight="medium">
                            Employee Master
                        </MaterialTypography>
                        <MaterialTypography variant="caption" color="text">
                            List of employees
                        </MaterialTypography>
                    </Stack>

                    <MaterialButton
                        variant="gradient"
                        color="dark"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={handleNewEmployee}
                    >
                        Add Employee
                    </MaterialButton>
                </Stack>
                <MaterialDataGrid
                    // customHeight={550}
                    rows={employeeList}
                    columns={employeeListTable.columns}
                    checkboxSelection={false}
                    isSelectable={true}
                    // onRowClick={handleEditEmployee}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    // loading={pageState.loading}
                    localeText={{
                        noRowsLabel: (
                            <Stack direction="column" alignItems="center" justifyContent="center" spacing={1}>
                                <MaterialTypography variant="body2" fontWeight="medium" color="text">
                                    No task found
                                </MaterialTypography>
                                <MaterialTypography variant="caption" color="text">
                                    You have not yet add any task details. Click on the "Add Task" button to start adding task details.
                                </MaterialTypography>
                            </Stack>
                        )
                    }}
                />
                <ConfirmationDialog
                    open={deleteProp.isOpen}
                    showCancel={true}
                    showConfirm={true}
                    title="Confirm Deletion"
                    message="Are you sure you want to delete this record?"
                    onConfirm={handleDeleteEmployee}
                    onCancel={handleCloseDeleteProp}
                />
            </Card>
        </DashboardLayout>
    )
}

export default EmployeeManagement
// import { Stack, TextField, Typography } from '@mui/material'
// import { useState } from 'react';
// import React from 'react'
// import Card from '@mui/material/Card';
// import DashboardLayout from '../../layoutcontainers/DashboardLayout';
//  const EmployeeManagement = () => {

//     const [inputs ,setInputs] = useState({
//         projectname:'',
//         modulename:'',
//         screenname:'',
//         workitem:'',
//         duration:'',
//         expectedenddate:'',
//         assignedby:'',
//         assigned:''
//     });
//     const handleSubmit =async(e)=>{
//             e.preventDefault();
//     }
//     const handleChange=(e)=>{
            
//     }
//   return (
//    <DashboardLayout>

//         <Card sx={{padding:'12px'}} onSubmmit={handleSubmit}>
//                 <Stack sx={{marginBottom:'6px'}}>
//                     <Typography sx={{fontSize:'14px',marginLeft:'13px'}}> Project name*</Typography>
//                     <TextField placeholder='Project name' variant='outlined' 
                        
//                         name='projectname'
//                         value={inputs.projectname}
//                         onChange={handleChange}
//                     />
//                 </Stack>
//                 <Stack sx={{marginBottom:'6px'}}>
//                     <Typography sx={{fontSize:'14px',marginLeft:'13px'}}> Module name*</Typography>
//                     <TextField placeholder='Module Name' variant='outlined' 
//                         name='modulename'
//                         value={inputs.modulename}
//                         onChange={handleChange}
//                     ></TextField>
//                 </Stack>
//                 <Stack sx={{marginBottom:'6px'}}>
//                     <Typography sx={{fontSize:'14px',marginLeft:'13px'}}> Screen name*</Typography>
//                     <TextField placeholder=' Screen name' variant='outlined' 
//                         name='screenname'
//                         value={inputs.screenname}
//                         onChange={handleChange}
//                     ></TextField>
//                 </Stack>
//                 <Stack sx={{marginBottom:'6px'}}>
//                     <Typography sx={{fontSize:'14px',marginLeft:'13px'}}> Work item*</Typography>
//                     <TextField placeholder=' Work item' variant='outlined' 
//                         name='workitem'
//                         value={inputs.workitem}
//                         onChange={handleChange}
//                     ></TextField>
//                 </Stack>
//                 <Stack sx={{marginBottom:'6px'}}>
//                     <Typography sx={{fontSize:'14px',marginLeft:'13px'}}> Duration*</Typography>  
//                     <TextField placeholder='Duration' variant='outlined' 
//                         name='duration'
//                         value={inputs.workitem}
//                         onChange={handleChange}

//                     ></TextField>
//                 </Stack>
//                 <Stack sx={{marginBottom:'6px'}}>
//                     <Typography sx={{fontSize:'14px',marginLeft:'13px'}}> Expected-End-Date*</Typography>  
//                     <TextField placeholder='Expected-End-Date' variant='outlined' type='date'
//                         name='expectedenddate'
//                         value={inputs.expectedenddate}
//                         onChange={handleChange}

//                     ></TextField>
//                 </Stack>
//                 <Stack sx={{marginBottom:'6px'}}>
//                     <Typography sx={{fontSize:'14px',marginLeft:'13px'}}> Assidned-by*</Typography>  
//                     <TextField 
//                         placeholder='Assigned-by' 
//                         variant='outlined'
//                         name='assignedby'
//                         value={inputs.assigned}
//                         onChange={handleChange}

//                     ></TextField>
//                 </Stack>
//         </Card>
//    </DashboardLayout>
//   )
// }
// export default EmployeeManagement
