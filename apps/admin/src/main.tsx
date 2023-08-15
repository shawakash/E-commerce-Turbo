import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "ui/src/style.css"
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
