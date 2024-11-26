import { Box, Typography } from "@mui/material";
import UploadRetailer from "../../components/UploadRetailer";
import PageLayout from "../../components/PageLayout";

const UploadRetailerPage = () => {
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
                    my={3}
                >
                    Scan Retailer Plan
                </Typography>
                <Typography
                    fontSize={{ xs: "1.5rem", sm: "2rem" }}
                    color="secondary"
                    mb={3}
                >
                    Upload a plan to start!
                </Typography>
                <UploadRetailer />
            </Box>
        </PageLayout>
    );
};

export default UploadRetailerPage;
