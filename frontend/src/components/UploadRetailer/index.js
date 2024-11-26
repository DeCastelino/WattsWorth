import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
    Grid,
    Box,
    IconButton,
    Typography,
    styled,
    CircularProgress,
    Divider,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import Button from "../Button";
import { Context } from "../Context";

const Input = styled("input")`
    display: none;
`;

function UploadRetailer() {
    const [file, setFile] = useState(null);
    const [blobFileURL, setblobFileURL] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [scannedRetailerPlanData, setScannedRetailerPlanData] = useState({});
    const { user, userBill } = useContext(Context);

    const handleCloseButtonClick = () => {
        setFile(null);
    };

    const handleFileChange = (e) => {
        e.preventDefault();
        if (e.target.files !== null) {
            const file = e.target.files[0];
            setFile(file.name);
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);

            axios.post("http://localhost:8080/upload", data).then((res) => {
                setblobFileURL(res.data.publicURL);
            });
        }
    };

    const handleScanFile = async (event) => {
        event.preventDefault();
        if (file == null) {
            alert("Error! Please upload a file before scanning the bill.");
        } else {
            setIsLoading(true);
            axios
                .post("http://localhost:8080/scanRetailerPlan", {
                    blobFileURL,
                })
                .then((res) => {
                    setScannedRetailerPlanData(
                        res.data.scannedRetailerPlanData
                    );
                    setIsLoading(false);
                });
        }
    };

    const navigate = useNavigate();

    const handleViewResults = () => {
        navigate("/retailer-results", { state: scannedRetailerPlanData });
    };

    const handleCompareClick = (event) => {
        event.preventDefault();
        // guest user will be taken to comparison page directly
        if (userBill) {
            axios
                .post("http://localhost:8080/compare", { userBill })
                .then((res) => {
                    let userDetail = res.data.userDetail;
                    let top5Plans = res.data.top5Plans;
                    navigate("/comparison", {
                        state: { userDetail, top5Plans },
                    });
                });
        }
        // logged in user will be taken to select bill page
        else if (user) {
            window.location = "/select-bill";
        } else {
            alert(
                "Error! No bills were selected for comparison. Please upload a user bill first."
            );
            navigate("/");
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" gap={5}>
            <Grid item xl={6} lg={6} md={8} sm={8} xs={10}>
                <label>
                    <Input
                        accept="image,pdf/*"
                        id="file"
                        name="file"
                        type="file"
                        onChange={handleFileChange}
                    />
                    <Box
                        sx={{
                            backgroundColor: "primary.dark",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            outline: "2px dashed #16434F",
                            borderRadius: 5,
                            gap: 2,
                            py: 2,
                            px: 10,
                            "&:hover": { cursor: "pointer" },
                        }}
                    >
                        <UploadIcon
                            fontSize="large"
                            color="secondary"
                            sx={{ fontSize: 100, opacity: 0.6 }}
                        />
                        <Typography color="secondary">
                            Click anywhere to upload
                        </Typography>
                        <Typography
                            color="secondary"
                            fontSize={16}
                            sx={{ fontStyle: "italic", opacity: 0.5 }}
                        >
                            Max. file size 25 MB
                        </Typography>
                    </Box>
                </label>
            </Grid>
            <Grid item xl={6} lg={6} md={8} sm={8} xs={10}>
                {file && (
                    <Box
                        sx={{
                            backgroundColor: "primary.dark",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            outline: "1px solid grey",
                            borderRadius: 3,
                            px: 1,
                            py: 1,
                        }}
                    >
                        <Box>{file}</Box>
                        <IconButton onClick={handleCloseButtonClick}>
                            <CloseIcon color="secondary" />
                        </IconButton>
                    </Box>
                )}
            </Grid>
            <Grid
                item
                xl={6}
                lg={6}
                md={8}
                sm={8}
                xs={10}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={2}
            >
                {Object.keys(scannedRetailerPlanData).length === 0 &&
                    isLoading === false && (
                        <>
                            <Button type="contained" onClick={handleScanFile}>
                                Scan Plan
                            </Button>
                            <Divider style={{ color: "secondary.main" }}>
                                OR
                            </Divider>
                            <Link
                                to="/comparison"
                                style={{ textDecoration: "none" }}
                            >
                                <Button
                                    type="contained"
                                    onClick={handleCompareClick}
                                >
                                    Compare Plans
                                </Button>
                            </Link>
                        </>
                    )}
                {Object.keys(scannedRetailerPlanData).length !== 0 &&
                    isLoading === false && (
                        <Button type="contained" onClick={handleViewResults}>
                            View Results
                        </Button>
                    )}
                {isLoading === true && <CircularProgress color="secondary" />}
            </Grid>
        </Grid>
    );
}

export default UploadRetailer;
