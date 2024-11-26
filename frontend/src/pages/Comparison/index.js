import PageLayout from "../../components/PageLayout";
import Button from "../../components/Button";
import ColumnChart from "../../components/ColumnChart";
import { Typography, Stack, InputBase } from "@mui/material";
import { useLocation } from "react-router-dom";

function Comparison() {
    const location = useLocation();
    const { userDetail, top5Plans } = location.state;

    const inputStyle = {
        color: "#E74173", // Change the color here
        fontFamily: "Arial, sans-serif", // Change the font here
        fontSize: "30px",
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
                COMPARISON
            </Typography>

            <Typography
                fontSize={{ xs: "1.5rem", sm: "2rem" }}
                fontWeight="medium"
                color="secondary"
                align="center"
                my={1}
            >
                You can save more with
            </Typography>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div className="chart-container">
                    <ColumnChart value={{ userDetail, top5Plans }} />
                </div>
            </div>
            <Typography
                fontSize={{ xs: "1.2rem", sm: "1.5rem" }}
                fontWeight="small"
                color="secondary"
                align="center"
                alignContent="center"
                alignItems="center"
                my={2}
            >
                What you paid with your current retailer:
                <InputBase
                    style={inputStyle}
                    readOnly={true}
                    value={"AUD " + userDetail.billTotalCost}
                />
            </Typography>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Stack spacing={9} direction="row" paddingY={5}>
                    <Button type="contained">Continue</Button>
                </Stack>
            </div>
        </PageLayout>
    );
}
export default Comparison;
