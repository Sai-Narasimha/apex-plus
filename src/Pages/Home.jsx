/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  Box,
  Container,
  Flex,
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
import { Link } from "react-router-dom";
import { BlueButton, GreenButton, OrangeButton } from "../Components/Buttons";

export const Home = () => {
  const [allScenarioData, setAllScenariosData] = React.useState([]);
  const [selectedScenario, setSelectedScenario] = React.useState("");
  const [selectedVehicleData, setSelectedVehicleData] = React.useState([]);
  const [allVehicleData, setAllVehicleData] = React.useState([]); //updatad to vehicledata = GetData()
  const [isAnimate, setIsAnimate] = React.useState(false);
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

  const array2D = [];

  for (let i = 0; i < 6; i++) {
    let arr = [];
    for (let j = 0; j < 14; j++) {
      arr.push([i, j]);
    }
    array2D.push(arr);
  }

  const handleChange = (e) => {
    setSelectedScenario(e.target.value);
  };

  const handleEdit = (vehicleId) => {
    localStorage.setItem("editVehicleId", vehicleId);
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

  const getDirection = (direction) => {
    if (direction === "Towards") return `towards`;
    if (direction === "Backwards") return `backwards`;
    if (direction === "Upwards") return `upwards`;
    if (direction === "Downwards") return `downwards`;
  };

  React.useEffect(() => {
    setAllVehicleData(getAllVehicles());
    let allScenarios = getAllScenarios();
    setAllScenariosData(allScenarios);
    setSelectedScenario(allScenarios?.[0]?.id);
  }, []);

  React.useEffect(() => {
    setSelectedVehicleData((prev) => {
      return allVehicleData?.filter(
        (vehicle) => vehicle.scenario === selectedScenario
      );
    });
  }, [selectedScenario, allVehicleData]);

  return (
    <Container maxWidth="80%" p="0px">
      <Box w="200px" color="white" mt="15px">
        <Select onChange={handleChange}>
          {allScenarioData?.map((scenario, idx) => (
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
        <Table border="1px solid white" >
          <Thead>
            <Tr bg="rgb(43,162,228)">
              {vehicleTableOptions?.map((opt, i) => (
                <Th color="black" key={i + 1} textAlign="center">
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
                  <Link to="/add-vehicle">
                    <EditIcon onClick={() => handleEdit(ele.id)} />
                  </Link>
                </Td>
                <Td textAlign="center">
                  <DeleteIcon onClick={() => handleDeleteVehicle(ele.id)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Flex justifyContent="flex-end" my="15px">
        <GreenButton text="Start Simulation" click={() => setIsAnimate(true)} />
        <BlueButton
          text="Stop Simulation"
          click={() => {
            setIsAnimate(false);
          }}
        />
      </Flex>

      <div
        style={{ 
          width: "fit-content",
          height: "auto",   
          overflow: "hidden",
          margin: "0px auto 50px auto",
          position: "relative",
          padding: "0px",
        }}
      >
        <div>
        {selectedVehicleData?.map((ele, ind) => {
          return (
            <div
              key={ind}
              style={{
                width: "25px",
                height: "25px",
                backgroundColor:
                  "hsla(" + Math.random() * 360 + ", 100%, 50%, 1)",
                borderRadius: "50%",
                position: "absolute",
                left: ele.positionX * 60 + "px",
                bottom: ele.positionY * 60 + "px",
                margin: "5px",
                textAlign: "center",
                color: "white",
                animationDuration: ele.speed + "s",
              }}
              className={
                isAnimate
                  ? getDirection(ele.direction)
                  : `${getDirection(ele.direction)} pause`
              }
            >
              {ele.name[0].toUpperCase()}
            </div>
          );
        })}
        </div>

        <div>
          {array2D?.map((row, idx) => {
            return (
              <Flex key={idx}>
                {row.map((ele, ind) => {
                  return (
                    <Box
                      key={`${idx}${ind}`}
                      border="1px solid green"
                      w="65px"
                      h="65px"
                    ></Box>
                  );
                })}
              </Flex>
            );
          })}
        </div>
      </div>
    </Container>
  );
};
