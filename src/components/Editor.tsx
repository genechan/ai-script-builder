import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import React from "react"; // Import React for JSX

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

// Define placeholder components for your custom functions
const AbcComponentPlaceholder = ({ id }: { id: string }) => (
  <div
    style={{
      border: "2px dashed #4CAF50",
      padding: "10px",
      margin: "10px 0",
      backgroundColor: "#e8f5e9",
    }}
  >
    <strong>Custom Component Placeholder:</strong> Function ID <code>{id}</code>{" "}
    (abc)
  </div>
);

const XyzComponentPlaceholder = ({ id }: { id: string }) => (
  <div
    style={{
      border: "2px dashed #FF9800",
      padding: "10px",
      margin: "10px 0",
      backgroundColor: "#fff3e0",
    }}
  >
    <strong>Custom Component Placeholder:</strong> Function ID <code>{id}</code>{" "}
    (xyz)
  </div>
);

const componentRegistry: {
  [key: string]: React.ComponentType<{ id: string }>;
} = {
  "abc12345-def6-7890-ghij-klmnopqrstuv": AbcComponentPlaceholder,
  "xyz98765-wxyz-4321-lmno-pqrstuvwxyza": XyzComponentPlaceholder,
};

// Pre-process the Markdown to replace custom tags with identifiable HTML elements
// We use a unique key to help React with rendering lists of these items if they were dynamic,
// though for this static replacement, it's less critical but good practice.
let uniqueKeyCounter = 0;
const processedMarkdown = SAMPLE_SCRIPT.replace(
  /<% function (.*?) %>/g,
  (_match, functionId) => {
    // Use Markdown syntax that ReactMarkdown can properly handle
    // We'll create a custom code block with a special language identifier
    return `\n\`\`\`custom-function-${functionId}\n\`\`\`\n`;
  }
);

export function Editor() {
  return (
    <Card className="rounded-lg shadow-lg">
      <CardContent className="p-6">
        <div
          // Apply styling to this wrapper div
          className="min-h-[400px] w-full outline-none prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-strong:font-semibold prose-em:text-gray-700 prose-em:italic prose-ul:list-disc prose-ul:pl-4 prose-ol:list-decimal prose-ol:pl-4 prose-li:text-gray-700 prose-hr:border-gray-200"
          aria-label="Rendered script content" // Updated aria-label
        >
          <ReactMarkdown
            children={processedMarkdown}
            components={{
              code: ({ node, ...props }) => {
                // Check if this is one of our custom function code blocks
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
                    // Pass the id to the component. The key is already on the div.
                    return <ComponentToRender id={componentId} />;
                  }
                  // Fallback for unknown component IDs
                  return (
                    <div
                      style={{
                        color: "red",
                        border: "1px solid red",
                        padding: "5px",
                      }}
                    >
                      Unknown custom component: {componentId}
                    </div>
                  );
                }
                // Render all other divs normally
                return <div {...props} />;
              },
              // You can add more custom renderers here for other HTML elements if needed
              // e.g., p: ({node, ...props}) => <p style={{color: 'purple'}} {...props} />
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
