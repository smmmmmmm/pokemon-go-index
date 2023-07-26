import React from "react";

import {
  Box,
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";

export const SimpleToggleIconButton: React.FC<{
  toggle: () => void;
  isOn: boolean;
  onIcon: JSX.Element;
  offIcon: JSX.Element;
}> = ({ toggle, isOn, onIcon, offIcon }) => {
  return (
    <Box as="button" onClick={toggle} p={1}>
      {isOn ? onIcon : offIcon}
    </Box>
  );
};

export const ToggleIconButton: React.FC<{
  toggle: () => void;
  isOn: boolean;
  onIcon: JSX.Element;
  offIcon: JSX.Element;
  props?: IconButtonProps;
}> = ({ toggle, isOn, props, onIcon, offIcon }) => {
  return (
    <IconButton
      aria-label="IconButton"
      // bgColor={isClicked ? "blue.100" : "white"}
      onClick={toggle}
      icon={isOn ? offIcon : onIcon}
      {...props}
      // _focus={{ bgColor: "none" }}
      _hover={{ bgColor: "none" }}
    />
  );
};

export const ToggleIconButtonWithText: React.FC<{
  toggle: () => void;
  isClicked: boolean;
  text: string;
  onIcon: JSX.Element;
  offIcon: JSX.Element;
  props?: ButtonProps;
}> = ({ toggle, isClicked, props, onIcon, offIcon, text }) => {
  return (
    <Button
      bgColor={isClicked ? "blue.100" : "white"}
      onClick={toggle}
      isActive={false}
      rightIcon={isClicked ? onIcon : offIcon}
      icon={isClicked ? offIcon : onIcon}
      {...props}
      _focus={{ bgColor: "none" }}
      _hover={{ bgColor: "none" }}
    >
      {text}
    </Button>
  );
};
