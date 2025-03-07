import React, { useEffect } from 'react';
import { useState } from 'react';
import DashboardLayout from '../../layoutcontainers/DashboardLayout'
import { CardContent, CardHeader, Grid2, IconButton, Stack, Card } from '@mui/material'
import MaterialTypography from "../../components/MaterialTypography";
import MaterialButton from "../../components/MaterialButton";
import MaterialInput from "../../components/MaterialInput";
import MaterialBox from "../../components/MaterialBox";
import { DialogActions } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import MaterialDataGrid from '../../components/MaterialDataGrid';
import BASE_URL, { deleteData } from '../Utils/Baseurl';
import ConfirmationDialog from '../../components/Dialog/ConfirmationDialog';
import {fetchData} from '../Utils/Baseurl'
import { useMaterialUIController, setLoader, setPopup } from '../../context';

const DepartmentMaster = () => {
    //manage the table data

    // States 
    const navigate = useNavigate();

    const [departmentdetails, setDepartmentdetails] = useState([])

    const [deleteProp, setDeleteProp] = useState({ isOpen: false, id: '' })

    const departmentListTable = {
        columns: [

            {
                field: "no",
                headerName: "No",
                flex: 1,
                editable: false,
                disableColumnMenu: true,

            },
            {
                field: "department_name",
                headerName: "Department name",
                flex: 2,
                disableColumnMenu: true,
                editable: false,
            },
            {
                field: "actions",
                headerName: "Actions",

            }
        ],

        row: departmentdetails.map((data, index) => {
            return (
                {
                    no: index + 1,
                    id: data.id,
                    department_name: data.department

                }
            )
        })
    }

    const [ controller, dispatch ] = useMaterialUIController()

    const { popup } = controller

    // States 

    // Confirm Prop 

    const handleCloseDeleteProp = () => {
        setDeleteProp({ isOpen: false, id: null })
    }
    // Confirm Prop


    useEffect(() => {
        const token = sessionStorage.getItem('access');
        getDepartmentDetails(token)

    }, [])
    const token = sessionStorage.getItem('access');

    // Department Details
    const getDepartmentDetails = async (token) => {
        setLoader(dispatch, true)
        try {
            const response = await fetchData('/departmentdetails/')
            if (response) {
                let value = response?.data
                const updatedDetails = value.map(department => ({
                    id: department.id,
                    department: department.department_name,
                }));

                setLoader(dispatch, false)
                setDepartmentdetails(updatedDetails);
            }
        } catch (error) {
            setLoader(dispatch, false)
            setPopup(dispatch, {message: 'Failed to get departments', mode: 'error'})
            console.error("Failed to send request:", error.response ? error.response.data : error.message);
        }
    };
    // Department Details

    // Handle New Department 
    const handleNewDepartment = () => {
        navigate('/department-master/department-action');
    }
    // Handle New Department 

    // Handle Edit 
    const onEdit = (id) => {
        if (id) {
            navigate(`/department-master/department-action`, {
                state: { id }
            });
        }
    }
    // Handle Edit 

    // Handle Delete 
    const onDelete = async (id) => {
        setDeleteProp({ isOpen: true, id })
    }

    const handleDeleteDepartmentMaster = async () => {
        setLoader(dispatch, true)
        try {
            const response = await deleteData(`departmentdetails/${deleteProp.id}/`);
            let filteredItem = departmentdetails.filter(department => department.id !== deleteProp.id)
            setDepartmentdetails(filteredItem)
            setDeleteProp({ isOpen: false, id: null })

            setPopup(dispatch, {message: 'Department deleted successfully', mode: 'success'})
            setLoader(dispatch, false)
        } catch (error) {
            setPopup(dispatch, {message: 'Failed to delete department', mode: 'error'})
            setLoader(dispatch, false)
            
            console.error('Error deleting data:', error);
        }
    }
    // Handle Delete 

    return (
        <DashboardLayout>
            <Card sx={{ padding: 2 }}>
                <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2} sx={{ padding: '3px 6px' }}>
                    <Stack direction="column" spacing={0}>
                        <MaterialTypography variant="h5" fontWeight="medium">
                            Department Master
                        </MaterialTypography>
                        <MaterialTypography variant="caption" color="text">
                            List of departments
                        </MaterialTypography>
                    </Stack>
                    <Grid2 size={{ xs: 3, sm: 3 }}>
                        <MaterialButton variant="gradient" color="dark" onClick={handleNewDepartment} size='small'>
                            + Add Department
                        </MaterialButton>
                    </Grid2>
                </Stack>

                <MaterialDataGrid
                    // customHeight={550}
                    rows={departmentListTable.row}
                    columns={departmentListTable.columns}
                    checkboxSelection={false}
                    isSelectable={true}
                    onEdit={(id) => onEdit(id)}
                    // onDelete={(id) => onDelete(id)}
                    onDelete={onDelete}
                    // onView={onView}
                    // onRowClick={ondepartmentListTableClick}
                    // loading={pageState.loading}

                    localeText={{
                        noRowsLabel: (
                            <Stack direction="column" alignItems="center" justifyContent="center" spacing={1}>
                                <MaterialTypography variant="body2" fontWeight="medium" color="text">
                                    No Department found
                                </MaterialTypography>
                                <MaterialTypography variant="caption" color="text">
                                    You have not yet add any Department details. Click on the "Add Department" button to start adding Department details.
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
                    onConfirm={handleDeleteDepartmentMaster}
                    onCancel={handleCloseDeleteProp}
                />
            </Card>
        </DashboardLayout>
    )
}
export default DepartmentMaster;