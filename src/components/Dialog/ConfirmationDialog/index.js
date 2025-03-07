import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import PropTypes from "prop-types";
import MaterialTypography from "../../MaterialTypography";
import MaterialBox from "../../MaterialBox";
import MaterialButton from "../../MaterialButton";

const ConfirmationDialog = ({ open, showCancel, showConfirm, onConfirm, onCancel, title, message, customSection, ...rest }) => {
    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            {...rest}
            open={open}
        >
            <DialogTitle>
                <MaterialTypography
                    variant="body1"
                >
                    {title}
                </MaterialTypography>
            </DialogTitle>
            <DialogContent
                variant="body2"
            >
                {message}
                {
                    customSection && (
                        <MaterialBox mt={2}>
                            {customSection}
                        </MaterialBox>
                    )
                }
            </DialogContent>
            <DialogActions>
                {
                    showCancel && (
                        <MaterialButton
                            color="error"
                            variant='text'
                            onClick={onCancel}
                        >
                            Cancel
                        </MaterialButton>
                    )
                }
                {
                    showConfirm && (
                        <MaterialButton
                            color="dark"
                            variant='text'
                            onClick={onConfirm}
                        >
                            Confirm
                        </MaterialButton>
                    )
                }
            </DialogActions>
        </Dialog>
    )
}

ConfirmationDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    showCancel: PropTypes.bool,
    showConfirm: PropTypes.bool,
    customSection: PropTypes.node,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,

}

export default ConfirmationDialog;