import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Typography, Stack } from "@mui/material";
import { Box, Grid } from "@mui/material";
import PageLayout from "../../components/PageLayout";
import Textfield from "../../components/TextField";
import Button from "../../components/Button";
import { Context } from "../../components/Context";

function EditRetailerResults() {
    const { user, userBill } = useContext(Context);
    const [provider, setProvider] = useState("");
    const [planId, setPlanId] = useState("");
    // offer rates
    const [peakCharge, setPeakCharge] = useState("");
    const [dailySupplyCharge, setDailySupplyCharge] = useState("");
    const [offPeakCharge, setOffPeakCharge] = useState("");
    const [shoulderCharge, setShoulderCharge] = useState("");
    const [controlledLoadCharge, setControlledLoadCharge] = useState("");
    // contract details
    const [contractDetails, setContractDetails] = useState("");
    const [contractDetailsString, setContractDetailsString] = useState("");
    // fees
    const [distributor, setDistributor] = useState("");

    // features - may differ
    const [billFrequency, setBillFrequency] = useState("");

    /*examples: directDebit, greenPower, paperBills, fixedPrice*/

    const location = useLocation();
    const scannedRetailerPlanData = location.state;
    useEffect(() => {
        setProvider(scannedRetailerPlanData.provider);
        setPlanId(scannedRetailerPlanData.id);
        setPeakCharge(scannedRetailerPlanData.peakCharge);
        setDailySupplyCharge(scannedRetailerPlanData.dailySupplyCharge);
        setOffPeakCharge(scannedRetailerPlanData.offPeakCharge);
        setShoulderCharge(scannedRetailerPlanData.shoulderCharge);
        setControlledLoadCharge(scannedRetailerPlanData.controlledLoadCharge);
        setContractDetails(scannedRetailerPlanData.contractDetails);
        setDistributor(scannedRetailerPlanData.distributor);
        setBillFrequency(scannedRetailerPlanData.billFrequency);
    }, []);

    const handleProviderChange = (event) => {
        // setProvider(event.target.value);
        const regex = /^[a-zA-Z\s\W]+$/;
        if (regex.test(event.target.value) || event.target.value === "") {
            setProvider(event.target.value);
        } else {
            alert("Error Please enter the Alphabet");
        }
    };
    const handlePlanIdChange = (event) => {
        setPlanId(event.target.value.toUpperCase());
    };
    const handlePeakChange = (event) => {
        // setPeakConsumptionRate(event.target.value);
        const regex = /^[0-9\W]*$/;
        if (regex.test(event.target.value)) {
            setPeakCharge(event.target.value);
        } else {
            alert("Error Please enter the Number");
        }
    };
    const handleDailySupplyChargeChange = (event) => {
        // setDailySupplyCharge(event.target.value);
        const regex = /^[0-9\W]*$/;
        if (regex.test(event.target.value)) {
            setDailySupplyCharge(event.target.value);
        } else {
            alert("Error Please enter the Number");
        }
    };

    const handleDistributorChange = (event) => {
        // setDistributor(event.target.value);
        const regex = /^[a-zA-Z\s\W]+$/;
        if (regex.test(event.target.value) || event.target.value === "") {
            setDistributor(event.target.value);
        } else {
            alert("Error Please enter the Alphabet");
        }
    };
    const handleBillFrequencyChange = (event) => {
        setBillFrequency(event.target.value);
    };

    const handlePeakChargeChange = (event) => {
        setPeakCharge(event.target.value);
    };

    const handleOffPeakChargeChange = (event) => {
        setOffPeakCharge(event.target.value);
    };
    const handleShoulderChargeChange = (event) => {
        setShoulderCharge(event.target.value);
    };
    const handleControlledLoadChargeChange = (event) => {
        setControlledLoadCharge(event.target.value);
    };
    const handleContractDetailsChange = (event) => {
        setContractDetailsString(event.target.value);
    };
    const navigate = useNavigate();

    const handleCancelClick = (event) => {
        navigate("/retailer-results", { state: scannedRetailerPlanData });
    };

    const handleSaveClick = (event) => {
        scannedRetailerPlanData.id = planId;
        scannedRetailerPlanData.provider = provider;
        scannedRetailerPlanData.peakCharge = peakCharge;
        scannedRetailerPlanData.dailySupplyCharge = dailySupplyCharge;
        scannedRetailerPlanData.offPeakCharge = offPeakCharge;
        scannedRetailerPlanData.shoulderCharge = shoulderCharge;
        scannedRetailerPlanData.controlledLoadCharge = controlledLoadCharge;
        scannedRetailerPlanData.distributor = distributor;
        scannedRetailerPlanData.billFrequency = billFrequency;

        axios
            .post(
                "http://localhost:8080/insertRetailerData",
                scannedRetailerPlanData
            )
            .catch((err) => {
                alert(err);
            });
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
                    EDIT RESULTS
                </Typography>
                <Typography
                    fontSize={{ xs: "1.25rem", sm: "1.5rem" }}
                    color="secondary"
                    mb={3}
                >
                    Click 'SAVE' after you have finished editing.
                    <br />
                    Or, click 'CANCEL' to discard changes.
                </Typography>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Typography fontWeight="bold" color="secondary" pt={2}>
                            PROVIDER
                        </Typography>
                        <Textfield
                            type="outlined"
                            value={provider}
                            onChange={handleProviderChange}
                        ></Textfield>
                        <Typography fontWeight="bold" color="secondary" pt={2}>
                            PLAN ID
                        </Typography>
                        <Textfield
                            type="outlined"
                            value={planId}
                            onChange={handlePlanIdChange}
                        />

                        <Typography fontWeight="bold" color="secondary" pt={2}>
                            DISTRIBUTOR
                        </Typography>
                        <Textfield
                            type="outlined"
                            value={distributor}
                            onChange={handleDistributorChange}
                        ></Textfield>
                        <Typography fontWeight="bold" color="secondary" pt={2}>
                            OFF PEAK CHARGE
                        </Typography>
                        <Textfield
                            type="outlined"
                            value={offPeakCharge}
                            onChange={handleOffPeakChargeChange}
                        ></Textfield>
                        <Typography fontWeight="bold" color="secondary" pt={2}>
                            SHOULDER CHARGE
                        </Typography>
                        <Textfield
                            type="outlined"
                            value={shoulderCharge}
                            onChange={handleShoulderChargeChange}
                        ></Textfield>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography fontWeight="bold" color="secondary" pt={2}>
                            PEAK CHARGE
                        </Typography>
                        <Textfield
                            type="outlined"
                            value={peakCharge}
                            onChange={handlePeakChange}
                        />
                        <Typography pt={2} fontWeight="bold" color="secondary">
                            DAILY SUPPLY CHARGE ($)
                        </Typography>
                        <Textfield
                            type="outlined"
                            value={dailySupplyCharge}
                            onChange={handleDailySupplyChargeChange}
                        />
                        <Typography fontWeight="bold" color="secondary" pt={2}>
                            CONTROLLED LOAD CHARGE
                        </Typography>
                        <Textfield
                            type="outlined"
                            value={controlledLoadCharge}
                            onChange={handleControlledLoadChargeChange}
                        ></Textfield>
                        <Typography fontWeight="bold" color="secondary" pt={2}>
                            CONTRACT DETAIL
                        </Typography>
                        <Textfield
                            type="outlined"
                            value={contractDetails}
                            onChange={handleContractDetailsChange}
                        ></Textfield>
                        <Typography pt={2} fontWeight="bold" color="secondary">
                            BILL FREQUENCY
                        </Typography>
                        <Textfield
                            type="outlined"
                            value={billFrequency}
                            onChange={handleBillFrequencyChange}
                        />
                    </Grid>
                </Grid>
                <Stack spacing={9} direction="row" paddingY={5}>
                    <Button type="contained" onClick={handleCancelClick}>
                        Cancel
                    </Button>
                    <Button type="contained" onClick={handleSaveClick}>
                        Save
                    </Button>
                </Stack>
            </Box>
        </PageLayout>
    );
}

export default EditRetailerResults;
