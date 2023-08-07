import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Dashboard/Home";
import Employe from "../pages/Dashboard/Employe";
import Sidebar from "../component/Sidebar";
import Login from "../pages/Login/Login";
import Gaji from "../pages/Dashboard/Gaji";
import AddEmploye from "../pages/Dashboard/AddEmploye";
import EditEmploye from "../pages/Dashboard/EditEmploye";
import AddJob from "../pages/Dashboard/AddJob";
import History from "../pages/Dashboard/History";
import PrintEmploye from "../pages/Dashboard/PrintEmploye";
import ForgotPassword from "../pages/Login/ForgotPassword";
import ChangeForgot from "../pages/Login/ChangeForgot";
import Barang from "../pages/Dashboard/Barang";
import EditBarang from "../pages/Dashboard/EditBarang";
import AddBarang from "../pages/Dashboard/AddBarang";

export default function SetupRouter() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ProtectedRoute />}>
                        <Route path="/" element={<Login />} />
                        <Route path="/forgot" element={<ForgotPassword />} />
                        <Route path="/forgot/:key" element={<ChangeForgot />} />
                    </Route>

                    <Route path="/" element={<PrivateRoute />}>
                        <Route path="/" element={<Sidebar />}>
                            <Route
                                path="/dashboard/barang"
                                element={<Barang />}
                            />
                            <Route
                                path="/dashboard/barang/:id"
                                element={<EditBarang />}
                            />
                            <Route
                                path="/dashboard/barang/add"
                                element={<AddBarang />}
                            />
                            <Route path="/profile" element={""} />
                            <Route path="/dashboard" element={<Home />} />
                            <Route
                                path="/dashboard/employe"
                                element={<Employe />}
                            />
                            <Route
                                path="/dashboard/employe/:id"
                                element={<EditEmploye />}
                            />
                            <Route
                                path="/dashboard/employe/add"
                                element={<AddEmploye />}
                            />
                            <Route path="/dashboard/gaji" element={<Gaji />} />
                            <Route
                                path="/dashboard/report"
                                element={<AddJob />}
                            />
                            <Route
                                path="/dashboard/history"
                                element={<History />}
                            />
                        </Route>
                        <Route
                            path="/dashboard/print/employe"
                            element={<PrintEmploye />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
