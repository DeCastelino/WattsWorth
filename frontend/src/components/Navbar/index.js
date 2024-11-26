import { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { Context } from "../Context";
import {
    AppBar,
    Box,
    Divider,
    Toolbar,
    Typography,
    IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
    const { user } = useContext(Context);

    const handleLogout = () => {
        localStorage.clear();
        window.location = "/";
    };

    return (
        <AppBar
            color="primary"
            sx={{
                position: "fixed",
                boxShadow: 0,
                borderBottom: `1px solid #16434F`,
            }}
        >
            <Toolbar
                sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Typography
                        sx={{
                            fontFamily: "Expletus Sans",
                            fontSize: "1.75rem",
                            textDecoration: "none",
                            color: "secondary.main",
                            "&:hover": { cursor: "pointer" },
                        }}
                    >
                        Tribal Good
                    </Typography>
                </Link>
                {user ? (
                    <Box
                        sx={{
                            display: { xs: "none", sm: "none", md: "grid" },
                            gridAutoFlow: "column",
                        }}
                    >
                        <Button type="contained" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: { xs: "none", sm: "none", md: "grid" },
                            gridAutoFlow: "column",
                            gap: 2,
                        }}
                    >
                        <Link to="/register" style={{ textDecoration: "none" }}>
                            <Button type="outlined">Sign Up</Button>
                        </Link>
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            <Button type="contained">Sign In</Button>
                        </Link>
                    </Box>
                )}

                <Box
                    sx={{
                        display: { sm: "grid", md: "none" },
                        gridAutoFlow: "column",
                        gap: 2,
                    }}
                >
                    <IconButton>
                        <MenuIcon fontSize="large" color="secondary" />
                    </IconButton>
                </Box>
            </Toolbar>
            <Divider sx={{ borderColor: "secondary.main" }} />
        </AppBar>
    );
};

export default Navbar;
