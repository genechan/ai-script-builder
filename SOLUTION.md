Library used:

- react-markdown

  _Why?
  Use a simple string replacement (e.g., with a regular expression) to convert <% function YOUR_FUNCTION_ID %> into something like <div data-component-type="custom-function" data-component-id="YOUR_FUNCTION_ID"></div>_

  _Why not?
  ai-script-builder/node_modules/react-markdown/lib/complex-types.ts has a bug in where it's missing a import type for 'JSX' which causes a build error in the ai-script-builder project. Impact is minnor._
