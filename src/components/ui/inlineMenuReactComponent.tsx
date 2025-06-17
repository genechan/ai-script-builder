import { AbcComponentPlaceholderBadgeLabel } from "@/components/ui/abcBadge";
import { XyzComponentPlaceholderBadgeLabel } from "@/components/ui/xyzBadge";

import {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { componentRegistry } from "@/lib/utils";

import { useState } from "react";
const InlineMenuReactComponent = () => {
  const [open, setOpen] = useState(true);
  const [seletedBadge, setSelectedBadge] = useState<string | null>(null);
  if (seletedBadge) {
    const Component = componentRegistry[seletedBadge];
    if (Component) {
      return (
        <span
          data-custom-function-id={seletedBadge}
          className="custom-function-wrapper"
          contentEditable="false" // Make this specific span non-editable
        >
          <Component id={seletedBadge} />
        </span>
      );
    } else {
      console.warn(`No component found for ID: ${seletedBadge}`);
    }
  }
  if (!open) return null;
  return (
    <span
      contentEditable="false"
      suppressContentEditableWarning={true}
      className="inline-block relative group"
    >
      <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
        <DropdownMenuTrigger asChild>
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
            \ Command Menu
          </span>
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          <DropdownMenuContent className="DropdownMenuContent" sideOffset={5}>
            <DropdownMenuItem className="DropdownMenuItem">
              Pick your Badge
            </DropdownMenuItem>
            <DropdownMenuSeparator className="DropdownMenuSeparator" />
            <DropdownMenuItem
              className="DropdownMenuItem"
              onClick={() =>
                setSelectedBadge("xyz98765-wxyz-4321-lmno-pqrstuvwxyza")
              }
            >
              <XyzComponentPlaceholderBadgeLabel />
            </DropdownMenuItem>
            <DropdownMenuSeparator className="DropdownMenuSeparator" />
            <DropdownMenuItem
              className="DropdownMenuItem"
              onClick={() =>
                setSelectedBadge("abc12345-def6-7890-ghij-klmnopqrstuv")
              }
            >
              <AbcComponentPlaceholderBadgeLabel />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </span>
  );
};

export default InlineMenuReactComponent;
