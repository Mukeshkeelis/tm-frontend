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
import BASE_URL, { deleteData, fetchData } from '../Utils/Baseurl';
import ConfirmationDialog from '../../components/Dialog/ConfirmationDialog';
import { setLoader, setPopup, useMaterialUIController } from '../../context';

const ProjectMaster = () => {
    //manage the table data
    const navigate = useNavigate();

    const [projectDetails, setProjectDetails] = useState([])

    const [controller, dispatch] = useMaterialUIController()

    const projectListTable = {
        columns: [

            {
                field: "no",
                headerName: "No",
                flex: 1,
                editable: false,
                disableColumnMenu: true,

            },
            {
                field: "project_name",
                headerName: "Project name",
                flex: 2,
                disableColumnMenu: true,
                editable: false,
            },
            {
                field: "started_at",
                headerName: "Project Start",
                flex: 2,
                disableColumnMenu: true,
                editable: false,
            },
            {
                field: "project_deadline",
                headerName: "Project Deadline",
                flex: 2,
                disableColumnMenu: true,
                editable: false,
            },
            {
                field: 'project_status',
                headerName: "Project Status",
                flex: 2,
                disableColumnMenu: true,
                editable: false,
            },
            {
                field: "actions",
                headerName: "Actions",

            }
        ],

        row: projectDetails.map((data, index) => {
            return (
                {
                    no: index + 1,
                    id: data.id,
                    project_name: data.project_name,
                    started_at: data.started_at,
                    project_deadline: data.project_deadline,
                    project_status: data.project_status
                }
            )
        })
    }

    useEffect(() => {
        const token = sessionStorage.getItem('access');
        getProjectDetails(token)

    }, [])
    const token = sessionStorage.getItem('access');

    const [deleteProp, setDeleteProp] = useState({ isOpen: false, id: null })

    // Get Project Detail 
    const getProjectDetails = async (token) => {
        setLoader(dispatch, true)
        try {

            const response = await fetchData('/projectdetails/')
            setProjectDetails(response);
            setLoader(dispatch, false)

        } catch (error) {
            console.error("Failed to send request:", error.response ? error.response.data : error.message);
            setLoader(dispatch, false)
            setPopup(dispatch, { message: 'Failed to get projects', mode: 'error' })
        }
    };
    // Get Project Detail 

    // Handle Add Project 
    const handleNewProject = () => {
        navigate('/project-master/project-action');
    }
    // Handle Add Project 

    // Handle Edit 
    const onEdit = (id) => {
        if (id) {
            navigate(`/project-master/project-action`, {
                state: { id, projectDetails }
            });
        }
    }
    // Handle Edit 

    // Handle Delete Prop
    const onDelete = async (id) => {
        try {
            setDeleteProp({ isOpen: true, id })

        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleCloseDeleteProp = () => {
        setDeleteProp({ isOpen: false, id: null })
    }

    const handleDeleteProjectMaster = async () => {
        setLoader(dispatch, true)
        try {
            const response = await deleteData(`projectdetails/${deleteProp.id}/`);
            let filteredItem = projectDetails.filter(project => project.id !== deleteProp.id)
            setDeleteProp({ isOpen: false, id: null })
            setProjectDetails(filteredItem)
            setLoader(dispatch, false)
            setPopup(dispatch, {message: 'Project deleted successfully', mode: 'success'})
        }
        catch(err){
            setLoader(dispatch, false)
            setPopup(dispatch, {message: 'Failed to delete project', mode: 'error'})
            console.log(err)
        }
    }
    // Handle Delete Prop


    return (
        <DashboardLayout>
            <Card sx={{ padding: 2 }}>
                <Stack direction='row' justifyContent='space-between' alignItems='center' spacing={2} sx={{ padding: '3px 6px' }}>
                    <Stack>
                        <MaterialTypography variant="h5" fontWeight="medium">
                            Project Master
                        </MaterialTypography>
                        <MaterialTypography variant="caption" color="text">
                            List of projects
                        </MaterialTypography>
                    </Stack>
                    <Grid2 size={{ xs: 3, sm: 3 }}>
                        <MaterialButton variant="gradient" color="dark" onClick={handleNewProject} size='small'>
                            + Add Project
                        </MaterialButton>
                    </Grid2>
                </Stack>

                <MaterialDataGrid
                    // customHeight={550}
                    rows={projectListTable.row}
                    columns={projectListTable.columns}
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
                                    No Project found
                                </MaterialTypography>
                                <MaterialTypography variant="caption" color="text">
                                    You have not yet add any project details. Click on the "Add project" button to start adding project details.
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
                    onConfirm={handleDeleteProjectMaster}
                    onCancel={handleCloseDeleteProp}
                />
            </Card>
        </DashboardLayout>
    )
}
export default ProjectMaster;