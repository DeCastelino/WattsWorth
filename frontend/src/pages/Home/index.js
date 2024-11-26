import { Box, Typography } from "@mui/material";
import Upload from "../../components/Upload";
import PageLayout from "../../components/PageLayout";

const Home = () => {
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
                    WELCOME
                </Typography>
                <Typography
                    fontSize={{ xs: "1.5rem", sm: "2rem" }}
                    color="secondary"
                    mb={3}
                >
                    Upload a bill to start!
                </Typography>
                <Upload />
            </Box>
        </PageLayout>
    );
};

export default Home;
