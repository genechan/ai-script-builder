import ReactDOM from "react-dom/client"; // Import createRoot
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React, { useState, useRef } from "react"; // Added useState, useRef
import TurndownService from "turndown"; // Added TurndownService
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import InlineMenuReactComponent from "@/components/ui/inlineMenuReactComponent";
import { componentRegistry } from "@/lib/utils"; // Import the component registry

const SAMPLE_SCRIPT = `# ExampleCo Home Solutions – Sample Call Script

You're a customer service representative speaking on the phone.

---

## Steps:

1. Ask for **first and last name**.

2. Ask for **full property address**.

3. Confirm the address back, saying:
   - Street numbers and ZIP code individually.
   - e.g., "401st Street" → _"four hundred first street"_

4. Ask:  
   _"And that is the home you own and live at?"_

5. Ask:  
   _"And what type of home is it — single family, condo, townhome, mobile, or rental?"_

6. Ask:  
   _"Great! We also ask to meet with all owners of the property. Who would that be?"_

7. Say:  
   _"This will be a full replacement including frame and installation. We don't perform repairs or glass-only replacements."_

8. Ask how many **[units]** they want replaced (e.g., windows or doors).

9. Ask what issues they're experiencing with those **[units]**.

10. Say:  
    _"A Project Specialist will inspect, measure, and provide a quote valid for 12 months. Does that sound helpful?"_

11. Ask:  
    _"We ask that you set aside about 90 minutes for the visit. Fair enough?"_

12. Ask for **best email address**.

13. Ask:  
    _"Would daytime or evening work better for your schedule?"_

14. Offer appointment based on their preference (e.g., 2 P M or 6 P M).

15. Then:  
    <% function abc12345-def6-7890-ghij-klmnopqrstuv %>

---

## If Caller Is Not Interested:

End with:  
<% function xyz98765-wxyz-4321-lmno-pqrstuvwxyza %>`;

// Pre-process the Markdown to replace custom tags with identifiable HTML elements
const processedMarkdown = SAMPLE_SCRIPT.replace(
  /<% function (.*?) %>/g,
  (_match, functionId) => {
    // Use Markdown syntax that ReactMarkdown can properly handle
    // We'll create a custom code block with a special language identifier
    // Adding newlines before and after to ensure it's treated as a block
    return `\n\`\`\`custom-function-${functionId} \n\`\`\`\n`;
  }
);

