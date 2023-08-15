import * as React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { SignupPage } from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import ProtectRoute from "./components/ProtectRoute";
import { NotFoundPage } from "ui";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/admin/signup" element={<SignupPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route element={<ProtectRoute />}>
            <Route path="/admin" />
            <Route path="/admin/prod/create" />
            <Route path="/admin/prods" />
            <Route path="/admin/prod/:prodId" />
            <Route path="/admin/prod/:prodId" />
          </Route>
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
