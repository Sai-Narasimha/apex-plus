import { GetData } from "./LocalStorage";

// get all scenarios from localStorage
const getAllScenarios = () => {
  const data = GetData("scenarioData");
  return data;
};

const getAllVehicles = () => {
  const data = GetData("vehicleData");
  return data
}
export { getAllScenarios, getAllVehicles };