export function Editor() {
  const [savedMarkdown, setSavedMarkdown] = useState("");
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    if (contentEditableRef.current) {
      const rawHtml = contentEditableRef.current.innerHTML;

      // Create a temporary DOM element to manipulate the HTML
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = rawHtml;

      // Find all custom function placeholders (rendered as spans with data-custom-function-id)
      const placeholders = tempDiv.querySelectorAll(
        "span[data-custom-function-id]"
      );

      placeholders.forEach((placeholder) => {
        const functionId = placeholder.getAttribute("data-custom-function-id");
        if (functionId) {
          // Create the text node for the original tag
          // IMPORTANT: Turndown might escape '<' and '>', so we need to be careful.
          // A common strategy is to use unique, non-HTML-like placeholders that turndown won't touch,
          // and then replace them back in the final markdown string.
          // For now, let's try direct replacement and see how turndown handles it.
          // If issues arise, we'd replace with something like "@@CUSTOM_FUNCTION_START@@${functionId}@@CUSTOM_FUNCTION_END@@"
          // and then do a final string replace on the markdown output.
          const textNode = document.createTextNode(
            `<% function ${functionId} %>`
          );
          placeholder.parentNode?.replaceChild(textNode, placeholder);
        }
      });

      const processedHtmlForTurndown = tempDiv.innerHTML;

      const turndownService = new TurndownService({
        headingStyle: "atx",
        codeBlockStyle: "fenced",
        bulletListMarker: "-",
      });
      // Add a rule to keep the pre-processed custom function tags as is, preventing turndown from escaping them.
      // This is a bit of a hack. A more robust way is to replace them with non-HTML placeholders
      // before turndown and then revert after turndown.
      // However, since we replaced the span with a text node containing '<%', turndown might handle it.
      // Let's test this simpler approach first.

      // Rule to identify and preserve our already text-replaced custom function tags
      turndownService.addRule("preserveCustomFunctionTags", {
        filter: (node: Node) => {
          // Added type Node for node
          return (
            node.nodeType === 3 &&
            node.nodeValue?.includes("<% function") === true
          ); // Text node containing our tag
        },
        replacement: (content: string) => {
          // Added type string for content
          return content; // Return the content as is
        },
      });

      const newMarkdown = turndownService.turndown(processedHtmlForTurndown);
      setSavedMarkdown(newMarkdown);
    }
  };

  return (
    <Card className="rounded-lg shadow-lg">
      <CardContent className="p-6">
        <div
          ref={contentEditableRef} // Added ref
          // Apply styling to this wrapper div
          className="min-h-[400px] w-full outline-none prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-strong:font-semibold prose-em:text-gray-700 prose-em:italic prose-ul:list-disc prose-ul:pl-4 prose-ol:list-decimal prose-ol:pl-4 prose-li:text-gray-700 prose-hr:border-gray-200"
          aria-label="Rendered script content" // Updated aria-label
          contentEditable
          onInput={handleInput} // Attach the input handler
          // Suppress React's warning about contentEditable and children managed by React,
          // as we are intentionally mixing React's initial render with direct DOM manipulation.
          // This is generally risky.
          suppressContentEditableWarning={true}
        >
          <ReactMarkdown
            children={processedMarkdown}
            remarkPlugins={[remarkGfm]}
            components={{
              code: ({ node, ...props }) => {
                const className = props.className || "";
                let componentId: string | undefined;
                if (className.includes("language-custom-function-")) {
                  componentId = className.replace(
                    "language-custom-function-",
                    ""
                  );
                }
                if (componentId) {
                  const ComponentToRender = componentRegistry[componentId];
                  if (ComponentToRender) {
                    // Wrap the component in a span with data-attribute for later identification
                    return (
                      <span
                        data-custom-function-id={componentId}
                        className="custom-function-wrapper"
                        contentEditable="false" // Make this specific span non-editable
                      >
                        <ComponentToRender id={componentId} />
                      </span>
                    );
                  }
                  // Fallback for unknown custom component IDs
                  return (
                    <span
                      data-custom-function-id={componentId}
                      className="custom-function-wrapper"
                      contentEditable="false" // Also make fallback non-editable
                      style={{
                        color: "red",
                        border: "1px solid red",
                        padding: "5px",
                        display: "inline-block", // Make span behave like a block for styling
                      }}
                    >
                      Unknown: {componentId}
                    </span>
                  );
                }
                // Render all other code blocks normally
                return (
                  <code className={className} {...props}>
                    {props.children}
                  </code>
                );
              },
              ol: ({ node, ...props }) => {
                return (
                  <ol
                    className="p-4"
                    style={{ listStyle: "decimal" }}
                    {...props}
                  />
                );
              },
              h2: ({ node, ...props }) => {
                return (
                  <h2
                    className="text-lg font-semibold text-gray-900 mb-2"
                    {...props}
                  />
                );
              },
            }}
          />
        </div>
        <Button onClick={handleSave} className="mt-4">
          Save to Markdown
        </Button>
        {savedMarkdown && (
          <div className="mt-4 p-4 border rounded bg-gray-50">
            <h3 className="text-md font-semibold mb-2">Converted Markdown:</h3>
            <pre className="whitespace-pre-wrap text-sm">{savedMarkdown}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const { startContainer, startOffset } = range;

  // Check if the character immediately before the caret is '\'
  if (startContainer.nodeType === Node.TEXT_NODE && startOffset > 0) {
    const textNode = startContainer as Text;
    if (
      textNode.textContent &&
      textNode.textContent[startOffset - 1] === "\\"
    ) {
      // 1. Delete the '\' character
      // Create a new range to select only the '\'
      const backslashRange = document.createRange();
      backslashRange.setStart(startContainer, startOffset - 1);
      backslashRange.setEnd(startContainer, startOffset);
      backslashRange.deleteContents();

      // 2. Create placeholder span
      const placeholder = document.createElement("span");
      placeholder.setAttribute("data-inline-component-type", "MySlashCommand");
      placeholder.setAttribute("contentEditable", "false");
      // Add a class for potential styling
      placeholder.className = "inline-slash-command";

      // 3. Insert the placeholder at the caret position (where '\' was)
      // The original range is now positioned where the '\' was deleted.
      range.insertNode(placeholder);

      // 4. Render React component into the placeholder
      const root = ReactDOM.createRoot(placeholder);
      root.render(<InlineMenuReactComponent />);
      // If managing roots for unmounting:
      // componentRootsRef.current.set(placeholder, root);

      // 5. Move caret after the inserted component
      range.setStartAfter(placeholder);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);

      // Optional: If you have an internal state representing the editor's content
      // (other than ReactMarkdown's initial render), you might need to update it here.
      // For this example, we're relying on direct DOM mutation and later HTML extraction.
    }
  }
};
