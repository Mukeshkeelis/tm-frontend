import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../layoutcontainers/DashboardLayout'
import { Card, Chip, duration, Grid2, Stack, TextField } from '@mui/material';
import MaterialTypography from '../../../components/MaterialTypography';
import MaterialInput from '../../../components/MaterialInput';
import MaterialButton from '../../../components/MaterialButton';
import MaterialSelect from '../../../components/MasterSelect';
import { fetchData, postData } from '../../Utils/Baseurl';
import { useLocation, useNavigate } from 'react-router-dom';
import { setLoader, setPopup, useMaterialUIController } from '../../../context/index';

const TaskAction = () => {

    // States 
    const navigate = useNavigate()

    const [employee, setEmployee] = useState([])

    const location = useLocation()

    const id = sessionStorage.getItem('id')

    const [taskCreationDetails, setTaskCreationDetails] = useState({
        project: { value: '', label: '' },
        assign_employee: { value: '', label: '' },
        task_title: '',
        module_name: '',
        work_item: '',
        // assign_date: '',
        start_date: '',
        deadline_date: "",
        priority: '',
        duration: '',
        comments: '',
        screen_name: '',

        projectStatus: 'unchecked',
        assign_employeeStatus: 'unchecked',
        task_titleStatus: 'unchecked',
        module_nameStatus: 'unchecked',
        work_itemStatus: 'unchecked',
        // assign_dateStatus: 'unchecked',
        start_dateStatus: 'unchecked',
        deadline_dateStatus: "unchecked",
        priorityStatus: 'unchecked',
        durationStatus: 'unchecked',
        commentsStatus: 'unchecked',
        screen_nameStatus: 'unchecked',

        // start_date: '',  
        // end_date: "",  
        // priority: '',  
        // duration: '',  
        // comments: '',  
        // screen_name: '',  
        // work_item: '',  
        // module_name: '',  
        // deadline_date: "" ,
        // assigned_by_id:  '',  
        // assgign_employee_id: '' , 

    });

    const [controller, dispatch] = useMaterialUIController()

    const [getProjects, setGetProjects] = useState([{
        id: '',
        project_name: '',
        created_at: '',
        employees: []
    }])
    // States 

    const getTask = async () =>{
        setLoader(dispatch, true)
        try{
            let response = await fetchData(`/createTask/${location.state?.id}/`)

            let {project_name, project_name_id, module_name} = response

            setTaskCreationDetails({
                project: {value: project_name_id, label: project_name},  
            })
            setLoader(dispatch, false)
        }
        catch(err){
            setPopup(dispatch, {message: 'Failed to get task', mode: 'error'})
            setLoader(dispatch, false)
        }
    }

    //get projectdetails (get Api)
    const getProjectDetails = async (token) => {
        setLoader(dispatch, true)
        try {
            const response = await fetchData('/projectdetails/')
            if (response) {
                setGetProjects(response);
                setLoader(dispatch, false)
            }
        } catch (error) {
            setLoader(dispatch, false)
            console.error("Failed to send request:", error.response ? error.response.data : error.message);
        }
    }

    // getEmployeeDetails 
    const getEmployees = async () => {
        setLoader(dispatch, true)
        try {
            let response = await fetchData('/employeelist/')
            setEmployee(response.data)
            setLoader(dispatch, false)
        }
        catch (err) {
            console.log(err)
            setLoader(dispatch, false)
        }
    }

    //FUNCTIONS

    // Handle Change 
    const handlePriorityChange = (newPriority) => {
        setTaskCreationDetails({ ...taskCreationDetails, priority: newPriority, priorityStatus: 'success' });
    };

    const handleTaskCreationChange = (event, selectEvent) => {
        const changeAllowed = true;
        let formState = { ...taskCreationDetails };
        if (event?.target === undefined && selectEvent) {
            if (selectEvent.name === 'assign_employee') {
                const usernameRegex = new RegExp("^[a-zA-Z0-9_]{3,16}$");
                if (usernameRegex.test(event?.label) === true) {
                    formState[selectEvent.name + "Status"] =
                        event?.label === undefined ? "unchecked" : "success";
                } else {
                    formState[selectEvent.name + "Status"] =
                        selectEvent.value === "" ? "unchecked" : "error";
                }
            }
            else {
                const lengthRegex = new RegExp("^([A-Za-z\\s]+)$");
                if (lengthRegex.test(event?.label) === true) {
                    formState[selectEvent.name + "Status"] =
                        event?.label === undefined ? "unchecked" : "success";
                } else {
                    formState[selectEvent.name + "Status"] =
                        selectEvent.value === "" ? "unchecked" : "error";
                }
            }
            formState[selectEvent.name] = event;
        } else {
            switch (event.target.name) {
                case "task_title":
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
                case "module_name":
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
                case "work_item":
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
                case "screen_name":
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
                case 'duration':
                    {
                        const onlyNumbers = new RegExp("^([1-9]|1\d|2[0-4])$");
                        if (onlyNumbers.test(event.target.value?.trim())) {
                            formState[event.target.name + "Status"] = "success";
                        } else {
                            formState[event.target.name + "Status"] =
                                event.target.value === "" ? "unchecked" : "error";
                        }
                        break;
                    }
                case "comments":
                    {
                        const alphaNumRegex = new RegExp(`^[A-Za-z0-9 .,!?'"()-]+$`);
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
        };
        setTaskCreationDetails(formState)
    }
    // Handle Change 

    const handleSubmit = async () => {
        setLoader(dispatch, true)

        const payload = {
            project_id: taskCreationDetails.project.value,
            start_date: taskCreationDetails.start_date,
            priority: taskCreationDetails.priority,
            duration: taskCreationDetails.duration,
            comments: taskCreationDetails.comments,
            screen_name: taskCreationDetails.screen_name,
            work_item: taskCreationDetails.work_item,
            module_name: taskCreationDetails.module_name,
            deadline_date: taskCreationDetails.deadline_date,
            assgign_employee_id: taskCreationDetails.assign_employee.value,
            assigned_by_id: parseInt(id),
        };
        // console.log(payload)
        try {
            const response = await postData('createTask/', payload)
            setLoader(dispatch, false)
            setPopup(dispatch, { message: response.message, mode: 'success' })
            setTaskCreationDetails({
                project: { value: '', id: 0 },
                assign_employee: { value: '', id: 0 }, task_title: '', module_name: '',
                work_item: '', screen_name: '', duration: 0, comments: '', start_date: '',
                deadline_date: '', priority: ''
            })
            navigate('/task')

        } catch (error) {
            console.error('Error posting data:', error);
            setLoader(dispatch, false)
            setPopup(dispatch, { message: 'Failed to assign task', mode: 'error' })
        }
        // } else {
        //     console.error('Selected project details not found.');
        // }
    };


    const formatDate = (dateString) => {
        const [day, month, year] = dateString.split('-');
        return `${year}-${month}-${day}`;
    };

    useEffect(() => {
        getProjectDetails();
        getEmployees();

        if(location.state){
            getTask()
        }
    }, []);

    return (
        <DashboardLayout>
            <Card sx={{ padding: '15px' }}>
                <Grid2 container spacing={2}>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <Stack>
                            <MaterialTypography sx={{ fontSize: '13px', fontWeight: 'bold', paddingBottom: '10px' }}>
                                Project Name
                            </MaterialTypography>
                            <MaterialSelect
                                type='text'
                                name='project'
                                placeholder='Project Name'
                                fullWidth
                                onChange={handleTaskCreationChange}
                                value={taskCreationDetails.project}
                                options={getProjects.map((project) => (
                                    {
                                        value: project.id,
                                        label: project.project_name
                                    }
                                ))}
                                success={taskCreationDetails.projectStatus === 'success'}
                                error={taskCreationDetails.projectStatus === 'error'}
                            />
                        </Stack>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <Stack>
                            <MaterialTypography sx={{ fontSize: '13px', fontWeight: 'bold', paddingBottom: '10px' }}>
                                Assign Employee
                            </MaterialTypography>
                            <MaterialSelect
                                type='text'
                                name='assign_employee'
                                placeholder='Task Title'
                                fullWidth
                                onChange={handleTaskCreationChange}
                                value={taskCreationDetails.assign_employee}
                                options={employee.map((employee) => (
                                    {
                                        value: employee.id,
                                        label: employee.username
                                    }
                                ))}
                                success={taskCreationDetails.assign_employeeStatus === 'success'}
                                error={taskCreationDetails.assign_employeeStatus === 'error'}
                            ></MaterialSelect>
                        </Stack>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <Stack>
                            <MaterialTypography sx={{ fontSize: '13px', fontWeight: 'bold', paddingBottom: '10px' }}>
                                Task Tittle
                            </MaterialTypography>
                            <MaterialInput
                                type='text'
                                name='task_title'
                                placeholder='Task Title'
                                fullWidth
                                onChange={handleTaskCreationChange}
                                value={taskCreationDetails.task_title}
                                success={taskCreationDetails.task_titleStatus === 'success'}
                                error={taskCreationDetails.task_titleStatus === 'error'}
                            ></MaterialInput>
                        </Stack>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <Stack>
                            <MaterialTypography sx={{ fontSize: '13px', fontWeight: 'bold', paddingBottom: '10px' }}>
                                Module Name
                            </MaterialTypography>
                            <MaterialInput
                                type='text'
                                name='module_name'
                                placeholder='Module'
                                fullWidth
                                onChange={handleTaskCreationChange}
                                value={taskCreationDetails.module_name}
                                success={taskCreationDetails.module_nameStatus === 'success'}
                                error={taskCreationDetails.module_nameStatus === 'error'}
                            ></MaterialInput>
                        </Stack>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <Stack>
                            <MaterialTypography sx={{ fontSize: '13px', fontWeight: 'bold', paddingBottom: '10px' }}>
                                Work Item
                            </MaterialTypography>
                            <MaterialInput
                                type='text'
                                name='work_item'
                                placeholder=' Work Item'
                                fullWidth
                                onChange={handleTaskCreationChange}
                                value={taskCreationDetails.work_item}
                                success={taskCreationDetails.work_itemStatus === 'success'}
                                error={taskCreationDetails.work_itemStatus === 'error'}
                            ></MaterialInput>
                        </Stack>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <Stack>
                            <MaterialTypography sx={{ fontSize: '13px', fontWeight: 'bold', paddingBottom: '10px' }}>
                                Screen Name
                            </MaterialTypography>
                            <MaterialInput
                                type='text'
                                name='screen_name'
                                placeholder=' Work Item'
                                fullWidth
                                onChange={handleTaskCreationChange}
                                value={taskCreationDetails.screen_name}
                                success={taskCreationDetails.screen_nameStatus === 'success'}
                                error={taskCreationDetails.screen_nameStatus === 'error'}
                            ></MaterialInput>
                        </Stack>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <Stack>
                            <MaterialTypography sx={{ fontSize: '13px', fontWeight: 'bold', paddingBottom: '10px' }}>
                                Assigned Hours
                            </MaterialTypography>
                            <MaterialInput
                                type='number'
                                name='duration'
                                placeholder=' Assigned Hours'
                                fullWidth
                                onChange={handleTaskCreationChange}
                                value={taskCreationDetails.duration}
                                success={taskCreationDetails.durationStatus === 'success'}
                                error={taskCreationDetails.durationStatus === 'error'}
                            ></MaterialInput>
                        </Stack>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                        <Stack>
                            <MaterialTypography sx={{ fontSize: '13px', fontWeight: 'bold', paddingBottom: '10px' }}>
                                Description
                            </MaterialTypography>
                            <MaterialInput type='text' name='comments'
                                multiline rows={4}
                                textArea
                                placeholder='Must hold 250 characters'
                                onChange={handleTaskCreationChange}
                                value={taskCreationDetails.comments}
                                success={taskCreationDetails.commentsStatus === 'success'}
                                error={taskCreationDetails.commentsStatus === 'error'}
                            />
                        </Stack>
                    </Grid2>
                    {/* <Grid2 size={{ xs: 6, md: 4, sm: 3 }}>
                        <Stack>
                            <MaterialTypography sx={{ fontSize: '13px', fontWeight: 'bold' }}>Assign Date</MaterialTypography>
                            <MaterialInput
                                name="assign_date"
                                type="date"
                                placeholder="eg 01-01-2025"
                                onChange={handleTaskCreationChange}
                                value={taskCreationDetails.assign_date}
                                success={taskCreationDetails.assign_dateStatus === 'success'}
                                error={taskCreationDetails.assign_dateStatus === 'error'}
                            />
                        </Stack>
                    </Grid2> */}
                    <Grid2 size={{ xs: 6, md: 4, sm: 3 }}>
                        <Stack>
                            <MaterialTypography sx={{ fontSize: '13px', fontWeight: 'bold', paddingBottom: '10px' }}>Start Date</MaterialTypography>
                            <MaterialInput
                                name="start_date"
                                type="date"
                                placeholder="eg 01-01-2025"
                                onChange={handleTaskCreationChange}
                                value={taskCreationDetails.start_date}
                                success={taskCreationDetails.start_dateStatus === 'success'}
                                error={taskCreationDetails.start_dateStatus === 'error'}
                            />
                        </Stack>
                    </Grid2>
                    <Grid2 size={{ xs: 6, md: 4, sm: 3 }}>
                        <Stack>
                            <MaterialTypography sx={{ fontSize: '13px', fontWeight: 'bold', paddingBottom: '10px' }}>Deadline date</MaterialTypography>
                            <MaterialInput
                                name="deadline_date"
                                type="date"
                                placeholder="eg 01-01-2025"
                                onChange={handleTaskCreationChange}
                                value={taskCreationDetails.deadline_date}
                                success={taskCreationDetails.deadline_dateStatus === 'success'}
                                error={taskCreationDetails.deadline_dateStatus === 'error'}
                            />
                        </Stack>
                    </Grid2>
                    <Grid2 size={{ xs: 6, md: 6, sm: 6 }}>
                        <Stack>
                            <MaterialTypography sx={{ fontSize: '13px', fontWeight: 'bold' }}>Priority</MaterialTypography>
                            <Stack direction={'row'} spacing={1}>
                                <Chip
                                    label="Low"
                                    color={taskCreationDetails.priority === "Low" ? "success" : "default"}
                                    onClick={() => handlePriorityChange('Low')} />
                                <Chip
                                    label="Medium"
                                    color={taskCreationDetails.priority === "Medium" ? "warning" : "default"}
                                    onClick={() => handlePriorityChange('Medium')} />
                                <Chip
                                    label="High"
                                    color={taskCreationDetails.priority === "High" ? "error" : "default"}
                                    onClick={() => handlePriorityChange('High')} />
                            </Stack>
                        </Stack>
                    </Grid2>
                    <Grid2 size={{ xs: 6, md: 6, sm: 6 }} sx={{ alignContent: 'end', textAlign: 'end' }}>
                        <MaterialButton
                            variant="gradient"
                            color="dark"
                            onClick={handleSubmit}
                            disabled={
                                taskCreationDetails.assign_employeeStatus !== 'success' ||
                                taskCreationDetails.commentsStatus !== 'success' ||
                                taskCreationDetails.deadline_dateStatus !== 'success' ||
                                taskCreationDetails.durationStatus !== 'success' ||
                                taskCreationDetails.priorityStatus !== 'success' ||
                                taskCreationDetails.module_nameStatus !== 'success' ||
                                taskCreationDetails.projectStatus !== 'success' ||
                                taskCreationDetails.screen_nameStatus !== 'success' ||
                                taskCreationDetails.start_dateStatus !== 'success' ||
                                taskCreationDetails.task_titleStatus !== 'success' ||
                                taskCreationDetails.work_itemStatus !== 'success'
                            }
                            sx={{ marginRight: '20px' }}
                        >
                            Submit
                        </MaterialButton>
                    </Grid2>
                </Grid2>
            </Card>
        </DashboardLayout >
    )
}
export default TaskAction;