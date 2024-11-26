import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BillResults from "./pages/BillResults";
import EditBillResults from "./pages/EditBillResults";
import UploadRetailerPage from "./pages/UploadRetailerPage";
import RetailerResults from "./pages/RetailerResults";
import EditRetailerResults from "./pages/EditRetailerResults";
import SelectBill from "./pages/SelectBill";
import Feedback from "./pages/Feedback";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Comparison from "./pages/Comparison";
import { ThemeProvider } from "@emotion/react";
import Theme from "./components/Theme";
import { Context } from "./components/Context";
import { useContext } from "react";

function App() {
    const { user } = useContext(Context);

    return (
        <ThemeProvider theme={Theme}>
            <Routes>
                <Route path="" element={<Home />} />
                <Route path="login" element={user ? <Home /> : <Login />} />
                <Route
                    path="register"
                    element={user ? <Home /> : <Register />}
                />
                <Route path="bill-results" element={<BillResults />} />
                <Route path="edit-bill-results" element={<EditBillResults />} />
                <Route
                    path="upload-retailer"
                    element={<UploadRetailerPage />}
                />
                <Route path="retailer-results" element={<RetailerResults />} />
                <Route
                    path="edit-retailer-results"
                    element={<EditRetailerResults />}
                />
                <Route path="select-bill" element={<SelectBill />} />
                <Route path="feedback" element={<Feedback />} />
                <Route path="comparison" element={<Comparison />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
