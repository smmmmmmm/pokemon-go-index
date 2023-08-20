module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setGenerator("component", {
    // オプション名になる
    description: "Create a new component",
    prompts: [
      {
        type: "input",
        name: "path",
        default: "src/components/uiParts",
        message: "component path:",
      },
      {
        type: "input",
        name: "name",
        message: "component name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "{{path}}/{{pascalCase name}}/index.tsx",
        templateFile: "plop-templates/component/index.tsx.hbs",
      },
      {
        type: "add",
        path: "{{path}}/{{pascalCase name}}/{{pascalCase name}}.tsx",
        templateFile: "plop-templates/component/component.tsx.hbs",
      },
      {
        type: "add",
        path: "{{path}}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx",
        templateFile: "plop-templates/component/component.stories.tsx.hbs",
      },
    ],
  });
};
