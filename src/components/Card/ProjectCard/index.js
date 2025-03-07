import {
    Avatar,
    AvatarGroup,
    Card,
    Chip,
    CircularProgress,
    Stack,
    Tooltip,
} from "@mui/material";
import React from "react";
import MaterialTypography from "../../MaterialTypography";
import MaterialBox from "../../MaterialBox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EventIcon from "@mui/icons-material/Event";
import PropTypes from "prop-types";

const ProjectCard = ({ project, onView, plane, accuracy }) => {
    return (
        <Card sx={{ padding: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Chip label={project.category} color="primary" size="small" />
                <Chip label={project.status} color="warning" size="small" />
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1} mt={2}>
                <MaterialTypography variant="h6" fontWeight="bold" color="#00a0d0">
                    {project.title}
                </MaterialTypography>
                <MaterialBox
                    sx={{
                        width: 15,
                        height: 15,
                        bgcolor: project.color,
                        borderRadius: 0,
                        marginLeft: "auto",
                    }}
                />
            </Stack>

            <MaterialTypography variant="body2" color="black" mt={1}>
                {project.description}
            </MaterialTypography>

            <Stack direction="row" spacing={1} alignItems="center" mt={2}>
                <AvatarGroup max={4}>
                    {project.collaborators.map((collaborator, idx) => (
                        <Avatar
                            key={idx}
                            alt={collaborator.name}
                            src={collaborator.avatar}
                        />
                    ))}
                </AvatarGroup>
            </Stack>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={1}
                mt={2}
            >
                <Stack direction="row" alignItems="center" spacing={1}>
                    <EventIcon fontSize="small" />
                    <MaterialTypography variant="caption">
                        {project.date}
                    </MaterialTypography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                    <AssignmentIndIcon fontSize="small" />
                    <MaterialTypography variant="caption">
                        {project.views}
                    </MaterialTypography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1}>
                    <Tooltip title={`View Project Details`} onClick={onView}>
                        <VisibilityIcon fontSize="small" />
                    </Tooltip>
                </Stack>

                <Stack direction="column" alignItems="center" spacing={1}>
                    <MaterialBox sx={{ position: "relative", display: "inline-flex" }}>
                        <CircularProgress
                            variant="determinate"
                            value={project.planned}
                            size={30}
                            sx={{ color: "primary.main" }}
                        />
                        <MaterialBox
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: "absolute",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Tooltip title={`Planned: ${Math.round(project.planned)}%`} arrow>
                                {" "}
                                <MaterialTypography
                                    variant="caption"
                                    component="div"
                                    color="text.secondary"
                                >
                                    {plane}
                                </MaterialTypography>
                            </Tooltip>
                        </MaterialBox>
                    </MaterialBox>
                </Stack>
                <Stack direction="column" alignItems="center" spacing={1}>
                    <MaterialBox sx={{ position: "relative", display: "inline-flex" }}>
                        <CircularProgress
                            variant="determinate"
                            value={project.actual}
                            size={30}
                            sx={{ color: "primary.main" }}
                        />
                        <MaterialBox
                            sx={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                position: "absolute",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Tooltip title={`Actual: ${Math.round(project.actual)}%`} arrow>
                                <MaterialTypography
                                    variant="caption"
                                    component="div"
                                    color="text.secondary"
                                >
                                    {accuracy}
                                </MaterialTypography>
                            </Tooltip>
                        </MaterialBox>
                    </MaterialBox>
                </Stack>
            </Stack>
        </Card>
    );
};
ProjectCard.propTypes = {
    project: PropTypes.object.isRequired,
    onView: PropTypes.func.isRequired,
    plane: PropTypes.string,
    accuracy: PropTypes.string,
};

export default ProjectCard;