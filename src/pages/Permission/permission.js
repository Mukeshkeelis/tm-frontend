import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../layoutcontainers/DashboardLayout'
import { Card, CardContent, Grid2, Grid, Stack } from '@mui/material'
import {
  Chip,
  DialogActions,
  FormControl,
  FormHelperText,
} from "@mui/material";
import MaterialBox from "../../components/MaterialBox";
import MaterialTypography from "../../components/MaterialTypography";
import MaterialButton from "../../components/MaterialButton";
import MaterialInput from "../../components/MaterialInput";
import MaterialDataGrid from '../../components/MaterialDataGrid'
import { Dialog, DialogContent } from "@mui/material";
import Slide from "@mui/material/Slide";
import axios from "axios";
import BASEURL from "../Utils/Baseurl"
import ConfirmationDialog from '../../components/Dialog/ConfirmationDialog'
import { Tune } from '@mui/icons-material';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Permission = () => {


  const [State, setState] = useState({
    Permission: '',
    PermissionStatus: 'unchecked',

  });
  const [Permissiondetails, setPermissiondetails] = useState([])
  const [loading, setLoading] = useState(true);

  const [open, setopen] = useState(false)
  const [editid, seteditid] = useState(0)
  const [deleteid, setdeleteid] = useState(0)
  const [deleteopen, setdeleteopen] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem('access');
    getPermissionDetails(token)

  }, [])

  const handlePermission = (event) => {
    const changeAllowed = true;
    let userState = { ...State };

    switch (event.target.name) {
      case "Permission":
        {
          const alphaNLengthRegex = new RegExp("^([A-Za-z]{1,50})$");
          if (alphaNLengthRegex.test(event.target.value?.trim())) {
            userState[event.target.name + "Status"] = "success";
          } else {
            userState[event.target.name + "Status"] =
              event.target.value === "" ? "unchecked" : "error";
          }
        }
        break;

    }
    if (changeAllowed) {
      userState[event.target.name] = event.target.value;
    }
    setState(userState);
  };

  const handleClose = () => {
    setopen(false)
  }

  console.log(
    Permissiondetails, "Permissiondetails"
  )
  const Permission = [
    { field: "id", headerName: "No", },
    { field: "permission", headerName: "Permission Name", },
    { field: "actions", headerName: "Actions", },
  ];


  const getPermissionDetails = async (token) => {
    try {
      const response = await axios.get(
        `${BASEURL}permissiondetails/`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },

        }
      );

      console.log(response.data, 'response');
      if (response.data.status == true) {
        let value = response.data.Data
        setPermissiondetails(value);
      }


    } catch (error) {
      console.error("Failed to send request:", error.response ? error.response.data : error.message);
    }
  };


  const handleSubmit = async () => {
    try {
      const token = sessionStorage.getItem('access');

      if (editid == 0) {
        const response = await axios.post(
          `${BASEURL}permissiondetails/`,
          {
            permission_name: State.Permission
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
      }
      else {
        const response = await axios.put(
          `${BASEURL}permissiondetails/${editid}/`,
          {
            permission_name: State.Permission
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
      }
      getPermissionDetails(token)
      Discard()


    }
    catch (error) {
      console.error("Failed to send request:", error);
    }
  }
  const handleClickOpen = () => {
    setopen(true)
  }

  const validatesubmit = () => {
    return (
      State.PermissionStatus == "success"
    );
  }

  const onView = async (id) => {

  };

  const onEdit = async (id) => {
    let details = Permissiondetails.filter(x => x.id === id)
    setState({
      ...State,
      Permission: details[0].permission_name,
      PermissionStatus: "success",
    })
    seteditid(details[0].id)
    setopen(true)

  };

  const onDelete = (id) => {
    setdeleteid(id)
    setdeleteopen(true)
  };

  const Discard = () => {

    setopen(false)
    seteditid(0)
    setdeleteid(0)
    setdeleteopen(false)
    setState({
      ...State,
      Permission: '',
      PermissionStatus: 'unchecked'
    })
  }

  const handleDialogConfirm = async () => {
    try {
      const token = sessionStorage.getItem('access');
      const response = await axios.delete(
        `${BASEURL}permissiondetails/${deleteid}/`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      getPermissionDetails(token)
    }
    catch (error) {
      console.error("Failed to send request:", error);
    }
    Discard()
  }

  const handleDialogCancel = () => {
    Discard()
  }





  return (
    <DashboardLayout>
      <Card sx={{ padding: 2 }}>
        <Grid container spacing={1} p={1}>
          <Grid item xs={3} sm={3} >
            <MaterialTypography variant="h5" sx={{ fontWeight: 'bold' }}>
              Permission
            </MaterialTypography>
          </Grid>
          <Grid item xs={9} sm={9}>
            <MaterialButton variant="gradient" color="dark" onClick={handleClickOpen}>
              +Add Rank
            </MaterialButton>
          </Grid>
        </Grid>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <Grid container>
              <Grid size={{ xs: 12, sm: 12 }}>
                <MaterialBox lineHeight={0} display="inline-block">
                  <MaterialTypography
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                  >
                    Permission*
                  </MaterialTypography>
                </MaterialBox>
                <MaterialInput
                  name="Permission"
                  placeholder="Enter Permission"
                  value={State.Permission}
                  onChange={handlePermission}
                  error={State.PermissionStatus === "error"}
                  success={State.PermissionStatus === "success"}
                />
                {State.PermissionStatus === "error" && (
                  <FormControl error>
                    <FormHelperText>
                      Permission should only contain alphabets
                    </FormHelperText>
                  </FormControl>
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <MaterialButton variant="outlined" color="dark" onClick={handleClose}>
              Cancel
            </MaterialButton>
            <MaterialButton
              variant="gradient"
              color="dark"
              style={{ maxWidth: "100px", minWidth: "100px" }}
              disable={!validatesubmit()}
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </MaterialButton>
          </DialogActions>
        </Dialog>
        <ConfirmationDialog
          open={deleteopen}
          showCancel={true}
          showConfirm={true}
          title="Confirm Deletion"
          message="Are you sure you want to delete this record?"
          onConfirm={handleDialogConfirm}
          onCancel={handleDialogCancel}
        />
        <Grid container>
          <Grid xs={12} sm={12} padding="15px">
            {/* <Grid padding="15px">
              <MaterialButton
                variant="gradient"
                color="dark"
                onClick={handleClickOpen}
              >
                +Add Rank
              </MaterialButton>
            </Grid> */}
            <MaterialDataGrid
              rows={Permissiondetails}
              // loading={loading}
              columns={Permission}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </Grid>
        </Grid>
      </Card>
    </DashboardLayout>
  )
}

export default Permission
