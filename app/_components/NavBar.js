import { Search } from "lucide-react";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import CommandSearch from "./CommandSearch";

export default function NavBar() {
  return (
    <div className="grid grid-cols-5  py-4 px-6 border-b">
       <CommandSearch /> 

      <div className="flex justify-end items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <ModeToggle />
      </div>
    </div>
  );
}
