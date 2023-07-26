import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        rounded: "0",
        boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)",
      },
      defaultProps: {
        variant: "outline",
        size: "sm",
        colorScheme: "primary",
      },
    },
    Select: {
      baseStyle: {
        field: {
          color: "dark",
          borderRadius: "md",
          boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.16)",
        },
      },
      sizes: {
        sm: {
          field: {
            borderRadius: "md",
          },
        },
      },
      variants: {
        outline: {
          field: {
            borderColor: "dark",
            _hover: {
              bg: "rgba(0, 0, 0, 0.05)",
              borderColor: "dark",
            },
          },
        },
      },
      defaultProps: {
        size: "sm",
        variant: "outline",
      },
    },
    Table: {
      variants: {
        details: {
          td: {
            borderBottom: "1px solid",
            borderColor: "gray.100",
            zIndex: -1,
          },
          tbody: {
            tr: {
              "&:last-child": {
                th: { borderBottom: "none" },
                td: { borderBottom: "none" },
              },
            },
          },
          th: {
            fontSize: "sm",
            textTransform: "capitalize",
            color: "midDark",
            bg: "gray.100",
            position: "sticky",
            left: "0",
            top: "0",
            zIndex: 1,
          },
        },
      },
    },
    Tabs: {
      baseStyle: {
        tabpanel: {
          px: 0,
        },
        tab: {
          fontWeight: "bold",
        },
      },
      variants: {
        line: {
          tab: {
            p: 2,
            mr: 2,
            _selected: { color: "dark", borderColor: "primary.500" },
          },
        },
      },
      defaultProps: {
        size: "sm",
      },
    },
  },
  colors: {
    gray: {
      50: "#f9f9f9",
      100: "#ededed",
      200: "#e1e1e1",
      300: "#d3d3d3",
      400: "#c4c4c4",
      500: "#b3b3b3",
      600: "#a0a0a0",
      700: "#898989",
      800: "#6c6c6c",
      900: "#3f3f3f",
    },
    dark: "#222222",
    midDark: "#444444",
    lightDark: "#666666",
    midLight: "#888888",
    light: "#aaaaaa",
    primary: {
      50: "#E5F0FF",
      100: "#B8D4FF",
      200: "#8AB9FF",
      300: "#5C9EFF",
      400: "#2E82FF",
      500: "#0067FF",
      600: "#0052CC",
      700: "#003E99",
      800: "#002966",
      900: "#001533",
    },
  },
  styles: {
    global: {
      body: {
        color: "222",
        minH: "100vh",
      },
    },
  },
});
