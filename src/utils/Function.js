import { GetData } from "./LocalStorage";

// get all scenarios from localStorage
const getAllScenarios = () => {
  const data = GetData("scenarioData");
  return data;
};

export { getAllScenarios };
