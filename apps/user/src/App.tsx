import * as React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Nav, NotFoundPage } from "ui";
import ProtectRoute from "./components/ProtectRoute";
import { SignupPage } from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import { Prods } from "./components/Prods";
import { ProdPurchase } from "./components/ProdPurchase";
import { ProductPage } from "./components/ProductPage";
import User from "./components/User";
import Landing from "./components/Landing";

const App: React.FC = () => {

  return (
    <>
      <Toaster />
      <Router>
        <Nav client={'user'} />
        <Routes>
          <Route path="/user/signup" element={<SignupPage />} />
          <Route path="/user/login" element={<LoginPage />} />
          <Route element={<ProtectRoute />}>
            <Route path="/" element={<Landing />}/>
            <Route path="/user" element={<User />} />
            <Route path="/user/prods" element={<Prods />}/>
            <Route path="/user/prod/purchase" element={<ProdPurchase />} />
            <Route path="/user/prod/:prodId" element={<ProductPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
