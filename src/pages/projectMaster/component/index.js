import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Autocomplete, Card, CardContent, Chip, Grid2, IconButton, Stack, TextField, Typography } from '@mui/material'
import DashboardLayout from '../../../layoutcontainers/DashboardLayout';
import MaterialTypography from '../../../components/MaterialTypography';
import MaterialBox from '../../../components/MaterialBox';
import MaterialInput from '../../../components/MaterialInput';
import MaterialButton from '../../../components/MaterialButton';
import { fetchData, postData, putData } from '../../Utils/Baseurl';
import MaterialSelect from '../../../components/MasterSelect';
import { setLoader, setPopup, useMaterialUIController } from '../../../context';

const ProjectAction = () => {

    // States 
    const token = sessionStorage.getItem('access');

    const [managers, setManagers] = useState([])

    const [employees, setEmployees] = useState([])

    const [controller, dispatch] = useMaterialUIController()

    const location = useLocation();

    const [projectDetails, setProjectDetails] = useState({
        project_name: ' ',
        project_description: '',
        assign_manager: [],
        assign_employee: [],
        start_date: '',
        deadline_date: '',
        project_nameStatus: 'unchecked',
        project_descriptionStatus: 'unchecked',
        assign_managerStatus: 'unchecked',
        assign_employeeStatus: 'unchecked',
        start_dateStatus: 'unchecked',
        deadline_dateStatus: 'unchecked',
        project_status: { label: '', value: '' },
        project_statusStatus: 'unchecked',
    });

    const status = [
        { value: 'Active', label: 'Active' },
        { value: 'Completed', label: 'Completed' },
        { value: 'On hold', label: 'On hold' }
    ]
    // States 

    // Get Manager 
    const getManagers = async () => {
        setLoader(dispatch, true)
        try {
            let response = await fetchData('/managerlist/')
            setManagers(response.data)
            setLoader(dispatch, false)
        }
        catch (err) {
            setPopup(dispatch, { message: 'Failed to get managers', mode: 'error' })
            setLoader(dispatch, false)
            console.log(err)
        }
    }
    // Get Manager 

    // Get Employee 
    const getEmployees = async () => {
        setLoader(dispatch, true)
        try {
            let response = await fetchData('/employeelist/')
            setEmployees(response.data)
            setLoader(dispatch, false)
        }
        catch (err) {
            setPopup(dispatch, { message: 'Failed to get employees', mode: 'error' })
            setLoader(dispatch, false)
            console.log(err)
        }
    }
    // Get Employee 

    // Handle Change 
    const handleProjectChange = (event, selectEvent, name) => {
        const changeAllowed = true;
        let formState = { ...projectDetails };

        if (event?.target === undefined && selectEvent) {

            if(selectEvent.name === 'username'){
                const usernameRegex = new RegExp("^[a-zA-Z0-9]{3,16}$");
                if (usernameRegex.test(event?.label) === true) {
                    formState[selectEvent.name + "Status"] =
                        event?.label === undefined ? "unchecked" : "success";
                } else {
                    formState[selectEvent.name + "Status"] =
                        selectEvent.value === "" ? "unchecked" : "error";
                }
            }
            else{
                const statusRegex = new RegExp("^[A-Za-z]+(?:\\s[A-Za-z]+)*$")
                if (statusRegex.test(event?.label) === true) {
                    formState[selectEvent.name + "Status"] =
                        event?.label === undefined ? "unchecked" : "success";
                } else {
                    formState[selectEvent.name + "Status"] =
                        selectEvent.value === "" ? "unchecked" : "error";
                }
            }

            formState[selectEvent.name] = event;
        } else if (event.target && !selectEvent) {
            switch (event.target.name) {
                case "project_name":
                    {
                        const alphaRegex = new RegExp("^([A-Za-z\\s]+)$");
                        if (alphaRegex.test(event.target.value?.trim())) {
                            formState[event.target.name + "Status"] = "success";
                        } else {
                            formState[event.target.name + "Status"] =
                                event.target.value === "" ? "unchecked" : "error";
                        }
                    }
                    break;
                case "project_description":
                    {
                        const alphaNumRegex = new RegExp("^.{1,250}$");
                        if (alphaNumRegex.test(event.target.value?.trim())) {
                            formState[event.target.name + "Status"] = "success";
                        } else {
                            formState[event.target.name + "Status"] =
                                event.target.value === "" ? "unchecked" : "error";
                        }
                    }
                    break;
                case "start_date":
                    {
                        const dateLengthRegex = new RegExp(
                            "^[a-zA-Z0-9 !@#$%^&*()_+{}|:\"<>?`\\[\\]\\\\;,./'-=~]{10,150}$"
                        );

                        if (dateLengthRegex.test(event.target.value?.trim())) {

                            const selectedDate = new Date(event.target.value);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);

                            if (selectedDate > today) {
                                formState[event.target.name + "Status"] = "success";
                            }
                            else {
                                formState[event.target.name + "Status"] =
                                    event.target.value === "" ? "unchecked" : "error";
                            }

                            const deadline_date = new Date(formState.deadline_date)
                            if (selectedDate > deadline_date) {
                                formState['deadline_dateStatus'] = 'error'
                            }

                        } else {
                            formState[event.target.name + "Status"] =
                                event.target.value === "" ? "unchecked" : "error";
                        }
                    }
                    break;
                case "deadline_date":
                    {
                        const dateLengthRegex = new RegExp(
                            "^[a-zA-Z0-9 !@#$%^&*()_+{}|:\"<>?`\\[\\]\\\\;,./'-=~]{10,150}$"
                        );

                        if (dateLengthRegex.test(event.target.value?.trim())) {
                            const selectedDate = new Date(event.target.value);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);

                            if (selectedDate > today) {
                                const start_date = new Date(formState.start_date)
                                // console.log(selectedDate, new Date(formState.start_date))
                                if (selectedDate > start_date) {
                                    formState[event.target.name + "Status"] = "success";
                                }
                                else {
                                    formState[event.target.name + "Status"] =
                                        event.target.value === "" ? "unchecked" : "error";
                                }
                            }
                            else {
                                formState[event.target.name + "Status"] =
                                    event.target.value === "" ? "unchecked" : "error";
                            }
                        } else {
                            formState[event.target.name + "Status"] =
                                event.target.value === "" ? "unchecked" : "error";
                        }
                    }
                    break;
            }
            if (changeAllowed) {
                formState[event.target.name] = event.target.value;

            }
        }
        else {
            formState[name] = selectEvent
        }
        setProjectDetails(formState)
    }
    // Handle Change 

    const navigate = useNavigate()

    // Handle Submit 
    const handleSubmit = async () => {
        setLoader(dispatch, true)

        const token = sessionStorage.getItem('access');

        if (location.state === null) {
            try {
                const payload = {
                    project_name: projectDetails.project_name,
                    description: projectDetails.project_description,
                    started_at: projectDetails.start_date,
                    project_deadline: projectDetails.deadline_date,
                    manager_ids: projectDetails.assign_manager.map(manager => manager.value),
                    employee_ids: projectDetails.assign_employee.map(employee => employee.value)
                };

                const response = await postData('/projectdetails/', payload)
                setPopup(dispatch, { message: 'Project added successfully', mode: 'success' })
                setLoader(dispatch, false)
            } catch (error) {
                setPopup(dispatch, { message: 'Failed to add project', mode: 'error' })
                setLoader(dispatch, false)
                console.error("Failed to send request:", error);
            }
        } else {

            const payload = {
                project_name: projectDetails.project_name,
                description: projectDetails.project_description,
                started_at: projectDetails.start_date,
                project_deadline: projectDetails.deadline_date,
                manager_ids: projectDetails.assign_manager.map(manager => manager.value),
                employee_ids: projectDetails.assign_employee.map(employee => employee.value),
                project_status: projectDetails.project_status.value
            };
            try {
                const response = await putData(`/projectdetails/${location.state.id}/`, payload)
                setLoader(dispatch, false)
                setPopup(dispatch, { message: 'Project updated successfully', mode: 'success' })
            }
            catch (err) {
                setLoader(dispatch, false)
                setPopup(dispatch, { message: 'Failed to update project', mode: 'error' })
            }
        }
        navigate(-1);

    };
    // Handle Submit 


    useEffect(() => {

        getManagers()
        getEmployees()

        const getProject = async () => {
            let response = await fetchData(`/projectdetails/${location.state.id}/`)
            let { project_name, project_description, project_status, started_at, project_deadline } = await response

            let currentManagers = await response.employees?.filter(employee => employee.mid).map(emp => {
                return { value: emp.mid, label: emp.manager_name }
            })
            let currentEmployees = await response.employees?.filter(employee => employee.eid).map(emp => {
                return { value: emp.eid, label: emp.employee_name }
            })

            setProjectDetails({
                project_name: project_name, project_description: project_description,
                start_date: started_at, deadline_date: project_deadline,
                assign_manager: currentManagers, assign_employee: currentEmployees,
                project_status: { value: project_status, label: project_status },


                project_nameStatus: project_name ? 'success' : 'error',
                project_descriptionStatus: project_description ? 'success' : 'error',
                start_dateStatus: started_at ? 'success' : 'error',
                deadline_dateStatus: project_deadline ? 'success' : 'error',
                is_activeStatus: project_status ? 'success' : 'error'
            })
        }

        if (location.state) {
            getProject()
        }
        else {

        }

    }, [])


    return (
        <DashboardLayout>
            <Card sx={{ padding: '5px' }}>
                <Stack direction='row' px={2} pt={2} justifyContent={'space-between'} spacing={0}>
                    <Stack direction='column' spacing={0}>
                        <MaterialTypography variant='h5' sx={{ fontWeight: 'bold' }}>{location.state ? 'Update  ' : 'Add'} Project</MaterialTypography>
                        {/* <MaterialTypography variant='caption' color='text'>You can {location.state ? 'Update' : 'Add'} employee here</MaterialTypography> */}
                    </Stack>
                    {location.state && <Stack>
                        <MaterialSelect
                            name="project_status"
                            onChange={handleProjectChange}
                            value={projectDetails.project_status}
                            options={status.map(({ label, value }) => {
                                return {
                                    value: value,
                                    label: label,
                                }
                            })}
                            placeholder={"Eg Active"}
                            error={projectDetails.project_statusStatus === 'error'}
                            success={projectDetails.project_statusStatus === 'success'}
                        />
                    </Stack>}
                </Stack>
                <Grid2 container spacing={1} p={2}>
                    {/* Project Name */}
                    <Grid2 size={{ xs: 12, sm: 6, md: 6 }} >
                        <MaterialBox lineHeight={0} display="inline-block">
                            <MaterialTypography variant='caption' color='text'>Project Name</MaterialTypography>
                        </MaterialBox>
                        <MaterialInput
                            type='text'
                            name="project_name"
                            placeholder="Project name"
                            value={projectDetails.project_name}
                            onChange={handleProjectChange}
                            error={projectDetails.project_nameStatus === "error"}
                            success={projectDetails.project_nameStatus === "success"}

                        />
                    </Grid2>
                    {/* Project Name */}
                    {/* Description */}
                    <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                        <MaterialTypography variant='caption' color='text'>
                            Project Description
                        </MaterialTypography>
                        <MaterialInput
                            textarea={true} type='text' name='project_description'
                            multiline rows={4}
                            fullWidth
                            placeholder='Must hold 250 characters'
                            onChange={handleProjectChange}
                            value={projectDetails.project_description}
                            success={projectDetails.project_descriptionStatus === 'success'}
                            error={projectDetails.project_descriptionStatus === 'error'}
                        />
                    </Grid2>
                    {/* Description */}
                    {/* Manager List  */}
                    <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                        <Stack direction='column' spacing={1}>
                            <MaterialTypography variant='caption' color='text'>Assign Manager</MaterialTypography>
                            <Autocomplete
                                multiple
                                name='assign_manager'
                                // options={attendedList}
                                options={managers.map(({ id, username }) => ({
                                    value: id, // Set employee_id as id
                                    label: username // Display employee_name as label
                                }))}
                                // sx={{borderRadius: '0.45rem', position: 'relative',
                                //     ':active': { 
                                //         ':after': {position: 'absolute', padding: '0.5rem', background: 'red', borderRadius: '0.5rem', zIndex: projectDetails.assign_employee ? 1 : 0, top: 0, bottom: 0, left: 0, right: 0, content: '""', transition: '0.3s all ease' }}}}
                                getOptionLabel={(option) => option?.label || ""}
                                value={projectDetails.assign_manager} // Ensure it’s always an array
                                onChange={(event, selectEvent) => { handleProjectChange(event, selectEvent, 'assign_manager') }}
                                isOptionEqualToValue={(option, { value }) => option.value === value}
                                filterSelectedOptions
                                renderTags={(selected, getTagProps) =>
                                    selected.map((option, index) => (
                                        <Chip key={option.id} label={option.label} {...getTagProps({ index })} />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField {...params} placeholder="Select attendees" />
                                )}
                            />
                        </Stack>
                    </Grid2>
                    {/* Manager List  */}
                    {/* Employee List  */}
                    <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                        <Stack direction='column' spacing={1}>
                            <MaterialTypography variant='caption' color='text'>Assign Employee</MaterialTypography>
                            <Autocomplete
                                multiple
                                name='assign_employee'
                                // options={attendedList}
                                options={employees.map(({ id, username }) => ({
                                    value: id, // Set employee_id as id
                                    label: username // Display employee_name as label
                                }))}
                                // sx={{borderRadius: '0.45rem', position: 'relative',
                                //     ':active': { 
                                //         ':after': {position: 'absolute', padding: '0.5rem', background: 'red', borderRadius: '0.5rem', zIndex: projectDetails.assign_employee ? 1 : 0, top: 0, bottom: 0, left: 0, right: 0, content: '""', transition: '0.3s all ease' }}}}
                                getOptionLabel={(option) => option?.label || ""}
                                value={projectDetails.assign_employee} // Ensure it’s always an array
                                onChange={(event, selectEvent) => { handleProjectChange(event, selectEvent, 'assign_employee') }}
                                isOptionEqualToValue={(option, { value }) => option.value === value}
                                filterSelectedOptions
                                renderTags={(selected, getTagProps) =>
                                    selected.map((option, index) => (
                                        <Chip key={option.id} label={option.label} {...getTagProps({ index })} />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField {...params} placeholder="Select attendees" />
                                )}

                            />
                        </Stack>
                    </Grid2>
                    {/* Employee List  */}
                    {/* Start Date  */}
                    <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                        <MaterialTypography variant='caption' color='text'>Project Start</MaterialTypography>
                        <MaterialInput
                            name="start_date"
                            type="date"
                            placeholder="eg 01-01-2025"
                            onChange={handleProjectChange}
                            value={projectDetails.start_date}
                            error={projectDetails.start_dateStatus === 'error'}
                            success={projectDetails.start_dateStatus === 'success'}
                        />
                    </Grid2>
                    {/* Start Date  */}
                    {/* Deadline date  */}
                    <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                        <MaterialTypography variant='caption' color='text'>Project Deadline</MaterialTypography>
                        <MaterialInput
                            name="deadline_date"
                            type="date"
                            placeholder="eg 01-01-2025"
                            onChange={handleProjectChange}
                            value={projectDetails.deadline_date}
                            error={projectDetails.deadline_dateStatus === 'error'}
                            success={projectDetails.deadline_dateStatus === 'success'}
                        />
                    </Grid2>
                    {/* Deadline date  */}
                    <Grid2 size={{ xs: 3, sm: 3, md: 2 }} sx={{ marginTop: '15px', marginLeft: 'auto' }}>
                        <MaterialButton
                            variant="gradient"
                            color="dark"
                            style={{ display: 'block', marginLeft: 'auto', maxWidth: "100px", minWidth: "100px" }}
                            disabled={
                                projectDetails.project_nameStatus !== 'success' ||
                                projectDetails.project_descriptionStatus !== 'success' ||
                                projectDetails.assign_manager.length === 0 ||
                                projectDetails.assign_employee.length === 0 ||
                                projectDetails.start_dateStatus !== 'success' ||
                                projectDetails.deadline_dateStatus !== 'success'
                            }
                            onClick={handleSubmit}
                        >
                            Submit
                        </MaterialButton>
                    </Grid2>
                </Grid2>
            </Card>
        </DashboardLayout>
    )
}
export default ProjectAction;