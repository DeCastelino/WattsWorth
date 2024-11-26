import { useContext } from "react";
import Button from "../../components/Button";
import Textfield from "../../components/TextField";
import PageLayout from "../../components/PageLayout";
import { Context } from "../../components/Context";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Typography, Box, Stack } from "@mui/material";
import axios from "axios";

function RetailerResults(props) {
    const { user, userBill } = useContext(Context);
    const location = useLocation();
    const scannedRetailerPlanData = location.state;
    const navigate = useNavigate();

    const handleEditClick = (event) => {
        navigate("/edit-retailer-results", { state: scannedRetailerPlanData });
    };

    const handleContClick = (event) => {
        axios
            .post(
                "http://localhost:8080/insertRetailerData",
                scannedRetailerPlanData
            )
            .catch((err) => {
                console.log(err);
            });
        // guest user will be taken comparison page directly
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
                "Error! No bills were selected for comparison. Please upload a bill first."
            );
            navigate("/");
        }
    };

    return (
        <PageLayout>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    fontSize={{ xs: "4rem", sm: "5rem" }}
                    fontWeight="bold"
                    color="secondary"
                    my={5}
                >
                    RESULTS
                </Typography>
                <Typography
                    fontSize={{ xs: "1.25rem", sm: "1.5rem" }}
                    color="secondary"
                    mb={3}
                >
                    Your plan has been scanned successfully.
                    <br />
                    Please ensure that all information is correct.
                </Typography>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Typography fontWeight="bold" color="secondary" pt={2}>
                            PROVIDER
                        </Typography>
                        <Textfield
                            type="disabled"
                            value={scannedRetailerPlanData.provider}
                        ></Textfield>
                        <Typography fontWeight="bold" color="secondary" pt={2}>
                            PLAN ID
                        </Typography>
                        <Textfield
                            type="disabled"
                            value={scannedRetailerPlanData.id}
                        />
                        <Typography fontWeight="bold" color="secondary" pt={2}>
                            DAILY SUPPLY CHARGE
                        </Typography>
                        <Textfield
                            type="disabled"
                            value={scannedRetailerPlanData.dailySupplyCharge}
                        />
                        <Typography fontWeight="bold" color="secondary" pt={2}>
                            SHOULDER CHARGE
                        </Typography>
                        <Textfield
                            type="disabled"
                            value={scannedRetailerPlanData.shoulderCharge}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography fontWeight="bold" color="secondary" pt={2}>
                            DISTRIBUTOR
                        </Typography>
                        <Textfield
                            type="disabled"
                            value={scannedRetailerPlanData.distributor}
                        />
                        <Typography pt={2} fontWeight="bold" color="secondary">
                            BILL FREQUENCY
                        </Typography>
                        <Textfield
                            type="disabled"
                            value={scannedRetailerPlanData.billFrequency}
                        />
                        <Typography pt={2} fontWeight="bold" color="secondary">
                            PEAK CHARGE
                        </Typography>
                        <Textfield
                            type="disabled"
                            value={scannedRetailerPlanData.peakCharge}
                        />
                        <Typography pt={2} fontWeight="bold" color="secondary">
                            OFF PEAK CHARGE
                        </Typography>
                        <Textfield
                            type="disabled"
                            value={scannedRetailerPlanData.offPeakCharge}
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
                            <Typography
                                fontWeight="bold"
                                color="secondary"
                                pt={2}
                            >
                                CONTROLLED LOAD CHARGE
                            </Typography>
                            <Textfield
                                type="disabled"
                                value={
                                    scannedRetailerPlanData.controlledLoadCharge
                                }
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Stack spacing={9} direction="row" paddingY={5}>
                    <Button type="contained" onClick={handleEditClick}>
                        Edit
                    </Button>
                    <Button type="contained" onClick={handleContClick}>
                        Continue
                    </Button>
                </Stack>
            </Box>
        </PageLayout>
    );
}

export default RetailerResults;
