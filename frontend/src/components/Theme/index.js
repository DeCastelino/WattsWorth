import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
    palette: {
        primary: {
            light: "#EDB18E",
            main: "#FEE3D3", // peach color
            dark: "#E38651", // orange color
        },
        secondary: {
            main: "#16434F", // olive gree
        },
        white: {
            main: "#FFFFFF", // white
        },
        black: {
            main: "#000000", // black
        },
        red: {
            main: "#B70000", // red
        },
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: "bold" },
                    style: {
                        color: "#FFFFFF",
                        borderRadius: 0,
                    },
                },
            ],
        },
    },
});

export default Theme;
