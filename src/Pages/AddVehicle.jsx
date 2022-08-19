import {
  Box,
  Container,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BlueButton, GreenButton, OrangeButton } from "../Components/Buttons";
import { GetData, SaveData } from "../utils/LocalStorage";
import { v4 as uuidv4 } from "uuid";
export const AddVehicle = () => {
  const directions = [
    "Select Direction",
    "Towords",
    "Backwords",
    "upwords",
    "Downwords",
  ];
  const [vehicleData, setVehicleData] = useState({
    scenario: "",
    name: "",
    speed: "",
    positionX: "",
    positionY: "",
    direction: "",
  });

  // const getVehicleData = GetData("vehicleData");
  const getScenarioData = GetData("scenarioData");
  const handleChange = (e) => {
    setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    SaveData("vehicleData", { ...vehicleData, id: uuidv4() });
    setVehicleData({
      scenario: "",
      name: "",
      speed: "",
      positionX: "",
      positionY: "",
      direction: "",
    });
  };

  // reset the form data
  const handleReset = () => {
    setVehicleData({
      scenario: "",
      name: "",
      speed: "",
      positionX: "",
      positionY: "",
      direction: "",
    });
  };
  return (
    <Container maxWidth="70%">
      <Box mt="10">
        <Text color="white" fontSize="24px">
          Add Vehicle
        </Text>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box
          h="250px"
          bg="rgba(41, 41, 57, 0.667)"
          border="0.5px solid rgba(41, 41, 57, 0.667)"
          mt="20"
        >
          <Grid
            templateColumns="repeat(3,1fr)"
            templateRows="repeat(2,70px)"
            gap="30px"
            mt="20px"
            padding="10px"
          >
            <GridItem>
              <FormLabel color="white">Scenarios List</FormLabel>
              <Select
                color="white"
                colorScheme="black"
                rounded="sm"
                value={vehicleData.scenario}
                name="scenario"
                onChange={handleChange}
              >
                <option value="" style={{ backgroundColor: "black" }}>
                  Select Scenario
                </option>
                {getScenarioData?.map((scenario, i) => (
                  <option
                    value={scenario.id}
                    style={{ backgroundColor: "black" }}
                    key={i}
                  >
                    {scenario.name}
                  </option>
                ))}
              </Select>
            </GridItem>
            <GridItem>
              <FormLabel color="white">Vehicle Name</FormLabel>
              <Input
                type="text"
                rounded="sm"
                required={true}
                color="white"
                pl="30px"
                name="name"
                value={vehicleData.name}
                onChange={handleChange}
              />
            </GridItem>
            <GridItem>
              <FormLabel color="white">Speed</FormLabel>
              <Input
                type="number"
                rounded="sm"
                required={true}
                color="white"
                pl="30px"
                name="speed"
                value={vehicleData.speed}
                onChange={handleChange}
              />
            </GridItem>
            <GridItem>
              <FormLabel color="white">Position X</FormLabel>
              <Input
                type="number"
                rounded="sm"
                required={true}
                color="white"
                pl="30px"
                name="positionX"
                value={vehicleData.positionX}
                onChange={handleChange}
              />
            </GridItem>
            <GridItem>
              <FormLabel color="white">Postion Y</FormLabel>
              <Input
                type="number"
                rounded="sm"
                required={true}
                color="white"
                pl="30px"
                name="positionY"
                value={vehicleData.positionY}
                onChange={handleChange}
              />
            </GridItem>
            <GridItem>
              <FormLabel color="white">Direction</FormLabel>
              <Select
                color="white"
                colorScheme="black"
                rounded="sm"
                name="direction"
                value={vehicleData.direction}
                onChange={handleChange}
              >
                {directions.map((direction, i) => (
                  <option
                    value={direction}
                    key={i}
                    style={{ backgroundColor: "black" }}
                  >
                    {direction}
                  </option>
                ))}
              </Select>
            </GridItem>
          </Grid>
        </Box>
        <Box mt="10">
          <GreenButton text="Add" type="submit" />
          <OrangeButton text="Reset" click={handleReset} />
          <BlueButton text="Go Back" />
        </Box>
      </form>
    </Container>
  );
};
