import MaterialBox from "../../../../components/MaterialBox";
import MaterialTypography from "../../../../components/MaterialTypography";
import logo from '../../../../assest/images/logo.png'

function Footer() {
    return (
        <MaterialBox sx={{ textAlign: "right" }}>
            <MaterialTypography variant="body2" color="dark" mr={1}>
                Developed by <a href="" style={{ textDecoration: "none" }}>KEELIS</a> <img style={{ width: 18, height: 12 }} src={logo} alt="image not found"></img>
            </MaterialTypography>
        </MaterialBox>
    );
}

export default Footer;
