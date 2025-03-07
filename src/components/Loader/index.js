import { CircularProgress, Backdrop } from "@mui/material";

const Loader = ({ open }) => {
    return (
      <Backdrop open={open} sx={{ color: "#f1c760", zIndex: 1500 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  };

  export default Loader;