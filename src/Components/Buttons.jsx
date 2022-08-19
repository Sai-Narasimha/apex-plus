import { Button } from "@chakra-ui/react";

const GreenButton = ({ text, type, onClick }) => {
  return (
    <Button
      bg="rgb(4,190,90)"
      color="white"
      rounded="sm"
      w="80px"
      colorScheme="green"
      type={type}
      onClick={onClick}
      mr="15px"
    >
      {text}
    </Button>
  );
};

const BlueButton = ({ text }) => {
  return (
    <Button
      bg="rgb(43,162,228)"
      color="white"
      rounded="sm"
      w="100px"
      colorScheme="blue"
    >
      {text}
    </Button>
  );
};
const OrangeButton = ({ text }) => {
  return (
    <Button
      bg="rgb(248,147,29)"
      color="white"
      rounded="sm"
      w="100px"
      colorScheme="orange"
      mr="15px"
    >
      {text}
    </Button>
  );
};
export { GreenButton, OrangeButton, BlueButton };
