import Navbar from "../Navbar";
// import CustomizedSteppers from "../Stepper";
import { Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { useNavigate } from "react-router-dom";

const PageLayout = ({ children }) => {
    const navigate = useNavigate();

    const handleIssueButtonClick = () => {
        navigate("/feedback");
    };
    return (
        <Box
            sx={{
                backgroundColor: "primary.main",
                minHeight: "100vh",
                overflow: "hidden",
            }}
        >
            <Navbar />
            <Box sx={{ paddingTop: 10 }}>
                {/* <CustomizedSteppers /> */}
                {children}
            </Box>
            <div style={{ position: "fixed", bottom: "30px", right: "30px" }}>
                <Fab
                    color="primary"
                    size="medium"
                    aria-label="report-issue"
                    onClick={handleIssueButtonClick}
                >
                    <ReportProblemOutlinedIcon />
                </Fab>
            </div>
        </Box>
    );
};

export default PageLayout;
