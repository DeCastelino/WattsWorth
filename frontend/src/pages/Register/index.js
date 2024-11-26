import { useState } from "react";
import PageLayout from "../../components/PageLayout";
import { Grid, Typography, Box, Stack, Link } from "@mui/material";
import Textfield from "../../components/TextField";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePhoneChange = (event) => {
        if (/^\d{0,10}$/.test(event.target.value)) {
            setPhone(event.target.value);
        } else {
            alert("Error Please enter the Number with 10 digits");
        }
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const uppercaseRegex = /[A-Z]/;
        const specialCharRegex = /[!@#$%^&*()]/;
        const numberRegex = /[0-9]/;

        if (!email.includes("@") || !email.includes(".com")) {
            alert("Invalid email format");
        } else if (
            !uppercaseRegex.test(password) ||
            !specialCharRegex.test(password) ||
            !numberRegex.test(password)
        ) {
            alert(
                "Password must have at least one uppercase letter, one special character, and one number"
            );
        } else if (phone.trim() === "" || name.trim() === "") {
            alert("Phone Number and Name must not be blank");
            navigate("/register");
        } else {
            axios
                .post("http://localhost:8080/register", {
                    name,
                    email,
                    phone,
                    password,
                })
                .then((res) => {
                    navigate("/login");
                })
                .catch((error) => {
                    alert("User already exists");
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
                    fontSize={{ xs: "3rem", sm: "4rem" }}
                    fontWeight="bold"
                    color="secondary"
                    my={1}
                >
                    SIGN UP NOW
                </Typography>

                <Grid container>
                    <Grid item xs={12} md={12}>
                        <Typography fontWeight="bold" color="secondary" pt={2}>
                            NAME
                        </Typography>
                        <Textfield
                            type="outlined"
                            value={name}
                            onChange={handleNameChange}
                        ></Textfield>

                        <Typography fontWeight="bold" color="secondary" pt={2}>
                            EMAIL
                        </Typography>

                        <Textfield
                            type="outlined"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <Typography fontWeight="bold" color="secondary" pt={2}>
                            PHONE NUMBER
                        </Typography>
                        <Textfield
                            type="outlined"
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                        <Typography fontWeight="bold" color="secondary" pt={2}>
                            PASSWORD
                        </Typography>
                        <Textfield
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </Grid>
                </Grid>
                <Stack spacing={9} direction="row" paddingY={5}>
                    <Button type="contained" onClick={handleSubmit}>
                        Register
                    </Button>
                </Stack>
                <Typography
                    fontSize={{ xs: "1rem", sm: "1rem" }}
                    color="secondary"
                    mb={3}
                >
                    Already have an account? Sign in{" "}
                    <Link
                        fontWeight="bold"
                        color="secondary"
                        pt={2}
                        component={RouterLink}
                        to="/Login"
                    >
                        here.
                    </Link>
                    <br />
                    Or,
                    <Link
                        fontWeight="bold"
                        color="secondary"
                        pt={2}
                        component={RouterLink}
                        to="/"
                    >
                        Scan
                    </Link>
                    a bill now.
                </Typography>
            </Box>
        </PageLayout>
    );
}

export default Register;
