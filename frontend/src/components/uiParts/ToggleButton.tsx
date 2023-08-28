import React from "react";

import {
  Button,
  ButtonProps,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";

export const ToggleIconButton: React.FC<{
  toggle: () => void;
  isClicked: boolean;
  onIcon: JSX.Element;
  offIcon: JSX.Element;
  props?: IconButtonProps;
}> = ({ toggle, isClicked, props, onIcon, offIcon }) => {
  return (
    <IconButton
      aria-label="IconButton"
      // bgColor={isClicked ? "blue.100" : "white"}
      icon={isClicked ? offIcon : onIcon}
      onClick={toggle}
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
      icon={isClicked ? offIcon : onIcon}
      isActive={false}
      onClick={toggle}
      rightIcon={isClicked ? onIcon : offIcon}
      {...props}
      _hover={{ bgColor: "none" }}
      _focus={{ bgColor: "none" }}
    >
      {text}
    </Button>
  );
};
