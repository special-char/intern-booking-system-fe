import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/shadcn/collapsible";
import {
    ChevronDown,
    Info,
} from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/shadcn/tooltip";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/shadcn/avatar";
import { Media, Technician, Territory } from "@/payload-types";
import { territoryColors } from "@/utils/get-random-color";

interface HoursOfOperationPanelSidebarProps {
    technician: Technician;
}

interface HoursOfOperationPanelSidebarProps {
    technician: Technician
    territories?: Territory[]
}

export async function HoursOfOperationPanelSidebar({ technician, territories }: HoursOfOperationPanelSidebarProps) {

    // Map territories with predefined colors
    const territoriesWithColors = territories?.map((territory) => {
        const color = territoryColors[territory.name?.toLowerCase() ?? ""];

        // Extract RGB values from the rgba string
        const rgbValues = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        const r = rgbValues?.[1] || '0';
        const g = rgbValues?.[2] || '0';
        const b = rgbValues?.[3] || '0';

        return {
            id: territory.id,
            name: territory.name,
            color: color,
            bgColor: `rgba(${r}, ${g}, ${b}, 0.1)` // Create a new color with 20% opacity
        };
    });

    return (
        <div className="">
            {/* User Info */}
            <div className="flex items-center gap-2 mb-4">
                <Avatar className="w-12 h-12 border ">
                    <AvatarImage
                        src={
                            (technician?.profilePhoto as Media)?.url ||
                            "/placeholder.svg?height=48&width=48"
                        }
                        alt={technician?.name || "Technician"}
                    />
                    <AvatarFallback>
                        {technician?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <p className="font-inter font-semibold text-base leading-8">{technician?.name}</p>
            </div>
            {/* Territories */}
            <Collapsible defaultOpen className="bg-gray-100 rounded-md p-2 mt-8">
                <CollapsibleTrigger className="flex items-center justify-between w-full mb-3 hover:bg-gray-50 p-1 rounded-md transition-colors">
                    <div className="flex items-center font-medium text-sm gap-2">
                        <p className="font-inter font-medium text-lg leading-5 text-black">Territories</p>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="font-inter font-medium text-sm leading-20">Drag & drop territories to the calendar</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="mb-2">
                        <p className="text-xs text-gray-500 mb-2">Drag & drop territories to the calendar.</p>
                        {territoriesWithColors?.map((territory) => (
                            <div
                                key={territory.id}
                                className="p-2 mb-2 rounded-md border cursor-move transition-all duration-200 hover:shadow-md"
                                style={{
                                    borderColor: territory.color,
                                    backgroundColor: territory.bgColor,
                                    color: territory.color
                                }}
                                draggable="true"
                            >
                                {territory.name ? territory.name.charAt(0).toUpperCase() + territory.name.slice(1) : ''}
                            </div>
                        ))}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}

// // Default territories with color schemes
// const defaultTerritories: Territory[] = [
//     {
//         id: "south",
//         name: "South",
//         color: {
//             border: "border-pink-400",
//             bg: "bg-pink-50",
//             text: "text-pink-900",
//         },
//     },
//     {
//         id: "east",
//         name: "East",
//         color: {
//             border: "border-purple-400",
//             bg: "bg-purple-50",
//             text: "text-purple-900",
//         },
//     },
//     {
//         id: "west",
//         name: "West",
//         color: {
//             border: "border-teal-400",
//             bg: "bg-teal-50",
//             text: "text-teal-900",
//         },
//     },
// ]
