// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import { Box, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import PageLayout from "../../layoutcontainers/PageLayout";
import { useMaterialUIController } from "../../context";
import Task from '../../assest/images/Task.png' 
import Logo from '../../assest/images/logo.png'

function SigninLayout({ header, title, description, illustration, children }) {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    return (
        <PageLayout background="white" height='100%' showNavbar disableFooter>
            <Grid
                container
                sx={{   gridGap: '0', 
                    backgroundColor: ({ palette: { background, white } }) =>
                        darkMode ? background.default : white.main
                }}
            >
                <Grid size={{ xs: 11, sm: 8, md: 6, lg: 4, xl: 5}} sx={{ mx: "auto" }}>
                    <Box height={'100svh'} width={'100%'} display={'flex'} alignItems={'center'}>
                        <Box component={'img'} src={Task} width={'100%'}></Box>
                    </Box>
                </Grid>
                <Grid size={{ xs: 11, sm: 8, md: 6, lg: 4, xl: 3 }} sx={{ mr: 'auto' }}>
                    <Box height={'100svh'} display="flex" flexDirection="column" justifyContent="center" alignItems='center' textAlign='center' >
                        <Box display="flex" justifyContent="center" alignItems={'center'}>
                            <img src={Logo} alt="Image not loaded"
                                style={{
                                    height: '50%',
                                    width: '75%',
                                    justifyContent: "center",
                                    textAlign: "center",
                                    alignItems: "center",
                                    borderRadius: '15px'
                                }}
                            />
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" >
                            <Typography variant="h4" fontWeight="bold" color='black'>
                                {title}
                            </Typography>
                        </Box>
                        <Box>{children}</Box>
                    </Box>
                </Grid>
            </Grid>
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
