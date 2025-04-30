"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { useState } from "react";

const SortBtn = ({ page }) => {
    const [isOpen, setIsOpen] = useState(false); // Track popover state

    const handlePopoverChange = (open) => {
        setIsOpen(open); // Update the popover state
    };

    return (
        <Popover open={isOpen} onOpenChange={handlePopoverChange}>
            <PopoverTrigger
                className="px-4 py-2 border border-gray-300 text-start rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-sm font-medium"
            >
                Sort By
            </PopoverTrigger>
            <PopoverContent
                align="end" // Align content to the left relative to trigger
                side="bottom" // Place the content below the trigger
                className="w-[190px] border border-gray-300 rounded-lg shadow-lg bg-white"
            >
                <ul className="">
                    <li>
                        <Link href={`?page=${page}&sort=def`}>
                            <button
                                className="w-full text-left px-1 py-2 rounded-md hover:bg-gray-100"
                                onClick={() => setIsOpen(false)} // Close popover on click
                            >
                                Default
                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link href={`?page=${page}&sort=asc`}>
                            <button
                                className="w-full text-left px-1 py-2 rounded-md hover:bg-gray-100"
                                onClick={() => setIsOpen(false)} // Close popover on click
                            >

                                Price: Low to High

                            </button>
                        </Link>
                    </li>
                    <li>
                        <Link href={`?page=${page}&sort=desc`}>
                            <button
                                className="w-full text-left px-1 py-2 rounded-md hover:bg-gray-100"
                                onClick={() => setIsOpen(false)} // Close popover on click
                            >

                                Price: High to Low

                            </button>
                        </Link>
                    </li>
                </ul>
            </PopoverContent>
        </Popover>
    );
};

export default SortBtn;
