import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./store/store";

// import { Register } from "./register";
// import { Login } from "./login";
// import { Timeline } from "./timeline";

ReactDOM.render(
  <Provider store={Store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
// render();
// Store.subscribe(render);
// registerServiceWorker();
