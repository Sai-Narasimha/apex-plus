import React from "react";
import { Routes, Route } from "react-router-dom";
import { SideBar } from "../Components/SideBar";
import { AddScenario } from "./AddScenario";
import { AddVehicle } from "./AddVehicle";
import { AllScenarios } from "./AllScenarios";
import { Home } from "./Home";

export const AllRoutes = () => {
  return (
    <div className="all_container_wrapper">
      <SideBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-scenario" element={<AddScenario />} />
        <Route path="/add-vehicle" element={<AddVehicle />} />
        <Route path="/all-scenarios" element={<AllScenarios />} />
      </Routes>
    </div>
  );
};

