import { Card, Grid, Stack } from '@mui/material'
import MaterialButton from '../../components/MaterialButton'
import MaterialTypography from "../../components/MaterialTypography"
import AddIcon from '@mui/icons-material/Add'
import MaterialDataGrid from "../../components/MaterialDataGrid"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { deleteData, fetchData } from '../Utils/Baseurl.js';
import DashboardLayout from '../../layoutcontainers/DashboardLayout/index.js'
import ConfirmationDialog from '../../components/Dialog/ConfirmationDialog/index.js'
import { setLoader, setPopup, useMaterialUIController } from '../../context/index.js'

const RoleMaster = () => {

    // States 
    let navigate = useNavigate()

    const [roles, setRoles] = useState([])

    const [deleteProp, setDeleteProp] = useState({ isOpen: false, id: null })

    const [controller, dispatch] = useMaterialUIController()

    const getRoles = async () => {
        setLoader(dispatch, true)
        try {
            let response = await fetchData('/roledetails/')
            setLoader(dispatch, false)
            setRoles(response.data)
        }
        catch (error) {
            setLoader(dispatch, false)
            setPopup(dispatch, {message: 'Failed to get roles', mode: 'error'})
            console.log(error)
        }
    }
    const categoryListTable = {
        columns: [
            {
                field: "no",
                headerName: "No",
                flex: 0,
                disableColumnMenu: true,
                editable: false,
            },
            {
                field: "role_name",
                headerName: "Role Name",
                flex: 1,
                disableColumnMenu: true,
                editable: false,
            },
            {
                field: 'department_name',
                headerName: "Department Name",
                flex: 1,
                disableColumnMenu: true,
                editable: false,
            },
            {
                field: "actions",
                headerName: "Actions",
                flex: 0,
                disableColumnMenu: true,
                editable: false,
            },
        ],
        row: roles.map((role, index) => {
            console.log('role:', role)
            return (
                {
                    id: role.id,
                    no: index + 1,
                    role_name: role.role_name,
                    department_name: role.department_name
                }
            )
        })
    }
    // States 

    // New Role 
    const handleNewRoleMaster = () => {
        navigate('/role-master/role-action')
    }
    // New Role 

    // Handle Edit Role Master 
    const onEdit = (id) => {
        navigate(`/role-master/role-action`, {
            state: { id, roles }
        })
    }
    // Handle Edit Role Master 

    // POP UP

    const onDelete = (id) => {
        setDeleteProp({ isOpen: true, id })
    }

    const handleCloseDeleteProp = () => {
        setDeleteProp({ isOpen: false, id: null })
    }
    // POP UP

    // Delete Role Master 
    const handleDeleteRoleMaster = async () => {
        setLoader(dispatch, true)
        try {
            let response = deleteData(`/roledetails/${deleteProp.id}/`)
            let filteredItems = roles.filter(role => role.id !== deleteProp.id)

            setRoles(filteredItems)
            setDeleteProp({ isOpen: false, id: null })

            setLoader(dispatch, false)
            setPopup(dispatch, {message: 'Role deleted successfully', mode: 'success'})
        }
        catch(err){

            setLoader(dispatch, false)
            setPopup(dispatch, {message: 'Failed to delete role', mode: 'error'})
        }
    }
    // Delete Role Master 

    useEffect(() => {
        getRoles()
    }, [])

    return <DashboardLayout>
        <Card sx={{ padding: 2 }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <Stack direction="column" spacing={0}>
                    <MaterialTypography variant="h5" fontWeight="medium">
                        Role Master
                    </MaterialTypography>
                    <MaterialTypography variant="caption" color="text">
                        List of roles
                    </MaterialTypography>
                </Stack>

                {/* <MaterialTypography variant="caption" color="text">
                    List of employee that you can get details of employees.
                </MaterialTypography> */}

                <MaterialButton
                    variant="gradient"
                    color="dark"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={handleNewRoleMaster}
                >
                    Add Role
                </MaterialButton>
            </Stack>

            <MaterialDataGrid
                // customHeight={550}
                rows={categoryListTable.row}
                columns={categoryListTable.columns}
                checkboxSelection={false}
                isSelectable={true}
                onEdit={(id) => onEdit(id)}
                onDelete={(id) => onDelete(id)}
                localeText={{
                    noRowsLabel: (
                        <Stack direction="column" alignItems="center" justifyContent="center" spacing={1}>
                            <MaterialTypography variant="body2" fontWeight="medium" color="text">
                                No category found
                            </MaterialTypography>
                            <MaterialTypography variant="caption" color="text">
                                You have not yet add any category details. Click on the "Add Category" button to start adding category details.
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
                onConfirm={handleDeleteRoleMaster}
                onCancel={handleCloseDeleteProp}
            />
        </Card>
    </DashboardLayout >
}

export default RoleMaster