import React from "react";
import { Typography, InputBase } from "@mui/material";

const PopupDialog = (props) => {
  const selectedBarDetails = props.value.selectedValue;
  //Display rest of the detials
  return (
    <Typography variant="body1" component="div">
      <div
        style={{
          display: "flex",
          alignItems: "left",
          justifyContent: "left",
          color: "#FEE3D3",
        }}
      >
        {selectedBarDetails.id}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "left",
          justifyContent: "left",
          color: "#FEE3D3",
        }}
      >
        Provider: {selectedBarDetails.provider}
        <InputBase readOnly={true} style={{ width: "65px", height: "20px" }} />
      </div>
      <br />
      <div
        style={{
          display: "flex",
          alignItems: "left",
          justifyContent: "left",
          color: "#FEE3D3",
        }}
      >
        Bill Frequency: {selectedBarDetails.billFrequency}
        <InputBase readOnly={true} style={{ width: "95px", height: "20px" }} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "left",
          justifyContent: "left",
          color: "#FEE3D3",
        }}
      >
        Distributor: {selectedBarDetails.distributor}
        <InputBase readOnly={true} style={{ width: "95px", height: "20px" }} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "left",
          justifyContent: "left",
          color: "#FEE3D3",
        }}
      >
        Type: {selectedBarDetails.fuelType}
        <InputBase readOnly={true} style={{ width: "65px", height: "20px" }} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "left",
          justifyContent: "left",
          color: "#FEE3D3",
        }}
      >
        Cost: {selectedBarDetails.cost}
        <InputBase readOnly={true} style={{ width: "95px", height: "20px" }} />
      </div>
      <br />

      <div
        style={{
          display: "flex",
          alignItems: "left",
          justifyContent: "left",
          color: "#FEE3D3",
        }}
      >
        Peak Charge: {selectedBarDetails.peakCharge}
        <InputBase readOnly={true} style={{ width: "70px", height: "20px" }} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "left",
          justifyContent: "left",
          color: "#FEE3D3",
        }}
      >
        Daily Supply Charge: {selectedBarDetails.dailySupplyCharge}
        <InputBase readOnly={true} style={{ width: "65px", height: "20px" }} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "left",
          justifyContent: "left",
          color: "#FEE3D3",
        }}
      >
        Shoulder Charge: {selectedBarDetails.shoulderCharge}
        <InputBase readOnly={true} style={{ width: "65px", height: "20px" }} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "left",
          justifyContent: "left",
          color: "#FEE3D3",
        }}
      >
        Off Peak Charge: {selectedBarDetails.offPeakCharge}
        <InputBase readOnly={true} style={{ width: "65px", height: "20px" }} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "left",
          justifyContent: "left",
          color: "#FEE3D3",
        }}
      >
        Controlled Load Charge: {selectedBarDetails.controlledLoadCharge}
        <InputBase readOnly={true} style={{ width: "65px", height: "20px" }} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "left",
          justifyContent: "left",
          color: "#FEE3D3",
        }}
      >
        Provider Website: {selectedBarDetails.providerWebsite}
        <InputBase readOnly={true} style={{ width: "65px", height: "20px" }} />
      </div>
      <br />
      <div
        style={{
          display: "flex",
          alignItems: "left",
          justifyContent: "left",
          color: "#FEE3D3",
        }}
      >
        For any additional information, please refer to the provider's website.
      </div>
    </Typography>
  );
};

export default PopupDialog;
