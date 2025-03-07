// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid2";
import bgImage from '../../assest/images/bgImage.png'
import MaterialBox from "../../components/MaterialBox";
import MaterialTypography from "../../components/MaterialTypography";
import PageLayout from "../../layoutcontainers/PageLayout";
import track from '../../assest/images/track.jpg'

// Material Dashboard 2 PRO React page layout routes


function SignUpLayout({ title, subtitle, children }) {
    return (
        <PageLayout height='95vh'>
            <MaterialBox bgColor="white">
                <MaterialBox
                    minHeight="50vh"
                    width="100%"
                    sx={{
                        backgroundImage: ({ functions: { linearGradient }, palette: { gradients } }) =>
                            linearGradient(gradients.dark.main, gradients.dark.state),
                    }}
                />
                <MaterialBox
                    variant="gradient"
                    bgColor="white"
                    position="relative"
                    borderRadius="xl"
                    mx={{ xs: 2, xl: 3, xxl: 16 }}
                    mt={-35}
                    px={3}
                    sx={{ overflow: "hidden" }}
                >
                    {/* <MaterialBox
                        component="img"
                        src={bgImage}
                        alt="pattern-lines"
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        opacity={0.6}
                    /> */}
                    <Grid container display="flex" justifyContent="center" alignItems="center" p={6}>
                        <Grid size={{ xs: 12, md: 5, lg: 5 }} mr="auto" position="relative">
                            <MaterialBox display="flex" justifyContent="center" alignItems="center" >
                                <img src={bgImage} alt="Image not loaded"
                                    style={{
                                        width: '70%',
                                        height: 85,
                                        justifyContent: "center",
                                        textAlign: "center",
                                        alignItems: "center",
                                        borderRadius: '15px'
                                    }}
                                />
                            </MaterialBox>
                            <MaterialBox display="flex" alignItems="center" flexDirection="column" px={3} mt={2} justifyContent="center" >
                                <MaterialTypography variant="h4" fontWeight="bold" textAlign="center" color='black'>
                                    {title}
                                </MaterialTypography>
                            </MaterialBox>
                            <MaterialBox display="flex" alignItems="center" flexDirection="column" px={3} mb={1} justifyContent="center" >
                                <MaterialTypography variant="body2" textAlign="center" color='black'>
                                    {subtitle}
                                </MaterialTypography>
                            </MaterialBox>

                            <MaterialBox p={2} display="flex" flexDirection="column">
                                {children}
                            </MaterialBox>
                        </Grid>
                        <Grid size={{ xs: 12, md: 7 }} position="absolute" left="50%" mr={-32} width="75%">
                            <MaterialBox display='flex' justifyContent='center' alignItems='center'
                                opacity={1} >
                                <MaterialBox
                                    component="img"
                                    src={track}
                                    alt="macbook"
                                    width="100%"
                                    borderRadius='15px'
                                    display={{ xs: "none", md: "block" }}
                                />
                            </MaterialBox>
                        </Grid>
                    </Grid>
                </MaterialBox>
            </MaterialBox>
        </PageLayout>
    );
}

// Typechecking props for the IllustrationLayout
SignUpLayout.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node.isRequired,
};

export default SignUpLayout;