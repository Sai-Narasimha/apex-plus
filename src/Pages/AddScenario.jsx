/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { BlueButton, GreenButton, OrangeButton } from "../Components/Buttons";
import { SaveData } from "../utils/LocalStorage";
import { getAllScenarios } from "../utils/Function";
import { useNavigate } from "react-router-dom";

export const AddScenario = () => {
  const [formData, setFormData] = useState({ name: "", time: "" });
  const [isEdit, setIsEdit] = useState(false); //tells if the form is being used to edit or add a scenairo
  const naviage = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // save the data to local storage on submitting the form
  const handleSubmit = (e) => {
    e.preventDefault();
    SaveData("formData", { ...formData, id: uuidv4() }); //saving to local storage by adding an id
    alert("scenario added"); // alert message for the user
    setFormData({ name: "", time: "" }); //resetting the form data
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    let editId = localStorage.getItem("editScenarioId"); // getting editScenarioId from localStorage
    let allScenarios = getAllScenarios(); // getting all Scenarios from LocalStorage

    let editedScenarios = allScenarios?.map((scenario) => {
      let id = scenario.id; //existing id of the scenario
      
      //if the scenario id === the editId in the local storage 
      if (id === editId) return { ...formData, id }; //return updated form data and the same id of the scenario
      return scenario; //else return the same scenario
    });

    localStorage.setItem("scenarioData", JSON.stringify(editedScenarios)); //saving to local storage
    setFormData({ name: "", time: "" }); //resetting form data
    localStorage.removeItem("editScenarioId"); //delted the edit scenario id from local storage
    alert("scenario edited"); // alert message for the user
    naviage("/all-scenarios");
  };

  useEffect(() => {
    let editId = localStorage.getItem("editScenarioId");

    // if the edit id is present - the module servers the purpuose of editing a scenario
    if (editId) {
      setIsEdit(true);
      let allScenarios = getAllScenarios();

      //retrieve the scenario to be edited from all  the scenarios
      let scenarioToEdit = allScenarios?.filter(
        (scenario) => scenario.id === editId
      )[0];

      setFormData(scenarioToEdit); //set the scenario to be edited in form data
    } else setIsEdit(false); //if the edit id is absent - the modules serves teh purpuose of adding a scenario 
  }, []);

  return (
    <Container maxWidth="70%">
      <Box mt="10">
        <Text color="white" fontSize="24px">
          {isEdit ? "Edit Scenario" : "Add Scenario"}
        </Text>
      </Box>

      <form onSubmit={isEdit ? handleEditSubmit : handleSubmit}>
        <Box
          bg="rgba(41, 41, 57, 0.667)"
          w="90%"
          h="200px"
          mt="20"
          border="0.5px solid rgba(41, 41, 57, 0.667)"
        >
          <Flex m="auto" justifyContent="space-around" mt={10}>
            <Box>
              <FormControl>
                <FormLabel color="white">Scenario Name</FormLabel>
                <Input
                  type="text"
                  w="280px"
                  rounded="sm"
                  color="white"
                  required={true}
                  pl="30px"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel color="white">Scenario Time (seconds)</FormLabel>
                <Input
                  type="number"
                  rounded="sm"
                  required={true}
                  w="280px"
                  color="white"
                  pl="30px"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>
          </Flex>
        </Box>

        <Box mt="10">
          <GreenButton text={isEdit ? "Update" : "Add"} type="submit" />
          <OrangeButton
            text="Reset"
            click={() => setFormData({ name: "", time: "" })} // reset the form data
          />
          <BlueButton text="Go Back" />
        </Box>
      </form>
    </Container>
  );
};
