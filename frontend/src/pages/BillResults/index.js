import { useContext } from "react";
import PageLayout from "../../components/PageLayout";
import Button from "../../components/Button";
import Textfield from "../../components/TextField";
import { Context } from "../../components/Context";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Typography, Stack } from "@mui/material";

import axios from "axios";

function BillResults(props) {
    const location = useLocation();
    const scannedFileData = location.state;

    const { user, setUserBill } = useContext(Context);

    const navigate = useNavigate();

    const handleEditClick = (event) => {
        navigate("/edit-bill-results", { state: scannedFileData });
    };

    const handleContClick = (event) => {
        // if logged in user, save data to Db
        if (user) {
            axios
                .post("http://localhost:8080/insertData", {
                    scannedFileData,
                    userId: user.id,
                })
                .catch((err) => {
                    alert("Data could not be entered, Try again!");
                });
        }
        // if guest user, save data to localStorage
        else {
            setUserBill(scannedFileData);
        }
        navigate("/upload-retailer");
    };

    return (
        <PageLayout>
            <Typography
                fontSize={{ xs: "4rem", sm: "5rem" }}
                fontWeight="bold"
                color="secondary"
                align="center"
            >
                RESULTS
            </Typography>
            <Typography
                fontSize={{ xs: "1rem", sm: "1.5rem" }}
                fontWeight="medium"
                color="secondary"
                align="center"
                my={1}
            >
                Your bill has been scanned successfully.
                <br />
                Please ensure that all information is correct.
            </Typography>
            <Grid
                container
                spacing={2}
                justify="center"
                alignItems="center"
                sx={{
                    display: "flex",
                    align: "center",
                }}
            >
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    justify="center"
                    alignItems="center"
                >
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        RETAILER
                    </Typography>
                    <Textfield
                        type="disabled"
                        value={scannedFileData.providerName}
                    ></Textfield>
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        START DATE
                    </Typography>
                    <Textfield
                        type="disabled"
                        value={scannedFileData.startDate}
                    />
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        DAILY SUPPLY USAGE
                    </Typography>
                    <Textfield
                        type="disabled"
                        value={scannedFileData.dailySupplyUsage}
                    ></Textfield>
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        PEAK USAGE
                    </Typography>
                    <Textfield
                        type="disabled"
                        value={scannedFileData.peakUsage}
                    />
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        OFF PEAK USAGE
                    </Typography>
                    <Textfield
                        type="disabled"
                        value={scannedFileData.offPeakUsage}
                    />
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        SHOULDER USAGE
                    </Typography>
                    <Textfield
                        type="disabled"
                        value={scannedFileData.shoulderUsage}
                    />
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        CONTROLLED LOAD USAGE
                    </Typography>
                    <Textfield
                        type="disabled"
                        value={scannedFileData.controlledLoadUsage}
                    />
                </Grid>

                <Grid
                    item
                    sx={12}
                    sm={12}
                    md={6}
                    justify="center"
                    alignItems="center"
                >
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        POSTCODE
                    </Typography>
                    <Textfield
                        type="disabled"
                        value={scannedFileData.postcode}
                    />
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        END DATE
                    </Typography>
                    <Textfield
                        type="disabled"
                        value={scannedFileData.endDate}
                    />
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        DAILY SUPPLY CHARGE
                    </Typography>
                    <Textfield
                        type="disabled"
                        value={scannedFileData.dailySupplyCharge}
                    />
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        PEAK CHARGE
                    </Typography>
                    <Textfield
                        type="disabled"
                        value={scannedFileData.peakCharge}
                    />
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        OFF PEAK CHARGE
                    </Typography>
                    <Textfield
                        type="disabled"
                        value={scannedFileData.offPeakCharge}
                    />
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        SHOULDER CHARGE
                    </Typography>
                    <Textfield
                        type="disabled"
                        value={scannedFileData.shoulderCharge}
                    />
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        CONTROLLED LOAD CHARGE
                    </Typography>
                    <Textfield
                        type="disabled"
                        value={scannedFileData.controlledLoadCharge}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                spacing={2}
                justify="center"
                alignItems="center"
                sx={{
                    display: "flex",
                    align: "center",
                }}
            >
                <Grid item xs={12} md={6}>
                    <Grid>
                        <Typography fontWeight="bold" color="secondary" pt={2}>
                            TOTAL PAID
                        </Typography>
                        <Textfield
                            type="disabled"
                            value={scannedFileData.billTotalCost}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Stack
                spacing={9}
                direction="row"
                sx={{
                    marginY: "3rem",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Button type="contained" onClick={handleEditClick}>
                    Edit
                </Button>
                <Button type="contained" onClick={handleContClick}>
                    Continue
                </Button>
            </Stack>
        </PageLayout>
    );
}

export default BillResults;
