import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputBase,
  Grid,
} from "@mui/material";
import PopupDialog from "../PopupDialog";
import Button from "../Button";

const colors = [
  "#A95525",
  "#E38651",
  "#EDB18E",
  "#ff7300",
  "#e13a00",
  "#E74173",
];

const BarChartComponent = (props) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [open, setOpen] = useState(false);
  const plans = props.value.top5Plans;

  const userDetail = props.value.userDetail;
  const data = [
    {
      name: userDetail.providerName,
      value: userDetail.billTotalCost,
      color: "#E74173",
      id: userDetail.id,
    },
  ];
  //const refinedTop5List = [];

  // plans.map((item) => {
  //     if (item !== null) {
  //         const temp = item[1];
  //         refinedTop5List.push(temp);
  //     }
  // });
  // console.log("Top 5 Plans", plans);
  plans.forEach((element, index) => {
    const temp1 = {
      name: element.provider,
      value: element.cost,
      id: element.id,
      color: colors[index],
    };
    data.push(temp1);
  });

  const handleBarClick = (data, index) => {
    const targetId = data.id;

    const matchingPlan = plans.find((plan) => plan.id === targetId);
    setSelectedValue(matchingPlan);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BarChart width={1285} height={600} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-35} textAnchor="end" height={130} />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" onClick={handleBarClick}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
      {selectedValue && (
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{ sx: { backgroundColor: "#16434F" } }}
        >
          <DialogContent>
            <PopupDialog value={{ selectedValue }} />
          </DialogContent>
          <DialogActions>
            <Button type="contained" onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default BarChartComponent;
