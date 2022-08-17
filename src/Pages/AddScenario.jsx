import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
export const AddScenario = () => {
  return (
    <Container maxWidth="70%">
      <Box mt="10">
        <Text color="white" fontSize="24px">
          Add Scenario
        </Text>
      </Box>
      <Box
        bg="rgba(41, 41, 57, 0.667)"
        w="90%"
        h="200px"
        mt="20"
        border="0.5px solid rgba(41, 41, 57, 0.667)"
      >
        <FormControl mt="50px">
          <Flex m="auto" justifyContent="space-around">
            <Box>
              <FormLabel color="white">Scenario Name</FormLabel>
              <Input
                type="text"
                w="280px"
                rounded="sm"
                width="auto"
                color="white"
                isRequired="true"
                errorBorderColor="red.500"
                pl="30px"
              />
            </Box>
            <Box>
              <FormLabel color="white">Scenario Time (seconds)</FormLabel>
              <Input
                type="number"
                rounded="sm"
                isRequired="true"
                w="280px"
                color="white"
                errorBorderColor="red.500"
                pl="30px"
              />
            </Box>
          </Flex>
        </FormControl>
      </Box>
      <Box mt="20">
        <Flex w="30%" justifyContent="space-between">
          <Button bg="rgb(4,190,90)" color="white" rounded="sm" w="80px" colorScheme="green">
            Add
          </Button>
          <Button bg="rgb(248,147,29)" color="white" rounded="sm" w="100px" colorScheme="orange">
            Reset
          </Button>
          <Button bg="rgb(43,162,228)" color="white" rounded="sm" w="100px" colorScheme="blue">
            Go Back
          </Button>
        </Flex>
      </Box>
    </Container>
  );
};
