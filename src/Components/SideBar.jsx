import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Router, useLocation} from 'react-router-dom'
import "../App.css";

const links = [
  { name: "Home", path: "/" },
  { name: "All Scenarios", path: "/all-scenarios" },
  { name: "Add Scenario", path: "/add-scenario" },
  { name: " Add Vehicle", path: "/add-vehicle" },
];

export const SideBar = () => {
  const [isActive, setIsActive] = useState(0);
  const location = useLocation();

  useEffect(()=>{
    if(location.pathname.includes("/all-scenarios")) setIsActive(1);
    else if(location.pathname.includes("/add-scenario")) setIsActive(2);
    else if(location.pathname.includes("/add-vehicle")) setIsActive(3);
    else setIsActive(0);

    return; 
  },[])

  return (
    <div className="sidebar_wrapper">
      <div className="links_container">
        {links?.map((link, idx) => (
          <div
            className={`${
              isActive === idx ? "link_active" : ""
            } links_wrapper`}
            onClick={() => setIsActive(idx)}
            key={idx}
          >
            <Link to={link.path} className="links_style">
              {link.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
