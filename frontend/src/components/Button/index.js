import { Button as MUIButton } from "@mui/material";

const Button = (props) => {
    const buttonType = props.type;

    return (
        <>
            {buttonType === "contained" && (
                <MUIButton
                    variant="contained"
                    color="secondary"
                    onClick={props.onClick}
                    style={{
                        textTransform: "none",
                    }}
                    sx={{
                        borderRadius: 3,
                        boxShadow: 0,
                        paddingX: 2,
                        paddingY: 0.5,
                        color: "primary.main",
                        fontWeight: "500",
                        fontSize: "1.25rem",
                        fontFamily: "sans-serif",
                        minWidth: "7rem",
                        maxWidth: "12rem",
                        "&:hover": {
                            boxShadow: `inset 0px 0px 0px 1px #16434F`,
                            backgroundColor: "primary.main",
                            color: "secondary.main",
                        },
                    }}
                >
                    {props.children}
                </MUIButton>
            )}
            {buttonType === "outlined" && (
                <MUIButton
                    variant="outlined"
                    color="secondary"
                    onClick={props.onClick}
                    style={{
                        textTransform: "none",
                    }}
                    sx={{
                        borderRadius: 3,
                        boxShadow: 0,
                        paddingX: 2,
                        paddingY: 0.5,
                        color: "secondary.main",
                        fontWeight: "500",
                        fontSize: "1.25rem",
                        fontFamily: "sans-serif",
                        minWidth: "7rem",
                        maxWidth: "12rem",
                        "&:hover": {
                            backgroundColor: "secondary.main",
                            color: "primary.main",
                        },
                    }}
                >
                    {props.children}
                </MUIButton>
            )}
            
        </>
    );
};

export default Button;
