import { useEffect, useState } from "react"
import { Card, Stack, Grid2 } from "@mui/material"
import DashboardLayout from "../../../layoutcontainers/DashboardLayout"
import MaterialTypography from "../../../components/MaterialTypography"
import MaterialBox from "../../../components/MaterialBox"
import MaterialInput from "../../../components/MaterialInput"
import MaterialButton from "../../../components/MaterialButton"
import MaterialSelect from "../../../components/MasterSelect"
import { fetchData, postData, putData } from '../../Utils/Baseurl';
import { useLocation, useNavigate } from "react-router-dom"
import { setLoader, setPopup, useMaterialUIController } from "../../../context"

const RoleAction = () => {

    // States 
    let navigate = useNavigate()

    let location = useLocation()

    const [controller, dispatch] = useMaterialUIController()

    const [roleDetails, setRoleDetails] = useState({
        role_name: '', department: { value: 0, label: '' },
        role_nameStatus: 'unchecked', departmentStatus: "unchecked"
    })

    const [departmentDetails, setDepartmentDetails] = useState([])
    // States 

    // Get Departments
    const getDepartments = async () => {
        setLoader(dispatch, true)
        try {
            let response = await fetchData('/departmentdetails/')
            setLoader(dispatch, false)
            setDepartmentDetails(response.data)
        }
        catch (err) {
            console.log(err)
            setLoader(dispatch, false)
            setPopup(dispatch, { message: 'Failed to get departments', mode: 'error' })
        }
    }
    // Get Departments

    // Get Role 
    const getRole = async () => {
        setLoader(dispatch, true)
        try {
            let response = await fetchData(`/roledetails/${location.state.id}/`)
            let value = response.data

            setRoleDetails({
                ...roleDetails, role_name: value.role_name,
                department: { value: value.department_id, label: value.department_name },
                role_nameStatus: value.role_name ? 'success' : 'unchecked',
                departmentStatus: value.department_id ? 'success' : 'unchecked'
            })

            setLoader(dispatch, false)
        }
        catch(err){

            setPopup(dispatch, {message: 'Failed to get role', mode: 'error'})
            setLoader(dispatch, false)
            console.log(err)
        }
    }
    // Get Role 

    // Handle Change Role Master
    const handleRoleChange = (event, selectEvent) => {
        const changeAllowed = true;
        let formState = { ...roleDetails };
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
                case "role_name":
                    {
                        const alphaNLengthRegex = new RegExp("^([A-Za-z\\s]+)$");
                        if (alphaNLengthRegex.test(event.target.value?.trim())) {
                            formState[event.target.name + "Status"] = "success";
                        } else {
                            formState[event.target.name + "Status"] =
                                event.target.value === "" ? "unchecked" : "error";
                        }
                    }
                    break;

                    {
                        const alphaNLengthRegex = new RegExp("^([A-Za-z0-9 ]{1,50})$");
                        if (alphaNLengthRegex.test(event.target.value?.trim())) {
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
        setRoleDetails(formState)
    }

    // Handle Submit Role Master
    const handleSubmit = async () => {
        setLoader(dispatch, true)
        if (location.state) {
            try {
                let payload = { role_name: roleDetails.role_name, department_id: roleDetails.department.value }
                let response = await putData(`/roledetails/${location.state.id}/`, payload)
                setLoader(dispatch, false)
                setPopup(dispatch, {message: 'Role updated successfully', mode: 'success'})
                navigate(-1)
            }
            catch (err) {
                console.log(err)
                setLoader(dispatch, false)
                setPopup(dispatch, {message: 'Failed to update role', mode: 'error'})
            }
        }
        else {
            try {
                let payload = { role_name: roleDetails.role_name, department_id: roleDetails.department.value }
                await postData('/roledetails/', payload)
                setLoader(dispatch, false)
                setPopup(dispatch, {message: 'Role added successfully', mode: 'success'})
                navigate(-1);
            }
            catch (err) {
                console.log(err)
                setLoader(dispatch, false)
                setPopup(dispatch, {message: 'Failed to add role', mode: 'error'})
            }
        }
    }
    // Handle Submit Role Master

    useEffect(() => {
        getDepartments()

        if (location.state) {
            getRole()
        }
    }, [])


    return <DashboardLayout>
        <Card sx={{ padding: 2, overflow: 'unset' }}>
            <Stack direction='column' spacing={0}>
                <MaterialTypography variant='h5' sx={{ fontWeight: 'bold' }}>{location.state ? 'Update Role Master' : 'Add Role Master'}</MaterialTypography>
                {/* <MaterialTypography variant='caption' color='text'>You can add task here</MaterialTypography> */}
                <Grid2 container spacing={2} mt={2}>
                    <Grid2 size={{ xs: 12, sm: 6, md: 5 }}>
                        <Stack direction='column' spacing={1}>
                            <MaterialTypography variant='caption' color='text'>Role Name</MaterialTypography>
                            <MaterialInput
                                name="role_name"
                                placeholder="eg Intern"
                                value={roleDetails.role_name}
                                onChange={handleRoleChange}
                                error={roleDetails.role_nameStatus === "error"}
                                success={roleDetails.role_nameStatus === "success"}
                            />
                        </Stack>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6, md: 5 }}>
                        <Stack direction='column' spacing={1}>
                            <MaterialTypography variant='caption' color='text'>Department Name</MaterialTypography>
                            <MaterialSelect
                                name="department"
                                placeholder="eg IT"
                                onChange={handleRoleChange}
                                value={roleDetails.department}
                                options={departmentDetails.map(departmentDetail => {
                                    return {
                                        value: departmentDetail.id,
                                        label: departmentDetail.department_name,
                                    }
                                })}
                                error={roleDetails.departmentStatus === "error"}
                                success={roleDetails.departmentStatus === "success"}
                            />
                        </Stack>
                    </Grid2>
                    <MaterialBox display="flex" justifyContent={{ md: "flex-end" }} mt={3}>
                        <MaterialButton
                            variant="gradient"
                            color="dark"
                            style={{ maxWidth: '100px', minWidth: '100px' }}
                            disabled={roleDetails.departmentStatus !== 'success' ||
                                roleDetails.role_nameStatus !== 'success'
                            }
                            onClick={handleSubmit}
                        >
                            submit
                        </MaterialButton>
                    </MaterialBox>
                </Grid2>
            </Stack>
        </Card>
    </DashboardLayout>
}

export default RoleAction