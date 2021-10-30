import React from "react";
import Routes from "./Routes";
import Menu from "./Menu";

/**
 * Defines the main layout of the application.
 * You will not need to make changes to this file.
 * @returns {JSX.Element}
*/
function Layout() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-1">
          <Menu />
        </div>
        <div className="col">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
