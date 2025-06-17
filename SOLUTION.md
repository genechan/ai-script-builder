## Library used:

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

## Editors used:

- Visual Studio Code

  _Why?
  It has a great support for TypeScript and React development, including syntax highlighting, IntelliSense, and debugging._

## How to run this project locally:

1. Clone the repository:
2. npm install
3. npm run build
4. npm run dev

## What's working and what's not:

### Requirements

1. Markdown Rendering

- [x] Parse and render markdown with support for:
  - [x] Headings, bold, italic, underline
  - [x] Lists, horizontal rules
  - [x] Inline code / blocks

2. Function badges

- [x] Replace all <% function UUID %> placeholders with interactive badges
- [x] Each badge must:
  - [x] Display the function's description on hover (tooltip)
  - [x] Be clickable → opens dropdown or popover
  - [x] Allow choosing another function from the list
        **( Unclear instructions, on what functions are you referring to? The list of functions is not provided in the requirements. )**
  - [ ] Support deletion with confirmation
        **( Unclear instructions on what to delete, an Ask, Say, Selected text, or Whole text block? )**

3. Serialization

- [x] Your system must convert the editor state back to markdown:
  - [x] Preserve all regular markdown formatting
  - [x] Replace function badges with their correct placeholder syntax: <% function UUID %>
  - [x] Ensure round-trip works:
    - Load → Edit → Serialize → Load again should preserve structure

(stretch) Slash commands

- [x] Typing / inside the editor opens a slash command menu
- [x] The menu must:
  - [x] Show a list of available functions (name + description)
  - [x] Be keyboard accessible
  - [x] Insert a function badge at cursor position when selected

### Anything you'd improve?

The instuctions were not clear on what functions are you referring to in the requirements for the badges popup. In addition the delete feteare was not define on what to delete.

If I was given more clear instructions, I would have implemented them.
