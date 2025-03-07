import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../../layoutcontainers/DashboardLayout'
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Grid2, Icon, Stack } from '@mui/material';
import MaterialTypography from '../../../components/MaterialTypography';
import MaterialInput from '../../../components/MaterialInput';
import MaterialBox from '../../../components/MaterialBox';
import MaterialButton from '../../../components/MaterialButton';
import MaterialSelect from '../../../components/MasterSelect';
import { fetchData, postData, putData } from '../../Utils/Baseurl'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { setLoader, setPopup, useMaterialUIController } from '../../../context';

const EmployeeAction = () => {

    let navigate = useNavigate()

    let location = useLocation()

    const [controller, dispatch] = useMaterialUIController()

    // State 
    const [pageState, setPageState] = useState({
        loading: false,
        error: false,
        message: "",
        state: 'init'
    })


    const [snackBar, setSnackBar] = useState({
        Success: false,
        Error: false
    })

    const [employeeData, setEmployeeData] = useState({
        // first_name: '',
        // last_name: '',
        username: '',
        email: '',
        role: { value: 0, label: '' },
        department: { value: 0, label: '' },
        permission: { value: 0, label: '' },
        role_name: '',
        department_name: '',
        permission_name: '',
        // manager_name: '',
        password: '',
        confirm_password: '',

        //Status state
        // first_nameStatus: 'unchecked',
        usernameStatus: 'unchecked',
        emailStatus: 'unchecked',
        // manager_nameStatus: 'unchecked',
        roleStatus: 'unchecked',
        departmentStatus: 'unchecked',
        permissionStatus: 'unchecked',
        passwordStatus: 'unchecked',
        confirm_passwordStatus: 'unchecked',
    });

    const [departmentData, setDepartmentData] = useState([]);

    const [roleData, setRoleData] = useState([])

    const [permissionData, setPermissionData] = useState([{ permission: '', id: '' }])

    const status = [{ value: 'active', label: 'active' }, { value: 'inactive', label: 'inactive' }]

    // State 

    // Get Employee
    const getEmployee = async () => {
        let response = await fetchData(`/employeedetails/${location.state.id}/`);
        let value = response.data;
        setEmployeeData({
            ...employeeData,

            username: value.username,
            email: value.email, role: { value: value.role_id, label: value.role_name },
            department: { value: value.department_id, label: value.department_name },
            permission: { value: value.permission_id, label: value.permission_name },
            manager_name: value.manager_name, is_active: { value: value.is_active, label: value.is_active },

            usernameStatus: value.username ? 'success' : 'unchecked',
            emailStatus: value.username ? 'success' : 'unchecked',
            roleStatus: value.username ? 'success' : 'unchecked',
            departmentStatus: value.username ? 'success' : 'unchecked',
            permissionStatus: value.username ? 'success' : 'unchecked',
            manager_nameStatus: value.username ? 'success' : 'unchecked',
            is_activeStatus: value.username ? 'success' : 'unchecked'
        })

    }
    // Get Employee

    // Get Role 
    const getRoleData = async () => {
        setLoader(dispatch, true)
        try {
            let response = await fetchData('/roledetails/')
            // let filteredRole = response.Data.filter(role => role.department_name === employeeData.department_name)
            setRoleData(response.data)
            setLoader(dispatch, false)
        }
        catch (err) {
            setLoader(dispatch, false)
            setPopup(dispatch, { message: 'Failed to get roles', mode: 'error' })
            console.log(err)
        }
    }
    // Get Role 

    // Get Department 
    const getDepartmentData = async () => {
        setLoader(dispatch, true)
        try {
            let response = await fetchData('/departmentdetails/')
            setLoader(dispatch, false)
            setDepartmentData(response.data)
        }
        catch (err) {
            setLoader(dispatch, false)
            setPopup(dispatch, { message: 'Failed to get departments', mode: 'error' })
            console.log(err)
        }
    }
    // Get Department

    // Get Permission
    const getPermissionData = async () => {
        setLoader(dispatch, true)
        try {
            let response = await fetchData('/permissiondetails/')
            setLoader(dispatch, false)
            setPermissionData(response.data)
        }
        catch (err) {
            console.log(err)
            setLoader(dispatch, false)
            setPopup(dispatch, { message: 'Failed to get permissions', mode: 'error' })
        }
    }
    // Get Permission

    // View Password
    const [viewPassword, setViewPassword] = useState({ password: false, confirm_password: false })

    const handlePasswordVisibility = (type) => {
        setViewPassword({ ...viewPassword, [type]: !viewPassword[type] })
    }
    // View Password

    // Close Add Employee Page
    const handleCloseAddEmployee = () => {
        navigate('/employee-management')
    }
    // Close Add Employee Page

    // Handle Employee Change 
    const handleEmployeeChange = (event, selectEvent) => {
        const changeAllowed = true;
        let formState = { ...employeeData };
        if (event?.target === undefined && selectEvent) {
            const lengthRegex = new RegExp("^([A-Za-z\\s]+)$");
            if (lengthRegex.test(event?.label) === true) {
                formState[selectEvent.name + "Status"] =
                    event?.label === undefined ? "unchecked" : "success";
            } else {
                formState[selectEvent.name + "Status"] =
                    selectEvent.value === "" ? "unchecked" : "error";
            }
            formState[selectEvent.name] = event;
        } else {
            switch (event.target.name) {
                case "username":
                    {
                        const alphaNLengthRegex = new RegExp("^[a-zA-Z0-9_]{3,16}$");
                        if (alphaNLengthRegex.test(event.target.value?.trim())) {
                            formState[event.target.name + "Status"] = "success";
                        } else {
                            formState[event.target.name + "Status"] =
                                event.target.value === "" ? "unchecked" : "error";
                        }
                    }
                    break;
                case "email":
                    {
                        const alphaNLengthRegex = new RegExp("\\.(com|org|net|info|biz)$");
                        // const validTLDsRegex = /\.(com)$/;
                        if (alphaNLengthRegex.test(event.target.value?.trim())) {
                            formState[event.target.name + "Status"] = "success";
                        } else {
                            formState[event.target.name + "Status"] =
                                event.target.value === "" ? "unchecked" : "error";
                        }
                    }
                    break;
                case "manager_name":
                    {
                        const dateLengthRegex = new RegExp("^([A-Za-z]{1,50})$");

                        if (dateLengthRegex.test(event.target.value?.trim())) {
                            formState[event.target.name + "Status"] = "success";
                        } else {
                            formState[event.target.name + "Status"] =
                                event.target.value === "" ? "unchecked" : "error";
                        }
                    }
                    break;
                case "password":
                    {
                        const dateLengthRegex = new RegExp("^.{8,}$");

                        if (dateLengthRegex.test(event.target.value?.trim())) {
                            formState[event.target.name + "Status"] = "success";
                        } else {
                            formState[event.target.name + "Status"] =
                                event.target.value === "" ? "unchecked" : "error";
                        }

                        if (event.target.value === formState.confirm_password) {
                            formState["confirm_passwordStatus"] = "success";
                        } else if (formState.confirm_password.length > 8 && event.target.value !== formState.confirm_password) {
                            formState["confirm_passwordStatus"] =
                                event.target.value === "" ? "unchecked" : "error";
                        }
                    }
                    break;
                case "confirm_password":
                    {
                        if (formState.password === event.target.value) {
                            formState[event.target.name + "Status"] = "success";
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
        setEmployeeData(formState)
    }
    // Handle Employee Change 

    // Handle Submit Employee
    const handleSubmit = async () => {
        setLoader(dispatch, true)
        if (location.state) {
            try {
                let { username, email, manager_name, department, permission, role, is_active } = employeeData;

                let payload = {
                    username, email, manager_name,
                    department_id: department.value,
                    permission_id: permission.value,
                    role_id: role.value, is_active: is_active.value
                }

                let response = await putData(`/employeedetails/${location.state.id}/`, payload)
                navigate('/employee-management')
                setLoader(dispatch, false)
                setPopup(dispatch, { message: 'Employee updated successfully', mode: 'success' })
            }
            catch (err) {
                console.log(err)
                setLoader(dispatch, false)
                setPopup(dispatch, { message: 'Failed to update employee', mode: 'error' })
            }
        }
        else {
            try {
                let { username, email, manager_name, role, department, permission, password } = employeeData;

                let payload = {
                    username,
                    email, department_id: department.value,
                    permission_id: permission.value,
                    role_id: role.value, manager_name, password
                }

                let response = await postData('/employeedetails/', payload)
                setLoader(dispatch, false)
                setPopup(dispatch, {message: 'Employee added successfully', mode: 'success'})
                navigate('/employee-management')
            }
            catch (err) {
                setLoader(dispatch, false)
                setPopup(dispatch, {message: 'Failed to add employee', mode: 'error'})
                console.log(err)
            }
        }
    }
    // Handle Submit Employee

    useEffect(() => {

        if (location.state) {
            getEmployee()
        }

        getRoleData()
        getDepartmentData()
        getPermissionData()
    }, [])

    useEffect(() => {
    }, [employeeData.department.value])

    return (
        <DashboardLayout>
            <Card sx={{ padding: 2, overflow: 'unset' }}>
                <Stack direction='row' justifyContent={'space-between'} spacing={0}>
                    <Stack direction='column' spacing={0}>
                        <MaterialTypography variant='h5' sx={{ fontWeight: 'bold' }}>{location.state ? 'Update  ' : 'Add'} Employee</MaterialTypography>
                        <MaterialTypography variant='caption' color='text'>You can {location.state ? 'Update' : 'Add'} employee here</MaterialTypography>
                    </Stack>
                    {location.state && <Stack>
                        <MaterialSelect
                            name="is_active"
                            onChange={handleEmployeeChange}
                            value={employeeData.is_active}
                            options={status.map(({ label, value }) => {
                                return {
                                    value: value,
                                    label: label,
                                }
                            })}
                            placeholder={"Eg Active"}
                            error={employeeData.is_activeStatus === 'error'}
                            success={employeeData.is_activeStatus === 'success'}
                        />
                    </Stack>}
                </Stack>
                <Grid2 container spacing={2} mt={2}>
                    {/* USERNAME */}
                    <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                        <Stack direction='column' spacing={1}>
                            <MaterialTypography variant='caption' color='text'>Username</MaterialTypography>
                            <MaterialInput
                                name="username"
                                placeholder="eg raj"
                                value={employeeData.username}
                                onChange={handleEmployeeChange}
                                error={employeeData.usernameStatus === "error"}
                                success={employeeData.usernameStatus === "success"}
                            />
                        </Stack>
                    </Grid2>
                    {/* USERNAME */}
                    {/* EMAIL */}
                    <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                        <Stack direction='column' spacing={1}>
                            <MaterialTypography variant='caption' color='text'>Email</MaterialTypography>
                            <MaterialInput
                                name="email"
                                placeholder="name@example.com"
                                value={employeeData.email}
                                onChange={handleEmployeeChange}
                                error={employeeData.emailStatus === "error"}
                                success={employeeData.emailStatus === "success"}
                            />
                        </Stack>
                    </Grid2>
                    {/* EMAIL */}
                    {/* DEPARTMENT */}
                    <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                        <Stack direction='column' spacing={1}>
                            <MaterialTypography variant='caption' color='text'>Department</MaterialTypography>
                            <MaterialSelect
                                name="department"
                                onChange={handleEmployeeChange}
                                value={employeeData.department}
                                options={departmentData.map(({ department_name, id }) => {
                                    return {
                                        value: id,
                                        label: department_name,
                                    }
                                })}
                                placeholder={"Eg Admin"}
                                success={employeeData.departmentStatus === 'success'}
                                error={employeeData.departmentStatus === 'error'}
                            />
                        </Stack>
                    </Grid2>
                    {/* DEPARTMENT */}
                    {/* ROLE */}
                    <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                        <Stack direction='column' spacing={1}>
                            <MaterialTypography variant='caption' color='text'>Role</MaterialTypography>
                            <MaterialSelect
                                name="role"
                                placeholder={'Eg Full Stack Developer'}
                                value={employeeData.role}
                                onChange={handleEmployeeChange}
                                options={roleData.map(({ role_name, id }) => {
                                    return {
                                        value: id,
                                        label: role_name,
                                    }
                                })}
                                error={employeeData.roleStatus === 'error'}
                                success={employeeData.roleStatus === 'success'}
                            />
                        </Stack>
                    </Grid2>
                    {/* ROLE */}
                    {/* MANAGER NAME */}
                    {/* <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                        <Stack direction='column' spacing={1}>
                            <MaterialTypography variant='caption' color='text'>Manager Name</MaterialTypography>
                            <MaterialInput
                                name="manager_name"
                                placeholder="Mrs XYZ"
                                value={employeeData.manager_name}
                                onChange={handleEmployeeChange}
                                error={employeeData.manager_nameStatus === "error"}
                                success={employeeData.manager_nameStatus === "success"}
                            />
                        </Stack>
                    </Grid2> */}
                    {/* MANAGER NAME  */}
                    {/* PERMISSION */}
                    <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                        <Stack direction='column' spacing={1}>
                            <MaterialTypography variant='caption' color='text'>Persmission</MaterialTypography>
                            <MaterialSelect
                                name="permission"
                                placeholder={"Eg Manager"}
                                onChange={handleEmployeeChange}
                                value={employeeData.permission}
                                options={permissionData.map(({ permission, id }) => {
                                    return {
                                        value: id,
                                        label: permission,
                                    }
                                })}
                                error={employeeData.permissionStatus === 'error'}
                                success={employeeData.permissionStatus === 'success'}
                            />
                        </Stack>
                    </Grid2>
                    {/* PERMISSION */}
                    {
                        location.state ? '' :
                            <>
                                < Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                                    <Stack direction='column' spacing={1}>
                                        <MaterialTypography variant='caption' color='text'>Password</MaterialTypography>
                                        <MaterialInput
                                            name="password"
                                            placeholder="******"
                                            type={viewPassword.password ? 'text' : 'password'}
                                            value={employeeData.password}
                                            onChange={handleEmployeeChange}
                                            icon={viewPassword.password ? {
                                                direction: "right",
                                                component: (
                                                    <Icon color="action" fontSize="small">
                                                        <VisibilityIcon
                                                            onClick={() => handlePasswordVisibility('password')}
                                                            style={{ cursor: "pointer" }}
                                                        />
                                                    </Icon>
                                                )
                                            } : {
                                                direction: "right",
                                                component: (
                                                    <Icon color="action" fontSize="small">
                                                        <VisibilityOffIcon
                                                            onClick={() => handlePasswordVisibility('password')}
                                                            style={{ cursor: "pointer" }}
                                                        />
                                                    </Icon>
                                                )
                                            }}
                                            error={employeeData.passwordStatus === "error"}
                                            success={employeeData.passwordStatus === "success"}
                                        />
                                    </Stack>
                                </Grid2>
                                <Grid2 size={{ xs: 12, sm: 6, md: 6 }}>
                                    <Stack direction='column' spacing={1}>
                                        <MaterialTypography variant='caption' color='text'>Confirm Password</MaterialTypography>
                                        <MaterialInput
                                            name="confirm_password"
                                            placeholder="******"
                                            type={viewPassword.confirm_password ? 'text' : 'password'}
                                            value={employeeData.confirm_password}
                                            onChange={handleEmployeeChange}
                                            icon={viewPassword.confirm_password ? {
                                                direction: "right",
                                                component: (
                                                    <Icon color="action" fontSize="small">
                                                        <VisibilityIcon
                                                            onClick={() => handlePasswordVisibility('confirm_password')}
                                                            style={{ cursor: "pointer" }}
                                                        />
                                                    </Icon>
                                                )
                                            } : {
                                                direction: "right",
                                                component: (
                                                    <Icon color="action" fontSize="small">
                                                        <VisibilityOffIcon
                                                            onClick={() => handlePasswordVisibility('confirm_password')}
                                                            style={{ cursor: "pointer" }}
                                                        />
                                                    </Icon>
                                                )
                                            }}
                                            error={employeeData.confirm_passwordStatus === "error"}
                                            success={employeeData.confirm_passwordStatus === "success"}
                                        />
                                    </Stack>
                                </Grid2>
                            </>
                    }
                </Grid2>

                <MaterialBox display="flex" justifyContent={{ md: "flex-end" }} mt={3}>
                    <MaterialButton variant="outlined" color="dark" sx={{ mr: 2 }} onClick={handleCloseAddEmployee}>
                        Cancel
                    </MaterialButton>
                    <MaterialButton
                        variant="gradient"
                        color="dark"
                        disabled={employeeData.usernameStatus !== 'success' ||
                            employeeData.emailStatus !== 'success' ||
                            employeeData.departmentStatus !== 'success' ||
                            employeeData.roleStatus !== 'success' ||
                            // employeeData.manager_nameStatus !== 'success' ||
                            employeeData.permissionStatus !== 'success' ||
                            !location.state && employeeData.passwordStatus !== 'success' ||
                            !location.state && employeeData.confirm_passwordStatus !== 'success' ? true : false
                        }
                        style={{ maxWidth: '100px', minWidth: '100px' }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </MaterialButton>
                </MaterialBox>
            </Card>
        </DashboardLayout >
    )
}

export default EmployeeAction
