import React, { useState } from "react";
import {
  Box,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { BlueButton, GreenButton, OrangeButton } from "../Components/Buttons";
import { SaveData } from "../utils/LocalStorage";

export const AddScenario = () => {
  const [data, setData] = useState([]);
  const [scenarioData, setScenarioData] = useState({
    id:1,
    name: "",
    time: "",
  });
  const handleChange = (e) => {
    setScenarioData({ ...scenarioData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...data, scenarioData]);
    SaveData("scenarioData", data);
  };

  return (
    <Container maxWidth="70%">
      <Box mt="10">
        <Text color="white" fontSize="24px">
          Add Scenario
        </Text>
      </Box>
      l
      <form onSubmit={handleSubmit} >
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
                  value={scenarioData.name}
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
                  value={scenarioData.time}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>
          </Flex>
        </Box>

        <Box mt="10">
          <GreenButton text="Add" type="submit" />
          <OrangeButton text="Reset" />
          <BlueButton text="Go Back" />
        </Box>
      </form>
    </Container>
  );
};
