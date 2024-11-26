import { useState, useEffect, useContext } from "react";
import PageLayout from "../../components/PageLayout";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Select, FormControl, MenuItem } from "@mui/material";
import axios from "axios";
import { Context } from "../../components/Context";

function SelectBill(props) {
    const navigate = useNavigate();
    const [selectedBill, setSelectedBill] = useState("");
    const [bills, setBills] = useState([]);
    const { user } = useContext(Context);

    const handleChange = (event) => {
        setSelectedBill(event.target.value);
    };

    useEffect(() => {
        // page only accessible to logged in users
        if (!user) navigate("/");
        axios
            .get("http://localhost:8080/userBills", {
                params: { userId: user.id },
            })
            .then((res) => {
                setBills(res.data.userFiles);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleCompareClick = (event) => {
        if (selectedBill === "") {
            event.preventDefault();
            alert(
                "Error! No bills were selected for comparison. Please select a bill first."
            );
        } else {
            axios
                .post("http://localhost:8080/compare", { selectedBill })
                .then((res) => {
                    let userDetail = res.data.userDetail;
                    let top5Plans = res.data.top5Plans;
                    navigate("/comparison", {
                        state: { userDetail, top5Plans },
                    });
                });
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
                    paddingtop: 10,
                }}
            >
                <Typography
                    fontSize={{ xs: "4rem", sm: "5rem" }}
                    fontWeight="bold"
                    color="secondary"
                    my={5}
                >
                    YOUR BILLS
                </Typography>
                <Typography
                    fontSize={{ xs: "1.25rem", sm: "1.5rem" }}
                    color="secondary"
                    mb={3}
                >
                    Select a bill to compare.
                </Typography>
                <Box
                    sx={{
                        minWidth: 220,
                        border: "2px solid",
                        borderColor: "secondary.main",
                        borderRadius: 2,
                        backgroundColor: "primary.dark",
                    }}
                >
                    <FormControl
                        borderColor="secondary.main"
                        sx={{ width: 300 }}
                    >
                        <Select
                            onChange={handleChange}
                            value={selectedBill}
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        borderRadius: 2,
                                        backgroundColor: "primary.light",
                                        fontStyle: "bold",
                                    },
                                },
                            }}
                            sx={{
                                color: "secondary.main",
                                border: "2px primary.dark",
                                borderRadius: 2,
                                padding: 2,
                            }}
                        >
                            {bills.map((bill) => (
                                <MenuItem value={bill.fileId}>
                                    {bill.fileName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <div style={{ marginTop: "12rem" }}>
                    <Button type="contained" onClick={handleCompareClick}>
                        COMPARE
                    </Button>
                </div>
            </Box>
        </PageLayout>
    );
}

export default SelectBill;
