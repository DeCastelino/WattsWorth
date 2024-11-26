import React from "react";
import PageLayout from "../../components/PageLayout";
import Textfield from "../../components/TextField";
import Button from "../../components/Button";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import axios from "axios";

function Feedback() {
    const [thumbsUpClicked, setThumbsUpClicked] = useState(false);
    const [thumbsDownClicked, setThumbsDownClicked] = useState(false);
    const [additionalFeedback, setAdditionalFeedback] = useState("");
    const navigate = useNavigate();

    const handleThumbsUpClick = () => {
        setThumbsUpClicked(true);
        setThumbsDownClicked(false);
    };

    const handleThumbsDownClick = () => {
        setThumbsDownClicked(true);
        setThumbsUpClicked(false);
    };

    const handleCancelClick = (event) => {
        navigate(-1);
    };

    const handleSubmit = (event) => {
        if (!additionalFeedback.trim()) {
            alert("Please change at least one field before clicking'SUBMIT'.");
        } else {
            axios
                .post("http://localhost:8080/feedback", {
                    thumbsUpClicked,
                    thumbsDownClicked,
                    additionalFeedback,
                })
                .then((res) => {
                    console.log(res);
                });
            alert("Thank you for your feedback.");
            navigate(-1);
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
                    FEEDBACK
                </Typography>
                <Typography
                    fontSize={{ xs: "1.25rem", sm: "1.5rem" }}
                    color="secondary"
                    mb={3}
                >
                    Did you enjoy using our service?
                </Typography>

                <Stack
                    spacing={9}
                    direction="row"
                    sx={{
                        marginTop: "1rem",
                        marginBottom: "4rem",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <IconButton
                        onClick={handleThumbsUpClick}
                        aria-label="thumbs-up"
                        style={{
                            fontSize: "36px",
                            borderRadius: "50%",
                            backgroundColor: thumbsUpClicked
                                ? "#E38651"
                                : "grey",
                            color: "white",
                            padding: "8px",
                        }}
                    >
                        <ThumbUpIcon />
                    </IconButton>
                    <IconButton
                        onClick={handleThumbsDownClick}
                        aria-label="thumbs-down"
                        style={{
                            fontSize: "36px",
                            borderRadius: "50%",
                            backgroundColor: thumbsDownClicked
                                ? "#E38651"
                                : "grey",
                            color: "white",
                            padding: "8px",
                        }}
                    >
                        <ThumbDownIcon />
                    </IconButton>
                </Stack>
                <Typography
                    fontSize={{ xs: "1.25rem", sm: "1.5rem" }}
                    color="secondary"
                    mb={3}
                >
                    Please include any additional feedback below. Thank you.
                </Typography>
                <Textfield
                    type="multilined"
                    value={additionalFeedback}
                    onChange={(event) =>
                        setAdditionalFeedback(event.target.value)
                    }
                />
                <Stack
                    spacing={9}
                    direction="row"
                    sx={{
                        marginY: "3rem",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Button type="contained" onClick={handleCancelClick}>
                        CANCEL
                    </Button>
                    <Button type="contained" onClick={handleSubmit}>
                        SUBMIT
                    </Button>
                </Stack>
            </Box>
        </PageLayout>
    );
}

export default Feedback;
