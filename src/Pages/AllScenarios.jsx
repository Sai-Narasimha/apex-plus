import {
  Box,
  Container,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { DeleteData, GetData } from "../utils/LocalStorage";
import { EditIcon, AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { BlueButton, GreenButton, OrangeButton } from "../Components/Buttons";
import { getAllScenarios } from "../utils/Function";

export const AllScenarios = () => {
  const [allScenarioData, setAllScenariosData] = React.useState([]);
  const allVehicleData = GetData("vehicleData");

  const handleFilterData = (scenarioId) => {
    const filterData = allVehicleData?.filter(
      (vehicle) => vehicle.scenario === scenarioId
    );
    return filterData?.length || 0;
  };

  const handleDeleteScenario = (id) => {
    // filter out the current scenario based on the ID
    const updatedScenarioList = allScenarioData?.filter(
      (scenario) => scenario.id !== id
    );
    // update the scenario list in local storage
    localStorage.setItem("scenarioData", JSON.stringify(updatedScenarioList));
    setAllScenariosData(getAllScenarios());
    alert("Scenario deleted"); //alert message for the user
  };

  //deleting data from localstorage
  const handleDeleteAll = () => {
    if (localStorage.scenarioData && localStorage.vehicleData) {
      DeleteData("scenarioData");
      DeleteData("vehicleData");
      alert("Deleted all");
      setAllScenariosData([]);
    } else alert("No Data found");
  };

  const handleEdit = (id) => {
    localStorage.setItem("editScenarioId", id);
  };

  React.useEffect(() => {
    setAllScenariosData(getAllScenarios());
  }, []);

  return (
    <Container maxWidth="70%">
      <Flex mt="10" justifyContent="space-between">
        <Text color="white" fontSize="24px">
          All Scenarios
        </Text>
        <Box>
          <Link to="/add-scenario">
            <BlueButton text="New Scenario" />
          </Link>
          <Link to="/add-vehicle">
            <GreenButton text="Add Vehicle" />
          </Link>
          <OrangeButton text="Delete All" click={handleDeleteAll} />
        </Box>
      </Flex>
      <Box mt="10">
        <Table border="1px solid white">
          <Thead bg="grey">
            <Tr color="white">
              <Th color="white">Scenario Id</Th>
              <Th color="white">Scenario Name</Th>
              <Th color="white">Scenario Time</Th>
              <Th color="white">Number of Vehicles</Th>
              <Th color="white">Add Vehicle</Th>
              <Th color="white">Edit </Th>
              <Th color="white">Delete </Th>
            </Tr>
          </Thead>
          <Tbody>
            {allScenarioData?.map((data, i) => (
              <Tr color="white" key={data.id}>
                <Td textAlign="center">{i + 1}</Td>
                <Td textAlign="center">{data.name}</Td>
                <Td textAlign="center">{data.time}</Td>
                <Td textAlign="center">{handleFilterData(data.id)}</Td>
                <Td textAlign="center">
                  <Link to="/add-vehicle">
                    <AddIcon />
                  </Link>
                </Td>
                <Td textAlign="center">
                  <Link to="/add-scenario">
                    <EditIcon onClick={() => handleEdit(data.id)} />
                  </Link>
                </Td>
                <Td
                  textAlign="center"
                  onClick={() => handleDeleteScenario(data.id)}
                >
                  <DeleteIcon />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Container>
  );
};
