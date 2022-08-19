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
import { getAllScenarios } from "../utils/Function";

export const Home = () => {
  const array = new Array(3).fill(0);
  const [allScenarioData, setAllScenariosData] = React.useState([]);
  const [selectedScenario, setSelectedScenario] = React.useState("");
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

  React.useEffect(() => {
    setAllScenariosData(getAllScenarios());
  }, []);

  return (
    <Container maxWidth="70%" border="2px solid red">
      <Box w="200px" color="white" mt="15px">
        <Select>
          <option value="">Select Scenario</option>
          {allScenarioData.map((scenario) => (
            <option
              style={{ backgroundColor: "black" }}
              value={scenario.name}
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
              {vehicleTableOptions.map((opt) => (
                <Th color="white">{opt}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody color="white">
            {array.map((ele) => (
              <Tr>
                <Td textAlign="center">123</Td>
                <Td textAlign="center">ljf</Td>
                <Td textAlign="center">ljf</Td>
                <Td textAlign="center">ljf</Td>
                <Td textAlign="center">ljf</Td>
                <Td textAlign="center">ljf</Td>
                <Td textAlign="center">
                  <EditIcon />
                </Td>
                <Td textAlign="center">
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
