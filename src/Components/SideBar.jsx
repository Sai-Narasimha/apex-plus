import React from "react";
import { Link } from "react-router-dom";

import "../App.css";
export const SideBar = () => {
  return (
    <div className="sidebar_wrapper">
      <div className="links_container">
        <div className="links_wrapper">
          <Link to="/" className="links_style">
            Home
          </Link>
        </div>
        <div className="links_wrapper">
          <Link to="/all-scenarios" className="links_style">
            All Scenarios
          </Link>
        </div>
        <div className="links_wrapper">
          <Link to="/add-scenario" className="links_style">
            Add Scenario
          </Link>
        </div>
        <div className="links_wrapper">
          <Link to="/add-vehicle" className="links_style">
            Add Vehicle
          </Link>
        </div>
      </div >
    </div>
  );
};


