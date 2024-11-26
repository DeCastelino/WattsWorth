import { TextField as MUITextfield } from "@mui/material";

const Textfield = (props) => {
    const textfieldType = props.type;
    const scannedFileData = props.value;

    return (
        <>
            {textfieldType === "disabled" && (
                <MUITextfield
                    disabled
                    id="outlined-basic"
                    variant="outlined"
                    fontColor="primary.dark"
                    value={scannedFileData}
                    sx={{
                        border: "2px solid",
                        borderColor: "secondary.main",
                        borderRadius: 2,
                        minWidth: "400px",
                        backgroundColor: "primary.dark",
                        color: "primary.dark",
                        fontColor: "secondary.main",
                        fontWeight: "500",
                        fontSize: "1.25rem",
                        fontFamily: "sans-serif",
                        maxWidth: "800px",
                    }}
                >
                    {props.children}
                </MUITextfield>
            )}
            {textfieldType === "outlined" && (
                <MUITextfield
                    id="outlined-basic"
                    variant="outlined"
                    fontColor="primary.dark"
                    rows={4}
                    value={scannedFileData}
                    onChange={props.onChange}
                    sx={{
                        border: "2px solid",
                        borderColor: "secondary.main",
                        borderRadius: 2,
                        minWidth: "400px",
                        backgroundColor: "primary.dark",
                        color: "primary.dark",
                        fontColor: "secondary.main",
                        fontWeight: "500",
                        fontSize: "1.25rem",
                        fontFamily: "sans-serif",
                        // maxWidth: "12rem",
                    }}
                >
                    {props.children}
                </MUITextfield>
            )}
            {textfieldType === "multilined" && (
                <MUITextfield
                    multiline
                    id="outlined-multiline-flexible"
                    maxRows={6}
                    minRows={5}
                    variant="outlined"
                    fontColor="primary.dark"
                    value={scannedFileData}
                    onChange={props.onChange}
                    sx={{
                        border: "2px solid",
                        borderColor: "secondary.main",
                        borderRadius: 2,
                        minWidth: "500px",
                        backgroundColor: "primary.dark",
                        color: "primary.dark",
                        fontColor: "secondary.main",
                        fontWeight: "500",
                        fontSize: "1.25rem",
                        fontFamily: "sans-serif",
                    }}
                >
                    {props.children}
                </MUITextfield>
            )}
            {textfieldType === "password" && (
                <MUITextfield
                    id="password"
                    type="password"
                    variant="outlined"
                    fontColor="primary.dark"
                    rows={4}
                    value={scannedFileData}
                    onChange={props.onChange}
                    sx={{
                        border: "2px solid",
                        borderColor: "secondary.main",
                        borderRadius: 2,
                        minWidth: "400px",
                        backgroundColor: "primary.dark",
                        color: "primary.dark",
                        fontColor: "secondary.main",
                        fontWeight: "500",
                        fontSize: "1.25rem",
                        fontFamily: "sans-serif",
                        // maxWidth: "12rem",
                    }}
                >
                    {props.children}
                </MUITextfield>
            )}
            
            
            
        </>
    );
};
export default Textfield;
