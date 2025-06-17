import { xyzComponentData } from "@/data";
import {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const XyzComponentPlaceholderBadge = ({ id }: { id: string }) => {
  const description =
    xyzComponentData.description || "No description available";
  return (
    <div
      className="custom-function-wrapper relative group inline-block"
      data-function-id={id}
    >
      {/* Tooltip that shows on hover */}
      <div
        className="absolute left-0 top-full mt-2 w-auto max-w-xs p-2 bg-gray-800 text-white text-xs rounded-md shadow-lg 
                     opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                     transition-all duration-200 z-10 pointer-events-none
                     whitespace-normal break-words"
      >
        {description}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {/* This is the badge that will be displayed in the inline menu, it needs a wrapper span for the menu to open*/}
          <span>
            <XyzComponentPlaceholderBadgeLabel descriptionAlwaysOn={false} />
          </span>
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          <DropdownMenuContent className="DropdownMenuContent" sideOffset={5}>
            <DropdownMenuItem className="DropdownMenuItem">
              You did not define any type of function a Badge should have in the
              README.
            </DropdownMenuItem>

            <DropdownMenuSeparator className="DropdownMenuSeparator" />
            <DropdownMenuItem className="DropdownMenuItem">
              Function 1
            </DropdownMenuItem>
            <DropdownMenuItem className="DropdownMenuItem">
              Function 2
            </DropdownMenuItem>
            <DropdownMenuSeparator className="DropdownMenuSeparator" />
            <DropdownMenuItem className="DropdownMenuItem">
              There is a description for a Delete function but what do you want
              me to delete? A line, a Ask, or Say?
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  );
};

export default XyzComponentPlaceholderBadge;

export const XyzComponentPlaceholderBadgeLabel = ({
  descriptionAlwaysOn = true,
}: {
  descriptionAlwaysOn?: boolean;
}) => {
  const description =
    xyzComponentData.description || "No description available";
  return (
    <span>
      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-700/10 ring-inset hover:bg-green-100 transition-colors">
        XYZ Badge
      </span>
      {descriptionAlwaysOn && <span className="p-1">{description}</span>}
    </span>
  );
};
