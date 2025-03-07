import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, Grid2, IconButton, Stack, Typography } from '@mui/material'
import DashboardLayout from '../../../layoutcontainers/DashboardLayout';
import MaterialTypography from '../../../components/MaterialTypography';
import MaterialInput from '../../../components/MaterialInput';
import MaterialButton from '../../../components/MaterialButton';
import MaterialBox from '../../../components/MaterialBox';
import BASE_URL, { fetchData, postData, putData } from '../../Utils/Baseurl';
import { setLoader, setPopup, useMaterialUIController } from '../../../context';
// import apiClient from '../../../Utils/Baseurl';
// import endpoint from '../../../Utils/Baseurl';
// import data from '../../../Utils/Baseurl';


const DepartmentAction = () => {

    // States 
    const location = useLocation();

    const token = sessionStorage.getItem('access');

    const [ controller, dispatch ] = useMaterialUIController();

    const [departmentDetails, setDepartmentDetails] = useState({
        department_name: ' ', department_nameStatus: 'unchecked'
    });
    
    // States 

    const getDepertment = async () =>{
        setLoader(dispatch, true)
        try{
            let response = await fetchData(`/departmentdetails/${location.state.id}/`)
            setDepartmentDetails(response.data)
            setLoader(dispatch, false)
        }
        catch(err){
            console.log(err)
            setLoader(dispatch, false)
            setPopup(dispatch, {message: 'Failed to get current department', mode: 'error'})
        }
    }

    //  const[editid,seteditid]=useState(0);

    // Handle Change 
    const handleDepartmentChange = (event, selectEvent) => {
        const changeAllowed = true;
        let formState = { ...departmentDetails };
        
        const alphaNLengthRegex = new RegExp("^([A-Za-z\\s]+)$");
        if (alphaNLengthRegex.test(event.target.value?.trim())) {
            formState[event.target.name + "Status"] = "success";
        } else {
            formState[event.target.name + "Status"] =
                event.target.value === "" ? "unchecked" : "error";
        }

        if (changeAllowed) {
            formState[event.target.name] = event.target.value;
        }
        setDepartmentDetails(formState)

    }
    // Handle Change 

    const navigate = useNavigate()

    // Handle Submit 
    const handleSubmit = async () => {
        setLoader(dispatch, true)
            if (location.state===null){
                try{
                    const payload = { department_name: departmentDetails.department_name };
                    const response = await postData('/departmentdetails/', payload);
                    setPopup(dispatch, {message: 'Department added successfully', mode: 'success'})
                    setLoader(dispatch, false)
                }
                catch(err){
                    console.log(err)
                    setPopup(dispatch, {message: 'Failed to add department', mode: 'error'})
                    setLoader(dispatch, false)
                }
            }
            else {

                try{
                    const payload = { department_name: departmentDetails.department_name };
                    const response = await putData(`/departmentdetails/${location.state?.id}/`, payload);
                    setPopup(dispatch, {message: 'Department updated successfully', mode: 'success'})
                    setLoader(dispatch, false)
                }
                catch(err){
                    setPopup(dispatch, {message: 'Failed to update department', mode: 'error'})
                    setLoader(dispatch, false)
                    console.log(err)
                }

            } 
            setDepartmentDetails({department_name: '', department_nameStatus: 'unchecked'});
            navigate(-1);

    };
    // Handle Submit 

    useEffect(() => {
        if(location.state){
            getDepertment()
        }
    }, [])


    return (
        <DashboardLayout>
            <Card sx={{ padding: 2 }}>
                <Grid2 container spacing={1} p={1} sx={{ paddingBottom: '0' }} >
                    <Grid2 size={{ xs: 3, sm: 3 }} >
                        <MaterialTypography variant="h5" sx={{ fontWeight: 'bold' }}>
                            {location.state ? 'Update' : 'Add'} Department Master
                        </MaterialTypography>
                    </Grid2>
                </Grid2>
                <Grid2 container spacing={1} p={1}>
                    <Grid2 size={{ xs: 6, sm: 6 }} >
                        <MaterialBox lineHeight={0} display="inline-block">
                            <MaterialTypography
                                component="label"
                                variant="caption"
                                fontWeight="bold"
                            >
                                Department*
                            </MaterialTypography>
                        </MaterialBox>
                        <MaterialInput
                            type='text'
                            name="department_name"
                            placeholder="Enter your Department"
                            value={departmentDetails.department_name}
                            onChange={handleDepartmentChange}
                        error={departmentDetails.department_nameStatus === "error"}
                        success={departmentDetails.department_nameStatus === "success"}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 3, sm: 3 }} sx={{ marginTop: '30px' }}>
                        <MaterialButton
                            variant="gradient"
                            color="dark"
                            disabled={departmentDetails.department_nameStatus!=='success'}
                            style={{ maxWidth: "100px", minWidth: "100px" }}
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
export default DepartmentAction;
