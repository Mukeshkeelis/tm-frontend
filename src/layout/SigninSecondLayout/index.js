// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import { Box, Icon, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import PageLayout from "../../layoutcontainers/PageLayout";
import { useMaterialUIController } from "../../context";
import MaterialBox from "../../components/MaterialBox";
import MaterialTypography from "../../components/MaterialTypography";
import MaterialButton from "../../components/MaterialButton";

function SigninLayout({ header, title, description, illustration, children }) {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    return (
        <PageLayout disableFooter showNavbar minHeight="100vh">
            <MaterialBox
                width="calc(100% - 2rem)"
                minHeight="50vh"
                borderRadius="lg"
                mx={2}
                my={2}
                pt={6}
                pb={28}
                sx={{
                    backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                        illustration &&
                        `${linearGradient(
                            rgba(gradients.dark.main, 0.1),
                            rgba(gradients.dark.state, 0.1)
                        )}, url(${illustration})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <Grid container spacing={3} justifyContent="center" sx={{ textAlign: "center" }}>
                    <Grid size={{ xs: 12, lg: 4 }}>
                        <MaterialBox mt={6} mb={1}>
                            <MaterialTypography variant="h1" color="white" fontWeight="bold">
                                {title}
                            </MaterialTypography>
                        </MaterialBox>
                        <MaterialBox mb={2}>
                            <MaterialTypography variant="body2" color="white" fontWeight="regular">
                                {description}
                            </MaterialTypography>
                        </MaterialBox>
                    </Grid>
                </Grid>
            </MaterialBox>
            <MaterialBox mt={{ xs: -26, lg: -24 }} px={1} width="calc(100% - 2rem)" mx="auto">
                <Grid container spacing={3} justifyContent="center">
                    <Grid size={{ xs: 12, sm: 9, md: 5, lg: 4, xl: 3 }}>
                        {children}
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12 }}>
                        <Stack direction="row" spacing={2}
                            justifyContent="space-between"
                            alignItems="center">
                            <MaterialBox>
                                <Stack direction="row" spacing={2}>
                                    <MaterialButton variant="text" color="black">
                                        Terms of use
                                    </MaterialButton>
                                    <MaterialButton variant="text" color="black">
                                        Privacy Policy
                                    </MaterialButton>
                                    <MaterialButton variant="text" color="black">
                                        FAQ
                                    </MaterialButton>
                                </Stack>
                            </MaterialBox>
                            <MaterialBox>
                                <MaterialTypography variant="body2" color="black" fontWeight="regular">
                                    Designed, Developed and Maintained by Keel info solution
                                </MaterialTypography>
                            </MaterialBox>
                        </Stack>
                    </Grid>
                </Grid>

            </MaterialBox>
        </PageLayout>
    );
}

// Typechecking props for the SigninLayout
SigninLayout.propTypes = {
    header: PropTypes.node,
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node.isRequired,
    illustration: PropTypes.string,
};

export default SigninLayout;
