import { useState, useContext } from "react";
import PageLayout from "../../components/PageLayout";
import Textfield from "../../components/TextField";
import Button from "../../components/Button";
import { Context } from "../../components/Context";
import emailValidator from "email-validator";
import { Typography, Box, Stack, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

function Login() {
    const { setUser, setUserBill } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLoginClick = (event) => {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;

        // check if email is wrong
        if (!emailValidator.validate(email)) {
            alert("Error! Please enter a valid email address.");
        }
        // check if password length is wrong
        else if (password.length < 8 || password.length > 20) {
            alert(
                "Invalid password! Password should have between 8 and 20 characters"
            );
        }
        // check if password is alphanumeric with special character(s)
        else if (!regex.test(password)) {
            alert(
                "Invalid password! Password should be alphanumeric with 1 upper case letter, 1 smaller case letter and 1 special character minimum"
            );
        } else {
            axios
                .post("http://localhost:8080/login", { email, password })
                .then((res) => {
                    setUser(res.data);
                    setUserBill(null);
                    navigate("/");
                })
                .catch((error) => {
                    alert(error);
                    setEmail("");
                    setPassword("");
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
                }}
            >
                <Typography
                    fontSize={{ xs: "4rem", sm: "5rem" }}
                    fontWeight="bold"
                    color="secondary"
                    my={5}
                >
                    SIGN IN
                </Typography>
                <Stack margin={4}>
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        EMAIL OR PHONE NUMBER
                    </Typography>
                    <Textfield
                        type="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <Typography fontWeight="bold" color="secondary" pt={2}>
                        PASSWORD
                    </Typography>
                    <Textfield
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </Stack>
                <Button
                    type="contained"
                    onClick={handleLoginClick}
                    sx={{ topMargin: 4 }}
                >
                    SIGN IN
                </Button>
                <Typography fontWeight="bold" color="secondary" pt={2}>
                    Don't have an account yet? Sign up{" "}
                    <Link
                        fontWeight="bold"
                        color="secondary"
                        pt={2}
                        component={RouterLink}
                        to="/register"
                    >
                        here.
                    </Link>
                    <br />
                    Or,{" "}
                    <Link
                        fontWeight="bold"
                        color="secondary"
                        pt={2}
                        component={RouterLink}
                        to="/"
                    >
                        scan a bill.
                    </Link>
                </Typography>
            </Box>
        </PageLayout>
    );
}

export default Login;
