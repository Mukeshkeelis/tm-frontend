import { Snackbar, Alert, Button } from "@mui/material";
import { setPopup, useMaterialUIController,  } from "../../context";

const Popup = () => {

    let [controller, dispatch] = useMaterialUIController()

    let { popup } = controller
  
    const handleClose = (event, reason) => {
        setPopup(dispatch, null)
    };
  
    return (
      <div>
        <Snackbar
          open={popup ? true : false}
          autoHideDuration={3000}
          onClose={handleClose}
          sx={{marginBottom: '2rem', marginRight: '2rem', zIndex: 2000}}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={handleClose} severity={popup?.mode} sx={{ width: "100%" }}>
            {popup?.message}
          </Alert>
        </Snackbar>
      </div>
    );
  };
  
export default Popup;