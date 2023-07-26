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
      onClick={toggle}
      icon={isClicked ? offIcon : onIcon}
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
