import * as React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { SignupPage } from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import ProtectRoute from "./components/ProtectRoute";
import { Nav, NotFoundPage } from "ui";
import ProdCreate from "./components/ProdCreate";
import { Prods } from "./components/Prods";
import { ProductPage } from "./components/ProductPage";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Nav client={'admin'} />
        <Routes>
          <Route path="/admin/signup" element={<SignupPage />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route element={<ProtectRoute />}>
            <Route path="/" />
            <Route path="/admin" />
            <Route path="/admin/prods" element={<Prods />}/>
            <Route path="/admin/prod/create" element={<ProdCreate />} />
            <Route path="/admin/prod/:prodId" element={<ProductPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
