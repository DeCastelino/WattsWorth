import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography, Grid, Stack } from "@mui/material";
import axios from "axios";
import Textfield from "../../components/TextField";
import PageLayout from "../../components/PageLayout";
import Button from "../../components/Button";
import { Context } from "../../components/Context";

function EditBillResults() {
    const [retailer, setRetailer] = useState("");
    const [postcode, setPostCode] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [dailySupplyCharge, setDailySupplyCharge] = useState("");
    const [peakUsage, setPeakUsage] = useState("");
    const [peakCharge, setPeakCharge] = useState("");
    const [dailySupplyUsage, setDailySupplyUsage] = useState("");

    const [offPeakUsage, setOffPeakUsage] = useState("");
    const [offPeakCharge, setOffPeakCharge] = useState("");
    const [shoulderUsage, setShoulderUsage] = useState("");
    const [shoulderCharge, setShoulderCharge] = useState("");
    const [controlledLoadUsage, setControlledLoadUsage] = useState("");
    const [controlledLoadCharge, setControlledLoadCharge] = useState("");

    const [billTotalCost, setBillTotalCost] = useState("");

    const { user, setUserBill } = useContext(Context);

    const location = useLocation();
    const scannedFileData = location.state;
    useEffect(() => {
        setRetailer(scannedFileData.providerName);
        setStartDate(scannedFileData.startDate);
        setEndDate(scannedFileData.endDate);
        setDailySupplyCharge(scannedFileData.dailySupplyCharge);
        setDailySupplyUsage(scannedFileData.dailySupplyUsage);
        setPeakUsage(scannedFileData.peakUsage);
        setPeakCharge(scannedFileData.peakCharge);

        setOffPeakCharge(scannedFileData.offPeakCharge);
        setOffPeakUsage(scannedFileData.offPeakUsage);
        setShoulderCharge(scannedFileData.shoulderCharge);
        setShoulderUsage(scannedFileData.shoulderUsage);
        setControlledLoadCharge(scannedFileData.controlledLoadCharge);
        setControlledLoadUsage(scannedFileData.controlledLoadUsage);

        setBillTotalCost(scannedFileData.billTotalCost);
        setPostCode(scannedFileData.postcode);
    }, []);

    const handleRetailerChange = (event) => {
        const regex = /^[a-zA-Z\s\W]+$/;
        if (regex.test(event.target.value) || event.target.value === "") {
            setRetailer(event.target.value);
        } else {
            alert("Error Please enter the Alphabet");
        }
    };

    const handlePostcodeChange = (event) => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === "" || re.test(event.target.value)) {
            setPostCode(event.target.value);
        } else {
            alert("Error Please enter the Number");
        }
    };

    const handleStartDateChange = (event) => {
        const regex = /^[0-9\W]*$/;
        if (regex.test(event.target.value)) {
            setStartDate(event.target.value);
        } else {
            alert("Error Please enter the Number");
        }
    };

    const handleEndDateChange = (event) => {
        const regex = /^[0-9\W]*$/;
        if (regex.test(event.target.value)) {
            setEndDate(event.target.value);
        } else {
            alert("Error Please enter the Number");
        }
    };

    const handleBillTotalCostChange = (event) => {
        const regex = /^[0-9\W]*$/;
        if (regex.test(event.target.value)) {
            if (event.target.value.split(".").length <= 2) {
                setBillTotalCost(event.target.value);
            }
        } else {
            alert("Error Please enter the Number");
        }
    };

    const navigate = useNavigate();

    const handleCancelClick = (event) => {
        navigate("/bill-results", { state: scannedFileData });
    };

    const handleSaveClick = (event) => {
        const updatedScanValues = {
            providerName: retailer,
            fileName: scannedFileData.fileName,
            postcode: postcode,
            providerAbn: scannedFileData.providerAbn,
            startDate: startDate,
            endDate: endDate,
            dailySupplyCharge: dailySupplyCharge,
            dailySupplyUsage: dailySupplyUsage,
            peakUsage: peakUsage,
            peakCharge: peakCharge,
            offPeakCharge: offPeakCharge,
            offPeakUsage: offPeakUsage,
            shoulderCharge: shoulderCharge,
            shoulderUsage: shoulderUsage,
            controlledLoadCharge: controlledLoadCharge,
            controlledLoadUsage: controlledLoadUsage,
            billTotalCost: billTotalCost,
        };
        // if logged in user, save data to Db
        if (user) {
            axios
                .post("http://localhost:8080/insertData", {
                    scannedFileData: updatedScanValues,
                    userId: user.id,
                })
                .catch((err) => {
                    alert("Data could not be entered, Try again!");
                });
        }
        // if guest user, save data to localStorage
        else {
            setUserBill(updatedScanValues);
        }
        navigate("/upload-retailer", { state: updatedScanValues });
    };

    return (
        <PageLayout>
            <Typography
                fontSize={{ xs: "4rem", sm: "5rem" }}
                fontWeight="bold"
                color="secondary"
                align="center"
                my={1}
            >
                EDIT RESULTS
            </Typography>
            <Typography
                fontSize={{ xs: "1rem", sm: "1.5rem" }}
                fontWeight="medium"
                color="secondary"
                align="center"
                my={1}
            >
                Click 'SAVE' after you have finished editing.
                <br />
                Or, click 'CANCEL' to discard changes.
            </Typography>
            <br />
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
                        type="outlined"
                        value={retailer}
                        onChange={handleRetailerChange}
                    ></Textfield>
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        START DATE
                    </Typography>
                    <Textfield
                        type="outlined"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        DAILY SUPPLY USAGE
                    </Typography>
                    <Textfield
                        type="outlined"
                        value={dailySupplyUsage}
                        onChange={(e) => setDailySupplyUsage(e.target.value)}
                    ></Textfield>
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        PEAK USAGE
                    </Typography>
                    <Textfield
                        type="outlined"
                        value={peakUsage}
                        onChange={(e) => setPeakUsage(e.target.value)}
                    />
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        OFF PEAK USAGE
                    </Typography>
                    <Textfield
                        type="outlined"
                        value={offPeakUsage}
                        onChange={(e) => setOffPeakUsage(e.target.value)}
                    />
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        SHOULDER USAGE
                    </Typography>
                    <Textfield
                        type="outlined"
                        value={shoulderUsage}
                        onChange={(e) => setShoulderUsage(e.target.value)}
                    />
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        CONTROLLED LOAD USAGE
                    </Typography>
                    <Textfield
                        type="outlined"
                        value={controlledLoadUsage}
                        onChange={(e) => setControlledLoadUsage(e.target.value)}
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
                        type="outlined"
                        value={postcode}
                        onChange={handlePostcodeChange}
                    />
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        END DATE
                    </Typography>
                    <Textfield
                        type="outlined"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        DAILY SUPPLY CHARGE
                    </Typography>
                    <Textfield
                        type="outlined"
                        value={dailySupplyCharge}
                        onChange={(e) => setDailySupplyCharge(e.target.value)}
                    />
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        PEAK CHARGE
                    </Typography>
                    <Textfield
                        type="outlined"
                        value={peakCharge}
                        onChange={(e) => setPeakCharge(e.target.value)}
                    />
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        OFF PEAK CHARGE
                    </Typography>
                    <Textfield
                        type="outlined"
                        value={offPeakCharge}
                        onChange={(e) => setOffPeakCharge(e.target.value)}
                    />
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        SHOULDER CHARGE
                    </Typography>
                    <Textfield
                        type="outlined"
                        value={shoulderCharge}
                        onChange={(e) => setShoulderCharge(e.target.value)}
                    />
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        CONTROLLED LOAD CHARGE
                    </Typography>
                    <Textfield
                        type="outlined"
                        value={controlledLoadCharge}
                        onChange={(e) =>
                            setControlledLoadCharge(e.target.value)
                        }
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
                            type="outlined"
                            value={billTotalCost}
                            onChange={handleBillTotalCostChange}
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
                <Button type="contained" onClick={handleCancelClick}>
                    Cancel
                </Button>
                <Button type="contained" onClick={handleSaveClick}>
                    Save
                </Button>
            </Stack>
        </PageLayout>
    );
}

export default EditBillResults;
