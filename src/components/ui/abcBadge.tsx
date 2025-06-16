import { abcComponentData } from "@/data";
import {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const AbcComponentPlaceholderBadge = ({ id }: { id: string }) => {
  const description =
    abcComponentData.description || "No description available";

  return (
    <div className="relative group inline-block" contentEditable="false">
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
          <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-pink-700/10 ring-inset hover:bg-pink-100 transition-colors">
            ABC badge
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
              me to delete? A line, a Ask, a Say or everything else?
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  );
};

export default AbcComponentPlaceholderBadge;
