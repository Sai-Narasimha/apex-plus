/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  Box,
  Container,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { getAllScenarios, getAllVehicles } from "../utils/Function";

export const Home = () => {
  const [allScenarioData, setAllScenariosData] = React.useState([]);
  const [selectedScenario, setSelectedScenario] = React.useState("");
  const [selectedVehicleData, setSelectedVehicleData] = React.useState([]);
  const [allVehicleData, setAllVehicleData] = React.useState([]); //updatad to vehicledata = GetData()
  const vehicleTableOptions = [
    "Vehicle Id",
    "Vehicle Name",
    "Postion X",
    "Postion Y",
    "Speed",
    "Direction",
    "Edit",
    "Delete",
  ];

  const handleChange = (e) => {
    setSelectedScenario(e.target.value);
  };

  const handleDeleteVehicle = (id) => {
    // filter out the current vehicle based on the ID
    const updatedVehicleList = allVehicleData?.filter(
      (vehicle) => vehicle.id !== id
    );
    // update the scenario list in local storage
    localStorage.setItem("vehicleData", JSON.stringify(updatedVehicleList));
    setAllVehicleData(getAllVehicles());
    alert("Vehicle deleted"); //alert message for the user
  };

  React.useEffect(() => {
    setAllScenariosData(getAllScenarios());
  }, []);

  React.useEffect(() => {
    setAllVehicleData(getAllVehicles());
  }, []);
  
  React.useEffect(() => {
    setSelectedVehicleData((prev) => {
      return allVehicleData?.filter(
        (vehicle) => vehicle.scenario === selectedScenario
      );
    });
  }, [selectedScenario, allVehicleData]);

  return (
    <Container maxWidth="70%" border="2px solid red">
      <Box w="200px" color="white" mt="15px">
        <Select onChange={handleChange}>
          <option value="" style={{ backgroundColor: "black" }}>
            Select Scenario
          </option>
          {allScenarioData?.map((scenario) => (
            <option
              style={{ backgroundColor: "black" }}
              value={scenario.id}
              key={scenario.id}
            >
              {scenario.name}
            </option>
          ))}
        </Select>
      </Box>
      <Box mt="20px">
        <Table border="1px solid white">
          <Thead>
            <Tr bg="grey">
              {vehicleTableOptions?.map((opt, i) => (
                <Th color="white" key={i + 1}>
                  {opt}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody color="white">
            {selectedVehicleData?.map((ele, idx) => (
              <Tr key={idx}>
                <Td textAlign="center">{idx + 1}</Td>
                <Td textAlign="center">{ele.name}</Td>
                <Td textAlign="center">{ele.positionX}</Td>
                <Td textAlign="center">{ele.positionY}</Td>
                <Td textAlign="center">{ele.speed}</Td>
                <Td textAlign="center">{ele.direction}</Td>
                <Td textAlign="center">
                  <EditIcon />
                </Td>
                <Td textAlign="center">
                  <DeleteIcon onClick={() => handleDeleteVehicle(ele.id)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
};
