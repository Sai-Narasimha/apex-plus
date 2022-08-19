import { Button } from "@chakra-ui/react";

const GreenButton = ({ text, type, click }) => {
  return (
    <Button
      bg="rgb(4,190,90)"
      color="white"
      rounded="sm"
      p="20px"
      colorScheme="green"
      type={type}
      onClick={click}
      mr="20px"
    >
      {text}
    </Button>
  );
};

const BlueButton = ({ text, click }) => {
  return (
    <Button
      bg="rgb(43,162,228)"
      color="white"
      rounded="sm"
      p="20px"
      colorScheme="blue"
      mr="20px"
      onClick={click}
    >
      {text}
    </Button>
  );
};
const OrangeButton = ({ text, click }) => {
  return (
    <Button
      bg="rgb(248,147,29)"
      color="white"
      rounded="sm"
      p="20px"
      colorScheme="orange"
      mr="20px"
      onClick={click}
    >
      {text}
    </Button>
  );
};
export { GreenButton, OrangeButton, BlueButton };
