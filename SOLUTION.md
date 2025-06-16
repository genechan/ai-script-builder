Library used:

- react-markdown
  _What is it? react-markdown is used to render markdown content in the AI script builder into HTML._

  _Why?
  Use a simple string replacement (e.g., with a regular expression) to convert <% function YOUR_FUNCTION_ID %> into something like <div data-component-type="custom-function" data-component-id="YOUR_FUNCTION_ID"></div>_

  _Why not?
  ai-script-builder/node_modules/react-markdown/lib/complex-types.ts has a bug in where it's missing a import type for 'JSX' which causes a build error in the ai-script-builder project. Impact is minnor._

- turndown
  _What is it? turndown is used to convert HTML content back into markdown._

  _Why?
  Use a simple string replacement (e.g., with a regular expression) to convert <div data-component-type="custom-function" data-component-id="YOUR_FUNCTION_ID"></div> into <% function YOUR_FUNCTION_ID %>_
