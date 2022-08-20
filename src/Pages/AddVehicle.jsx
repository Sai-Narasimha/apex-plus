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
import React, { useEffect, useState } from "react";
import { BlueButton, GreenButton, OrangeButton } from "../Components/Buttons";
import { GetData, SaveData } from "../utils/LocalStorage";
import { v4 as uuidv4 } from "uuid";
import { getAllVehicles } from "../utils/Function";
import { useNavigate } from "react-router-dom";
export const AddVehicle = () => {
  const directions = [
    "Select Direction",
    "Towards",
    "Backwards",
    "Upwards",
    "Downwards",
  ];
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    scenario: "",
    name: "",
    speed: "",
    positionX: "",
    positionY: "",
    direction: "",
  });

  const getScenarioData = GetData("scenarioData");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    SaveData("vehicleData", { ...formData, id: uuidv4() });
    handleReset();
    alert("Vehicle added")
  };

  // reset the form data
  const handleReset = () => {
    setFormData({
      scenario: "",
      name: "",
      speed: "",
      positionX: "",
      positionY: "",
      direction: ""
    });
  };

  
  const handleEditSubmit = (e) => {
    e.preventDefault();

    let editId = localStorage.getItem("editVehicleId"); // getting editVehicleId from localStorage
    let allVehicleData = getAllVehicles(); // getting all vehicles from LocalStorage

    let editVehicleData = allVehicleData?.map((vehicle) => {
      let id = vehicle.id; //existing id of the vehicle

      //if the vehicle id === the editId in the local storage
      if (id === editId) return { ...formData, id }; //return updated form data and the same id of the vehicle
      return vehicle; //else return the same vehicle
    });

    localStorage.setItem("vehicleData", JSON.stringify(editVehicleData)); //saving to local storage
    handleReset(); //resetting form data
    localStorage.removeItem("editVehicleId"); //delted the edit vehicle id from local storage
    alert("vehicle edited"); // alert message for the user
    navigate("/");
  };

  useEffect(() => {
    let editId = localStorage.getItem("editVehicleId");

    // if the edit id is present - the module servers the purpuose of editing a vehicle
    if (editId) {
      setIsEdit(true);
      let allVehicles = getAllVehicles();

      //retrieve the vehicle to be edited from all  the vehicles
      let vehicleToEdit = allVehicles?.filter(
        (vehicle) => vehicle.id === editId
      )[0];

      setFormData(vehicleToEdit); //set the vehicle to be edited in form data
    } else setIsEdit(false); //if the edit id is absent - the modules serves teh purpuose of adding a vehicle
  }, []);

  return (
    <Container maxWidth="70%">
      <Box mt="10">
        <Text color="white" fontSize="24px">
          {isEdit ? "Edit Vehicle" : "Add Vehicle"}
        </Text>
      </Box>

      <form onSubmit={isEdit ? handleEditSubmit : handleSubmit}>
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
                value={formData.scenario}
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
                value={formData.name}
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
                value={formData.speed}
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
                value={formData.positionX}
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
                value={formData.positionY}
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
                value={formData.direction}
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
          <GreenButton text={isEdit ? "Update" : "Add"} type="submit" />
          <OrangeButton text="Reset" click={handleReset} />
          <BlueButton text="Go Back" />
        </Box>
      </form>
    </Container>
  );
};
